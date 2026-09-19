"use client";

import Link from "next/link";
import {
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
import { DEMO_ANALYSIS } from "@/lib/demoReport";

export default function HomeClient() {
  return (
    <main className="min-h-screen bg-white text-left">
      <SiteHeader />

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col items-start gap-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              The Lease Review
            </p>
            <h1 className="max-w-xl text-4xl font-extrabold leading-[1.08] text-slate-900 sm:text-5xl lg:text-6xl">
              Understand your apartment lease before you sign
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-slate-700">
              Upload a PDF or Word lease and get a plain-English review of fees, deposits,
              renewals, and red flags — in minutes.
            </p>
            <Link
              href="/upload"
              className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
            >
              Get your review for $9.99
            </Link>
            <Link href="/demo" className="text-sm font-semibold text-primary hover:underline">
              See a free sample report
            </Link>
            <p className="text-sm text-slate-600">
              One-time payment · If analysis fails you are not charged · Files deleted after
              processing
            </p>
          </div>
          <div className="relative flex justify-center md:justify-end">
            <img
              src="/undraw_chat-with-ai_ir62.svg"
              alt="Illustration of reviewing documents with AI assistance"
              className="h-auto w-full max-w-md"
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-extrabold text-slate-900">How it works</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <StepCard step={1} icon={<Upload />} title="Upload" description="PDF or Word lease plus your email." />
          <StepCard step={2} icon={<ShieldCheck />} title="Pay $9.99" description="One-time, securely through PayPal." />
          <StepCard step={3} icon={<FileSearch />} title="Get results" description="A structured summary you can act on." />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-extrabold text-slate-900">See what a review looks like</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Sample on a fictional lease — no upload, no payment.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {(DEMO_ANALYSIS.tenant_issues || []).slice(0, 2).map((item) => (
            <div key={item.clause} className="rounded-xl border border-red-100 bg-red-50/70 p-5 text-left">
              <p className="text-sm font-bold text-red-800">{item.clause}</p>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-700">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
        <Link href="/demo" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">
          Full sample report
        </Link>
      </section>

      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold">Why people use it</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<FileText />}
              title="Plain English"
              description="Important terms presented in language you can actually use."
            />
            <FeatureCard
              icon={<Sparkles />}
              title="Fast"
              description="Most reviews finish in a few minutes and are emailed to you."
            />
            <FeatureCard
              icon={<ShieldCheck />}
              title="Private"
              description="Your uploaded document is deleted after processing."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-extrabold">What renters say</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <TestimonialCard
            quote="I was signing that night. It called out the renewal notice window I would have blown past."
            name="Maya"
            city="Austin"
          />
          <TestimonialCard
            quote="Report hit my inbox in a few minutes. Made it obvious what to ask about pet rent and parking."
            name="Chris"
            city="Chicago"
          />
          <TestimonialCard
            quote="First apartment with a roommate. We went through the red flags together before we both signed."
            name="Priya"
            city="Denver"
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="text-3xl font-extrabold">Ready to review your lease?</h2>
        <p className="mt-3 text-slate-700">$9.99 one-time. If analysis fails, you are not charged.</p>
        <Link
          href="/upload"
          className="mt-8 inline-block rounded-full bg-primary px-8 py-4 font-bold text-white transition hover:bg-blue-700"
        >
          Get your review for $9.99
        </Link>
      </section>

      <section className="bg-primary-light px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold">FAQ</h2>
          <div className="mt-6 space-y-4">
            <details className="rounded-xl bg-white p-5 shadow-sm">
              <summary className="cursor-pointer font-bold">Is this legal advice?</summary>
              <p className="mt-2 text-slate-700">
                No. This is informational analysis, not legal advice.
              </p>
            </details>
            <details className="rounded-xl bg-white p-5 shadow-sm">
              <summary className="cursor-pointer font-bold">What can I upload?</summary>
              <p className="mt-2 text-slate-700">PDF, DOC, and DOCX residential leases.</p>
            </details>
            <details className="rounded-xl bg-white p-5 shadow-sm">
              <summary className="cursor-pointer font-bold">How fast is it?</summary>
              <p className="mt-2 text-slate-700">
                Most reviews complete within a few minutes and are emailed to you.
              </p>
            </details>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
