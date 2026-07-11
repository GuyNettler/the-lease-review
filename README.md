# The Lease Review

US English apartment lease review product — upload a lease, pay **$19.99 USD**, get an AI report in minutes.

- **Site:** https://www.theleasereview.com  
- **Stack:** Next.js (Vercel) + Firebase Functions + PayPal + Gemini + SMTP  
- **Sibling product pattern:** cloned from Schirut’s authorize → analyze → capture pipeline

## Repo layout

```
the-lease-review/
  frontend/   # Next.js 15 app
  backend/    # Firebase Functions (Express `api`)
```

## Local frontend

```bash
cd frontend
cp .env.example .env.local   # fill values
npm install
npm run dev
```

## Backend deploy

1. Create Firebase project ID `the-lease-review` (or update `.firebaserc`).
2. Enable Anonymous Auth + Cloud Storage + Cloud Functions.
3. Set secrets / env for the `api` function (see below).
4. From `backend/functions`: `npm install`
5. From `backend`: `firebase deploy --only functions:api --project=the-lease-review`

## Environment variables

### Frontend (`frontend/.env.local`)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase web config |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | |
| `NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL` | e.g. `https://us-central1-the-lease-review.cloudfunctions.net/api` |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | PayPal REST app client ID |

### Backend (Firebase Functions env / secrets)

| Variable | Default / notes |
|----------|-----------------|
| `GEMINI_API_KEY` | Required (Secret Manager recommended) |
| `PAYPAL_ENV` | `sandbox` or `live` |
| `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` | Live |
| `PAYPAL_SANDBOX_CLIENT_ID` / `PAYPAL_SANDBOX_CLIENT_SECRET` | Sandbox |
| `PAYPAL_EXPECTED_AMOUNT` | `19.99` |
| `PAYPAL_EXPECTED_CURRENCY` | `USD` |
| `SMTP_USER` / `SMTP_PASS` | Outbound email |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_FROM` | Optional from-address |

Contact/review inbox in code: `hello@theleasereview.com` (update in `backend/functions/index.js` if you use another mailbox).

## Manual provisioning checklist

1. **Domain** — Buy/connect `theleasereview.com` → point DNS to Vercel (`www` + apex).
2. **Firebase** — New project ID `the-lease-review`, Anonymous Auth, Storage, Functions (`us-central1`).
   - If `gcloud projects create` fails with **project quota exceeded**, delete an unused GCP project (or [request a quota increase](https://support.google.com/code/contact/project_quota_increase)), then retry.
3. **PayPal** — Business app with USD; sandbox first, then live.
4. **Gemini** — API key in Secret Manager / function env.
5. **SMTP** — Gmail app password or domain mailbox (`hello@theleasereview.com`).
6. **Vercel** — `npx vercel login`, then import this repo’s `frontend/`, set env vars, production domain.
7. **Search Console** — Verify domain, submit `https://www.theleasereview.com/sitemap.xml`.

### After Firebase project exists

```bash
# Enable APIs + add Firebase web app (console or CLI), then:
cd /Users/guymain/Desktop/the-lease-review/backend
firebase functions:secrets:set GEMINI_API_KEY --project=the-lease-review
cd functions && npm install
npx firebase-tools@latest deploy --only functions:api --project=the-lease-review

# Set PayPal + SMTP on the Cloud Run service (api), then:
cd /Users/guymain/Desktop/the-lease-review/frontend
cp .env.example .env.local   # fill Firebase web config + PayPal client ID + functions URL
npx vercel --prod            # root directory = frontend
```

## Payment flow

1. User uploads PDF/DOCX + email on `/upload`.
2. PayPal **authorizes** $19.99 USD (not captured yet).
3. Backend extracts text → validates residential lease → Gemini analysis.
4. On success, PayPal **captures**; results emailed + shown on `/upload/done`.
5. On extraction/validation failure, user is **not charged**.

## Disclaimer

This product provides **informational** lease summaries only and is **not legal advice**.

## Smoke test (sandbox)

1. Set `PAYPAL_ENV=sandbox` and sandbox client credentials.
2. Upload a sample US residential lease PDF.
3. Confirm JSON analysis, email delivery, and `/upload/done`.
