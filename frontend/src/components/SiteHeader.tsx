import Link from "next/link";

const nav = [
  { href: "/lease-review-checklist", label: "Checklist" },
  { href: "/guides", label: "Guides" },
  { href: "/cities", label: "Cities" },
  { href: "/faq", label: "FAQ" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-blue-100/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-primary">
          The Lease Review
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/upload"
          className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          Review my lease
        </Link>
      </div>
    </header>
  );
}
