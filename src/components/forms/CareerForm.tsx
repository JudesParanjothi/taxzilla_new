"use client";

import { ChevronDown } from "lucide-react";
import { useActionState, useState } from "react";
import { submitCareer } from "@/app/actions/forms";
import type { ActionState } from "@/lib/validation";
import { Label, Input, Textarea, Select, Honeypot } from "@/components/ui/Field";
import { APPLY_OPTIONS } from "@/lib/validation";
import { CaptchaField } from "./CaptchaField";
import { FormAlert } from "./FormAlert";
import { SubmitButton } from "./SubmitButton";

const initial: ActionState = { ok: false, message: "" };

const fileClasses =
  "w-full cursor-pointer rounded-xl border border-ink-200 bg-white text-sm text-ink-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-brand-50 file:px-4 file:py-3 file:font-semibold file:text-brand-700 hover:file:bg-brand-100";

export function CareerForm() {
  const [state, action] = useActionState(submitCareer, initial);
  const [phoneWarning, setPhoneWarning] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const err = state.errors ?? {};
  const formKey = state.ok ? "done" : "form";

  return (
    <form key={formKey} action={action} className="relative space-y-5" encType="multipart/form-data">
      <Honeypot />
      {state.message && <FormAlert ok={state.ok} message={state.message} />}

      {!state.ok && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" required>Full name</Label>
              <Input id="name" name="name" autoComplete="name" required placeholder="Your name" />
              {err.name && <p className="mt-1.5 text-sm text-red-600">{err.name}</p>}
            </div>
            <div>
              <Label htmlFor="phone" required>Phone number</Label>
              <Input
                id="phone"
                name="phone"
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
              {err.phone && !phoneWarning && <p className="mt-1.5 text-sm text-red-600">{err.phone}</p>}
            </div>
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
            <Label htmlFor="position" required>Applying for</Label>
            <div className="relative">
              <Select id="position" name="position" required defaultValue="" className="pr-10">
                <option value="" disabled>Select an option…</option>
                {APPLY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </Select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
            </div>
            {err.position && <p className="mt-1.5 text-sm text-red-600">{err.position}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="resume" required>Resume (PDF / DOC / DOCX)</Label>
              <input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" required className={fileClasses} />
              {err.resume && <p className="mt-1.5 text-sm text-red-600">{err.resume}</p>}
            </div>
            <div>
              <Label htmlFor="photo" required>Photo (JPG / PNG)</Label>
              <input id="photo" name="photo" type="file" accept=".jpg,.jpeg,.png" required className={fileClasses} />
              {err.photo && <p className="mt-1.5 text-sm text-red-600">{err.photo}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="message">Cover note</Label>
            <Textarea id="message" name="message" placeholder="Which role are you applying for? Tell us about yourself…" />
          </div>

          <CaptchaField error={err.captcha} />

          <SubmitButton className="w-full sm:w-auto">Submit application</SubmitButton>
        </>
      )}
    </form>
  );
}
