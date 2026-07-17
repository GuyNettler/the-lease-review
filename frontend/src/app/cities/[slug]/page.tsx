import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cities, getCity } from "@/lib/cities";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

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
      title: `Lease review in ${city.name}`,
      description: city.description,
      url: `/cities/${city.slug}`,
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const others = cities.filter((c) => c.slug !== city.slug).slice(0, 6);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Lease review in ${city.name}`,
    description: city.description,
    about: {
      "@type": "Place",
      name: city.name,
      address: { "@type": "PostalAddress", addressLocality: city.name, addressRegion: city.state },
    },
  };

  return (
    <main className="min-h-screen bg-primary-light text-left">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-3xl px-6 py-14">
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">
            {city.region} · {city.state}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-900">
            Lease review in {city.name}
          </h1>
          <p className="mt-4 text-lg text-slate-700">{city.description}</p>

          <h2 className="mt-8 text-2xl font-bold">Local notes for renters</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            {city.localNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>

          <h2 className="mt-8 text-2xl font-bold">Before you sign</h2>
          <p className="mt-3 text-slate-700">
            Rental rules can differ by state and city. Review fees, deposits, renewal terms,
            repairs, and notice requirements in your agreement, then ask a qualified local attorney
            about legal questions.
          </p>

          <Link
            href="/upload"
            className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-bold text-white hover:bg-blue-700"
          >
            Review my lease for $9.99
          </Link>
          <p className="mt-3 text-xs text-slate-500">Informational only — not legal advice.</p>
        </div>

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
