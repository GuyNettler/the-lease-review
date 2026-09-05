import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuide, guides } from "@/lib/guides";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `/guides/${guide.slug}`,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: new Date().toISOString().slice(0, 10),
    author: { "@type": "Organization", name: "The Lease Review" },
    publisher: { "@type": "Organization", name: "The Lease Review" },
  };
  const faqLd =
    guide.faqs && guide.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faqs.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }
      : null;

  return (
    <main className="min-h-screen bg-white text-left">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      ) : null}
      <article className="mx-auto max-w-3xl px-6 py-14">
        <Link href="/guides" className="font-semibold text-primary">
          ← All guides
        </Link>
        <h1 className="mt-6 text-4xl font-extrabold text-slate-900">{guide.title}</h1>
        <p className="mt-4 text-lg text-slate-700">{guide.intro}</p>

        <div className="mt-10 space-y-8">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold text-slate-900">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-slate-700">{section.body}</p>
            </section>
          ))}
        </div>

        {guide.faqs && guide.faqs.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900">Frequently asked questions</h2>
            <div className="mt-6 space-y-6">
              {guide.faqs.map(({ q, a }) => (
                <div key={q}>
                  <h3 className="text-lg font-bold text-slate-900">{q}</h3>
                  <p className="mt-2 leading-relaxed text-slate-700">{a}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <aside className="mt-12 rounded-2xl border border-blue-100 bg-primary-light p-6">
          <p className="font-semibold text-slate-900">{guide.ctaNote}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="inline-block rounded-full border-2 border-primary bg-white px-6 py-3 font-bold text-primary hover:bg-blue-50"
            >
              Free sample report
            </Link>
            <Link
              href="/upload"
              className="inline-block rounded-full bg-primary px-6 py-3 font-bold text-white hover:bg-blue-700"
            >
              Review my lease for $9.99
            </Link>
            {guide.slug === "how-to-review-a-lease-agreement" ? (
              <>
                <Link
                  href="/rental-lease-agreement-review"
                  className="inline-block rounded-full border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 hover:bg-slate-50"
                >
                  Online rental lease review
                </Link>
                <Link
                  href="/lease-review-checklist"
                  className="inline-block rounded-full border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 hover:bg-slate-50"
                >
                  Free lease checklist
                </Link>
                <Link
                  href="/guides/fees-and-charges"
                  className="inline-block rounded-full border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 hover:bg-slate-50"
                >
                  Lease fees explained
                </Link>
                <Link
                  href="/cities/washington-dc"
                  className="inline-block rounded-full border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 hover:bg-slate-50"
                >
                  Washington, D.C. lease notes
                </Link>
                <Link
                  href="/cities/philadelphia"
                  className="inline-block rounded-full border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 hover:bg-slate-50"
                >
                  Philadelphia lease notes
                </Link>
              </>
            ) : null}
          </div>
        </aside>

        <p className="mt-8 text-sm text-slate-500">
          This guide is general information for U.S. residential leases and is not legal advice.
        </p>

        {related.length ? (
          <section className="mt-12 border-t border-slate-200 pt-8">
            <h2 className="text-xl font-bold">Related guides</h2>
            <ul className="mt-4 space-y-2">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`} className="font-semibold text-primary hover:underline">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
      <SiteFooter />
    </main>
  );
}
