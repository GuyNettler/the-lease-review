import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/review", "/upload/done"];
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      // Allow major AI retrieval crawlers (citations / answers traffic)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: "https://www.theleasereview.com/sitemap.xml",
    host: "https://www.theleasereview.com",
  };
}
