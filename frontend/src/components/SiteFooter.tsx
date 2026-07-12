import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      ["Review my lease", "/upload"],
      ["Lease checklist", "/lease-review-checklist"],
      ["How it works", "/#how-it-works"],
      ["FAQ", "/faq"],
    ],
  },
  {
    title: "Guides",
    links: [
      ["All guides", "/guides"],
      ["Security deposits", "/guides/security-deposit"],
      ["Early termination", "/guides/early-termination"],
      ["Dangerous clauses", "/guides/dangerous-lease-clauses"],
    ],
  },
  {
    title: "Audiences",
    links: [
      ["Students", "/students"],
      ["Signing today", "/signing-today"],
      ["Landlords", "/landlords"],
      ["Cities", "/cities"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Contact", "/contact"],
      ["Terms", "/terms"],
      ["Privacy", "/privacy"],
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-5">
        <div className="md:col-span-1">
          <p className="text-lg font-extrabold text-white">The Lease Review</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Plain-English apartment lease reviews for U.S. renters. Informational only — not legal
            advice.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-bold uppercase tracking-wide text-white">{col.title}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800 px-6 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} The Lease Review · $19.99 one-time · theleasereview.com
      </div>
    </footer>
  );
}
