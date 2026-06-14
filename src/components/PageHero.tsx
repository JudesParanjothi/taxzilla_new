import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Container } from "./ui/Container";
import { cn } from "@/lib/cn";

export function PageHero({
  title,
  subtitle,
  crumb,
  align = "center",
  image,
  imageAlt,
  imageFit = "cover",
}: {
  title: string;
  subtitle?: string;
  crumb: string;
  align?: "center" | "left";
  image?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
}) {
  const hasImage = Boolean(image);

  return (
    <section className="relative overflow-hidden bg-slate-50 border-b border-ink-200">
      <div className="absolute inset-0 bg-grid opacity-60 mask-radial-faded-bottom" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-brand-300/50 to-transparent" />

      <Container
        className={cn(
          "relative z-10",
          hasImage
            ? "grid gap-10 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-32 lg:pb-24"
            : "flex flex-col pt-28 pb-20 sm:pt-36 sm:pb-28",
          !hasImage && (align === "center" ? "items-center text-center" : "items-start text-left"),
        )}
      >
        <div
          className={cn(
            "flex flex-col",
            hasImage
              ? "items-center text-center lg:items-start lg:text-left"
              : align === "center"
                ? "items-center text-center"
                : "items-start text-left",
          )}
        >
          <nav className="flex animate-fade-up items-center gap-1.5 rounded-full border border-ink-200 bg-white/70 px-4 py-1.5 text-sm font-semibold text-ink-500 shadow-sm backdrop-blur-md">
            <Link href="/" className="transition hover:text-brand-600">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-ink-400" />
            <span className="text-brand-600 font-bold">{crumb}</span>
          </nav>

          <h1
            className={cn(
              "mt-8 font-display text-4xl font-extrabold tracking-tight text-ink-950 sm:text-5xl md:text-6xl leading-[1.1]",
              hasImage ? "max-w-3xl" : align === "center" && "max-w-4xl",
            )}
            style={{ animation: "fade-up 0.8s 0.1s both" }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={cn(
                "mt-6 text-lg sm:text-xl font-medium text-ink-600 leading-relaxed",
                hasImage ? "max-w-2xl" : align === "center" && "max-w-2xl",
              )}
              style={{ animation: "fade-up 0.8s 0.2s both" }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {image && (
          <div
            className="relative mx-auto w-full max-w-xl lg:mx-0"
            style={{ animation: "fade-up 0.8s 0.25s both" }}
          >
            <div className="absolute -inset-3 rounded-[2rem] border border-white/80 bg-white/60 shadow-2xl shadow-brand-900/10" />
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-white bg-white shadow-xl">
              <Image
                src={image}
                alt={imageAlt ?? `${crumb} visual`}
                fill
                priority
                sizes="(min-width: 1024px) 44vw, (min-width: 640px) 70vw, 92vw"
                className={cn(imageFit === "contain" ? "object-contain p-6" : "object-cover")}
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
