"use client";
import React, { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

type PayPalButtonProps = {
  amount: string;
  currency?: string;
  onSuccess: (orderID: string) => void;
  onError?: (err: unknown) => void;
};

declare global {
  interface Window {
    paypal: PayPalNamespace;
  }
}

// Minimal PayPal types for our usage
type PurchaseUnit = { amount: { value: string; currency_code: string } };

type CreateOrderActions = {
  order: {
    create: (data: { purchase_units: PurchaseUnit[] }) => Promise<string> | string;
  };
};

type OnApproveData = { orderID: string };

type OnApproveActions = {
  order: {
    capture: () => Promise<unknown> | unknown;
  };
};

type ButtonsOptions = {
  style?: { layout?: string; color?: string; shape?: string; label?: string };
  createOrder: (data: unknown, actions: CreateOrderActions) => Promise<string> | string;
  onApprove: (data: OnApproveData, actions: OnApproveActions) => Promise<void> | void;
  onError?: (err: unknown) => void;
};

type PayPalButtons = {
  render: (container: HTMLElement) => void;
};

type PayPalNamespace = {
  Buttons: (options: ButtonsOptions) => PayPalButtons;
};

export default function PayPalButton({
  amount,
  currency = "USD",
  onSuccess,
  onError,
}: PayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    // Load PayPal SDK if not already loaded
    if (window.paypal) {
      setSdkReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&components=buttons&currency=${currency}&intent=authorize&disable-funding=venmo&commit=false`;
    script.async = true;
    script.onload = () => setSdkReady(true);
    script.onerror = (err) => onError?.(err);
    document.body.appendChild(script);
    // Cleanup
    return () => {
      script.remove();
    };
  }, [currency, onError]);

  useEffect(() => {
    if (sdkReady && paypalRef.current) {
      paypalRef.current.innerHTML = "";
      const buttons = window.paypal.Buttons({
          style: { layout: "vertical", color: "blue", shape: "pill", label: "pay" },
          createOrder: function (_data: unknown, actions: CreateOrderActions) {
            track("paypal_click", {
              site: "theleasereview",
              amount,
              currency,
            });
            return actions.order.create({
              purchase_units: [{
                amount: { value: amount, currency_code: currency },
              }],
            });
          },
          onApprove: async (data: OnApproveData, _actions: OnApproveActions) => {
            // Don’t capture here — just pass orderID to backend
            onSuccess(data.orderID);
          },
          onError: function (err: unknown) {
            try { console.error('[paypal] onError', err); } catch {}
            onError?.(err);
          },
        })
        .render(paypalRef.current);
    }
  }, [sdkReady, amount, currency, onSuccess, onError]);

  return <div ref={paypalRef} />;
} 