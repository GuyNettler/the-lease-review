# Quick Deploy Instructions

## The Problem
You're getting: `Error: Failed to parse build specification: - FirebaseError Unexpected key extensions`

This means your Firebase CLI is outdated.

## Quick Fix (Choose One)

### Option 1: Use npx (Recommended - No Installation Needed)
```bash
cd /Users/guymain/Desktop/the-lease-review/backend/functions
npx firebase-tools@latest deploy --only functions:api --project=the-lease-review
```

### Option 2: Update Firebase CLI Globally
```bash
# Update Firebase CLI
npm install -g firebase-tools@latest

# If permission errors:
sudo npm install -g firebase-tools@latest

# Then deploy
cd /Users/guymain/Desktop/the-lease-review/backend/functions
firebase deploy --only functions:api --project=the-lease-review
```

### Option 3: Deploy from Backend Directory
Sometimes this works better:
```bash
cd /Users/guymain/Desktop/the-lease-review/backend
firebase deploy --only functions:api --project=the-lease-review
```

## Before Deploying: Set Up Secret

Make sure your GEMINI_API_KEY secret is configured in Firebase:

```bash
cd /Users/guymain/Desktop/the-lease-review/backend
firebase functions:secrets:set GEMINI_API_KEY --project=the-lease-review
```

This will prompt you to select the secret from Secret Manager.

## Full Deployment Command

Once Firebase CLI is updated:

```bash
cd /Users/guymain/Desktop/the-lease-review/backend/functions
firebase deploy --only functions:api --project=the-lease-review
```

