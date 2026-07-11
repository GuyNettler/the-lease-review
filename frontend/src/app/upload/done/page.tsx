"use client";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
export default function UploadDonePage() {
  return <main className="flex min-h-screen items-center justify-center bg-primary-light p-6 text-left"><section className="max-w-lg rounded-2xl bg-white p-8 text-center shadow"><CheckCircle2 className="mx-auto h-14 w-14 text-green-500" /><h1 className="mt-4 text-3xl font-extrabold text-primary">Your lease review is ready</h1><p className="mt-3 text-slate-700">We also sent a copy to the email address you provided.</p><Link href="/review" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-bold text-white">View your review</Link><p className="mt-5 text-xs text-slate-500">The Lease Review is informational only and is not legal advice.</p></section></main>;
}
