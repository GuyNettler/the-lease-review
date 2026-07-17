import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Apartment Lease Guides",
  description:
    "Plain-English guides on security deposits, early termination, fees, renewals, roommates, and more for U.S. renters.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Apartment Lease Guides",
    description: "Practical lease guides for renters before they sign.",
    url: "/guides",
  },
};

const categoryLabel: Record<string, string> = {
  panic: "Watch-outs",
  comparison: "Comparisons",
  guide: "How-to guides",
};

export default function GuidesHubPage() {
  const groups = (["panic", "comparison", "guide"] as const).map((category) => ({
    category,
    label: categoryLabel[category],
    items: guides.filter((g) => g.category === category),
  }));

  return (
    <main className="min-h-screen bg-white text-left">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="text-4xl font-extrabold text-slate-900">Lease guides</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-700">
          Short, practical explainers for the clauses renters ask about most — then upload your
          lease for a personalized review.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/lease-review-checklist"
            className="rounded-full border border-primary bg-primary-light px-4 py-2 text-sm font-semibold text-primary"
          >
            Free lease checklist
          </Link>
          <Link
            href="/cities"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            City pages
          </Link>
        </div>

        {groups.map((group) =>
          group.items.length ? (
            <section key={group.category} className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900">{group.label}</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {group.items.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-primary hover:bg-primary-light"
                  >
                    <h3 className="text-lg font-bold text-slate-900">{guide.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{guide.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null
        )}

        <div className="mt-14 rounded-2xl bg-primary px-8 py-10 text-center text-white">
          <h2 className="text-2xl font-extrabold">Have a lease in hand?</h2>
          <p className="mt-2 text-blue-100">Get a structured review for $9.99.</p>
          <Link
            href="/upload"
            className="mt-5 inline-block rounded-full bg-white px-8 py-3 font-bold text-primary hover:bg-blue-50"
          >
            Review my lease
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
