import { ShieldAlert } from "lucide-react";

/** Shown when a non-super-admin tries to open a restricted page. */
export function Forbidden() {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
        <ShieldAlert className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-xl font-bold text-red-900">Not authorised</h2>
      <p className="mt-2 text-sm text-red-800">
        This section is restricted to super-admins.
      </p>
    </div>
  );
}
