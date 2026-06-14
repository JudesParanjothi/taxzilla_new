import { cn } from "@/lib/cn";
import { Container } from "./Container";
import type { CSSProperties } from "react";

export function Section({
  id,
  className,
  containerClassName,
  style,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)} style={style}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-block text-sm font-semibold uppercase tracking-widest",
            invert ? "text-brand-300" : "text-brand-600",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl",
          invert ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-4 text-lg leading-relaxed", invert ? "text-ink-300" : "text-ink-600")}>
          {intro}
        </p>
      )}
    </div>
  );
}
