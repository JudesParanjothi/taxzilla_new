"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Inbox,
  Mail,
  UserCog,
  LogOut,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/cn";
import { logout } from "../actions";

type NavItem = { href: string; label: string; Icon: LucideIcon; superOnly?: boolean };

// Employees (role "admin") see only Dashboard + Candidates.
// Super-admins additionally see Enquiries, Subscribers and Users.
const NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/candidates", label: "Candidates", Icon: Users },
  { href: "/admin/enquiries", label: "Enquiries", Icon: Inbox, superOnly: true },
  { href: "/admin/subscribers", label: "Subscribers", Icon: Mail, superOnly: true },
  { href: "/admin/users", label: "Users", Icon: UserCog, superOnly: true },
];

function isActive(pathname: string, href: string): boolean {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

export function AdminShell({
  user,
  role,
  children,
}: {
  user: string;
  role: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSuper = role === "super";
  const items = NAV.filter((item) => !item.superOnly || isSuper);
  const current = [...items].reverse().find((i) => isActive(pathname, i.href));

  return (
    <div className="flex min-h-screen bg-ink-100">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-ink-200 bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-ink-200 px-6">
          <Logo />
        </div>

        <div className="px-4 pt-5">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-widest text-ink-400">
            Menu
          </p>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          {items.map(({ href, label, Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink-600 hover:bg-ink-50 hover:text-ink-900",
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand-600" />
                )}
                <Icon className={cn("h-5 w-5", active ? "text-brand-600" : "text-ink-400 group-hover:text-ink-600")} />
                {label}
              </Link>
            );
          })}

          <div className="my-3 border-t border-ink-100" />

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 transition hover:bg-ink-50 hover:text-ink-900"
          >
            <ExternalLink className="h-5 w-5 text-ink-400 group-hover:text-ink-600" />
            View site
          </Link>
        </nav>

        <div className="border-t border-ink-200 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-ink-50 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold uppercase text-white">
              {user.slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink-900">{user}</p>
              <p className="text-xs capitalize text-ink-500">{role}</p>
            </div>
          </div>
          <form action={logout} className="mt-2">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Top bar — current location */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-ink-200 bg-white/80 px-6 backdrop-blur">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-ink-400">Admin</span>
            <span className="text-ink-300">/</span>
            <span className="font-semibold text-ink-900">{current?.label ?? "Dashboard"}</span>
          </div>
          <form action={logout} className="lg:hidden">
            <button type="submit" className="flex items-center gap-1.5 text-sm font-medium text-red-600">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </header>

        <main className="flex-1 p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
