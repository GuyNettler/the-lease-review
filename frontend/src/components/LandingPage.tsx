import Link from "next/link";

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
};

export default function LandingPage({
  eyebrow,
  title,
  subtitle,
  bullets,
  ctaLabel,
  trustLine = "One-time payment · No subscription · Files deleted after processing",
  note = "This service is informational only and is not legal advice.",
}: LandingPageProps) {
  return (
    <main className="min-h-screen flex flex-col items-center bg-primary-light px-2 sm:px-4 py-6 sm:py-10 text-left">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <Link href="/" className="text-primary hover:text-blue-700 text-sm font-semibold self-start">
          ← Home
        </Link>

        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-10 flex flex-col gap-5">
          <p className="text-sm font-semibold text-blue-600">{eyebrow}</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">{subtitle}</p>

          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/upload"
              className="inline-flex justify-center items-center w-full sm:w-auto self-stretch sm:self-start px-8 py-4 bg-primary hover:bg-blue-700 text-white rounded-full text-xl font-bold shadow-lg transition-colors"
            >
              {ctaLabel}
            </Link>
            <p className="text-sm text-gray-600">{trustLine}</p>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow border border-gray-100 p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-primary">Why this matters now</h2>
          <ul className="flex flex-col gap-3">
            {bullets.map((b) => (
              <li
                key={b.title}
                className="rounded-xl bg-primary-light/70 border border-primary/10 p-4"
              >
                <p className="font-bold text-primary">{b.title}</p>
                <p className="text-gray-700 text-sm sm:text-base mt-1 leading-relaxed">
                  {b.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-primary/5 rounded-2xl border border-primary/15 p-6 sm:p-8 flex flex-col gap-3 items-stretch sm:items-start">
          <h2 className="text-xl font-bold text-primary">How it works</h2>
          <ol className="text-gray-700 text-sm sm:text-base list-decimal list-inside space-y-1">
            <li>Upload a PDF or Word lease</li>
            <li>Pay $19.99 once</li>
            <li>Receive an English review in minutes</li>
          </ol>
          <Link
            href="/upload"
            className="inline-flex justify-center mt-2 px-8 py-4 bg-primary hover:bg-blue-700 text-white rounded-full text-lg font-bold transition-colors"
          >
            {ctaLabel}
          </Link>
          <p className="text-xs text-gray-500">{note}</p>
        </section>
      </div>
    </main>
  );
}
