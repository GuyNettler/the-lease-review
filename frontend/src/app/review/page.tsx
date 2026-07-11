"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Star, Send, CheckCircle } from "lucide-react";

export default function ReviewPage() {
  const [analysis, setAnalysis] = useState("");
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

  useEffect(() => {
    const raw = sessionStorage.getItem("analysis");
    if (!raw) {
      setAnalysis(
        "Your review is not available in this browser session. If you completed an upload, please check your email."
      );
      return;
    }
    try {
      if (raw.startsWith("{")) {
        setAnalysis(JSON.stringify(JSON.parse(raw), null, 2));
      } else {
        setAnalysis(raw);
      }
    } catch {
      setAnalysis(raw);
    }
  }, []);

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
      setError("Couldn't send feedback. Please try again, or email hello@theleasereview.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-primary-light px-4 py-10 text-left">
      <section className="mx-auto flex max-w-3xl flex-col gap-6">
        <Link href="/" className="text-sm font-semibold text-primary hover:text-blue-700">
          ← Home
        </Link>
        <h1 className="text-4xl font-extrabold text-primary">Your lease review</h1>
        <div className="whitespace-pre-wrap rounded-xl bg-white p-6 leading-relaxed shadow">
          <pre className="overflow-auto whitespace-pre-wrap font-sans text-sm text-slate-800">
            {analysis}
          </pre>
        </div>

        <section className="rounded-xl bg-white p-6 shadow">
          <div className="mb-3 flex items-center gap-2">
            <Star className="text-primary" size={24} />
            <h2 className="text-xl font-bold">Was this review helpful?</h2>
          </div>
          <p className="mb-4 text-sm text-gray-600">
            A short note helps other renters decide before they sign.
          </p>

          {sent ? (
            <div className="flex flex-col items-center gap-3 py-6 text-green-700">
              <CheckCircle size={36} className="text-green-500" />
              <p className="font-bold">Thanks for your feedback.</p>
              <Link href="/upload" className="font-semibold text-primary underline">
                Review another lease
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-700">
                Name (or initials)
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded border border-gray-300 p-2"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded border border-gray-300 p-2"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                City (optional)
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded border border-gray-300 p-2"
                  placeholder="Austin"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Your feedback
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-1 block w-full rounded border border-gray-300 p-2"
                  placeholder="Example: It flagged an automatic renewal clause I almost missed."
                />
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="allowPublish"
                  checked={form.allowPublish}
                  onChange={handleChange}
                />
                Allow publishing this feedback on the site (name/city only)
              </label>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                <Send size={18} />
                {loading ? "Sending..." : "Send feedback"}
              </button>
            </form>
          )}
        </section>

        <p className="text-sm text-slate-600">
          This review is informational only and is not legal advice.
        </p>
      </section>
    </main>
  );
}
