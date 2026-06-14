import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Products",
  description: "Smart self-serve tools from Taxzilla, starting with the Agreement Generator.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumb="Products"
        title="Smart tools that do the heavy lifting"
        image="/old-site/assets-images-resource-mockup-1.png"
        imageAlt="Taxzilla product mockup"
        imageFit="contain"
        subtitle="Self-serve products that put expert-grade output at your fingertips — no appointment needed."
      />

      <Section className="bg-ink-50">
        <div className="grid gap-6 sm:grid-cols-2">
          {products.map((p, i) => (
            <Reveal key={p.label} delay={(i % 2) * 100}>
              {p.href ? (
                <a
                  href={p.href}
                  target={p.external ? "_blank" : undefined}
                  rel={p.external ? "noopener noreferrer" : undefined}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-600/10"
                >
                  <div className="relative -mx-7 -mt-7 mb-6 aspect-video overflow-hidden rounded-t-2xl bg-ink-100">
                    <Image
                      src="/old-site/assets-images-resource-mockup-1.png"
                      alt={p.label}
                      fill
                      sizes="(min-width: 640px) 45vw, 92vw"
                      className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-brand-600 group-hover:text-white">
                      <Sparkles className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700">
                      Live
                    </span>
                  </div>
                  <h2 className="mt-5 flex items-center gap-1.5 text-xl font-semibold text-ink-900 group-hover:text-brand-700">
                    {p.label}
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </h2>
                  <p className="mt-2 flex-1 text-ink-600">{p.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                    Open product →
                  </span>
                </a>
              ) : (
                <div className="flex h-full flex-col rounded-2xl border border-dashed border-ink-300 bg-white/60 p-7">
                  <div className="relative -mx-7 -mt-7 mb-6 aspect-video overflow-hidden rounded-t-2xl bg-white">
                    <Image
                      src="/hero-illustration.png"
                      alt={p.label}
                      fill
                      sizes="(min-width: 640px) 45vw, 92vw"
                      className="object-cover opacity-80"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ink-100 text-ink-400">
                      <Clock className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-gold-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gold-600">
                      Coming soon
                    </span>
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-ink-700">{p.label}</h2>
                  <p className="mt-2 flex-1 text-ink-500">{p.description}</p>
                  <span className="mt-5 text-sm font-medium text-ink-400">In the works</span>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
