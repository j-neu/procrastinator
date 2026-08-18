import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/types", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/types/arousal-procrastinator", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/types/avoidant-procrastinator", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/types/decisional-procrastinator", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/types/perfectionist-procrastinator", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/types/passive-procrastinator", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/types/active-procrastinator", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/types/emotion-regulation-procrastinator", changeFrequency: "monthly" as const, priority: 0.8 },
    {
      path: "/types/compare/active-vs-passive-procrastination",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/types/compare/arousal-vs-active-procrastination",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/types/compare/avoidant-vs-perfectionist-procrastination",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    { path: "/quiz", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/workbooks", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/research", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/blog/why-you-procrastinate", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/blog/best-procrastination-tests", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/impressum", changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
