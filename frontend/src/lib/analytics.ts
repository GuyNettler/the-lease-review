"use client";

import { track as vercelTrack } from "@vercel/analytics";

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
const ADS_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || "";

type TrackProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: string, props: TrackProps = {}) {
  if (typeof window === "undefined") return;
  try {
    const clean: Record<string, string | number | boolean> = {};
    for (const [k, v] of Object.entries(props)) {
      if (v !== undefined) clean[k] = v;
    }
    vercelTrack(event, clean);
  } catch {
    // analytics must never break checkout
  }
  try {
    window.gtag?.("event", event, props);
  } catch {
    // ignore
  }
}

export function trackBeginCheckout(payload: {
  site: string;
  amount: number;
  currency: string;
}) {
  track("begin_checkout", payload);
  try {
    window.fbq?.("track", "InitiateCheckout", {
      currency: payload.currency,
      value: payload.amount,
    });
  } catch {
    // ignore
  }
}

export function trackPaidCompletionOnce(payload: {
  orderId: string;
  amount?: string | number;
  currency?: string;
}) {
  if (typeof window === "undefined" || !payload.orderId) return;
  const key = `tracked_paid_${payload.orderId}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    // continue
  }
  const amount = Number(payload.amount ?? 9.99);
  const currency = payload.currency || "USD";
  track("paid_completion", {
    order_id: payload.orderId,
    amount: payload.amount ?? amount,
    currency,
  });
  try {
    if (ADS_ID) {
      const sendTo = ADS_LABEL ? `${ADS_ID}/${ADS_LABEL}` : ADS_ID;
      window.gtag?.("event", "conversion", {
        send_to: sendTo,
        value: amount,
        currency,
        transaction_id: payload.orderId,
      });
    }
    window.gtag?.("event", "purchase", {
      transaction_id: payload.orderId,
      value: amount,
      currency,
    });
    window.fbq?.("track", "Purchase", { value: amount, currency });
  } catch {
    // ignore
  }
}
