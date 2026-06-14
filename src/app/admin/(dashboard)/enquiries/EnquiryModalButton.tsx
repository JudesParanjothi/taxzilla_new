"use client";

import { useEffect, useState } from "react";
import { Eye, X, Mail, Phone, Tag, Clock, User } from "lucide-react";

type Props = {
  refId: string;
  name: string;
  about: string;
  email: string;
  contact: string;
  message: string;
  received: string;
};

export function EnquiryModalButton({ refId, name, about, email, contact, message, received }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 rounded-lg bg-ink-100 px-2.5 py-1.5 text-xs font-semibold text-ink-700 transition hover:bg-ink-200"
      >
        <Eye className="h-3.5 w-3.5" /> View msg
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Enquiry from ${name}`}
        >
          {/* backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
          />

          {/* dialog */}
          <div className="animate-fade-up relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* header */}
            <div className="flex items-start justify-between gap-4 border-b border-ink-200 bg-ink-50 px-6 py-4">
              <div>
                <p className="font-mono text-xs font-semibold text-brand-600">Enquiry {refId}</p>
                <h3 className="mt-0.5 text-lg font-bold text-ink-900">{name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 transition hover:bg-ink-200 hover:text-ink-800"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* details */}
            <div className="grid gap-3 px-6 py-5 sm:grid-cols-2">
              <Detail Icon={User} label="Name" value={name} />
              <Detail Icon={Tag} label="Topic" value={about || "Not specified"} />
              <Detail Icon={Mail} label="Email" value={email} href={`mailto:${email}`} />
              <Detail Icon={Phone} label="Phone" value={contact} href={`tel:${contact}`} />
              <Detail Icon={Clock} label="Received" value={received} />
            </div>

            {/* message */}
            <div className="border-t border-ink-200 px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Message</p>
              <div className="mt-2 max-h-64 overflow-y-auto whitespace-pre-wrap break-words rounded-xl bg-ink-50 p-4 text-sm text-ink-800">
                {message || "No message provided."}
              </div>
            </div>

            {/* footer */}
            <div className="flex justify-end gap-3 border-t border-ink-200 px-6 py-4">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                <Mail className="h-4 w-4" /> Reply by email
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-ink-700 ring-1 ring-ink-200 transition hover:bg-ink-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Detail({
  Icon,
  label,
  value,
  href,
}: {
  Icon: typeof User;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-400">
        <Icon className="h-3.5 w-3.5" /> {label}
      </p>
      {href ? (
        <a href={href} className="mt-0.5 block break-all text-sm font-medium text-ink-900 hover:text-brand-700">
          {value}
        </a>
      ) : (
        <p className="mt-0.5 break-words text-sm font-medium text-ink-900">{value}</p>
      )}
    </div>
  );
}
