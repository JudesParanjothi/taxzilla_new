import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { LoginForm } from "./LoginForm";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  // Already authenticated → straight to dashboard.
  if (await getSession()) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-5 py-12">
      <div className="absolute inset-0 bg-grid opacity-[0.08]" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo invert />
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h1 className="text-xl font-bold text-white">Admin sign in</h1>
          <p className="mt-1.5 text-sm text-ink-400">
            Authorised personnel only. All activity is logged.
          </p>
          <div className="mt-7">
            <LoginForm />
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-ink-500">
          Protected area · {new Date().getFullYear()} Taxzilla
        </p>
      </div>
    </div>
  );
}
