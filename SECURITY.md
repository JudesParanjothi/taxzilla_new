# Security overview

This rebuild was driven by one concern: the legacy code shipped secrets and was
a target for token/credential theft. Every control below was designed so that
**no secret ever lives in the source tree** and every untrusted input is
validated server-side.

## Secrets handling

- **Nothing sensitive is hard-coded.** All credentials (session secret, admin
  password hash, SMTP, recipients) are read from environment variables via a
  single server-only module (`src/lib/env.ts`, guarded by the `server-only`
  package so it can never be bundled to the client).
- `.env.local` is **gitignored**; `.env.example` documents every variable with
  placeholders only.
- The admin password is stored **only as a bcrypt hash** (cost 12) — never in
  plaintext. The legacy SQL dump literally contained a live admin hash; nothing
  like that exists here.
- `NEXT_PUBLIC_*` is the only prefix exposed to the browser, and it carries no
  secrets (just the site URL).

## Authentication (admin)

- **Stateless JWT sessions** signed with `AUTH_SESSION_SECRET` (HS256, `jose`),
  stored in an **httpOnly, `SameSite=Strict`, `Secure`-in-prod** cookie.
- **Two-layer route protection:** Edge `middleware.ts` rejects unauthenticated
  requests to `/admin/*` (redirect to login) *and* the dashboard layout
  re-verifies the session server-side (defence in depth). Server actions and the
  file-download route independently re-check the session — they are public
  endpoints and are never trusted to be "behind" the UI.
- **Brute-force lockout:** 5 attempts per 15 minutes per IP on the login action.
- **Timing-safe checks:** bcrypt is always run (even for unknown usernames) and
  the username is compared with `crypto.timingSafeEqual`, so responses don't leak
  whether a username exists.

## Public forms (contact, newsletter, careers)

- **Server-side validation with zod** — client attributes are never trusted.
- **Stateless signed captcha** on contact + careers: the answer never touches
  the server. The code is shown as an image and an HMAC of it is stored in a
  short-lived httpOnly cookie, verified in constant time and **burned on use**
  (no replay).
- **Honeypot field** silently absorbs naive bots.
- **Per-IP rate limiting** on every public form action.
- **Upload safety (careers):** size cap, extension allowlist, and **magic-byte
  sniffing** so a renamed file can't slip through. Files are stored under random
  names, served **only to authenticated admins**, and always with
  `Content-Disposition: attachment` + `nosniff` so an uploaded SVG/HTML can never
  execute in a victim's browser.

## HTTP hardening (middleware + next.config)

- **Strict Content-Security-Policy** with a **per-request nonce** and
  `strict-dynamic`; Next.js propagates the nonce to its own scripts. No
  `unsafe-inline` for scripts (only `unsafe-eval` in dev for HMR).
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`,
  `Referrer-Policy: strict-origin-when-cross-origin`, a locked-down
  `Permissions-Policy`, and **HSTS** (production only).
- `X-Powered-By` removed.
- `frame-src` is limited to the Google Maps embed used on the contact page;
  everything else (`object-src`, framing, base-uri) is locked to `'none'`/`self`.

## Built-in framework protections

- React escapes output by default → XSS-resistant rendering.
- Server Actions are CSRF-protected by Next.js (origin checks + same-site).
- No raw SQL anywhere; the data layer is a typed store interface.

## Before deploying — checklist

1. Set a fresh `AUTH_SESSION_SECRET` (48+ random bytes).
2. Set `ADMIN_USERNAME` and a new `ADMIN_PASSWORD_HASH`.
3. Set real SMTP credentials and set `MAIL_DRY_RUN=false`.
4. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
5. Serve over HTTPS (HSTS + `Secure` cookies activate automatically in prod).
6. Consider moving the rate-limiter and file-store to Redis/object-storage +
   a database for multi-instance deployments.
