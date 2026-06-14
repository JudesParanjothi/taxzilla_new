/**
 * Single source of truth for site-wide content: company info, navigation and
 * the service catalogue. Pure data — safe to import on client or server.
 */

export const company = {
  name: "Taxzilla",
  legalName: "Taxzilla Accounts Solutions",
  tagline: "Accounts, registrations and tax filing under one roof.",
  description:
    "GST, Income Tax and other tax filing services for startups, MSMEs and individuals in India, plus firm and company registrations, accounting and bookkeeping, business consulting, EXIM, HR, FSSAI, trademarks and other business-related services.",
  email: "info@taxzilla.in",
  phone: "+91 82 7040 7040",
  phoneHref: "tel:+918270407040",
  whatsapp: "https://wa.me/918270407040",
  address: {
    line1: "No. 16/3A, Phoenix Plaza",
    line2: "Chidambaranagar Main Road",
    city: "Tuticorin",
    state: "Tamil Nadu",
    pin: "628 008",
    country: "India",
  },
  social: {
    facebook: "https://www.facebook.com/taxzilla.in",
    instagram: "https://www.instagram.com/taxzilla.in/",
    linkedin: "https://www.linkedin.com/company/taxzilla-in",
    youtube: "https://www.youtube.com/channel/UCtcCVA7dN3-uvcvjXp1txdw/about",
  },
} as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: string; // lucide-style key used by our inline icon set
  image: string;
  highlights: string[];
  details: string[];
  description: string;
};

