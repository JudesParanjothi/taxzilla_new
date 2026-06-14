import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eye, Target, ShieldCheck, Handshake, Heart, BookOpen, LockKeyhole, Network, Award, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${company.legalName}, our history, vision, mission and values.`,
};

const values = [
  {
    title: "Professionalism",
    icon: ShieldCheck,
    text: "Our team of experts and experienced personnels have the right attitude, skills and knowledge along with ethical behaviour. We also follow proper work processes, process control and structured delivery procedures.",
  },
  {
    title: "Confidentiality",
    icon: LockKeyhole,
    text: "We respect the privacy of our clients and ensure that all the documents and information shared by the clients, is kept secret and safe.",
  },
  {
    title: "Reliability",
    icon: Handshake,
    text: "Building trust takes time and through our trustworthy, dependable, faithful and authentic approach, we ensure reliability to our clients.",
  },
  {
    title: "Collaboration",
    icon: Network,
    text: "Our experts and experienced professionals believe in working together as a team and networking to bring out the best in each other, as they strive to achieve their collective goals.",
  },
  {
    title: "Integrity",
    icon: Heart,
    text: "Our entire team is self-aware, accountable, responsible and truthful through consistent actions. We believe in doing the right thing irrespective of the circumstances.",
  },
  {
    title: "Excellence",
    icon: Award,
    text: "We are committed to being the best and doing the best, every single time.",
  },
  {
    title: "Continual Learning",
    icon: BookOpen,
    text: "We believe in regularly upgrading our skills and increasing our knowledge, to always serve our clients better.",
  },
  {
    title: "Teamwork",
    icon: Users,
    text: "We believe in teamwork, as it captures creative ideas through brainstorming and provides a sense of belonging and greater job satisfaction.",
  },
];

// Membership logos — add more entries here and the marquee picks them up automatically.
const memberships = [
  { img: "member_twen_1780748336004.png", alt: "TWEN" },
  { img: "member_rotary_1780748348060.png", alt: "Rotary" },
  { img: "member_chamber_1780748359723.png", alt: "Chamber of Commerce" },
  { img: "member_cii_1780748372318.png", alt: "CII" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About Us"
        title="About Us"
        subtitle={`${company.legalName} was founded in 2020 to help Indian startups, MSMEs and individuals start, run and grow compliant businesses.`}
      />

      {/* History & Vision */}
      <Section className="bg-white">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="OUR HISTORY"
              title="How it all started"
              intro="Taxzilla Accounts Solutions is founded in 2020 at Tuticorin, Tamil Nadu to provide affordable tax solutions, accounts solutions and business solutions to Indian start-ups, MSMEs and individuals."
            />
            <div className="mt-6 space-y-5 text-lg font-medium leading-relaxed text-ink-600">
              <p>
                Indian entrepreneurs face a lot of challenges in complying with Government guidelines, rules and regulations to start and run businesses smoothly.
              </p>
              <p>
                Most of them are unaware of all the specific details behind tax calculations and tax due calendars, which can help them to save taxes and safeguard them from tax fines and penalties.
              </p>
              <p>
                To assist these Indian entrepreneurs, Taxzilla Accounts Solutions came up with the primary idea of providing all solutions under one roof.
              </p>
            </div>
            <div className="mt-8">
              <ButtonLink href="/contact" size="lg" className="rounded-lg">
                Experts advice
              </ButtonLink>
            </div>
          </Reveal>

          <div className="grid gap-5">
            {[
              {
                Icon: Eye,
                title: "Our Vision",
                text: "To facilitate the ease of starting and doing business, and to enable on-time statutory filings and payments of all legally due taxes, which helps to improve the Indian economy and subsequently benefit the taxpayers.",
              },
              {
                Icon: Target,
                title: "Our Mission",
                text: "To establish as a most preferred accounting and business solutions partner for all Indian Start-ups, MSMEs and individuals.",
              },
            ].map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 90}>
                <div className="relative overflow-hidden rounded-2xl glass-panel p-8 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-brand-200 group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon className="h-24 w-24 text-brand-600" />
                  </div>
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 group-hover:bg-brand-600 group-hover:text-white transition-colors relative z-10">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-ink-950 relative z-10">{title}</h3>
                  <p className="mt-3 text-base font-medium leading-relaxed text-ink-600 relative z-10">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Core Values */}
      <Section className="border-y border-ink-200 bg-slate-50 py-16">
        <Reveal>
          <h2 className="text-center font-display text-2xl md:text-3xl font-extrabold text-brand-900 mb-16">
            Our Core Values - What We Belive In
          </h2>
        </Reveal>
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 max-w-7xl mx-auto px-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 2) * 70}>
              <div className="flex gap-5 items-start group">
                <div className="w-12 h-12 rounded-full bg-white border border-ink-200 flex items-center justify-center shrink-0 shadow-sm group-hover:border-brand-300 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors text-ink-400">
                  <v.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink-950 mb-1">{v.title}</h4>
                  <p className="text-sm font-medium leading-relaxed text-ink-600">{v.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Management & Team */}
      <section className="relative overflow-hidden border-y border-brand-100 bg-brand-50 py-24">
        {/* Decorative branded background */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Soft brand-colour glow blobs */}
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-24 h-104 w-104 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/10 blur-3xl" />
          {/* Subtle dot grid */}
          <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(var(--color-brand-300)_1px,transparent_1px)] bg-size-[22px_22px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 backdrop-blur-sm">
              <Users className="h-4 w-4" /> Our People
            </span>
            <h2 className="mt-5 font-display text-2xl font-extrabold uppercase text-brand-900 sm:text-3xl">
              Our Management and Team <span className="text-accent-600">– The Pillars of Taxzilla</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-ink-600 sm:text-base">
              We have an excellent team and a streamlined organizational structure which determines how information flows between levels within the company.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Certifications */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold text-brand-900">Our Certifications - They Define Us</h2>
            <p className="mt-4 text-sm text-ink-600 font-medium">We believe in superior professionalism, upholding industry standards and continued learning by obtaining all relevant certifications.</p>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { img: "cert_outsource_1780748282117.png", title: "Best outsourcing advisors" },
            { img: "cert_support_1780748297377.png", title: "Customer choice for support" },
            { img: "cert_consulting_1780748311586.png", title: "Best consulting company" },
            { img: "cert_tax_1780748324638.png", title: "Top tax advisors" },
          ].map((cert, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="bg-white border border-ink-100 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] h-full transition-transform hover:-translate-y-1">
                <Image src={`/images/${cert.img}`} alt={cert.title} width={128} height={128} className="mb-4 h-32 w-32 object-contain" />
                <h4 className="font-bold text-ink-900 text-sm">{cert.title}</h4>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Memberships */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold text-brand-900 uppercase">OUR MEMBERSHIPS - We Are Well Connected</h2>
            <p className="mt-4 text-sm text-ink-600 font-medium">Being a member in various organisations has helped us to network with experts from every field, to discuss with our peers and to stay updated with the current trends.</p>
          </Reveal>
        </div>
        <div className="group/marquee relative mx-auto max-w-6xl overflow-hidden">
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white to-transparent sm:w-24" />
          {/* Right-to-left scrolling track (duplicated for a seamless loop) */}
          <div className="flex w-max animate-marquee gap-6 py-2 group-hover/marquee:[animation-play-state:paused]">
            {[...memberships, ...memberships].map((member, i) => (
              <div
                key={i}
                className="group flex h-40 w-60 shrink-0 items-center justify-center rounded-xl border border-ink-100 bg-white p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] transition-transform hover:-translate-y-1"
              >
                <Image src={`/images/${member.img}`} alt={member.alt} width={240} height={160} className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Awards */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold text-brand-900 uppercase">OUR AWARDS AND RECOGNITIONS - Our Proud Moments</h2>
            <p className="mt-4 text-sm text-ink-600 font-medium">We are still young, but we strongly believe that our hard work and dedication will fetch us all due awards and recognition.</p>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            "Best consulting company",
            "Best consulting company",
            "Best consulting company",
            "Best consulting company"
          ].map((title, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="bg-white border border-ink-100 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] h-full transition-transform hover:-translate-y-1 relative group overflow-hidden">
                <div className="absolute top-2 right-2 bg-brand-100 text-brand-700 text-[10px] font-bold uppercase px-2 py-1 rounded-full z-10 shadow-sm opacity-80 group-hover:opacity-100 transition-opacity">Coming Soon</div>
                <Image src="/images/coming_soon_award_1780748116395.png" alt="Coming Soon Award" width={96} height={96} className="mb-4 h-24 w-24 object-contain mix-blend-multiply opacity-80 transition-opacity group-hover:opacity-100" />
                <h4 className="font-bold text-ink-900 text-sm relative z-10">{title}</h4>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Media */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold text-brand-900 uppercase">IN THE MEDIA - We Are Getting Spotlighted</h2>
            <p className="mt-4 text-sm text-ink-600 font-medium">When our excellent service is noticed and appreciated in the media, it gives us a sense of immense pride and happiness.</p>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            "Best consulting company",
            "Best consulting company",
            "Best outsourcing advisors",
            "Customer choice for support"
          ].map((title, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="bg-white border border-ink-100 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] h-full transition-transform hover:-translate-y-1 relative group overflow-hidden">
                <div className="absolute top-2 right-2 bg-brand-100 text-brand-700 text-[10px] font-bold uppercase px-2 py-1 rounded-full z-10 shadow-sm opacity-80 group-hover:opacity-100 transition-opacity">Coming Soon</div>
                <Image src="/images/coming_soon_award_1780748116395.png" alt="Coming Soon Award" width={96} height={96} className="mb-4 h-24 w-24 object-contain mix-blend-multiply opacity-80 transition-opacity group-hover:opacity-100" />
                <h4 className="font-bold text-ink-900 text-sm relative z-10">{title}</h4>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-16 bg-ink-950">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Reveal>
            <Link href="/contact" className="bg-white flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 px-8 py-8 h-full shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl rounded-2xl group">
              <Image src="/images/cta_partner_1780748383927.png" alt="Partner" width={64} height={64} className="h-16 w-16 shrink-0 object-contain drop-shadow-sm transition-transform group-hover:scale-110" />
              <div className="flex flex-col justify-center h-full">
                <h3 className="text-xl font-bold text-brand-900">Become a Partner With Taxzilla</h3>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={150}>
            <Link href="/careers" className="bg-white flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 px-8 py-8 h-full shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl rounded-2xl group">
              <Image src="/images/cta_career_1780748394527.png" alt="Careers" width={64} height={64} className="h-16 w-16 shrink-0 object-contain drop-shadow-sm transition-transform group-hover:scale-110" />
              <div className="flex flex-col justify-center h-full">
                <h3 className="text-xl font-bold text-brand-900">Career Opportunities in Taxzilla</h3>
              </div>
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
