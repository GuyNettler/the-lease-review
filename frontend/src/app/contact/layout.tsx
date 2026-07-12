import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact The Lease Review with questions about the product. We cannot provide legal advice by email.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
