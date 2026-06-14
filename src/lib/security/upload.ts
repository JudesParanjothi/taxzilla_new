import "server-only";

/**
 * Validate an uploaded file by sniffing its magic bytes — the declared MIME
 * type and filename extension from the browser are never trusted on their own.
 */

export type UploadKind = "resume" | "photo";

const RESUME_EXT = ["pdf", "doc", "docx"];
const PHOTO_EXT = ["jpg", "jpeg", "png"];

function startsWith(buf: Buffer, sig: number[], offset = 0): boolean {
  if (buf.length < offset + sig.length) return false;
  return sig.every((b, i) => buf[offset + i] === b);
}

function detect(buf: Buffer): string | null {
  // PDF: %PDF
  if (startsWith(buf, [0x25, 0x50, 0x44, 0x46])) return "pdf";
  // JPEG: FF D8 FF
  if (startsWith(buf, [0xff, 0xd8, 0xff])) return "jpg";
  // PNG: 89 50 4E 47
  if (startsWith(buf, [0x89, 0x50, 0x4e, 0x47])) return "png";
  // DOC (OLE2 compound): D0 CF 11 E0
  if (startsWith(buf, [0xd0, 0xcf, 0x11, 0xe0])) return "doc";
  // DOCX (ZIP/OOXML): PK\x03\x04
  if (startsWith(buf, [0x50, 0x4b, 0x03, 0x04])) return "docx";
  return null;
}

export type UploadCheck =
  | { ok: true; ext: string; buffer: Buffer }
  | { ok: false; error: string };

export async function validateUpload(
  file: File,
  kind: UploadKind,
  maxBytes: number,
): Promise<UploadCheck> {
  const allowed = kind === "resume" ? RESUME_EXT : PHOTO_EXT;

  if (!file || file.size === 0) return { ok: false, error: "File is required." };
  if (file.size > maxBytes) {
    return { ok: false, error: `File too large (max ${Math.round(maxBytes / 1024 / 1024)} MB).` };
  }

  const declaredExt = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!allowed.includes(declaredExt)) {
    return { ok: false, error: `Unsupported file type. Allowed: ${allowed.join(", ")}.` };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const detected = detect(buffer);

  if (!detected) return { ok: false, error: "File contents could not be verified." };

  // docx and (modern) Office files share the ZIP signature; accept docx when zip-detected.
  const normalisedDetected = detected === "docx" && declaredExt === "docx" ? "docx" : detected;
  const detectedFamilyOk =
    allowed.includes(normalisedDetected) ||
    (normalisedDetected === "jpg" && declaredExt === "jpeg");

  if (!detectedFamilyOk) {
    return { ok: false, error: "File contents do not match its extension." };
  }

  return { ok: true, ext: declaredExt === "jpeg" ? "jpg" : declaredExt, buffer };
}
