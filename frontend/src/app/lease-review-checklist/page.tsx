import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/lib/cities";
import { guides } from "@/lib/guides";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Free Lease Review Checklist | How to Review a Lease",
  description:
    "Free lease review checklist: how to review a lease agreement before you sign — deposits, fees, renewals, early exit, repairs, and roommates.",
  keywords:
    "lease review checklist, how to review a lease agreement, what to check in a lease, apartment lease checklist before signing, free lease checklist",
  alternates: { canonical: "/lease-review-checklist" },
  openGraph: {
    title: "Free Lease Review Checklist",
    description: "How to review a lease before you sign — free step-by-step checklist.",
    url: "/lease-review-checklist",
  },
};

const items = [
  {
    title: "Security deposit",
    body: "Amount, due date, allowed deductions, and return timeline.",
  },
  {
    title: "Fees beyond rent",
    body: "Utilities, parking, pets, amenities, trash, late fees, and admin charges.",
  },
  {
    title: "Lease term and renewal",
    body: "Start/end dates, automatic renewal, and the deadline to decline.",
  },
  {
    title: "Early termination",
    body: "Notice rules, fees, replacement tenants, and reletting language.",
  },
  {
    title: "Repairs and maintenance",
    body: "Ordinary wear vs damage, who pays for systems, and reporting duties.",
  },
  {
    title: "Entry and privacy",
    body: "When the landlord may enter and how much notice is required.",
  },
  {
    title: "Guests, roommates, subletting",
    body: "Occupancy limits, overnight guests, and approval requirements.",
  },
  {
    title: "Pets and parking",
    body: "Deposits, monthly pet rent, breed limits, and parking assignments.",
  },
  {
    title: "Move-out standards",
    body: "Cleaning, painting, carpet, keys/fobs, and condition documentation.",
  },
  {
    title: "Default and notices",
    body: "Cure periods, delivery methods, and consequences for late rent.",
  },
];

const faqs = [
  {
    q: "What should a tenant lease checklist include?",
    a: "At minimum: deposit rules, fees beyond rent, renewal notice deadlines, early exit costs, repairs, guests/roommates, pets, parking, and move-out standards.",
  },
  {
    q: "Is this checklist a substitute for reading the full lease?",
    a: "No. Use it as a guide while you read every page and addendum. Upload the document if you want a structured pass over your actual agreement.",
  },
  {
    q: "When should I use a lease review checklist?",
    a: "Before you sign — ideally before you pay deposits or application fees that lock you into a tight timeline.",
  },
];

export default function ChecklistPage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Apartment Lease Review Checklist",
    description:
      "A practical checklist of what to review in a U.S. residential lease before signing.",
    author: { "@type": "Organization", name: "The Lease Review" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <main className="min-h-screen bg-primary-light text-left">
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <section className="mx-auto max-w-4xl px-6 py-14">
        <h1 className="text-4xl font-extrabold text-slate-900">Tenant lease review checklist</h1>
        <p className="mt-4 text-lg text-slate-700">
          Use this free list before you sign a U.S. apartment lease. When you want a structured pass
          over your actual document, upload it for $9.99.
        </p>

        <ol className="mt-10 space-y-4">
          {items.map((item, index) => (
            <li key={item.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-primary">Step {index + 1}</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-slate-700">{item.body}</p>
            </li>
          ))}
        </ol>

        <section className="mt-12 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Checklist FAQ</h2>
          <div className="mt-6 space-y-5">
            {faqs.map(({ q, a }) => (
              <article key={q}>
                <h3 className="text-lg font-bold text-primary">{q}</h3>
                <p className="mt-2 text-slate-700">{a}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-10 rounded-2xl bg-primary p-8 text-center text-white">
          <h2 className="text-2xl font-extrabold">Want this done on your lease?</h2>
          <Link
            href="/upload"
            className="mt-5 inline-block rounded-full bg-white px-8 py-3 font-bold text-primary hover:bg-blue-50"
          >
            Upload for $9.99
          </Link>
          <p className="mt-4 text-sm text-blue-100">
            Or start with{" "}
            <Link href="/rental-lease-agreement-review" className="font-semibold underline">
              rental lease agreement review
            </Link>
          </p>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-bold">Helpful guides</h2>
          <p className="mt-2 text-slate-600">
            Start with{" "}
            <Link
              href="/guides/how-to-review-a-lease-agreement"
              className="font-semibold text-primary hover:underline"
            >
              how to review a lease agreement
            </Link>
            , then use the steps above on your document.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {guides.slice(0, 6).map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="font-semibold text-primary hover:underline">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold">Browse by city</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}`}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-primary"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
