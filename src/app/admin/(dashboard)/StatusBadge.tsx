import { cn } from "@/lib/cn";
import type { Submission } from "@/lib/store";

const styles: Record<Submission["status"], string> = {
  new: "bg-brand-50 text-brand-700 ring-brand-200",
  reviewed: "bg-blue-50 text-blue-700 ring-blue-200",
  shortlisted: "bg-gold-400/15 text-gold-600 ring-gold-300",
  rejected: "bg-red-50 text-red-700 ring-red-200",
};

export function StatusBadge({ status }: { status: Submission["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset",
        styles[status],
      )}
    >
      {status}
    </span>
  );
}
