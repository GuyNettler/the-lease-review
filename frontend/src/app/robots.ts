import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/review", "/upload/done"],
    },
    sitemap: "https://www.theleasereview.com/sitemap.xml",
    host: "https://www.theleasereview.com",
  };
}
