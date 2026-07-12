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
    author: { "@type": "Organization", name: "The Lease Review" },
    publisher: { "@type": "Organization", name: "The Lease Review" },
  };

  return (
    <main className="min-h-screen bg-white text-left">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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

        <aside className="mt-12 rounded-2xl border border-blue-100 bg-primary-light p-6">
          <p className="font-semibold text-slate-900">{guide.ctaNote}</p>
          <Link
            href="/upload"
            className="mt-4 inline-block rounded-full bg-primary px-6 py-3 font-bold text-white hover:bg-blue-700"
          >
            Review my lease for $19.99
          </Link>
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
