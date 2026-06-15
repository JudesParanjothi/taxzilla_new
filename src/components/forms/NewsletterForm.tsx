"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/forms";
import type { ActionState } from "@/lib/validation";
import { Honeypot } from "@/components/ui/Field";
import { SubmitButton } from "./SubmitButton";

const initial: ActionState = { ok: false, message: "" };

export function NewsletterForm() {
  const [state, action] = useActionState(subscribeNewsletter, initial);

  return (
    <form action={action} className="relative">
      <Honeypot />
      <div className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          required
          placeholder="Your email address"
          aria-label="Email address"
          className="w-full rounded-full border border-ink-300 bg-white px-5 py-3.5 text-base text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400/40"
        />
        <SubmitButton size="md" className="w-full justify-center">
          Subscribe
          <ArrowRight className="h-4 w-4" />
        </SubmitButton>
      </div>
      {state.message && (
        <p className={`mt-2 text-sm ${state.ok ? "text-brand-300" : "text-red-300"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
