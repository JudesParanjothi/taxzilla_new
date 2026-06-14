# Taxzilla — Next.js rebuild

A complete, security-hardened rebuild of the Taxzilla marketing site **and** the
candidate-management admin panel. Built from scratch in Next.js — **no code,
markup, CSS or secrets were carried over** from the legacy PHP site. Only the
business facts (company info, service catalogue and the form/admin workflows)
were reproduced, with a brand-new design.

## Stack

- **Next.js 15** (App Router, Server Actions) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — fresh design system (deep emerald + gold on slate)
- **jose** (JWT sessions) · **bcryptjs** (password hashing) · **zod** (validation)
- **nodemailer** (email) — with a console dry-run mode for local dev

## Getting started

```bash
npm install
cp .env.example .env.local      # then fill in real values
npm run dev                     # http://localhost:3000
```

A working `.env.local` with dev defaults is included. **Default admin login:**

| URL | Username | Password |
| --- | --- | --- |
| `/admin/login` | `superadmin` | `TaxzillaAdmin#2026` |

> Change these before deploying. Generate a new password hash with:
> `node scripts/hash-password.mjs "YourStrongPassword"` and paste it into
> `ADMIN_PASSWORD_HASH`. Generate a new `AUTH_SESSION_SECRET` with
> `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

## Project layout

```
src/
  app/
    (public)/        Public site (home, about, services, careers, contact, legal)
    admin/
      login/         Public sign-in page + login/logout server actions
      (dashboard)/   Auth-guarded dashboard (candidate list + detail)
      files/         Auth-only résumé/photo download route
    actions/         Public form server actions (contact, newsletter, careers)
    api/captcha/     Stateless captcha image endpoint
  components/        UI primitives, header/footer, forms
  lib/
    env.ts           Validated, server-only env access
    site.ts          Single source of truth for content
    validation.ts    Zod schemas shared by forms
    mailer.ts        Email (dry-run aware)
    store.ts         File-backed submission store (swap for a DB later)
    auth/            JWT session helpers
    security/        rate-limit, captcha, upload validation
  middleware.ts      Admin route guard + CSP/nonce + security headers
var/                 Runtime data (uploads + submissions.json) — gitignored
```

## Security model

See [SECURITY.md](./SECURITY.md) for the full breakdown of every control and how
it maps to (and improves on) the legacy site.

## Notes on the data layer

Per the rebuild brief there is **no database yet**. Form submissions email the
relevant recipient, and career applications are additionally persisted to a
file-backed store (`var/data/submissions.json` + `var/uploads/`) that the admin
dashboard reads. The `src/lib/store.ts` interface mirrors a repository layer, so
it can be swapped for Prisma/SQL without changing any callers.
