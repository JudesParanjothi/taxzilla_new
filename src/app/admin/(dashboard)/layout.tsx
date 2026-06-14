import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { AdminShell } from "./AdminShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Defence in depth: middleware already guards /admin, but never trust a single layer.
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell user={session.sub} role={session.role}>
      {children}
    </AdminShell>
  );
}
