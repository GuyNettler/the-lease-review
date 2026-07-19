import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";
import { guides } from "@/lib/guides";

const base = "https://www.theleasereview.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/upload`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.95 },
    {
      url: `${base}/review-lease-before-signing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.98,
    },
    {
      url: `${base}/lease-review-checklist`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/rental-lease-agreement-review`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    { url: `${base}/students`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    {
      url: `${base}/signing-today`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    { url: `${base}/landlords`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/cities`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  return [
    ...fixed,
    ...guides.map(({ slug }) => ({
      url: `${base}/guides/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...cities.map(({ slug }) => ({
      url: `${base}/cities/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
