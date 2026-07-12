"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Download, Mail } from "lucide-react";
import AnalysisResults, { type Analysis } from "@/components/AnalysisResults";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function UploadDonePage() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedAnalysis = sessionStorage.getItem("analysis");
    const savedEmail = sessionStorage.getItem("email");
    if (savedAnalysis) {
      try {
        setAnalysis(JSON.parse(savedAnalysis));
      } catch {
        setAnalysis(null);
      }
    }
    if (savedEmail) setEmail(savedEmail);
  }, []);

  return (
    <main className="min-h-screen bg-primary-light text-left">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6">
        <section className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="mb-3 flex items-center justify-center gap-3 text-green-700">
            <CheckCircle size={40} className="text-green-500" />
            <h1 className="text-2xl font-extrabold sm:text-3xl">Review complete</h1>
          </div>
          <p className="text-slate-700">
            Your residential lease was reviewed and a structured summary is ready below.
          </p>
          {email ? (
            <p className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-600">
              <Mail size={16} /> A full copy was emailed to {email}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/upload"
              className="rounded-full bg-primary px-6 py-2.5 font-bold text-white transition hover:bg-blue-700"
            >
              Review another lease
            </Link>
            <Link
              href="/review"
              className="rounded-full border border-primary bg-white px-6 py-2.5 font-bold text-primary transition hover:bg-blue-50"
            >
              Leave quick feedback
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-6 py-2.5 font-bold text-white transition hover:bg-slate-900"
            >
              <Download size={16} /> Print report
            </button>
          </div>
        </section>

        {analysis ? (
          <AnalysisResults analysis={analysis} email={email} />
        ) : (
          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
            <p className="font-semibold">Results are not available in this browser session.</p>
            <p className="mt-2 text-sm">
              If you completed a review, check your email for the full report. You can also{" "}
              <Link href="/upload" className="font-bold underline">
                start a new review
              </Link>
              .
            </p>
          </section>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
