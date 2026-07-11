#!/bin/bash

# Script to deploy Firebase Function with proper setup

set -e

PROJECT_ID="schirut-3ca36"
FUNCTION_NAME="tlrApi"

echo "🚀 Deploying Firebase Function: $FUNCTION_NAME"
echo ""

# Navigate to backend directory
cd "$(dirname "$0")"

# Check if we're in the right directory
if [ ! -f "firebase.json" ]; then
    echo "❌ Error: firebase.json not found. Make sure you're in the backend directory."
    exit 1
fi

# Check Firebase CLI version
echo "📋 Checking Firebase CLI version..."
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Install it with: npm install -g firebase-tools"
    exit 1
fi

FIREBASE_VERSION=$(firebase --version 2>/dev/null || echo "unknown")
echo "   Firebase CLI version: $FIREBASE_VERSION"
echo ""

# Check if dependencies are installed
echo "📦 Checking dependencies..."
if [ ! -d "functions/node_modules" ]; then
    echo "⚠️  node_modules not found. Installing dependencies..."
    cd functions
    npm install
    cd ..
else
    echo "✅ Dependencies found"
fi

# Check if GEMINI_API_KEY secret is configured
echo ""
echo "🔐 Checking secret configuration..."
SECRET_EXISTS=$(gcloud secrets list --project=$PROJECT_ID --filter="name:GEMINI_API_KEY" --format="value(name)" 2>/dev/null || echo "")

if [ -z "$SECRET_EXISTS" ]; then
    echo "⚠️  Warning: GEMINI_API_KEY secret not found in Secret Manager"
    echo "   Make sure the secret exists before deploying"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ Secret found in Secret Manager"
fi

# Deploy the function
echo ""
echo "🚀 Deploying function..."
echo ""

cd functions
firebase deploy --only functions:$FUNCTION_NAME --project=$PROJECT_ID

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "The function is now deployed and using the latest secret from Secret Manager."
else
    echo ""
    echo "❌ Deployment failed. Check the error messages above."
    exit 1
fi

