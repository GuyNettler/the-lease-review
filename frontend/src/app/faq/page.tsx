import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const faqs = [
  {
    q: "Is The Lease Review legal advice?",
    a: "No. It provides general, informational analysis and does not create an attorney-client relationship.",
  },
  {
    q: "What can I upload?",
    a: "Residential lease documents in PDF, DOC, or DOCX format.",
  },
  {
    q: "How much does a review cost?",
    a: "Each review costs $19.99 USD as a one-time payment through PayPal.",
  },
  {
    q: "What happens to my file?",
    a: "Files are deleted after processing.",
  },
  {
    q: "Can I use this for any state?",
    a: "The review helps you understand common lease terms, but state and local rules vary. Consult a qualified attorney for legal advice.",
  },
  {
    q: "How fast will I get results?",
    a: "Most reviews complete within a few minutes and are emailed to you, with an on-screen report after payment.",
  },
];

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "FAQ about The Lease Review — pricing, file types, privacy, and how informational lease reviews work.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  const schema = {
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
      <section className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="text-4xl font-extrabold text-slate-900">Frequently asked questions</h1>
        <div className="mt-8 space-y-4">
          {faqs.map(({ q, a }) => (
            <article key={q} className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-primary">{q}</h2>
              <p className="mt-2 text-slate-700">{a}</p>
            </article>
          ))}
        </div>
        <Link href="/upload" className="mt-10 inline-block font-bold text-primary">
          Review my lease →
        </Link>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteFooter />
    </main>
  );
}
