import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { company } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <PageHero
        crumb="Terms"
        title="Terms of Service"
        image="/old-site/assets-images-background-bg-6.jpg"
        imageAlt="Compliance documents"
      />
      <Section className="bg-white">
        <div className="mx-auto max-w-3xl text-ink-700">
          <p className="text-ink-600">
            By using the {company.name} website and services, you agree to the following terms.
          </p>
          <h2 className="mt-8 text-xl font-bold text-ink-900">Use of our services</h2>
          <p className="mt-2 text-ink-600">
            Information on this site is provided for general guidance and does not constitute formal
            professional advice until a service engagement is agreed in writing.
          </p>
          <h2 className="mt-6 text-xl font-bold text-ink-900">Your responsibilities</h2>
          <p className="mt-2 text-ink-600">
            You agree to provide accurate information and the documents necessary for us to deliver
            the services you request.
          </p>
          <h2 className="mt-6 text-xl font-bold text-ink-900">Contact</h2>
          <p className="mt-2 text-ink-600">
            Questions about these terms? Email{" "}
            <a href={`mailto:${company.email}`} className="text-brand-600 underline">{company.email}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
