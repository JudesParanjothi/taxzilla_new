import { getSession } from "@/lib/auth/session";
import { listSubmissions } from "@/lib/store";

export const dynamic = "force-dynamic";

/** Escape a value for CSV (RFC 4180): wrap in quotes, double internal quotes. */
function cell(value: unknown): string {
  const s = String(value ?? "");
  return `"${s.replace(/"/g, '""')}"`;
}

/** Authenticated CSV export of all candidates. */
export async function GET() {
  if (!(await getSession())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const rows = await listSubmissions();
  const header = ["ID", "Name", "Email", "Phone", "Status", "Message", "Applied"];
  const lines = [
    header.map(cell).join(","),
    ...rows.map((r) =>
      [r.ref, r.name, r.email, r.phone, r.status, r.message, r.createdAt].map(cell).join(","),
    ),
  ];
  // Prepend a UTF-8 BOM so Excel reads accents/unicode correctly.
  const csv = "﻿" + lines.join("\r\n");

  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="candidates-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
