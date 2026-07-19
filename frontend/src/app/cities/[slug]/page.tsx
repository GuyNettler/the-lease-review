import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cities, getCity } from "@/lib/cities";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PRICE_LABEL, PRICE_ONE_TIME } from "@/lib/pricing";

export function generateStaticParams() {
  return cities.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return {
    title: `Lease Review in ${city.name}, ${city.state}`,
    description: city.description,
    keywords: city.keywords,
    alternates: { canonical: `/cities/${city.slug}` },
    openGraph: {
      title: `Lease review in ${city.name} | The Lease Review`,
      description: city.description,
      url: `/cities/${city.slug}`,
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const others = cities.filter((c) => c.slug !== city.slug).slice(0, 8);
  const pageUrl = `https://www.theleasereview.com/cities/${city.slug}`;

  const webpageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Lease review in ${city.name}, ${city.state}`,
    description: city.description,
    url: pageUrl,
    about: {
      "@type": "Place",
      name: city.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: city.state,
        addressCountry: "US",
      },
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faqs.map(({ q, a }) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <article className="mx-auto max-w-3xl px-6 py-14">
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">
            {city.region} · {city.state}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-900">
            Lease review in {city.name}
          </h1>
          <p className="mt-4 text-lg text-slate-700">{city.description}</p>

          <h2 className="mt-8 text-2xl font-bold">Local notes for {city.name} renters</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            {city.localNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>

          <h2 className="mt-8 text-2xl font-bold">Before you sign in {city.name}</h2>
          <p className="mt-3 text-slate-700">
            Rental rules can differ by state and city. Review fees, deposits, renewal terms,
            repairs, and notice requirements in your agreement, then ask a qualified local attorney
            about legal questions. A structured plain-English pass over your actual document helps
            you spot questions before you commit.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            <li>Total monthly cost: rent plus amenity, trash, parking, pet, and admin fees</li>
            <li>Security deposit amount, deductions, and return timeline</li>
            <li>Automatic renewal and the deadline to give notice</li>
            <li>Early termination, reletting, and roommate or guarantor liability</li>
          </ul>

          <Link
            href="/upload"
            className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-bold text-white hover:bg-blue-700"
          >
            Review my {city.name} lease — {PRICE_LABEL}
          </Link>
          <p className="mt-3 text-xs text-slate-500">
            {PRICE_ONE_TIME} · Informational only — not legal advice.
          </p>
        </div>

        <section className="mt-10 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            {city.name} lease review FAQ
          </h2>
          <div className="mt-6 space-y-5">
            {city.faqs.map(({ q, a }) => (
              <article key={q}>
                <h3 className="text-lg font-bold text-primary">{q}</h3>
                <p className="mt-2 text-slate-700">{a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Helpful next steps</h2>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>
              <Link href="/lease-review-checklist" className="font-semibold text-primary hover:underline">
                Free lease review checklist
              </Link>
            </li>
            <li>
              <Link
                href="/review-lease-before-signing"
                className="font-semibold text-primary hover:underline"
              >
                Review your lease before signing
              </Link>
            </li>
            <li>
              <Link
                href="/rental-lease-agreement-review"
                className="font-semibold text-primary hover:underline"
              >
                Rental lease agreement review
              </Link>
            </li>
            <li>
              <Link href="/guides" className="font-semibold text-primary hover:underline">
                Lease guides
              </Link>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Other cities</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-primary hover:text-primary"
              >
                {c.name}
              </Link>
            ))}
            <Link href="/cities" className="rounded-full px-4 py-2 text-sm font-semibold text-primary">
              All cities →
            </Link>
          </div>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