export const services: Service[] = [
  {
    slug: "company-registrations",
    title: "Firm & Company Registrations",
    short: "Incorporate the right entity — fast, compliant, hassle-free.",
    icon: "building",
    image: "/images/1.png",
    highlights: ["Proprietorship, Partnership, OPC and LLP", "Private, Public and Section 8 companies", "MSME, NGO, Trust, Society and trade licences"],
    details: [
      "Proprietorship",
      "Partnership",
      "One Person Company",
      "Limited Liability Partnership",
      "Private Limited Company",
      "Public Limited Company",
      "Startup and MSME/Udyam registration",
      "NGO, Trust and Society registration",
      "Shops & Establishment Act",
      "Municipal or Corporation registrations",
      "Trade License",
      "MCA / ROC works",
      "Registered office change",
      "Add or remove directors",
      "Increase authorised capital",
      "Share transfer",
      "MOA amendment",
      "Company or LLP winding up",
      "Indian subsidiary for foreign owners",
      "Nidhi, Producer and Section 8 companies",
      "USA company registration",
      "GEM / NSIC registration",
    ],
    description:
      "Choose and register the structure that fits your business — Private Limited, LLP, OPC, Partnership or Proprietorship — with end-to-end documentation, DSC, DIN and post-incorporation compliance handled for you.",
  },
  {
    slug: "gst",
    title: "GST (Goods & Services Tax)",
    short: "Registration, returns and advisory without the headaches.",
    icon: "receipt",
    image: "/images/2.png",
    highlights: ["GST registration and invoicing", "Annual returns, LUT and refunds", "Reconciliation, e-way bills and input tax credit"],
    details: [
      "GST registration",
      "GST invoicing",
      "GST annual return",
      "GST LUT filing",
      "Temporary GST registration",
      "GST registration for foreigners",
      "GST consulting",
      "GST refunds",
      "GST return filing",
      "GST reconciliation",
      "E-way bill",
      "Input tax credit",
      "GST surrender or cancellation",
      "GST composition scheme",
      "Composition scheme to regular scheme",
    ],
    description:
      "From new GST registration to monthly GSTR filing, annual returns, input-tax reconciliation and responding to departmental notices — we keep you compliant and penalty-free.",
  },
  {
    slug: "income-tax",
    title: "Income Tax",
    short: "Smart filing and planning for individuals and businesses.",
    icon: "calculator",
    image: "/images/3.png",
    highlights: ["ITR filing for individuals and entities", "TDS, advance tax and professional tax", "Tax audit, notices and CA certifications"],
    details: [
      "Proprietorship income tax filing",
      "Partnership return filing",
      "Private Limited Company return filing",
      "LLP annual filing and income tax return",
      "Foreign subsidiary compliance",
      "ITR-1 to ITR-7 return filing",
      "Income tax notice support",
      "TDS return filing",
      "Form 16 issuance",
      "Salaried, retired, business and professional person filing",
      "TDS / TCS",
      "Professional tax",
      "Advance tax",
      "CA certification for ITR",
      "CA certification for balance sheet",
      "CMA report",
      "Tax audit",
    ],
    description:
      "Accurate ITR filing, proactive tax planning, TDS management and representation during assessments — minimising liability while keeping you fully compliant.",
  },
  {
    slug: "accounting-bookkeeping",
    title: "Accounting & Book Keeping",
    short: "Clean books, real-time numbers, audit-ready always.",
    icon: "ledger",
    image: "/images/7.png",
    highlights: ["P&L, balance sheet and invoices", "Bank, GST and IT reconciliation", "Budgeting, receivables and stock management"],
    details: [
      "P&L",
      "Balance Sheet",
      "Invoice",
      "Bank reconciliation",
      "GST and IT reconciliation",
      "Accounting heads and vouchers",
      "Budgeting",
      "Receivables and payables",
      "Inventory / stock management",
      "Tally integration",
    ],
    description:
      "Outsource your bookkeeping to a dedicated team: day-to-day accounting, monthly financial statements, payroll processing and MIS reports that keep you in control.",
  },
  {
    slug: "business-consulting",
    title: "Business Consulting Services",
    short: "Strategy, structure and compliance advisory that scales.",
    icon: "compass",
    image: "/images/8.png",
    highlights: ["Market and problem diagnosis", "Organisation setup and workflow", "Business formation, scale-up and courses"],
    details: [
      "Providing expertise in a specific market",
      "Identifying organisational problems",
      "Reviving organisations",
      "Organisation setup",
      "Time management",
      "Workflow and administration steps",
      "Business model arrangement",
      "Operating culture",
      "Business setup",
      "Business formation",
      "Business scale-up",
      "Business courses",
    ],
    description:
      "Practical, numbers-led consulting for structuring, compliance, costing and funding readiness — so you can make confident decisions as you grow.",
  },
  {
    slug: "export-import",
    title: "Export & Import Management",
    short: "IEC, documentation and EXIM compliance, simplified.",
    icon: "globe",
    image: "/images/9.png",
    highlights: ["IEC, DGFT and customs consultancy", "MEIS, EPCG and RCMC support", "Import/export shipment document preparation"],
    details: [
      "Import Export Code",
      "DGFT consultancy",
      "Indian customs consultancy",
      "MEIS",
      "EPCG",
      "IEC validation service",
      "AD code registration",
      "Spices Board registration",
      "APEDA registration",
      "RCMC",
      "Import authorisation licence online",
      "Import and export shipment document preparation",
    ],
    description:
      "Get your Import Export Code, manage shipping and customs documentation, and stay compliant with DGFT and FEMA regulations for smooth cross-border trade.",
  },
  {
    slug: "hr-management",
    title: "HR Management",
    short: "Payroll, PF/ESI and people compliance handled.",
    icon: "users",
    image: "/images/10.png",
    highlights: ["Payroll compliance", "PF registration and return filing", "ESI registration"],
    details: [
      "Payroll compliance",
      "Payroll",
      "PF registration",
      "PF return filing",
      "ESI registration",
    ],
    description:
      "End-to-end HR and payroll support — salary processing, PF/ESI/PT registration and filing, and statutory labour compliance so your team is always covered.",
  },
  {
    slug: "fssai",
    title: "FSSAI",
    short: "Food licensing and renewals, done by experts.",
    icon: "shield",
    image: "/images/11.png",
    highlights: ["FSSAI registration and state licences", "Central licences, renewal and modification", "Surrender, transfer and return filings"],
    details: [
      "FSSAI registration",
      "FSSAI state licences",
      "FSSAI central licences",
      "FSSAI licence renewal",
      "FSSAI licence modifications",
      "FSSAI licence surrender or transfer",
      "FSSAI return filings",
    ],
    description:
      "FSSAI registration and licensing for food businesses of every size — basic, state and central licences, renewals and annual return filing.",
  },
  {
    slug: "intellectual-property",
    title: "Intellectual Property",
    short: "Protect your brand — trademarks, copyrights & more.",
    icon: "badge",
    image: "/images/12.png",
    highlights: ["Trademark search, filing and renewal", "Objection and opposition response", "Copyright, design, patent and ISO support"],
    details: [
      "Trademark registration",
      "Trademark objection",
      "Trademark opposition",
      "Trademark renewal",
      "Copyright registration",
      "Design registration",
      "Provisional patent",
      "Patent registration",
      "Trademark class search",
      "ISO certification",
    ],
    description:
      "Search, file and protect your trademarks, copyrights and designs, with full support through examination, objections and oppositions.",
  },
];

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Our Products", href: "/products" },
  { label: "Jobs", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
] as const;

export type Product = {
  label: string;
  description: string;
  href: string | null;
  external?: boolean;
  comingSoon?: boolean;
};

export const products: Product[] = [
  {
    label: "Agreement Generator",
    description: "Create legally-sound business agreements in minutes.",
    href: "https://products.taxzilla.in/",
    external: true,
  },
  {
    label: "Coming Soon",
    description: "More smart tools for your business are on the way.",
    href: null,
    comingSoon: true,
  },
];

/** Number of services shown directly in the header dropdown (rest → "View all"). */
export const FEATURED_SERVICE_COUNT = 4;

export const serviceOptions = [
  ...services.map((s) => s.title),
  "Franchise Enquiry",
  "Partner With Us",
  "Others",
] as const;
