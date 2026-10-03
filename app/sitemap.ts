import type { MetadataRoute } from "next";
import { clinic } from "@/lib/clinic";
import { treatments, articles } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!clinic.websiteUrl) return [];
  return [
    "",
    "/about",
    "/services",
    "/blog",
    "/contact",
    "/book-consultation",
    "/privacy-policy",
    ...treatments.map((t) => `/services/${t.slug}`),
    ...articles.map((a) => `/blog/${a.slug}`),
  ].map((path) => ({
    url: `${clinic.websiteUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
