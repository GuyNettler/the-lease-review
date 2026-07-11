# Fix Firebase Deployment Issues

## Problem: "Unexpected key extensions" Error

This error typically means your Firebase CLI is outdated or there's a cache issue.

## Solution Steps

### Step 1: Update Firebase CLI

```bash
# Update Firebase CLI to latest version
npm install -g firebase-tools@latest

# If you get permission errors, try:
sudo npm install -g firebase-tools@latest

# Or use npx (no global install needed):
npx firebase-tools@latest deploy --only functions:tlrApi --project=schirut-3ca36
```

### Step 2: Clear Firebase Cache

```bash
# Clear Firebase cache
rm -rf ~/.cache/firebase
rm -rf .firebase
```

### Step 3: Verify Configuration

Make sure your `firebase.json` doesn't have any invalid keys. The current one looks correct.

### Step 4: Deploy

```bash
cd /Users/guymain/Desktop/the-lease-review/backend/functions
firebase deploy --only functions:tlrApi --project=schirut-3ca36
```

## Alternative: Use the Deployment Script

```bash
cd /Users/guymain/Desktop/the-lease-review/backend
./deploy-function.sh
```

## If Still Having Issues

### Option A: Use npx (Bypasses Global Install Issues)

```bash
cd /Users/guymain/Desktop/the-lease-review/backend/functions
npx firebase-tools@latest deploy --only functions:tlrApi --project=schirut-3ca36
```

### Option B: Check Firebase CLI Version

```bash
firebase --version
# Should be 13.0.0 or higher for Firebase Functions v2
```

### Option C: Deploy from Backend Directory

Sometimes deploying from the backend directory (not functions) works better:

```bash
cd /Users/guymain/Desktop/the-lease-review/backend
firebase deploy --only functions:tlrApi --project=schirut-3ca36
```

## Setting Up Secrets

Before deploying, make sure your secret is configured:

```bash
# Check if secret exists
gcloud secrets list --project=schirut-3ca36 --filter="name:GEMINI_API_KEY"

# If it doesn't exist, create it:
gcloud secrets create GEMINI_API_KEY \
  --project=schirut-3ca36 \
  --data-file=- <<< "your-api-key-value"

# Or add a new version:
gcloud secrets versions add GEMINI_API_KEY \
  --project=schirut-3ca36 \
  --data-file=- <<< "your-new-api-key-value"
```

Then configure Firebase to use it:

```bash
cd /Users/guymain/Desktop/the-lease-review/backend
firebase functions:secrets:set GEMINI_API_KEY --project=schirut-3ca36
```

