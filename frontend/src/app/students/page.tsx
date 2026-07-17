import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Lease Review for Students & Roommates",
  description:
    "Review roommate liability, guarantors, subletting, and deposit clauses before you cosign a student or shared apartment lease.",
  alternates: { canonical: "/students" },
  openGraph: {
    title: "Lease Review for Students",
    description: "Spot roommate and guarantor risks before you sign.",
    url: "/students",
  },
};

export default function StudentsPage() {
  return (
    <LandingPage
      eyebrow="Students & shared housing"
      title="Review the lease before you cosign with roommates"
      subtitle="Shared apartments multiply risk. See how joint liability, guests, sublets, and deposits are written before move-in day."
      ctaLabel="Review my lease for $9.99"
      bullets={[
        {
          title: "Joint liability",
          body: "Many leases let the landlord pursue any roommate for the full rent if someone stops paying.",
        },
        {
          title: "Guarantors",
          body: "Confirm how long a cosigner stays on the hook and what debts they cover.",
        },
        {
          title: "Subletting & guests",
          body: "Unauthorized sublets or overnight guest limits can trigger default language.",
        },
      ]}
      relatedLinks={[
        { href: "/guides/roommates-and-subletting", label: "Roommates guide" },
        { href: "/lease-review-checklist", label: "Checklist" },
        { href: "/cities/boston", label: "Boston notes" },
      ]}
    />
  );
}
