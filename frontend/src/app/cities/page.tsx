import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/lib/cities";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Lease Review by City",
  description:
    "City-focused apartment lease review guidance for major U.S. rental markets — deposits, fees, renewals, and local notes.",
  alternates: { canonical: "/cities" },
  openGraph: {
    title: "Lease Review by City | The Lease Review",
    description: "Local notes for renters reviewing leases in major U.S. cities.",
    url: "/cities",
  },
};

export default function CitiesIndexPage() {
  return (
    <main className="min-h-screen bg-primary-light text-left">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900">Lease review by city</h1>
            <p className="mt-4 max-w-xl text-lg text-slate-700">
              Local context for deposits, fees, renewals, and roommate rules — then upload your
              actual lease for a structured $19.99 review.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src="/undraw_apartment-rent_oodr.svg"
              alt="Apartment rental illustration"
              className="h-auto w-full max-w-xs"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-primary hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-primary">{city.state}</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">{city.name}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">{city.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-extrabold">Ready to review your lease?</h2>
          <Link
            href="/upload"
            className="mt-5 inline-block rounded-full bg-primary px-8 py-3 font-bold text-white hover:bg-blue-700"
          >
            Start for $19.99
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
