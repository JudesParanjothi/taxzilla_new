import "server-only";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { serverEnv } from "@/lib/env";

/**
 * Stateless admin session as a signed JWT in an httpOnly, SameSite=Strict
 * cookie. Verification uses `jose` (Edge-compatible) so middleware can guard
 * routes without hitting Node-only crypto. Password checks (bcrypt) run only in
 * the Node runtime of the login server action.
 */

export const SESSION_COOKIE = "tz_admin_session";

export type SessionData = { sub: string; role: string };

function secretKey(): Uint8Array {
  return new TextEncoder().encode(serverEnv.authSecret);
}

export async function createSession(data: SessionData): Promise<void> {
  const ttl = serverEnv.authTtlSeconds;
  const token = await new SignJWT({ role: data.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(data.sub)
    .setIssuedAt()
    .setExpirationTime(`${ttl}s`)
    .setIssuer("taxzilla-admin")
    .setAudience("taxzilla-admin")
    .sign(secretKey());

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ttl,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** Verify a raw token string (used by middleware and server components). */
export async function verifySessionToken(token: string | undefined): Promise<SessionData | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      issuer: "taxzilla-admin",
      audience: "taxzilla-admin",
    });
    return toSession(payload);
  } catch {
    return null;
  }
}

/** Read + verify the session from cookies (server components / actions). */
export async function getSession(): Promise<SessionData | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

function toSession(payload: JWTPayload): SessionData | null {
  if (typeof payload.sub !== "string") return null;
  const role = typeof payload.role === "string" ? payload.role : "admin";
  return { sub: payload.sub, role };
}
