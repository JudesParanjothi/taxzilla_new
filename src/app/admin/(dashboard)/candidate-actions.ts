"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import {
  deleteSubmission,
  deleteEnquiry,
  deleteSubscriber,
  updateSubmissionStatus,
  type SubmissionStatus,
} from "@/lib/store";
import { sendMail } from "@/lib/mailer";
import { company } from "@/lib/site";

/** Any signed-in admin (employee or super). */
async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

/** Super-admin only. */
async function requireSuper() {
  const session = await getSession();
  if (!session || session.role !== "super") throw new Error("Forbidden");
}

/** Delete a candidate — super-admins only. */
export async function deleteCandidate(formData: FormData): Promise<void> {
  await requireSuper();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteSubmission(id);
  revalidatePath("/admin/candidates");
}

const VALID_STATUS: SubmissionStatus[] = ["new", "reviewed", "shortlisted", "rejected"];

/** Approve / reject a candidate and email them the decision. */
export async function setCandidateStatus(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as SubmissionStatus;
  if (!id || !VALID_STATUS.includes(status)) return;

  const updated = await updateSubmissionStatus(id, status);

  // Notify the candidate on a decision (best-effort — never block the action).
  if (updated && (status === "shortlisted" || status === "rejected")) {
    const approved = status === "shortlisted";
    try {
      await sendMail({
        to: updated.email,
        replyTo: company.email,
        subject: approved
          ? `Good news about your ${company.name} application`
          : `Update on your ${company.name} application`,
        text: approved
          ? [
              `Hi ${updated.name},`,
              "",
              `Thank you for applying to ${company.legalName}. We're pleased to let you know your application has been shortlisted.`,
              "Our team will be in touch shortly with the next steps.",
              "",
              `Warm regards,`,
              `${company.name} Team`,
            ].join("\n")
          : [
              `Hi ${updated.name},`,
              "",
              `Thank you for your interest in ${company.legalName} and for taking the time to apply.`,
              "After careful consideration, we won't be moving forward with your application at this time.",
              "We genuinely wish you the very best in your search.",
              "",
              `Warm regards,`,
              `${company.name} Team`,
            ].join("\n"),
      });
    } catch {
      // ignore mail failure
    }
  }

  revalidatePath("/admin/candidates");
  revalidatePath(`/admin/candidates/${id}`);
}

export async function deleteEnquiryAction(formData: FormData): Promise<void> {
  await requireSuper();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteEnquiry(id);
  revalidatePath("/admin/enquiries");
}

export async function deleteSubscriberAction(formData: FormData): Promise<void> {
  await requireSuper();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteSubscriber(id);
  revalidatePath("/admin/subscribers");
}
