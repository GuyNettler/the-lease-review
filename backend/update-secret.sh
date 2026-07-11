#!/bin/bash

# Script to update GEMINI_API_KEY secret in Cloud Run service
# This updates the secret reference without rebuilding the image

set -e

PROJECT_ID="schirut-3ca36"
REGION="us-central1"
SERVICE_NAME="tlrapi"  # Adjust if your service name is different
SECRET_NAME="GEMINI_API_KEY"  # Adjust if your secret name is different

echo "Updating Cloud Run service to use secret from Secret Manager..."

# First, let's check what Cloud Run services exist
echo "Listing Cloud Run services..."
gcloud run services list --project=$PROJECT_ID --region=$REGION

echo ""
echo "Please confirm the service name above. If it's different, update SERVICE_NAME in this script."
echo ""

# Update the Cloud Run service to use the secret
# This command updates the environment variable to reference the secret
gcloud run services update $SERVICE_NAME \
  --project=$PROJECT_ID \
  --region=$REGION \
  --update-secrets=GEMINI_API_KEY=$SECRET_NAME:latest \
  --no-traffic

echo ""
echo "Secret updated successfully!"
echo "The service is now using the latest version of the secret from Secret Manager."
echo ""
echo "To verify, check the service configuration:"
echo "gcloud run services describe $SERVICE_NAME --project=$PROJECT_ID --region=$REGION"

