import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/lib/site";
import { serviceIcons } from "@/lib/icons";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service not found" };
  return { title: service.title, description: service.short };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.icon] ?? serviceIcons.building;
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumb={service.title}
        title={service.title}
        subtitle={service.short}
        image="/hero-illustration.png"
        imageAlt={`${service.title} compliance illustration`}
        imageFit="contain"
      />

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-50 border border-brand-100 text-brand-600 shadow-sm">
              <Icon className="h-8 w-8" />
            </div>
            <h2 className="mt-8 text-3xl font-bold text-ink-950 tracking-tight">What&apos;s included</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-600 font-medium">{service.description}</p>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {service.highlights.map((h) => (
                <li key={h} className="flex items-start gap-4 rounded-2xl border border-ink-200 bg-slate-50 p-5 transition hover:border-brand-200 hover:bg-white hover:shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-brand-500" />
                  <span className="font-semibold text-ink-900 leading-snug">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-3xl border border-ink-200 bg-slate-50 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-ink-950">Service coverage</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-ink-600">
                These are the core areas Taxzilla handles under {service.title}.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.details.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-semibold leading-snug text-ink-800">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <ButtonLink href={`/contact?topic=${encodeURIComponent(service.title)}`} size="lg" className="shadow-lg shadow-brand-500/20">
                Enquire about {service.title} <ArrowRight className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href="/services" variant="ghost" size="lg" className="border border-ink-200 bg-white hover:bg-ink-50 text-ink-900">
                <ArrowLeft className="h-5 w-5" /> All services
              </ButtonLink>
            </div>
          </div>

          {/* Sticky help card */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-ink-200 bg-slate-50 p-8 shadow-xl shadow-brand-900/5 relative overflow-hidden group">
              <div className="relative -mx-8 -mt-8 mb-7 aspect-16/10 overflow-hidden rounded-t-3xl border-b border-ink-200 bg-ink-100">
                <Image
                  src="/images/office_team.png"
                  alt="Taxzilla consultants at work"
                  fill
                  sizes="(min-width: 1024px) 32vw, 92vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-all duration-500 group-hover:bg-brand-200/50" />
              <h3 className="text-xl font-bold text-ink-950 relative">Not sure where to start?</h3>
              <p className="mt-3 text-ink-600 font-medium relative">
                Tell us about your business and we&apos;ll recommend exactly what you need — with a clear, fixed quote.
              </p>
              <ButtonLink href={`/contact?topic=${encodeURIComponent(service.title)}`} className="mt-6 w-full shadow-md shadow-brand-500/20 relative">Get a free consultation</ButtonLink>
            </div>
          </aside>
        </div>
      </Section>

      <Section className="bg-slate-50 border-t border-ink-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <h2 className="text-2xl font-bold text-ink-950 relative z-10">Related services</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3 relative z-10">
          {others.map((o) => {
            const OIcon = serviceIcons[o.icon] ?? serviceIcons.building;
            return (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group rounded-3xl border border-ink-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5 shadow-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-brand-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative aspect-16/10 overflow-hidden bg-ink-100">
                  <Image
                    src={o.image}
                    alt={o.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="relative p-7">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-brand-600 group-hover:text-white border border-brand-100 group-hover:border-transparent">
                    <OIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-bold text-ink-950">{o.title}</h3>
                  <p className="mt-2 text-sm font-medium text-ink-600">{o.short}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}
