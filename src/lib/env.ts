import "server-only";

/**
 * Centralised, validated access to server-side environment variables.
 *
 * Secrets are read lazily and ONLY on the server. Nothing here is ever bundled
 * into client code (enforced by `server-only`). Public values must use the
 * `NEXT_PUBLIC_` prefix and live in `publicEnv` below.
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optional(name: string, fallback: string): string {
  const value = process.env[name];
  return value && value.trim() !== "" ? value : fallback;
}

function int(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : fallback;
}

function bool(name: string, fallback: boolean): boolean {
  const raw = process.env[name];
  if (raw == null) return fallback;
  return raw.toLowerCase() === "true" || raw === "1";
}

export const serverEnv = {
  supabase: {
    get url() {
      return required("SUPABASE_URL");
    },
    /** Service-role key — full DB access. SERVER ONLY. Never expose to client. */
    get serviceRoleKey() {
      return required("SUPABASE_SERVICE_ROLE_KEY");
    },
    /** Private storage bucket for uploaded résumés / photos. */
    get uploadBucket() {
      return optional("SUPABASE_UPLOAD_BUCKET", "uploads");
    },
  },

  get authSecret() {
    return required("AUTH_SESSION_SECRET");
  },
  get adminUsername() {
    return required("ADMIN_USERNAME");
  },
  get adminPasswordHash() {
    return required("ADMIN_PASSWORD_HASH");
  },
  get authTtlSeconds() {
    return int("AUTH_SESSION_TTL", 8 * 60 * 60);
  },

  smtp: {
    get host() {
      return required("SMTP_HOST");
    },
    get port() {
      return int("SMTP_PORT", 465);
    },
    get secure() {
      return bool("SMTP_SECURE", true);
    },
    get user() {
      return required("SMTP_USER");
    },
    get password() {
      return required("SMTP_PASSWORD");
    },
  },

  mail: {
    get from() {
      return optional("MAIL_FROM", "Taxzilla <noreply@taxzilla.in>");
    },
    get contactRecipient() {
      return optional("MAIL_CONTACT_RECIPIENT", "info@taxzilla.in");
    },
    get newsletterRecipient() {
      return optional("MAIL_NEWSLETTER_RECIPIENT", "info@taxzilla.in");
    },
    get careersRecipient() {
      return optional("MAIL_CAREERS_RECIPIENT", "hr@taxzilla.in");
    },
    get dryRun() {
      return bool("MAIL_DRY_RUN", process.env.NODE_ENV !== "production");
    },
  },

  get uploadMaxBytes() {
    // 2 MB per file → résumé + photo stays under the Server Action body limit.
    return int("UPLOAD_MAX_BYTES", 2 * 1024 * 1024);
  },

  rate: {
    get windowSeconds() {
      return int("FORM_RATE_WINDOW", 600);
    },
    get max() {
      return int("FORM_RATE_MAX", 5);
    },
  },
};

/**
 * Always return a VALID absolute URL string, even if NEXT_PUBLIC_SITE_URL is
 * missing or set without a protocol (e.g. "my-app.vercel.app"). A bad value
 * here would otherwise make `new URL(...)` throw and crash every page.
 */
function normalizeSiteUrl(raw: string | undefined): string {
  const value = (raw ?? "").trim();
  if (!value) return "http://localhost:3000";
  try {
    return new URL(value).toString().replace(/\/$/, "");
  } catch {
    /* missing protocol — try https */
  }
  try {
    return new URL(`https://${value}`).toString().replace(/\/$/, "");
  } catch {
    return "http://localhost:3000";
  }
}

export const publicEnv = {
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
};
