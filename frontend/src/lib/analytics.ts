"use client";

import { track as vercelTrack } from "@vercel/analytics";

type TrackProps = Record<string, string | number | boolean | undefined>;

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
}

export function trackBeginCheckout(payload: {
  site: string;
  amount: number;
  currency: string;
}) {
  track("begin_checkout", payload);
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
  track("paid_completion", {
    order_id: payload.orderId,
    amount: payload.amount ?? 9.99,
    currency: payload.currency || "USD",
  });
}
