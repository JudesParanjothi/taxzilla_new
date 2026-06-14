import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { company } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumb="Privacy"
        title="Privacy Policy"
        image="/hero-illustration.png"
        imageAlt="Secure tax documents"
        imageFit="contain"
      />
      <Section className="bg-white">
        <div className="prose mx-auto max-w-3xl text-ink-700">
          <p className="text-ink-600">
            {company.legalName} respects your privacy. This page explains, in plain terms, how we
            handle the information you share with us.
          </p>
          <h2 className="mt-8 text-xl font-bold text-ink-900">Information we collect</h2>
          <p className="mt-2 text-ink-600">
            We only collect the details you voluntarily provide through our contact, newsletter and
            careers forms — such as your name, phone number, email and any documents you upload.
          </p>
          <h2 className="mt-6 text-xl font-bold text-ink-900">How we use it</h2>
          <p className="mt-2 text-ink-600">
            Your information is used solely to respond to your enquiry, deliver our services, or
            consider your job application. We never sell your data to third parties.
          </p>
          <h2 className="mt-6 text-xl font-bold text-ink-900">Contact</h2>
          <p className="mt-2 text-ink-600">
            For any privacy questions, email us at{" "}
            <a href={`mailto:${company.email}`} className="text-brand-600 underline">{company.email}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
