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
    default: "The Lease Review | Understand Your Apartment Lease Before Signing",
    template: "%s | The Lease Review",
  },
  description:
    `Upload your U.S. apartment lease and get a clear, AI-powered review of important terms, fees, deposits, and questions to ask before you sign. ${PRICE_ONE_TIME}.`,
  keywords: [
    "apartment lease review",
    "review lease before signing",
    "rental agreement review",
    "security deposit clause",
    "lease checklist",
  ],
  openGraph: {
    title: "The Lease Review",
    description: `Review your apartment lease before you sign — plain English, $${PRICE_USD}.`,
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "The Lease Review",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "The Lease Review" }],
  },
  twitter: {
    card: "summary",
    title: "The Lease Review",
    description: "Review your apartment lease before you sign.",
    images: ["/icon.png"],
  },
  alternates: { canonical: "/" },
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
    url: `${siteUrl}/upload`,
    provider: { "@type": "Organization", name: "The Lease Review" },
    areaServed: { "@type": "Country", name: "United States" },
    offers: { "@type": "Offer", price: PRICE_USD, priceCurrency: "USD" },
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
