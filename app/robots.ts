import type { MetadataRoute } from "next";
import { clinic } from "@/lib/clinic";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(clinic.websiteUrl
        ? { allow: "/", disallow: "/api/" }
        : { disallow: "/" }),
    },
    ...(clinic.websiteUrl
      ? { sitemap: `${clinic.websiteUrl}/sitemap.xml` }
      : {}),
  };
}
