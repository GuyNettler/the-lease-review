import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PRICE_LABEL, PRICE_LINE, PRICE_ONE_TIME, PRICE_USD } from "@/lib/pricing";

const path = "/rental-lease-agreement-review";
const siteUrl = "https://www.theleasereview.com";

export const metadata: Metadata = {
  title: "Online Rental Lease Review Service | $9.99",
  description: `Upload your U.S. apartment lease PDF for a plain-English structured rental lease agreement review (${PRICE_LINE}). Free sample report available. Prefer a DIY checklist first? See our free step-by-step guide.`,
  keywords: [
    "rental lease agreement review",
    "lease agreement review online",
    "apartment lease agreement review",
    "online lease review service",
    "tenant lease review",
    "residential lease review",
    "rental contract review",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: "Online Rental Lease Review Service | The Lease Review",
    description: `Upload your U.S. rental lease agreement for a structured plain-English review — ${PRICE_ONE_TIME}.`,
    url: path,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Rental Lease Review Service",
    description: `Plain-English rental lease agreement review for ${PRICE_LINE}.`,
  },
  robots: { index: true, follow: true },
};

const points = [
  {
    title: "What a rental lease agreement review covers",
    body: "Fees beyond rent, security deposit rules, renewal and notice windows, early termination, repairs, entry rights, and one-sided or vague clauses.",
  },
  {
    title: "Why renters use an online lease review",
    body: "Apartment agreements are long. A structured pass helps you raise questions with the landlord, broker, or attorney before you are locked in.",
  },
  {
    title: "What you upload",
    body: "The full U.S. residential lease PDF or Word file you were asked to sign — including addenda when possible.",
  },
];

const faqs = [
  {
    q: "What is a rental lease agreement review?",
    a: "It is a structured, plain-English look at the residential lease you plan to sign — highlighting fees, deposits, renewals, and clauses that often surprise renters. It is informational, not legal advice.",
  },
  {
    q: "Is this the same as hiring a lawyer?",
    a: "No. The Lease Review uses AI to summarize and flag common areas of concern. For legal advice about your state or situation, consult a qualified attorney.",
  },
  {
    q: `How much does a rental lease agreement review cost?`,
    a: `${PRICE_LINE} paid once through PayPal — no subscription.`,
  },
  {
    q: "How fast do I get results?",
    a: "Most reviews finish within a few minutes after payment, on screen and by email.",
  },
  {
    q: "Can I use this for any U.S. state?",
    a: "The review helps you understand common lease terms nationwide. Local rules vary — use the report to prepare questions for a local attorney when needed.",
  },
];

export default function RentalLeaseAgreementReviewPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  // Service (not Product): avoids Merchant listing / Product-snippet requirements
  // that do not apply to this digital informational offer.
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Rental Lease Agreement Review",
    description:
      "Online plain-English informational review of a U.S. residential rental lease agreement.",
    image: `${siteUrl}/icon.png`,
    url: `${siteUrl}${path}`,
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
    <main className="min-h-screen bg-white text-left">
      <SiteHeader />

      <section className="bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
            The Lease Review
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Online rental lease review service
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700">
            Upload your U.S. apartment or house rental agreement and get a clear, structured review
            of the terms that affect cost and flexibility — before you sign. {PRICE_ONE_TIME}.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/upload"
              className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-white hover:bg-blue-700"
            >
              Upload my lease — {PRICE_LABEL}
            </Link>
            <Link
              href="/guides/how-to-review-a-lease-agreement"
              className="font-semibold text-primary hover:underline"
            >
              Free how-to guide →
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            PDF or Word · One-time PayPal payment · Not legal advice
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="text-3xl font-extrabold text-slate-900">
          What you get from a lease agreement review
        </h2>
        <div className="mt-8 space-y-6">
          {points.map((p) => (
            <article key={p.title}>
              <h3 className="text-xl font-bold text-primary">{p.title}</h3>
              <p className="mt-2 text-slate-700">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary px-6 py-14 text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold">How it works</h2>
          <ol className="mt-6 list-decimal space-y-3 pl-5 text-blue-50">
            <li>Upload your rental lease agreement (PDF, DOC, or DOCX).</li>
            <li>Pay {PRICE_LABEL} once via PayPal.</li>
            <li>Read your plain-English report on screen and by email.</li>
          </ol>
          <Link
            href="/upload"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-lg font-bold text-primary hover:bg-blue-50"
          >
            Start rental lease review — {PRICE_LABEL}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="text-3xl font-extrabold text-slate-900">Frequently asked questions</h2>
        <div className="mt-8 space-y-6">
          {faqs.map(({ q, a }) => (
            <article key={q}>
              <h3 className="text-lg font-bold text-primary">{q}</h3>
              <p className="mt-2 leading-relaxed text-slate-700">{a}</p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-sm text-slate-500">
          Related:{" "}
          <Link href="/review-lease-before-signing" className="font-semibold text-primary hover:underline">
            before you sign
          </Link>
          {" · "}
          <Link href="/lease-review-checklist" className="font-semibold text-primary hover:underline">
            free checklist
          </Link>
          {" · "}
          <Link
            href="/guides/how-to-review-a-lease-agreement"
            className="font-semibold text-primary hover:underline"
          >
            free step-by-step guide
          </Link>
          {" · "}
          <Link href="/cities" className="font-semibold text-primary hover:underline">
            city lease pages
          </Link>
        </p>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <SiteFooter />
    </main>
  );
}
