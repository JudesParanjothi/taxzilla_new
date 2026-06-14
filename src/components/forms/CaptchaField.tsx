"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Label, Input } from "@/components/ui/Field";

export function CaptchaField({ error }: { error?: string }) {
  // Cache-busting token forces the <img> to refetch a new captcha.
  const [nonce, setNonce] = useState(() => Date.now());

  return (
    <div>
      <Label htmlFor="captcha" required>
        Security code
      </Label>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-ink-200 bg-ink-50 p-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/captcha?t=${nonce}`}
            alt="Captcha"
            width={200}
            height={56}
            className="h-12 rounded-lg"
          />
          <button
            type="button"
            onClick={() => setNonce(Date.now())}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 transition hover:bg-ink-200 hover:text-ink-800"
            aria-label="Refresh captcha"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
        <Input
          id="captcha"
          name="captcha"
          autoComplete="off"
          placeholder="Enter code"
          required
          className="flex-1 uppercase tracking-widest"
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}
