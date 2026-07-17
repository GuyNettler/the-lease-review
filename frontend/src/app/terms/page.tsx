import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for The Lease Review informational lease review service.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-left">
      <SiteHeader />
      <article className="prose prose-slate mx-auto max-w-3xl px-6 py-14">
        <h1>Terms of Use</h1>
        <p>Last updated: July 11, 2026</p>
        <h2>Informational service</h2>
        <p>
          The Lease Review provides automated, general information about residential leases. It is
          not a law firm, does not provide legal advice, and does not create an attorney-client
          relationship. Do not rely on the service as a substitute for advice from a licensed
          attorney.
        </p>
        <h2>Your responsibilities</h2>
        <p>
          You are responsible for the documents you upload and for ensuring you have the right to
          provide them. You must not upload unlawful, malicious, or infringing material.
        </p>
        <h2>Payments and availability</h2>
        <p>
          Reviews are a one-time purchase of $9.99 USD. Service availability and results are not
          guaranteed, and we may update or discontinue the service as permitted by law.
        </p>
        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, The Lease Review is not liable for decisions made
          using the service or for indirect, incidental, or consequential damages.
        </p>
        <h2>Contact</h2>
        <p>Questions about these terms may be sent to hello@theleasereview.com.</p>
      </article>
      <SiteFooter />
    </main>
  );
}
