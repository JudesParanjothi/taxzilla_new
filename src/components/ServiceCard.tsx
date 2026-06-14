import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { serviceIcons } from "@/lib/icons";
import type { Service } from "@/lib/site";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon] ?? serviceIcons.building;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-900/5"
    >
      {/* hover gradient glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-50/0 blur-2xl transition-all duration-500 group-hover:bg-brand-100/50" />

      <div className="relative aspect-16/10 overflow-hidden bg-ink-100">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-white to-transparent" />
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-brand-600 group-hover:text-white">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-lg font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
          {service.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{service.short}</p>
        <ul className="mt-5 space-y-2">
          {service.highlights.slice(0, 3).map((item) => (
            <li key={item} className="flex gap-2 text-xs font-medium leading-snug text-ink-600">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
              {item}
            </li>
          ))}
        </ul>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
          Learn more
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </Link>
  );
}
