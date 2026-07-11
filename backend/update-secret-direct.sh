#!/bin/bash

# Direct script to update GEMINI_API_KEY secret in Cloud Run
# This avoids the Docker image rebuild issue

PROJECT_ID="the-lease-review"
REGION="us-central1"

echo "Finding Cloud Run services..."
SERVICES=$(gcloud run services list --project=$PROJECT_ID --region=$REGION --format="value(metadata.name)")

if [ -z "$SERVICES" ]; then
    echo "No Cloud Run services found. Checking if this is a Firebase Functions deployment..."
    echo ""
    echo "For Firebase Functions v2, the service name is usually:"
    echo "  the-lease-review-us-central1-api"
    echo ""
    read -p "Enter your Cloud Run service name (or press Enter to use default): " SERVICE_NAME
    SERVICE_NAME=${SERVICE_NAME:-"the-lease-review-us-central1-api"}
else
    echo "Found services:"
    echo "$SERVICES"
    echo ""
    read -p "Enter the service name to update (or press Enter to use first one): " SERVICE_NAME
    if [ -z "$SERVICE_NAME" ]; then
        SERVICE_NAME=$(echo "$SERVICES" | head -n1)
    fi
fi

echo ""
echo "Updating service: $SERVICE_NAME"
echo ""

# Update the service to use the secret from Secret Manager
# This updates the environment variable without rebuilding the image
gcloud run services update "$SERVICE_NAME" \
  --project=$PROJECT_ID \
  --region=$REGION \
  --update-secrets=GEMINI_API_KEY=GEMINI_API_KEY:latest

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! The secret has been updated."
    echo ""
    echo "To verify, check the service:"
    echo "gcloud run services describe $SERVICE_NAME --project=$PROJECT_ID --region=$REGION"
else
    echo ""
    echo "❌ Update failed. Trying alternative method..."
    echo ""
    echo "Attempting to set secret as environment variable..."
    gcloud run services update "$SERVICE_NAME" \
      --project=$PROJECT_ID \
      --region=$REGION \
      --set-secrets=GEMINI_API_KEY=GEMINI_API_KEY:latest
fi

