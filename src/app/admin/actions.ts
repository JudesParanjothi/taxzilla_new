"use server";

import { redirect } from "next/navigation";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { serverEnv } from "@/lib/env";
import { createSession, destroySession } from "@/lib/auth/session";
import { rateLimit, clientIp } from "@/lib/security/rate-limit";
import { getAdminUserByUsername } from "@/lib/store";
import type { ActionState } from "@/lib/validation";

/** Constant-time string comparison to avoid username timing leaks. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export async function login(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const ip = await clientIp();

  // Brute-force protection: 5 attempts per 15 minutes per IP.
  const gate = rateLimit(`admin-login:${ip}`, 5, 15 * 60);
  if (!gate.allowed) {
    return {
      ok: false,
      message: `Too many failed attempts. Please wait ${Math.ceil(gate.retryAfter / 60)} minute(s).`,
    };
  }

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { ok: false, message: "Enter your username and password." };
  }

  // 1) Bootstrap super-admin from env (always available, even if DB is empty).
  const isEnvAdmin =
    safeEqual(username, serverEnv.adminUsername) &&
    (await bcrypt.compare(password, serverEnv.adminPasswordHash));

  if (isEnvAdmin) {
    await createSession({ sub: username, role: "super" });
    redirect("/admin");
  }

  // 2) Database-backed users (employees created via the Users page).
  const dbUser = await getAdminUserByUsername(username);
  // Run a compare even when the user is unknown, to keep timing uniform.
  const dbOk = await bcrypt.compare(
    password,
    dbUser?.passwordHash ?? "$2a$12$0000000000000000000000000000000000000000000000000000",
  );

  if (dbUser && dbOk) {
    await createSession({ sub: dbUser.username, role: dbUser.role });
    redirect("/admin");
  }

  return { ok: false, message: "Invalid username or password." };
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
