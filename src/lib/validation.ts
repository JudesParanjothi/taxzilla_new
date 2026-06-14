import { z } from "zod";

/** Shared form validation schemas (usable on client and server). */

/**
 * Strip null bytes and non-whitespace control characters from user input.
 * Implemented with numeric code-point checks so no control chars appear in
 * this source file. Keeps tab (9), LF (10) and CR (13); drops the rest of the
 * C0 range and DEL (127).
 */
const stripControl = (v: string): string => {
  let out = "";
  for (const ch of v) {
    const c = ch.codePointAt(0) ?? 0;
    const isBadControl = (c < 32 && c !== 9 && c !== 10 && c !== 13) || c === 127;
    if (!isBadControl) out += ch;
  }
  return out;
};

// Single-line text: also collapse newlines/tabs (prevents header/log injection
// when the value is used in an email subject, etc.).
const oneLine = (v: string) => stripControl(v).replace(/[\r\n\t]+/g, " ").trim();
// Multi-line text: keep newlines but drop other control chars.
const multiLine = (v: string) => stripControl(v).trim();

/** Optional free-text field, hardened and length-capped. Missing → "". */
function optionalText(max: number, mode: "one" | "multi") {
  return z.preprocess(
    (v) => (typeof v === "string" ? v : ""),
    z.string().max(max, "This field is too long.").transform(mode === "one" ? oneLine : multiLine),
  );
}

const name = z
  .string()
  .trim()
  .min(2, "Please enter your full name.")
  .max(80, "Name is too long.")
  .regex(/^[\p{L}\s.'-]+$/u, "Name contains invalid characters.");

const phone = z
  .string()
  .trim()
  .transform((v) => v.replace(/\D+/g, ""))
  .pipe(z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number."));

const email = z
  .string()
  .trim()
  .toLowerCase()
  .email("Enter a valid email address.")
  .max(160, "Email is too long.");

export const contactSchema = z.object({
  fullname: name,
  contact: phone,
  email,
  about: optionalText(80, "one"),
  message: optionalText(2000, "multi"),
});

export const newsletterSchema = z.object({
  email,
});

/** Roles a candidate can apply for (careers form "Applying for" dropdown). */
export const APPLY_OPTIONS = [
  "Full Time Job",
  "Part Time Job",
  "Internship For Students",
  "Taxation Courses",
  "Apprenticeship",
] as const;

export const careerSchema = z.object({
  name,
  phone,
  email,
  position: z.enum(APPLY_OPTIONS, { message: "Please select what you're applying for." }),
  message: optionalText(2000, "multi"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type CareerInput = z.infer<typeof careerSchema>;

/** Result shape returned by every server action that backs a form. */
export type ActionState = {
  ok: boolean;
  message: string;
  /** Field-level errors keyed by field name. */
  errors?: Record<string, string>;
};

/** Collapse a ZodError into a flat field→message map. */
export function flattenZodErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !out[key]) out[key] = issue.message;
  }
  return out;
}
