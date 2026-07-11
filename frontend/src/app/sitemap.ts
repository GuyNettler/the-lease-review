import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";
import { guides } from "@/lib/guides";
const base = "https://www.theleasereview.com";
export default function sitemap(): MetadataRoute.Sitemap { const fixed = ["", "/upload", "/lease-review-checklist", "/students", "/signing-today", "/landlords", "/guides", "/faq", "/terms", "/privacy", "/contact"].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.7 })); return [...fixed, ...cities.map(({ slug }) => ({ url: `${base}/cities/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 })), ...guides.map(({ slug }) => ({ url: `${base}/guides/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 }))]; }
