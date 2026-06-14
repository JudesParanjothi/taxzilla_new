import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services",
  description: "GST, income tax, company registrations, accounting, EXIM, HR, FSSAI and IP services for Indian businesses.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        title="Services built around your business"
        image="/hero-illustration.png"
        imageAlt="Tax and compliance documents illustration"
        imageFit="contain"
        subtitle="Pick what you need today — and lean on us for everything that comes next."
      />
      <Section className="bg-slate-50 relative overflow-hidden border-t border-ink-200">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 100}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
