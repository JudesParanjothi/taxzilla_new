import { NextResponse } from "next/server";
import { generateCaptchaCode, setCaptchaCookie, captchaSvg } from "@/lib/security/captcha";

export const dynamic = "force-dynamic";

/** Issues a fresh captcha image and sets the matching signed cookie. */
export async function GET() {
  const code = generateCaptchaCode();
  await setCaptchaCookie(code);

  return new NextResponse(captchaSvg(code), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      Pragma: "no-cache",
    },
  });
}
