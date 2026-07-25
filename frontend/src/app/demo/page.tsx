"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Loader2 } from "lucide-react";
import AnalysisResults from "@/components/AnalysisResults";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { DEMO_ANALYSIS } from "@/lib/demoReport";
import { track } from "@/lib/analytics";
import { PRICE_LABEL, PRICE_ONE_TIME } from "@/lib/pricing";

export default function DemoReportPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    track("demo_view", { site: "theleasereview" });
    const t = window.setTimeout(() => setReady(true), 1800);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-primary-light text-left">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="text-sm font-semibold text-primary hover:underline">
            ← Back home
          </Link>
          <span className="rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-900">
            Sample · not your lease
          </span>
        </div>

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="flex items-center gap-2 text-3xl font-extrabold text-slate-900">
            <FileText size={28} className="text-primary" />
            Sample lease review report
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate-700">
            This is what a finished report looks like — built from a fictional demo lease. No
            upload, no payment, and no AI call on this page. When you upload your PDF or Word
            file, you get a real review of <em>your</em> document for {PRICE_ONE_TIME}.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            If the real analysis fails, you are not charged. Files are deleted after processing.
            Not legal advice.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/upload"
              onClick={() => track("demo_cta_upload", { site: "theleasereview" })}
              className="rounded-full bg-primary px-6 py-3 font-bold text-white hover:bg-blue-700"
            >
              Upload my lease — {PRICE_LABEL}
            </Link>
            <Link
              href="/guides/how-to-review-a-lease-agreement"
              className="rounded-full border border-primary px-6 py-3 font-semibold text-primary hover:bg-blue-50"
            >
              Free how-to guide
            </Link>
          </div>
        </section>

        {!ready ? (
          <section className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">
            <Loader2 className="animate-spin text-primary" size={36} />
            <p className="font-semibold text-slate-900">Preparing sample report…</p>
            <p className="text-sm text-slate-500">Short simulation only — no real analysis</p>
          </section>
        ) : (
          <AnalysisResults analysis={DEMO_ANALYSIS} />
        )}

        {ready ? (
          <div className="sticky bottom-4 z-10">
            <div className="flex flex-col items-center justify-between gap-3 rounded-2xl bg-primary p-4 text-white shadow-lg sm:flex-row">
              <p className="text-center font-semibold sm:text-left">
                Want this on your lease? Real review for {PRICE_ONE_TIME}.
              </p>
              <Link
                href="/upload"
                onClick={() =>
                  track("demo_cta_upload", { site: "theleasereview", placement: "sticky" })
                }
                className="whitespace-nowrap rounded-full bg-white px-6 py-2.5 font-bold text-primary hover:bg-blue-50"
              >
                Go to upload
              </Link>
            </div>
          </div>
        ) : null}
      </div>
      <SiteFooter />
    </main>
  );
}
