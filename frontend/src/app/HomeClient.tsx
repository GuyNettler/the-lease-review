"use client";

import Link from "next/link";
import {
  CheckCircle2,
  FileSearch,
  FileText,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import StepCard from "@/components/StepCard";
import TestimonialCard from "@/components/TestimonialCard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function HomeClient() {
  return (
    <main className="min-h-screen bg-white text-left">
      <SiteHeader />

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-fade-up flex flex-col items-start gap-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              The Lease Review
            </p>
            <h1 className="max-w-xl text-4xl font-extrabold leading-[1.08] text-slate-900 sm:text-5xl lg:text-6xl">
              Understand your apartment lease before you sign
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-slate-700">
              Upload a PDF or Word lease and get a plain-English review of important clauses,
              possible concerns, and questions to raise — in minutes.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/upload"
                className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
              >
                Get your review for $9.99
              </Link>
              <Link href="/lease-review-checklist" className="font-semibold text-primary hover:underline">
                Free checklist →
              </Link>
            </div>
            <p className="text-sm text-slate-600">
              One-time payment · Files deleted after processing · Not legal advice
            </p>
          </div>
          <div className="animate-fade-up relative flex justify-center md:justify-end" style={{ animationDelay: "120ms" }}>
            <img
              src="/undraw_chat-with-ai_ir62.svg"
              alt="Illustration of reviewing documents with AI assistance"
              className="h-auto w-full max-w-md"
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-extrabold text-slate-900">How it works</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          A simple path from upload to a structured summary you can act on.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <StepCard step={1} icon={<Upload />} title="Upload" description="PDF or Word lease plus your email." />
          <StepCard step={2} icon={<ShieldCheck />} title="Pay once" description="$9.99 securely through PayPal." />
          <StepCard step={3} icon={<Sparkles />} title="AI review" description="We extract and analyze key terms." />
          <StepCard step={4} icon={<FileSearch />} title="Get results" description="Summary, concerns, and recommendations." />
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold">Built for renters who want clarity</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<FileText />}
              title="Plain English"
              description="Important terms presented in language you can actually use."
            />
            <FeatureCard
              icon={<ShieldCheck />}
              title="Privacy-minded"
              description="Your uploaded document is deleted after processing."
            />
            <FeatureCard
              icon={<Sparkles />}
              title="Fast and focused"
              description="A practical starting point before you commit to a lease."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold">What renters usually miss</h2>
            <ul className="mt-6 space-y-3 text-slate-700">
              {[
                "Security deposits and move-out deductions",
                "Fees stacked on top of base rent",
                "Early termination and reletting costs",
                "Automatic renewal deadlines",
                "Roommate, guest, and subletting limits",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/guides/dangerous-lease-clauses"
              className="mt-6 inline-block font-semibold text-primary hover:underline"
            >
              Read dangerous clauses guide →
            </Link>
          </div>
          <div className="flex justify-center">
            <img
              src="/undraw_document-analysis_3c0y.svg"
              alt="Document analysis illustration"
              className="h-auto w-full max-w-sm"
            />
          </div>
        </div>
      </section>

      <section className="bg-primary-light px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold">What renters say</h2>
              <p className="mt-2 text-slate-600">Short notes from people who used the review before signing.</p>
            </div>
            <img
              src="/undraw_testimonials_4c7y.svg"
              alt=""
              className="hidden h-auto w-40 sm:block"
            />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <TestimonialCard
              quote="It flagged an automatic renewal deadline I would have missed by a week."
              name="Jordan"
              city="Austin"
            />
            <TestimonialCard
              quote="Clearer than skimming 30 pages the night before move-in."
              name="Sam"
              city="Chicago"
            />
            <TestimonialCard
              quote="Helped me list questions for the landlord about pet fees and parking."
              name="Alex"
              city="Seattle"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-3xl font-extrabold">One lease review, $9.99</h2>
        <p className="mt-3 text-slate-700">
          No subscription. Upload your agreement and get a clear review before signing.
        </p>
        <ul className="mx-auto mt-6 max-w-md space-y-2 text-left text-slate-700">
          {[
            "Important clauses highlighted by severity",
            "Tenant and landlord concern sections",
            "Email copy of your results",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
        <Link
          href="/upload"
          className="mt-8 inline-block rounded-full bg-primary px-8 py-4 font-bold text-white transition hover:bg-blue-700"
        >
          Start your review
        </Link>
      </section>

      <section className="border-y border-blue-100 bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-extrabold">Explore by need</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Students & roommates", "/students"],
              ["Signing today", "/signing-today"],
              ["Landlords", "/landlords"],
              ["City guides", "/cities"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-semibold text-slate-800 transition hover:border-primary hover:bg-primary-light"
              >
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-light px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            <details className="rounded-xl bg-white p-5 shadow-sm">
              <summary className="cursor-pointer font-bold">Is this legal advice?</summary>
              <p className="mt-2 text-slate-700">
                No. The Lease Review provides informational analysis, not legal advice or a
                lawyer-client relationship.
              </p>
            </details>
            <details className="rounded-xl bg-white p-5 shadow-sm">
              <summary className="cursor-pointer font-bold">What documents can I upload?</summary>
              <p className="mt-2 text-slate-700">
                PDF, DOC, and DOCX residential lease documents are supported.
              </p>
            </details>
            <details className="rounded-xl bg-white p-5 shadow-sm">
              <summary className="cursor-pointer font-bold">How fast do I get results?</summary>
              <p className="mt-2 text-slate-700">
                Most reviews complete within a few minutes and are emailed to you.
              </p>
            </details>
          </div>
          <Link href="/faq" className="mt-5 inline-block font-bold text-primary">
            Read all FAQs →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
