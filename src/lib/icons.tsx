import {
  Building2,
  ReceiptText,
  Calculator,
  BookOpenCheck,
  Compass,
  Globe2,
  Users,
  ShieldCheck,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

/** Maps the `icon` key on a Service to a concrete icon component. */
export const serviceIcons: Record<string, LucideIcon> = {
  building: Building2,
  receipt: ReceiptText,
  calculator: Calculator,
  ledger: BookOpenCheck,
  compass: Compass,
  globe: Globe2,
  users: Users,
  shield: ShieldCheck,
  badge: BadgeCheck,
};
