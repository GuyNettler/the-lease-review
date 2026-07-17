import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Your Lease",
  description:
    "Upload a U.S. residential lease (PDF or Word) for a $9.99 plain-English review of fees, deposits, renewals, and key clauses.",
  alternates: { canonical: "/upload" },
  openGraph: {
    title: "Upload your lease | The Lease Review",
    description: "Get a structured apartment lease review for $9.99.",
    url: "/upload",
  },
  robots: { index: true, follow: true },
};

export default function UploadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
