import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";
import { serverEnv } from "@/lib/env";

/**
 * Stateless captcha: the answer never lives on the server.
 * We hand the browser an image of a random code and store an HMAC of
 * (code + expiry) in a short-lived, httpOnly, signed cookie. On submit we
 * recompute the HMAC from the typed code and compare in constant time.
 */

const COOKIE = "tz_captcha";
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars
const TTL_MS = 10 * 60 * 1000;

function sign(payload: string): string {
  return crypto.createHmac("sha256", serverEnv.authSecret).update(payload).digest("hex");
}

export function generateCaptchaCode(length = 6): string {
  const bytes = crypto.randomBytes(length);
  let code = "";
  for (let i = 0; i < length; i++) code += ALPHABET[bytes[i]! % ALPHABET.length];
  return code;
}

/** Build the cookie value that proves "the user was shown this code". */
export function captchaToken(code: string): string {
  const expiry = Date.now() + TTL_MS;
  const normalized = code.toUpperCase();
  return `${expiry}.${sign(`${normalized}|${expiry}`)}`;
}

export async function setCaptchaCookie(code: string): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, captchaToken(code), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TTL_MS / 1000,
  });
}

/** Verify a user-typed code against the captcha cookie. One-time use. */
export async function verifyCaptcha(typed: string): Promise<boolean> {
  const store = await cookies();
  const cookie = store.get(COOKIE)?.value;
  if (!cookie) return false;

  // Burn the cookie immediately to prevent replay.
  store.delete(COOKIE);

  const [expiryStr, mac] = cookie.split(".");
  if (!expiryStr || !mac) return false;

  const expiry = Number.parseInt(expiryStr, 10);
  if (!Number.isFinite(expiry) || Date.now() > expiry) return false;

  const normalized = (typed ?? "").toUpperCase().trim();
  if (!/^[A-Z0-9]{4,8}$/.test(normalized)) return false;

  const expected = sign(`${normalized}|${expiry}`);
  const a = Buffer.from(expected);
  const b = Buffer.from(mac);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Render the code as a noisy SVG (served by the captcha API route). */
export function captchaSvg(code: string): string {
  const w = 200;
  const h = 56;
  const rnd = (min: number, max: number) => Math.random() * (max - min) + min;

  let noise = "";
  for (let i = 0; i < 6; i++) {
    noise += `<line x1="${rnd(0, w)}" y1="${rnd(0, h)}" x2="${rnd(0, w)}" y2="${rnd(
      0,
      h,
    )}" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>`;
  }
  for (let i = 0; i < 24; i++) {
    noise += `<circle cx="${rnd(0, w)}" cy="${rnd(0, h)}" r="${rnd(0.5, 1.6)}" fill="rgba(255,255,255,0.25)"/>`;
  }

  let letters = "";
  const step = w / (code.length + 1);
  for (let i = 0; i < code.length; i++) {
    const x = step * (i + 1);
    const y = h / 2 + rnd(-4, 4);
    const rot = rnd(-18, 18);
    letters += `<text x="${x}" y="${y}" font-family="Verdana, sans-serif" font-size="26" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" transform="rotate(${rot} ${x} ${y})">${code[i]}</text>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Captcha code">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#059669"/><stop offset="1" stop-color="#047857"/></linearGradient></defs>
    <rect width="${w}" height="${h}" rx="12" fill="url(#g)"/>${noise}${letters}
  </svg>`;
}
