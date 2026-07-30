import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { PRICE_ONE_TIME, PRICE_USD } from "@/lib/pricing";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const siteUrl = "https://www.theleasereview.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Apartment Lease Review Before You Sign | Free Sample · $9.99",
    template: "%s | The Lease Review",
  },
  description:
    `See a free sample lease review, or upload your apartment lease for a plain-English AI review of fees, deposits, renewals, and red flags before you sign. One-time ${PRICE_ONE_TIME}.`,
  keywords: [
    "lease review",
    "apartment lease review",
    "review lease before signing",
    "rental lease agreement review",
    "rental agreement review",
    "tenant lease checklist",
    "security deposit clause",
    "sample lease review",
  ],
  openGraph: {
    title: "Apartment Lease Review Before You Sign | The Lease Review",
    description: `Free sample report, or upload your lease for a plain-English review — $${PRICE_USD}.`,
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "The Lease Review",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "The Lease Review" }],
  },
  twitter: {
    card: "summary",
    title: "Apartment Lease Review Before You Sign | The Lease Review",
    description: "Free sample report, or upload your apartment lease before you sign.",
    images: ["/icon.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Lease Review",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    email: "hello@theleasereview.com",
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Lease Review",
    url: siteUrl,
    potentialAction: {
      "@type": "Action",
      name: "Review my lease",
      target: `${siteUrl}/upload`,
    },
  };
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Apartment Lease Review",
    description:
      "AI-powered informational review of residential lease agreements for U.S. renters.",
    image: `${siteUrl}/icon.png`,
    url: `${siteUrl}/upload`,
    provider: {
      "@type": "Organization",
      name: "The Lease Review",
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
    },
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: "Residential lease review",
    offers: {
      "@type": "Offer",
      price: PRICE_USD,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/upload`,
      category: "Digital service",
    },
  };

  return (
    <html lang="en" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
        />
      </head>
      <body className={`${dmSans.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
