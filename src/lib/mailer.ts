import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { serverEnv } from "@/lib/env";

/**
 * Thin mailer wrapper. In dry-run mode (default outside production) emails are
 * logged to the server console instead of being sent — so local dev never needs
 * real SMTP credentials.
 */

let cached: Transporter | null = null;

function transporter(): Transporter {
  if (cached) return cached;
  cached = nodemailer.createTransport({
    host: serverEnv.smtp.host,
    port: serverEnv.smtp.port,
    secure: serverEnv.smtp.secure,
    auth: { user: serverEnv.smtp.user, pass: serverEnv.smtp.password },
  });
  return cached;
}

export type Attachment = { filename: string; content: Buffer; contentType: string };

export type MailMessage = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  attachments?: Attachment[];
};

// Defence-in-depth against email header injection: headers must be single-line.
const headerSafe = (v: string) => v.replace(/[\r\n]+/g, " ").trim();

export async function sendMail(rawMsg: MailMessage): Promise<void> {
  const msg: MailMessage = {
    ...rawMsg,
    subject: headerSafe(rawMsg.subject),
    to: headerSafe(rawMsg.to),
    replyTo: rawMsg.replyTo ? headerSafe(rawMsg.replyTo) : undefined,
  };

  if (serverEnv.mail.dryRun) {
    console.info(
      `\n📧 [DRY-RUN MAIL]\n  to:      ${msg.to}\n  subject: ${msg.subject}\n  replyTo: ${msg.replyTo ?? "-"}\n  attachments: ${(msg.attachments ?? []).map((a) => a.filename).join(", ") || "none"}\n  ----\n${msg.text}\n`,
    );
    return;
  }

  await transporter().sendMail({
    from: serverEnv.mail.from,
    to: msg.to,
    subject: msg.subject,
    text: msg.text,
    html: msg.html,
    replyTo: msg.replyTo,
    attachments: msg.attachments,
  });
}
