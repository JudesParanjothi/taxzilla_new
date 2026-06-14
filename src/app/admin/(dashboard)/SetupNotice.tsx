import { Database } from "lucide-react";

/** Shown when the database can't be reached or the tables don't exist yet. */
export function SetupNotice() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
        <Database className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-xl font-bold text-amber-900">Couldn&apos;t load data</h2>
      <p className="mt-2 text-sm text-amber-800">
        The database isn&apos;t reachable. Make sure{" "}
        <code className="rounded bg-amber-100 px-1.5 py-0.5">SUPABASE_URL</code> and{" "}
        <code className="rounded bg-amber-100 px-1.5 py-0.5">SUPABASE_SERVICE_ROLE_KEY</code> are set
        (in <code className="rounded bg-amber-100 px-1.5 py-0.5">.env.local</code> locally, or your
        hosting provider&apos;s Environment Variables), the tables from{" "}
        <code className="rounded bg-amber-100 px-1.5 py-0.5">supabase/schema.sql</code> exist, then
        reload.
      </p>
    </div>
  );
}
