import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sample Lease Review Report",
  description:
    "See what a finished lease review report looks like — a static demo on a fictional lease. No upload, no payment. Then review your own lease for $9.99.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/demo" },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
