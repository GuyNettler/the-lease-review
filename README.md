# The Lease Review

US English apartment lease review product — upload a lease, pay **$9.99 USD**, get an AI report in minutes.

- **Site:** https://www.theleasereview.com  
- **Repo:** https://github.com/GuyNettler/the-lease-review  
- **Stack:** Next.js (Vercel) + Firebase Functions + PayPal + Gemini + SMTP  
- **Sibling:** shares Firebase project `schirut-3ca36` with [Schirut](https://github.com/GuyNettler/schirut), isolated by function name + storage prefix

## Repo layout

```
the-lease-review/
  frontend/   # Next.js 15 app
  backend/    # Firebase Functions (Express `tlrApi`)
```

## Shared Firebase (with Schirut)

| Concern | Schirut | The Lease Review |
|---------|---------|------------------|
| Project | `schirut-3ca36` | same |
| Function | `api` | `tlrApi` (codebase `tlr`) |
| Storage | `contracts/…`, `rejected/…` | `tlr/contracts/…`, `tlr/rejected/…` |
| PayPal | ILS ~20 | USD 9.99 (separate Cloud Run env) |
| Frontend URL | `…/api` | `https://us-central1-schirut-3ca36.cloudfunctions.net/tlrApi` |

Always deploy with `--only functions:tlrApi` so Schirut’s `api` is untouched.

## Local frontend

```bash
cd frontend
cp .env.example .env.local   # fill values (reuse Schirut web config OK)
npm install
npm run dev
```

## Backend deploy

```bash
cd backend/functions && npm install
cd ..
npx firebase-tools@latest deploy --only functions:tlrApi --project=schirut-3ca36
```

Then set **PayPal + SMTP** env vars on the `tlrApi` Cloud Run service (USD). `GEMINI_API_KEY` can stay the shared Secret Manager secret.

## Environment variables

### Frontend (`frontend/.env.local`)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_FIREBASE_*` | Same project as Schirut (`schirut-3ca36`) |
| `NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL` | `https://us-central1-schirut-3ca36.cloudfunctions.net/tlrApi` |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | PayPal REST app client ID (USD) |

### Backend (Cloud Run env / secrets for `tlrApi`)

| Variable | Default / notes |
|----------|-----------------|
| `GEMINI_API_KEY` | Shared Secret Manager OK |
| `PAYPAL_ENV` | `sandbox` or `live` |
| `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` | Live USD app |
| `PAYPAL_SANDBOX_CLIENT_ID` / `PAYPAL_SANDBOX_CLIENT_SECRET` | Sandbox |
| `PAYPAL_EXPECTED_AMOUNT` | `9.99` |
| `PAYPAL_EXPECTED_CURRENCY` | `USD` |
| `SMTP_USER` / `SMTP_PASS` | Outbound email |
| `SMTP_HOST` / `SMTP_PORT` | `smtp.gmail.com` / `465` |
| `SMTP_FROM` | Optional |
| `TLR_STORAGE_PREFIX` | `tlr` |

Contact/review inbox: `hello@theleasereview.com`.

## Manual provisioning checklist

1. **Domain** — Buy/connect `theleasereview.com` → DNS to Vercel (`www` + apex).
2. **Firebase** — Reuse `schirut-3ca36`; deploy `tlrApi`; optional second web app for TLR.
3. **PayPal** — USD Business app; sandbox first, then live (separate from Schirut ILS).
4. **Gemini** — Already on Schirut; bind secret to `tlrApi` if needed.
5. **SMTP** — Mailbox for `hello@theleasereview.com` (or Gmail app password).
6. **Vercel** — Import this repo, root `frontend/`, set env vars, attach domain.
7. **Search Console** — Verify domain; submit sitemap.

## Payment flow

1. User uploads PDF/DOCX + email on `/upload`.
2. PayPal **authorizes** $9.99 USD (not captured yet).
3. Backend extracts text → validates residential lease → Gemini analysis.
4. On success, PayPal **captures**; results emailed + shown on `/upload/done`.
5. On extraction/validation failure, user is **not charged**.

## Disclaimer

This product provides **informational** lease summaries only and is **not legal advice**.

## Smoke test (sandbox)

1. Set `PAYPAL_ENV=sandbox` and sandbox client credentials on `tlrApi`.
2. Upload a sample US residential lease PDF.
3. Confirm JSON analysis, email delivery, and `/upload/done`.
