import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getSubmission, readUpload } from "@/lib/store";

const MIME: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
};

/** Authenticated download of a candidate's résumé or photo. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ type: string; id: string }> },
) {
  // Never serve uploads without a valid admin session.
  if (!(await getSession())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { type, id } = await params;
  if (type !== "resume" && type !== "photo") {
    return new NextResponse("Not found", { status: 404 });
  }

  const candidate = await getSubmission(id);
  if (!candidate) return new NextResponse("Not found", { status: 404 });

  const filename = type === "resume" ? candidate.resumeFile : candidate.photoFile;
  if (!filename) return new NextResponse("Not found", { status: 404 });

  const buffer = await readUpload(filename);
  if (!buffer) return new NextResponse("Not found", { status: 404 });

  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const contentType = MIME[ext] ?? "application/octet-stream";
  const safeName = `${candidate.name.replace(/[^a-z0-9]+/gi, "_")}_${type}.${ext}`;

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": contentType,
      // Force download; never render uploaded files inline (XSS/SVG safety).
      "Content-Disposition": `attachment; filename="${safeName}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
