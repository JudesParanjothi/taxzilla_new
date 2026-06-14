"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { UserPlus, Loader2 } from "lucide-react";
import { createUser } from "../user-actions";
import type { ActionState } from "@/lib/validation";

const initial: ActionState = { ok: false, message: "" };

const input =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
      Create user
    </button>
  );
}

export function CreateUserForm() {
  const [state, action] = useActionState(createUser, initial);
  const err = state.errors ?? {};

  return (
    <form key={state.ok ? "done" : "form"} action={action} className="space-y-4">
      {state.message && (
        <div
          className={`rounded-xl border p-3 text-sm ${
            state.ok
              ? "border-brand-200 bg-brand-50 text-brand-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-ink-700">
            Username
          </label>
          <input id="username" name="username" autoComplete="off" required placeholder="e.g. hrteam" className={input} />
          {err.username && <p className="mt-1 text-xs text-red-600">{err.username}</p>}
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-700">
            Temporary password
          </label>
          <input id="password" name="password" type="text" autoComplete="off" required placeholder="min 8 characters" className={input} />
          {err.password && <p className="mt-1 text-xs text-red-600">{err.password}</p>}
        </div>
        <div>
          <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-ink-700">
            Role
          </label>
          <select id="role" name="role" defaultValue="admin" className={input}>
            <option value="admin">Admin (employee)</option>
            <option value="super">Super-admin</option>
          </select>
        </div>
      </div>
      <Submit />
    </form>
  );
}
