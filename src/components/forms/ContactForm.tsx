"use client";

import { useActionState, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitContact } from "@/app/actions/forms";
import type { ActionState } from "@/lib/validation";
import { serviceOptions } from "@/lib/site";
import { Label, Input, Textarea, Select, Honeypot } from "@/components/ui/Field";
import { CaptchaField } from "./CaptchaField";
import { FormAlert } from "./FormAlert";
import { SubmitButton } from "./SubmitButton";

const initial: ActionState = { ok: false, message: "" };

function ContactFormInner() {
  const [state, action] = useActionState(submitContact, initial);
  const searchParams = useSearchParams();
  const defaultTopic = searchParams.get("topic") ?? "";
  
  const [phoneWarning, setPhoneWarning] = useState("");
  const [emailWarning, setEmailWarning] = useState("");

  const err = state.errors ?? {};
  // Remount on success so fields reset.
  const formKey = state.ok ? "done" : "form";

  return (
    <form key={formKey} action={action} className="relative space-y-5">
      <Honeypot />
      {state.message && <FormAlert ok={state.ok} message={state.message} />}

      {!state.ok && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="fullname" required>Full name</Label>
              <Input id="fullname" name="fullname" autoComplete="name" required placeholder="Your name" />
              {err.fullname && <p className="mt-1.5 text-sm text-red-600">{err.fullname}</p>}
            </div>
            <div>
              <Label htmlFor="contact" required>Contact number</Label>
              <Input
                id="contact"
                name="contact"
                inputMode="numeric"
                autoComplete="tel"
                required
                placeholder="10-digit mobile"
                pattern="[0-9]{10}"
                maxLength={10}
                onInput={(e) => {
                  const val = e.currentTarget.value;
                  if (/\D/.test(val)) {
                    setPhoneWarning("Only numbers are allowed");
                  } else {
                    setPhoneWarning("");
                  }
                  e.currentTarget.value = val.replace(/\D/g, "");
                }}
                onBlur={(e) => {
                  const val = e.currentTarget.value;
                  if (val.length > 0 && val.length < 10) {
                    setPhoneWarning("Must be exactly 10 digits");
                  }
                }}
              />
              {phoneWarning && <p className="mt-1.5 text-sm font-medium text-red-600 animate-in fade-in">{phoneWarning}</p>}
              {err.contact && !phoneWarning && <p className="mt-1.5 text-sm text-red-600">{err.contact}</p>}
            </div>
            <div>
              <Label htmlFor="email" required>Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                onBlur={(e) => {
                  const val = e.currentTarget.value;
                  if (val && !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(val)) {
                    setEmailWarning("Please enter a valid email address");
                  } else {
                    setEmailWarning("");
                  }
                }}
                onInput={() => setEmailWarning("")}
              />
              {emailWarning && <p className="mt-1.5 text-sm font-medium text-red-600 animate-in fade-in">{emailWarning}</p>}
              {err.email && !emailWarning && <p className="mt-1.5 text-sm text-red-600">{err.email}</p>}
            </div>
            <div>
              <Label htmlFor="about">I want to discuss</Label>
              <Select id="about" name="about" defaultValue={defaultTopic}>
                <option value="">Select a topic</option>
                {serviceOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" placeholder="Tell us a little about what you need…" />
            {err.message && <p className="mt-1.5 text-sm text-red-600">{err.message}</p>}
          </div>

          <CaptchaField error={err.captcha} />

          <p className="text-xs text-ink-500">
            We keep the information you share confidential and never sell your data.
          </p>

          <SubmitButton className="w-full sm:w-auto">Send enquiry</SubmitButton>
        </>
      )}
    </form>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="h-96 flex items-center justify-center text-ink-500 font-medium animate-pulse">Loading form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
