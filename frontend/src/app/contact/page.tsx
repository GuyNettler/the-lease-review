"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sent || loading) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "Contact request failed");
      }
      setSent(true);
    } catch {
      setError("Couldn't send your message. Please try again, or email hello@theleasereview.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-primary-light text-left">
      <SiteHeader />
      <section className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <Mail className="text-primary" size={32} />
          <h1 className="text-3xl font-bold text-primary">Contact us</h1>
        </div>
        <p className="text-gray-700">
          Questions about The Lease Review? Send a message and we&apos;ll get back to you.
          We cannot provide legal advice or interpret your individual legal rights by email.
        </p>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-10 text-green-700">
            <CheckCircle size={40} className="text-green-500" />
            <p className="text-lg font-bold">Message sent. Thanks for reaching out.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-sm font-medium text-gray-700">
              Full name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded border border-gray-300 p-2"
                required
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded border border-gray-300 p-2"
                required
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded border border-gray-300 p-2"
                rows={4}
                required
              />
            </label>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-lg font-semibold text-white shadow transition hover:bg-blue-700 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  <Send size={20} /> Send message
                </>
              )}
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        )}

        <p className="text-sm text-gray-500">
          Or email{" "}
          <a href="mailto:hello@theleasereview.com" className="underline">
            hello@theleasereview.com
          </a>
        </p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
