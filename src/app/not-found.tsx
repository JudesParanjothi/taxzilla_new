import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-950 px-6 text-center">
      <Logo invert />
      <p className="mt-10 font-display text-7xl font-bold text-brand-500">404</p>
      <h1 className="mt-4 text-2xl font-bold text-white">Page not found</h1>
      <p className="mt-3 max-w-md text-ink-400">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-brand-600 px-7 py-3.5 font-semibold text-white transition hover:bg-brand-500"
      >
        Back to home
      </Link>
    </div>
  );
}
