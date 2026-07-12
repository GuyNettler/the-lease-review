"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Send, Star } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function ReviewPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    message: "",
    allowPublish: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          type: "review",
          city: form.city,
          allowPublish: form.allowPublish,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setSent(true);
    } catch {
      setError("Couldn't send feedback. Try again or email hello@theleasereview.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-primary-light text-left">
      <SiteHeader />
      <section className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <Link href="/upload/done" className="text-sm font-semibold text-primary hover:text-blue-700">
          ← Back to results
        </Link>
        <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-3 flex items-center gap-2">
            <Star className="text-primary" size={24} />
            <h1 className="text-2xl font-extrabold text-primary">Was this review helpful?</h1>
          </div>
          <p className="mb-6 text-sm text-slate-600">
            One sentence helps other renters decide before they sign.
          </p>

          {sent ? (
            <div className="flex flex-col items-center gap-3 py-8 text-green-700">
              <CheckCircle size={40} className="text-green-500" />
              <p className="font-bold">Thanks for your feedback.</p>
              <Link href="/upload" className="font-semibold text-primary underline">
                Review another lease
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="text-sm font-medium text-slate-700">
                Name (or initials)
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded border border-slate-300 p-2"
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded border border-slate-300 p-2"
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                City (optional)
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded border border-slate-300 p-2"
                  placeholder="Austin"
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Your feedback
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-1 block w-full rounded border border-slate-300 p-2"
                  placeholder="Example: It flagged an automatic renewal clause I almost missed."
                />
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="allowPublish"
                  checked={form.allowPublish}
                  onChange={handleChange}
                />
                Allow publishing this feedback on the site (name/city only)
              </label>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                <Send size={18} />
                {loading ? "Sending..." : "Send feedback"}
              </button>
            </form>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
