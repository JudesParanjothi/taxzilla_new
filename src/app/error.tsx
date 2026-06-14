"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-50 px-6 text-center">
      <p className="font-display text-5xl font-bold text-brand-600">Oops</p>
      <h1 className="mt-4 text-2xl font-bold text-ink-900">Something went wrong</h1>
      <p className="mt-3 max-w-md text-ink-600">
        We hit an unexpected error. Please try again — if it keeps happening, it&apos;s usually a
        missing configuration value on the server.
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-ink-400">Reference: {error.digest}</p>
      )}
      <div className="mt-8 flex gap-3">
        <button
          onClick={reset}
          className="rounded-full bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full px-6 py-3 font-semibold text-ink-700 ring-1 ring-ink-200 transition hover:bg-white"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
