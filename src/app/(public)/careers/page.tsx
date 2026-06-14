import type { Metadata } from "next";
import {
  Award,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Smile,
  Sparkles,
  Users,
  VenusAndMars,
  Waves,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CareerForm } from "@/components/forms/CareerForm";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Taxzilla team. Submit your application and resume online.",
};

const culture = [
  {
    Icon: GraduationCap,
    title: "Learning by Doing",
    text: "Team members work directly on challenging tasks under the guidance of experienced colleagues.",
  },
  {
    Icon: Lightbulb,
    title: "Freedom to Express",
    text: "We encourage employees to voice suggestions and opinions in major decision-making processes.",
  },
  {
    Icon: Waves,
    title: "Comfortable Workspace",
    text: "Clean and comfortable working conditions support a healthy body, mind and productive ambience.",
  },
  {
    Icon: ShieldCheck,
    title: "Employee Safety",
    text: "Safety is a priority, with office practices and policies that protect employees at work.",
  },
  {
    Icon: Sparkles,
    title: "Personal Development",
    text: "Training programmes and workshops help employees stay updated with the latest trends.",
  },
  {
    Icon: VenusAndMars,
    title: "Gender Equality",
    text: "Gender is not a barrier to performing well and accomplishing strong results.",
  },
  {
    Icon: Smile,
    title: "Fun Environment",
    text: "We believe work becomes more interesting when an element of fun is added to it.",
  },
  {
    Icon: Award,
    title: "Recognitions and Appreciations",
    text: "We recognise brilliant talent and persistent effort that helps take Taxzilla higher.",
  },
  {
    Icon: HeartHandshake,
    title: "Work Life Balance",
    text: "Balanced work improves productivity and supports the mental well-being of each individual.",
  },
  {
    Icon: Users,
    title: "Passionate Team",
    text: "Our team members care deeply about the task at hand and put their best effort into the work.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumb="Careers"
        title="Do you want to be a part of our team?"
        image="/old-site/assets-images-main-slider-3.jpg"
        imageAlt="Taxzilla workplace"
        subtitle="Build your career at Taxzilla with hands-on learning, practical mentorship and work that supports real Indian businesses."
      />

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Thriving work culture"
                title="A workplace built for learning and ownership"
                intro="The original Taxzilla career page highlights a practical culture: learning by doing, open expression, safety, development, equality and recognition."
              />
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {culture.map(({ Icon, title, text }, i) => (
                <Reveal
                  key={title}
                  delay={(i % 2) * 90}
                  className="group rounded-lg border border-ink-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-lg"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-600 text-white transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-ink-950">{title}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-ink-600">{text}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-lg border border-ink-200 bg-slate-50 p-7 shadow-xl shadow-brand-900/5 sm:p-9">

              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white text-brand-600 ring-1 ring-brand-100">
                <Briefcase className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-ink-950">Apply now</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-ink-600">
                Upload your resume and photo. We review applications personally and keep your
                information confidential.
              </p>
              <div className="mt-7">
                <CareerForm />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
