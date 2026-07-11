# How to Update GEMINI_API_KEY Secret in Cloud Run

The error you're seeing (`Image 'us-central1-docker.pkg.dev/.../version_1' not found`) occurs because Cloud Run is trying to use an old Docker image that no longer exists when you edit the service in the console.

## Solution 1: Update Secret Reference Without Rebuilding (Recommended)

This updates the secret reference without touching the Docker image.

### Step 1: Find your Cloud Run service name
```bash
gcloud run services list --project=the-lease-review --region=us-central1
```

### Step 2: Update the service to use the secret from Secret Manager
```bash
# Replace 'api' with your actual service name from Step 1
# Replace 'GEMINI_API_KEY' with your actual secret name in Secret Manager
gcloud run services update api \
  --project=the-lease-review \
  --region=us-central1 \
  --update-secrets=GEMINI_API_KEY=GEMINI_API_KEY:latest
```

**OR** if you need to set it as an environment variable from the secret:
```bash
gcloud run services update api \
  --project=the-lease-review \
  --region=us-central1 \
  --set-secrets=GEMINI_API_KEY=GEMINI_API_KEY:latest
```

### Step 3: Verify the update
```bash
gcloud run services describe api \
  --project=the-lease-review \
  --region=us-central1 \
  --format="value(spec.template.spec.containers[0].env)"
```

## Solution 2: Redeploy via Firebase Functions (Creates New Image)

If you need to redeploy the entire function (which will create a new Docker image):

### Step 1: Make sure your secret is updated in Secret Manager
```bash
# View your secret (to verify it exists)
gcloud secrets list --project=the-lease-review

# Update the secret value if needed
gcloud secrets versions add GEMINI_API_KEY \
  --project=the-lease-review \
  --data-file=- <<< "your-new-api-key-value"
```

### Step 2: Configure Firebase Functions to use the secret
```bash
cd /Users/guymain/Desktop/the-lease-review/backend

# Set the secret reference in Firebase Functions config
firebase functions:secrets:set GEMINI_API_KEY --project=the-lease-review
```

### Step 3: Deploy the function (this will create a new Docker image)
```bash
cd functions
firebase deploy --only functions:api --project=the-lease-review
```

## Solution 3: Update Secret via Console (Alternative)

If you prefer using the GCP Console:

1. Go to [Cloud Run Console](https://console.cloud.google.com/run)
2. Select your service (`api` or similar)
3. Click **EDIT & DEPLOY NEW REVISION**
4. **IMPORTANT**: Don't change the Container image URL - leave it as is
5. Go to **Variables & Secrets** tab
6. Click **ADD VARIABLE** or edit existing `GEMINI_API_KEY`
7. Select **Reference a secret**
8. Choose your secret from Secret Manager
9. Click **DEPLOY** (this should work since you're not changing the image)

## Troubleshooting

### If you still get the image error:
The service might be configured with a specific image tag. Check the current image:
```bash
gcloud run services describe api \
  --project=the-lease-review \
  --region=us-central1 \
  --format="value(spec.template.spec.containers[0].image)"
```

If it shows `version_1` or similar, you may need to:
1. Find a working image version in Artifact Registry, OR
2. Redeploy via Firebase Functions (Solution 2) to create a new image

### Check available images:
```bash
gcloud artifacts docker images list \
  us-central1-docker.pkg.dev/the-lease-review/gcf-artifacts \
  --project=the-lease-review
```

## Quick Fix Script

You can also use the provided script:
```bash
cd /Users/guymain/Desktop/the-lease-review/backend
./update-secret.sh
```

Make sure to edit the script first to set the correct `SERVICE_NAME` and `SECRET_NAME`.

