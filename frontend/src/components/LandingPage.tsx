import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export type LandingBullet = {
  title: string;
  body: string;
};

export type LandingPageProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  bullets: LandingBullet[];
  ctaLabel: string;
  trustLine?: string;
  note?: string;
  relatedLinks?: { href: string; label: string }[];
};

export default function LandingPage({
  eyebrow,
  title,
  subtitle,
  bullets,
  ctaLabel,
  trustLine = "One-time payment · No subscription · Files deleted after processing",
  note = "This service is informational only and is not legal advice.",
  relatedLinks = [],
}: LandingPageProps) {
  return (
    <main className="min-h-screen bg-primary-light text-left">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6">
        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">{subtitle}</p>
          <Link
            href="/upload"
            className="mt-6 inline-flex rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-blue-700"
          >
            {ctaLabel}
          </Link>
          <p className="mt-3 text-sm text-slate-600">{trustLine}</p>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-primary">Why this matters now</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {bullets.map((b) => (
              <li key={b.title} className="rounded-xl border border-primary/10 bg-primary-light/70 p-4">
                <p className="font-bold text-primary">{b.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base">{b.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-primary/15 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-primary">How it works</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-700 sm:text-base">
            <li>Upload a PDF or Word lease</li>
            <li>Pay $19.99 once</li>
            <li>Receive an English review in minutes</li>
          </ol>
          <Link
            href="/upload"
            className="mt-5 inline-flex rounded-full bg-primary px-8 py-3 text-lg font-bold text-white transition hover:bg-blue-700"
          >
            {ctaLabel}
          </Link>
          <p className="mt-3 text-xs text-slate-500">{note}</p>
        </section>

        {relatedLinks.length ? (
          <section className="flex flex-wrap gap-3 pb-4">
            {relatedLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-primary"
              >
                {l.label}
              </Link>
            ))}
          </section>
        ) : null}
      </div>
      <SiteFooter />
    </main>
  );
}
