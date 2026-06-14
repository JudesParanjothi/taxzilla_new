import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${company.legalName} for GST, income tax, registrations and more.`,
};

const cards = [
  {
    Icon: MapPin,
    title: "Visit us",
    lines: [
      company.legalName,
      `${company.address.line1}, ${company.address.line2}`,
      `${company.address.city} - ${company.address.pin}, ${company.address.state}`,
    ],
  },
  { Icon: Phone, title: "Call us", lines: [company.phone], href: company.phoneHref },
  { Icon: Mail, title: "Email us", lines: [company.email], href: `mailto:${company.email}` },
  { Icon: Clock, title: "Working hours", lines: ["Mon – Sat", "10:00 AM – 7:00 PM IST"] },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact Us"
        title="Let's talk about your business"
        image="/images/about_banner.png"
        imageAlt="Taxzilla consultation room"
        subtitle="Send us a message and a specialist will get back to you — usually within one business day."
      />

      <Section className="bg-slate-50 relative overflow-hidden border-t border-ink-200">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="grid gap-10 lg:grid-cols-2 relative z-10">
          {/* Form */}
          <div className="order-2 rounded-3xl border border-ink-200 bg-white p-7 sm:p-9 lg:order-1 shadow-xl shadow-brand-900/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <h2 className="text-2xl font-bold text-ink-950 relative">How can we help you?</h2>
            <p className="mt-2 text-ink-600 font-medium relative">Fill in the form and we&apos;ll be in touch shortly.</p>
            <div className="mt-7 relative">
              <ContactForm />
            </div>
          </div>

          {/* Info */}
          <div className="order-1 lg:order-2">


            <div className="grid gap-5 sm:grid-cols-2">
              {cards.map(({ Icon, title, lines, href }, i) => (
                <Reveal
                  key={title}
                  delay={(i % 2) * 90}
                  className="group rounded-3xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5 shadow-sm"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-brand-600 group-hover:text-white border border-brand-100 group-hover:border-transparent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-bold text-ink-950">{title}</h3>
                  <div className="mt-2 space-y-0.5 text-sm font-medium text-ink-600">
                    {lines.map((l) =>
                      href ? (
                        <a key={l} href={href} className="block transition hover:text-brand-600">{l}</a>
                      ) : (
                        <p key={l}>{l}</p>
                      ),
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-ink-200">
              <iframe
                title="Taxzilla location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.879335769633!2d78.131250314785!3d8.797405593681704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe646dc92cd9b4d75!2sTaxzilla%20Accounts%20Solutions!5e0!3m2!1sen!2sin!4v1618212508146!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
