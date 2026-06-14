import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";
import { services } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicEnv.siteUrl;
  const staticRoutes = ["", "/about", "/services", "/products", "/careers", "/contact", "/privacy", "/terms"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
