import Link from "next/link";
import { Mail, Phone, MapPin, Zap } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "./SocialIcons";
import { Container } from "./ui/Container";
import { Logo } from "./Logo";
import { NewsletterForm } from "./forms/NewsletterForm";
import { company, mainNav, services } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-ink-600 relative overflow-hidden border-t border-ink-200">
      <div className="absolute inset-0 bg-grid opacity-100" />

      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-brand-300 to-transparent" />

      <div className="border-b border-ink-200 relative z-10 bg-white">
        <Container className="flex flex-col items-center justify-between gap-6 py-16 text-center md:flex-row md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="hidden md:flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-50 border border-brand-100 shadow-sm">
              <Zap className="h-8 w-8 text-brand-500" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-ink-950 tracking-tight">Ready to start your business?</h3>
              <p className="mt-2 text-ink-600 text-lg font-medium">Talk to an expert today — your first consultation is on us.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="group glow-border inline-flex items-center gap-2 rounded-xl bg-brand-500 px-8 py-4 font-bold text-white shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all hover:bg-brand-600 hover:shadow-[0_15px_30px_rgba(16,185,129,0.3)] hover:-translate-y-1"
          >
            Get expert advice
          </Link>
        </Container>
      </div>

      <Container className="grid gap-16 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] relative z-10">
        <div>
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-600 font-medium">
            GST, Income Tax and tax filing for startups, MSMEs and individuals across India — plus
            registrations, accounting, EXIM, HR, FSSAI and trademarks.
          </p>
          <div className="mt-8 flex gap-3">
            {[
              { href: company.social.facebook, Icon: FacebookIcon, label: "Facebook" },
              { href: company.social.instagram, Icon: InstagramIcon, label: "Instagram" },
              { href: company.social.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
              { href: company.social.youtube, Icon: YoutubeIcon, label: "YouTube" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-ink-200 text-ink-500 transition-all hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 shadow-sm"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-ink-900">Company</h4>
          <ul className="mt-6 space-y-4 text-sm font-medium">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-600 transition hover:text-brand-600 hover:translate-x-1 inline-block">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-ink-900">Services</h4>
          <ul className="mt-6 space-y-4 text-sm font-medium">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-ink-600 transition hover:text-brand-600 hover:translate-x-1 inline-block">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-ink-900">Get in touch</h4>
          <ul className="mt-6 space-y-4 text-sm font-medium">
            <li className="flex gap-4 group">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-500 transition-colors group-hover:text-brand-600" />
              <span className="text-ink-600 leading-relaxed">
                {company.legalName}, {company.address.line1}, {company.address.line2},{" "}
                {company.address.city} - {company.address.pin}, {company.address.state}
              </span>
            </li>
            <li>
              <a href={company.phoneHref} className="flex items-center gap-4 text-ink-600 transition group hover:text-brand-700">
                <Phone className="h-5 w-5 shrink-0 text-brand-500 transition-colors group-hover:text-brand-600" />
                {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="flex items-center gap-4 text-ink-600 transition group hover:text-brand-700">
                <Mail className="h-5 w-5 shrink-0 text-brand-500 transition-colors group-hover:text-brand-600" />
                {company.email}
              </a>
            </li>
          </ul>

          <div className="mt-10 bg-white border border-ink-200 p-6 rounded-2xl shadow-sm">
            <p className="mb-4 text-sm font-bold text-ink-900">Subscribe to our newsletter</p>
            <NewsletterForm />
          </div>
        </div>
      </Container>

      <div className="border-t border-ink-200 relative z-10 bg-white">
        <Container className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-ink-500 font-medium sm:flex-row">
          <p>© 2021–{year} {company.name}. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="transition hover:text-ink-900">Privacy</Link>
            <Link href="/terms" className="transition hover:text-ink-900">Terms</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
