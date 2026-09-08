import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PRICE_LABEL, PRICE_ONE_TIME } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "For Landlords & Property Managers | Lease Clarity",
  description:
    "Help landlords and property managers present clearer residential lease packets: deposits, fees, renewals, and responsibilities — so applicants sign with fewer surprises. $9.99 informational review.",
  keywords: [
    "landlord lease clarity",
    "property manager lease packet",
    "lease fees for landlords",
    "security deposit language landlords",
    "residential lease for property managers",
  ],
  alternates: { canonical: "/landlords" },
  openGraph: {
    title: "For landlords & property managers | The Lease Review",
    description:
      "Clearer lease packets for landlords and managers — fewer surprises at signing. Informational review for $9.99.",
    url: "/landlords",
  },
};

const faqs = [
  {
    q: "Why would a landlord use a lease review service?",
    a: "To help applicants understand deposits, fees, and responsibilities before signing. Clearer expectations reduce move-in friction and later disputes. This is informational, not legal advice.",
  },
  {
    q: "Does this replace a lawyer for landlords?",
    a: "No. Use it as a plain-English pass over the residential lease package so tenants ask better questions. For drafting or legal risk, consult a licensed attorney.",
  },
  {
    q: "What should landlords make obvious in a lease packet?",
    a: "Total monthly cost beyond base rent, deposit rules, renewal notice windows, early termination fees, repair duties, and any condo/HOA addenda.",
  },
      {
        q: "Can property managers share a sample report with applicants?",
        a: "Yes. Point applicants to the free sample report so they see the format, then they can upload the actual lease if they want a structured pass.",
      },
      {
        q: "What makes a landlord-facing lease packet easier to sign?",
        a: "Put fees, deposit rules, renewal notice, and building addenda where applicants can find them quickly. Ambiguity creates last-minute questions and walkaways.",
      },
    ];

export default function LandlordsPage() {
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
    <main className="min-h-screen bg-white text-left">
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <section className="bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Landlords & managers
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Clearer lease packets for landlords and managers
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700">
            When applicants understand deposits, fees, renewals, and responsibilities up front,
            move-ins go smoother and disputes are less likely later. {PRICE_ONE_TIME}.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/upload"
              className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-white hover:bg-blue-700"
            >
              Preview a lease review — {PRICE_LABEL}
            </Link>
            <Link href="/demo" className="font-semibold text-primary hover:underline">
              Free sample report →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="text-3xl font-extrabold text-slate-900">What landlords should make obvious</h2>
        <div className="mt-8 space-y-6">
          <article>
            <h3 className="text-xl font-bold text-primary">Transparent fees</h3>
            <p className="mt-2 text-slate-700">
              Amenity, trash, parking, pet, and admin fees often sit outside base rent. If they are
              buried in addenda, applicants feel blindsided later.
            </p>
          </article>
          <article>
            <h3 className="text-xl font-bold text-primary">Deposit expectations</h3>
            <p className="mt-2 text-slate-700">
              Clear deduction lists and return timelines reduce end-of-lease conflict for both sides.
            </p>
          </article>
          <article>
            <h3 className="text-xl font-bold text-primary">Renewals and early exit</h3>
            <p className="mt-2 text-slate-700">
              Notice windows, auto-renewal, and reletting fees should be easy to find — not only in
              fine print on page 18.
            </p>
          </article>
          <article>
            <h3 className="text-xl font-bold text-primary">Shared understanding before keys</h3>
            <p className="mt-2 text-slate-700">
              An informational review helps applicants ask better questions before signing, so fewer
              surprises hit after move-in.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-14">
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
          <Link href="/guides/fees-and-charges" className="font-semibold text-primary hover:underline">
            fees guide
          </Link>
          {" · "}
          <Link href="/guides/security-deposit" className="font-semibold text-primary hover:underline">
            deposits
          </Link>
          {" · "}
          <Link href="/guides/automatic-renewal" className="font-semibold text-primary hover:underline">
            renewals
          </Link>
          {" · "}
          <Link href="/contact" className="font-semibold text-primary hover:underline">
            contact
          </Link>
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
