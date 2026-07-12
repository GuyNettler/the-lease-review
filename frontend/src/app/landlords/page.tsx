import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Lease Clarity for Landlords & Property Managers",
  description:
    "Help prospective tenants understand your residential lease with a clear informational review — deposits, fees, and responsibilities in plain English.",
  alternates: { canonical: "/landlords" },
  openGraph: {
    title: "For landlords & managers",
    description: "Clearer leases, fewer surprises at signing.",
    url: "/landlords",
  },
};

export default function LandlordsPage() {
  return (
    <LandingPage
      eyebrow="Landlords & managers"
      title="Clearer leases mean fewer surprised tenants"
      subtitle="When applicants understand deposits, fees, and responsibilities up front, move-ins go smoother and disputes are less likely later."
      ctaLabel="Preview a lease review — $19.99"
      bullets={[
        {
          title: "Transparent fees",
          body: "Make sure amenity and utility charges are easy to spot in the agreement package.",
        },
        {
          title: "Deposit expectations",
          body: "Clear deduction and return language reduces end-of-lease conflict.",
        },
        {
          title: "Shared understanding",
          body: "An informational review helps applicants ask better questions before signing.",
        },
      ]}
      relatedLinks={[
        { href: "/guides/fees-and-charges", label: "Fees guide" },
        { href: "/guides/security-deposit", label: "Deposits" },
        { href: "/contact", label: "Contact" },
      ]}
    />
  );
}
