import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How The Lease Review collects, uses, and deletes information related to lease reviews.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-left">
      <SiteHeader />
      <article className="prose prose-slate mx-auto max-w-3xl px-6 py-14">
        <h1>Privacy Policy</h1>
        <p>Last updated: July 11, 2026</p>
        <h2>Information we collect</h2>
        <p>
          We collect the email address you provide, payment-related identifiers supplied by PayPal,
          and the lease document you choose to upload so we can provide the requested review.
        </p>
        <h2>How we use information</h2>
        <p>
          We use this information to process your request, deliver the review, maintain service
          security, and respond to support requests.
        </p>
        <h2>File deletion</h2>
        <p>
          Uploaded lease files are deleted after processing. Please avoid including information you
          do not want processed.
        </p>
        <h2>Sharing</h2>
        <p>
          We share information only with service providers needed to process payments and operate
          the service, or when required by law.
        </p>
        <h2>Your choices</h2>
        <p>You may contact hello@theleasereview.com with privacy questions or requests.</p>
      </article>
      <SiteFooter />
    </main>
  );
}
