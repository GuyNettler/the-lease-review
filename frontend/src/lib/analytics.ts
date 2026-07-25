import { track as vercelTrack } from "@vercel/analytics";

type TrackProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Funnel events via Vercel Analytics (+ gtag if present later). */
export function track(event: string, props: TrackProps = {}) {
  if (typeof window === "undefined") return;

  try {
    const clean: Record<string, string | number | boolean> = {};
    for (const [k, v] of Object.entries(props)) {
      if (v !== undefined) clean[k] = v;
    }
    vercelTrack(event, clean);
  } catch {
    /* ignore */
  }

  try {
    window.gtag?.("event", event, props);
  } catch {
    /* ignore */
  }
}

export function trackPaidCompletionOnce(opts: {
  orderId: string;
  amount: string;
  currency: string;
}) {
  if (typeof window === "undefined" || !opts.orderId) return;
  const key = `tracked_paid_${opts.orderId}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    /* continue */
  }

  track("paid_completion", {
    order_id: opts.orderId,
    amount: opts.amount,
    currency: opts.currency,
  });
}
