"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth/session";
import {
  createAdminUser,
  deleteAdminUser,
  updateAdminUserPassword,
  type AdminRole,
} from "@/lib/store";
import type { ActionState } from "@/lib/validation";

/** Only a super-admin may manage users. */
async function requireSuper(): Promise<void> {
  const session = await getSession();
  if (!session || session.role !== "super") throw new Error("Forbidden");
}

const USERNAME_RE = /^[a-zA-Z0-9_.-]{3,30}$/;

export async function createUser(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireSuper();

  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role: AdminRole = formData.get("role") === "super" ? "super" : "admin";

  if (!USERNAME_RE.test(username)) {
    return { ok: false, message: "Username must be 3–30 letters, numbers, . _ or -.", errors: { username: "Invalid username." } };
  }
  if (password.length < 8) {
    return { ok: false, message: "Password must be at least 8 characters.", errors: { password: "Too short." } };
  }

  const hash = await bcrypt.hash(password, 12);
  const result = await createAdminUser(username, hash, role);
  if (!result.ok) {
    return { ok: false, message: result.error ?? "Could not create user.", errors: { username: result.error ?? "" } };
  }

  revalidatePath("/admin/users");
  return { ok: true, message: `User "${username}" created.` };
}

export async function deleteUserAction(formData: FormData): Promise<void> {
  await requireSuper();
  const id = String(formData.get("id") ?? "");
  if (id) await deleteAdminUser(id);
  revalidatePath("/admin/users");
}

export async function resetPasswordAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireSuper();
  const id = String(formData.get("id") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!id) return { ok: false, message: "Missing user." };
  if (password.length < 8) return { ok: false, message: "Password must be at least 8 characters." };

  const hash = await bcrypt.hash(password, 12);
  await updateAdminUserPassword(id, hash);
  revalidatePath("/admin/users");
  return { ok: true, message: "Password updated." };
}
