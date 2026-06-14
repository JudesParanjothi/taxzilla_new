import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";

export function FormAlert({ ok, message }: { ok: boolean; message: string }) {
  if (!message) return null;
  return (
    <div
      role="status"
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4 text-sm",
        ok
          ? "border-brand-200 bg-brand-50 text-brand-800"
          : "border-red-200 bg-red-50 text-red-700",
      )}
    >
      {ok ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
      ) : (
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
      )}
      <span>{message}</span>
    </div>
  );
}
