import Script from "next/script";

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";

function isSafeAdsId(id: string) {
  return /^[A-Z]{1,3}-\d+$/.test(id) || /^G-[A-Z0-9]+$/.test(id);
}

export default function GoogleAdsTag() {
  if (!ADS_ID || !isSafeAdsId(ADS_ID)) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ADS_ID}');`}
      </Script>
    </>
  );
}
