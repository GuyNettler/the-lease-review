// firebaseAdmin.js
import admin from 'firebase-admin';
import functions from 'firebase-functions';

let storageBucket;

// Try to use Firebase Functions config if available
try {
  const cfg = functions.config && functions.config();
  if (cfg?.app?.storage_bucket) {
    storageBucket = cfg.app.storage_bucket; // custom bucket from functions config
  } else if (cfg?.firebase?.storageBucket) {
    storageBucket = cfg.firebase.storageBucket; // default bucket from firebase config
  }
} catch (_) {
  // Ignore; functions.config() may not exist locally
}

// Fallback: use Firebase Admin default bucket automatically
if (!storageBucket) {
  // Passing nothing to initializeApp lets admin pick up the project default bucket
  admin.initializeApp();
} else {
  admin.initializeApp({ storageBucket });
}

const storage = admin.storage();

export { admin, storage };
