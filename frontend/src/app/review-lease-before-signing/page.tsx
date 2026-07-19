import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PRICE_LABEL, PRICE_LINE, PRICE_ONE_TIME, PRICE_USD } from "@/lib/pricing";

const path = "/review-lease-before-signing";
const siteUrl = "https://www.theleasereview.com";

export const metadata: Metadata = {
  title: "Review Your Apartment Lease Before Signing",
  description: `Get a plain-English apartment lease review before you sign. Spot fees, deposits, renewals, and early-exit terms for ${PRICE_LINE} — upload PDF or Word, results in minutes.`,
  keywords: [
    "review lease before signing",
    "apartment lease review",
    "rental agreement review online",
    "lease review before signing",
    "understand apartment lease",
    "security deposit lease review",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: "Review Your Apartment Lease Before Signing | The Lease Review",
    description: `Upload your U.S. residential lease and get a structured plain-English review for ${PRICE_ONE_TIME}.`,
    url: path,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Review Your Apartment Lease Before Signing",
    description: `Plain-English lease review for ${PRICE_LINE}. Upload, pay once, get results in minutes.`,
  },
  robots: { index: true, follow: true },
};

const checks = [
  {
    title: "Fees beyond base rent",
    body: "Amenity, trash, tech, parking, pet, and admin fees that change what you actually pay each month.",
  },
  {
    title: "Deposits and deductions",
    body: "Security deposit caps, move-out standards, and wording that makes deductions easier for the landlord.",
  },
  {
    title: "Renewals and notice windows",
    body: "Automatic renewal, notice deadlines, and rent increase timing that are easy to miss in fine print.",
  },
  {
    title: "Early exit and break fees",
    body: "Termination, reletting, and buyout language that matters if your plans change mid-lease.",
  },
  {
    title: "Maintenance and access",
    body: "Who fixes what, entry rights, and repair timelines that affect day-to-day living.",
  },
  {
    title: "One-sided or vague clauses",
    body: "Broad waivers, unclear responsibilities, and terms worth clarifying before you sign.",
  },
];

const faqs = [
  {
    q: "Is this a lawyer reviewing my lease?",
    a: "No. The Lease Review provides an AI-powered informational analysis in plain English. It is not legal advice and does not create an attorney-client relationship.",
  },
  {
    q: "How fast do I get results?",
    a: "Most reviews finish within a few minutes after payment. You see the report on screen and receive a copy by email.",
  },
  {
    q: "What file types can I upload?",
    a: "U.S. residential leases in PDF, DOC, or DOCX. Upload the full agreement you were asked to sign.",
  },
  {
    q: `Why does a review cost ${PRICE_LABEL}?`,
    a: `${PRICE_LINE} is a one-time payment through PayPal — no subscription. You pay once per lease review.`,
  },
  {
    q: "What happens to my lease file?",
    a: "Your uploaded document is deleted after processing. We do not keep your lease on file.",
  },
  {
    q: "Should I still talk to a lawyer?",
    a: "If you need legal advice for your situation or state, yes — consult a qualified attorney. This review helps you understand key terms and questions to raise before you commit.",
  },
];

export default function ReviewLeaseBeforeSigningPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Apartment Lease Review",
    description:
      "Plain-English informational review of a U.S. residential lease before you sign — fees, deposits, renewals, and key clauses.",
    brand: { "@type": "Brand", name: "The Lease Review" },
    url: `${siteUrl}${path}`,
    offers: {
      "@type": "Offer",
      price: PRICE_USD,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/upload`,
    },
  };

  return (
    <main className="min-h-screen bg-white text-left">
      <SiteHeader />

      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-white">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-200/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 md:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">The Lease Review</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">
            Review your apartment lease before signing
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700">
            Don&apos;t skim 20–40 pages under pressure. Upload your U.S. residential lease and get a
            structured plain-English review of fees, deposits, renewals, and clauses that can cost
            you later — for {PRICE_ONE_TIME}.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/upload"
              className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
            >
              Upload my lease — {PRICE_LABEL}
            </Link>
            <a href="#what-we-check" className="font-semibold text-primary hover:underline">
              See what we check →
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            One-time PayPal payment · PDF or Word · Results in minutes · Not legal advice
          </p>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50/80 px-6 py-10">
        <div className="mx-auto grid max-w-4xl gap-6 text-center sm:grid-cols-3">
          <div>
            <p className="text-2xl font-extrabold text-primary">{PRICE_LABEL}</p>
            <p className="mt-1 text-sm text-slate-600">One-time — no subscription</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-primary">Minutes</p>
            <p className="mt-1 text-sm text-slate-600">Typical turnaround after payment</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-primary">Deleted</p>
            <p className="mt-1 text-sm text-slate-600">File removed after processing</p>
          </div>
        </div>
      </section>

      <section id="what-we-check" className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-3xl font-extrabold text-slate-900">What we check in your lease</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Focused on the terms renters most often overlook before they sign a U.S. apartment lease.
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {checks.map((item) => (
            <li key={item.title} className="border-l-4 border-primary/40 pl-4">
              <h3 className="font-bold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-primary px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold">How the lease review works</h2>
          <ol className="mt-8 space-y-6">
            <li className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
                1
              </span>
              <div>
                <p className="font-bold">Upload your lease</p>
                <p className="mt-1 text-blue-100">
                  PDF or Word file of the residential agreement you were asked to sign, plus your email.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
                2
              </span>
              <div>
                <p className="font-bold">Pay {PRICE_LABEL} once</p>
                <p className="mt-1 text-blue-100">
                  Secure one-time payment through PayPal. No account subscription.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
                3
              </span>
              <div>
                <p className="font-bold">Read your plain-English report</p>
                <p className="mt-1 text-blue-100">
                  Summary, possible concerns, and questions worth raising before you sign — on screen
                  and by email.
                </p>
              </div>
            </li>
          </ol>
          <Link
            href="/upload"
            className="mt-10 inline-flex rounded-full bg-white px-8 py-4 text-lg font-bold text-primary transition hover:bg-blue-50"
          >
            Start my lease review — {PRICE_LABEL}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-3xl font-extrabold text-slate-900">
          Who this apartment lease review is for
        </h2>
        <ul className="mt-6 space-y-3 text-slate-700">
          <li className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
            First-time renters who want clarity before committing to 12 months
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
            Anyone asked to sign the same day and needs a fast second look
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
            Students and relocators comparing fees and deposit terms across listings
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
            Renters who want structured questions before talking to a landlord or attorney
          </li>
        </ul>
      </section>

      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold text-slate-900">Frequently asked questions</h2>
          <div className="mt-8 space-y-6">
            {faqs.map(({ q, a }) => (
              <article key={q}>
                <h3 className="text-lg font-bold text-primary">{q}</h3>
                <p className="mt-2 leading-relaxed text-slate-700">{a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900">
          Understand your lease before you sign
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          {PRICE_LINE} · One review · Informational only · Not a substitute for legal advice
        </p>
        <Link
          href="/upload"
          className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-blue-700"
        >
          Review my lease for {PRICE_LABEL}
        </Link>
        <p className="mt-6 text-sm text-slate-500">
          Related:{" "}
          <Link href="/lease-review-checklist" className="font-semibold text-primary hover:underline">
            free checklist
          </Link>
          {" · "}
          <Link href="/signing-today" className="font-semibold text-primary hover:underline">
            signing today
          </Link>
          {" · "}
          <Link href="/guides" className="font-semibold text-primary hover:underline">
            lease guides
          </Link>
          {" · "}
          <Link
            href="/rental-lease-agreement-review"
            className="font-semibold text-primary hover:underline"
          >
            rental agreement review
          </Link>
        </p>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />
      <SiteFooter />
    </main>
  );
}
