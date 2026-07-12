import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Need to Sign a Lease Today?",
  description:
    "Pressure to sign the same day? Get a fast plain-English lease review of fees, deposits, renewals, and early-exit terms before you commit.",
  alternates: { canonical: "/signing-today" },
  openGraph: {
    title: "Signing a lease today?",
    description: "A quick structured review before you commit.",
    url: "/signing-today",
  },
};

export default function SigningTodayPage() {
  return (
    <LandingPage
      eyebrow="Signing today"
      title="Don’t skim 30 pages under time pressure"
      subtitle="If a landlord or agent wants a signature today, a structured review helps you spot fees, deadlines, and one-sided wording before you commit."
      ctaLabel="Get a same-day review — $19.99"
      bullets={[
        {
          title: "Fees stacked on rent",
          body: "Amenity, trash, tech, and parking fees can change the real monthly cost.",
        },
        {
          title: "Renewal traps",
          body: "Automatic renewal deadlines are easy to miss when you are rushing.",
        },
        {
          title: "Exit costs",
          body: "Early termination and reletting fees matter if plans change in 6–12 months.",
        },
      ]}
      relatedLinks={[
        { href: "/guides/dangerous-lease-clauses", label: "Dangerous clauses" },
        { href: "/guides/automatic-renewal", label: "Renewals" },
        { href: "/upload", label: "Upload now" },
      ]}
    />
  );
}
