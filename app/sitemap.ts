import type { MetadataRoute } from "next";

import { authorityArticles } from "@/content/authority";
import { getProjectSlugs } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date("2026-08-03");
  const staticRoutes = ["/", "/about", "/contact", "/insights", "/work"];

  return [
    ...staticRoutes.map((path) => ({
      changeFrequency: "monthly" as const,
      lastModified: updatedAt,
      priority: path === "/" ? 1 : 0.8,
      url: new URL(path, siteUrl).toString(),
    })),
    ...getProjectSlugs().map((slug) => ({
      changeFrequency: "monthly" as const,
      lastModified: updatedAt,
      priority: 0.9,
      url: new URL(`/work/${slug}`, siteUrl).toString(),
    })),
    ...authorityArticles.map((article) => ({
      changeFrequency: "yearly" as const,
      lastModified: new Date(article.publishedAt),
      priority: 0.7,
      url: new URL(`/insights/${article.slug}`, siteUrl).toString(),
    })),
  ];
}
