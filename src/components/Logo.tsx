import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <Image
      src="/logo.png"
      alt="Taxzilla Logo"
      width={160}
      height={40}
      className={cn(
        "h-10 w-auto object-contain",
        invert && "brightness-0 invert",
        className
      )}
    />
  );
}
