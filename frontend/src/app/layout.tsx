import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const siteUrl = "https://www.theleasereview.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "The Lease Review | Understand Your Lease Before Signing", template: "%s | The Lease Review" },
  description: "Upload your apartment lease and get a clear, AI-powered review of important terms, fees, and questions to ask before you sign.",
  openGraph: { title: "The Lease Review", description: "Review your apartment lease before you sign.", type: "website", locale: "en_US", url: siteUrl },
  alternates: { canonical: "/" },
  robots: "index,follow",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: "The Lease Review", url: siteUrl };
  const service = { "@context": "https://schema.org", "@type": "Service", name: "Apartment Lease Review", description: "AI-powered informational review of residential lease agreements.", url: `${siteUrl}/upload`, provider: { "@type": "Organization", name: "The Lease Review" }, areaServed: { "@type": "Country", name: "United States" }, offers: { "@type": "Offer", price: "19.99", priceCurrency: "USD" } };
  return (
    <html lang="en" dir="ltr">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      </head>
      <body className={`${dmSans.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}<Analytics />
      </body>
    </html>
  );
}
