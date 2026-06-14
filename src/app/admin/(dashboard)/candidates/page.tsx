import type { Metadata } from "next";
import Link from "next/link";
import { Inbox, Eye, Check, X, Download, Trash2 } from "lucide-react";
import { listSubmissions } from "@/lib/store";
import { getSession } from "@/lib/auth/session";
import { StatusBadge } from "../StatusBadge";
import { SetupNotice } from "../SetupNotice";
import { setCandidateStatus, deleteCandidate } from "../candidate-actions";

export const metadata: Metadata = { title: "Candidates", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function formatDate(iso: Date | string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function CandidatesPage() {
  const session = await getSession();
  const isSuper = session?.role === "super";

  let submissions;
  try {
    submissions = await listSubmissions();
  } catch (e) {
    console.error("[admin/candidates] load error:", e);
    return <SetupNotice />;
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Candidates</h1>
          <p className="mt-1 text-ink-500">Job applications submitted through the careers page.</p>
        </div>
        {submissions.length > 0 && (
          // Download endpoint (route handler), not a page — a plain anchor is correct here.
          <a
            href="/admin/candidates/export"
            download
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            <Download className="h-4 w-4" /> Export CSV
          </a>
        )}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-ink-200 bg-white">
        {submissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <Inbox className="h-10 w-10 text-ink-300" />
            <p className="mt-4 font-medium text-ink-700">No applications yet</p>
            <p className="mt-1 text-sm text-ink-500">
              New submissions from the careers page will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink-50 text-xs uppercase tracking-wider text-ink-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">ID</th>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Contact</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Applied</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {submissions.map((s) => (
                  <tr key={s.id} className="transition hover:bg-ink-50/60">
                    <td className="px-5 py-4">
                      <span className="font-mono font-semibold text-brand-700">{s.ref}</span>
                    </td>
                    <td className="px-5 py-4 font-medium text-ink-900">{s.name}</td>
                    <td className="px-5 py-4 text-ink-600">
                      <div>{s.email}</div>
                      <div className="text-xs text-ink-400">{s.phone}</div>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-5 py-4 text-ink-500">{formatDate(s.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        {s.status !== "shortlisted" && (
                          <form action={setCandidateStatus}>
                            <input type="hidden" name="id" value={s.id} />
                            <input type="hidden" name="status" value="shortlisted" />
                            <button
                              type="submit"
                              title="Approve & email candidate"
                              className="inline-flex items-center gap-1 rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-600 hover:text-white"
                            >
                              <Check className="h-3.5 w-3.5" /> Approve
                            </button>
                          </form>
                        )}
                        {s.status !== "rejected" && (
                          <form action={setCandidateStatus}>
                            <input type="hidden" name="id" value={s.id} />
                            <input type="hidden" name="status" value="rejected" />
                            <button
                              type="submit"
                              title="Reject & email candidate"
                              className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                            >
                              <X className="h-3.5 w-3.5" /> Reject
                            </button>
                          </form>
                        )}
                        <Link
                          href={`/admin/candidates/${s.id}`}
                          className="inline-flex items-center gap-1 rounded-lg bg-ink-100 px-2.5 py-1.5 text-xs font-semibold text-ink-700 transition hover:bg-ink-200"
                        >
                          <Eye className="h-3.5 w-3.5" /> View
                        </Link>
                        {isSuper && (
                          <form action={deleteCandidate}>
                            <input type="hidden" name="id" value={s.id} />
                            <button
                              type="submit"
                              title="Delete application"
                              className="inline-flex items-center gap-1 rounded-lg bg-ink-100 px-2.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </button>
                          </form>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-ink-400">
        Approving or rejecting automatically emails the candidate their decision.
      </p>
    </div>
  );
}
