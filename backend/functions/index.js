import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
setGlobalOptions({ region: 'us-central1', timeoutSeconds: 300 });

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { storage } from './firebaseAdmin.js'; // make sure to add .js for local imports
import path from 'path';
import pdfParse from 'pdf-parse-fixed';
import mammoth from 'mammoth';
import { GoogleGenAI } from '@google/genai';
import axios from 'axios';
import { z } from 'zod';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import nodemailer from 'nodemailer';

const ENGLISH_PROMPT = `
You are an expert at reviewing U.S. residential apartment/house lease agreements.
Review the attached lease and return ONLY a valid JSON object (no extra text).

JSON structure must be:
{
  "important": [
    { "clause": "...", "severity": "low|medium|high", "explanation": "...", "recommendation": "..." }
  ],
  "tenant_issues": [
    { "clause": "...", "severity": "low|medium|high", "explanation": "...", "recommendation": "..." }
  ],
  "landlord_issues": [
    { "clause": "...", "severity": "low|medium|high", "explanation": "...", "recommendation": "..." }
  ],
  "missing_or_unclear": [
    { "clause": "...", "severity": "low|medium|high", "explanation": "...", "recommendation": "..." }
  ],
  "summary": "..."
}

Focus on common U.S. residential lease issues: security deposits, fees, rent increases, early termination, automatic renewal, maintenance vs tenant responsibility, landlord entry, guests/pets, guarantors/cosigners, utilities, and move-out conditions.
All string values must be in clear, plain English.
This is informational only and is not legal advice.
`;


const clauseSchema = z.object({
  clause: z.string(),
  severity: z.enum(["low", "medium", "high"]),
  explanation: z.string(),
  recommendation: z.string(),
});

const analysisSchema = z.object({
  important: z.array(clauseSchema).optional(),
  tenant_issues: z.array(clauseSchema).optional(),
  landlord_issues: z.array(clauseSchema).optional(),
  missing_or_unclear: z.array(clauseSchema).optional(),
  summary: z.string().optional(),
});

const app = express();

// CORS
app.use(cors({
  origin: true,
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-orderid', 'x-userid', 'x-filename', 'x-prompt', 'x-email'],
  credentials: true,
}));

// Multer memory storage
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });

// ---------------- Email (Text-only via SMTP) ----------------
let mailTransporter;
function getMailTransporter() {
  if (mailTransporter) return mailTransporter;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 465);
  if (!user || !pass) {
    console.warn('SMTP_USER/SMTP_PASS not configured; emails will not be sent');
    return null;
  }
  console.log('[email] Initializing SMTP transporter', { host, port, hasUser: !!user });
  mailTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return mailTransporter;
}

function buildPlainTextEmail({
  toEmail,
  orderID,
  originalFile,
  parsedTextFile,
  fileName,
  fileSizeBytes,
  analysis,
}) {
  const sizeMB = fileSizeBytes ? (fileSizeBytes / 1024 / 1024).toFixed(2) : undefined;
  const now = new Date().toLocaleString('en-US');

  const sections = [];
  sections.push(
    `Hello,
Your residential lease review is ready. Here are the details:`
  );
  sections.push(
    `General:
- Date: ${now}
- Order ID: ${orderID || '-'}
- File: ${fileName || originalFile || '-'}${sizeMB ? ` (${sizeMB} MB)` : ''}
`
  );
  if (analysis?.summary) {
    sections.push(`Summary:
${analysis.summary}`);
  }

  function sectionFromArray(title, arr) {
    if (!Array.isArray(arr) || arr.length === 0) return '';
    const items = arr
      .map((i, idx) => `(${idx + 1}) ${i.clause}
- Severity: ${i.severity}
- Explanation: ${i.explanation}${i.recommendation ? `
- Recommendation: ${i.recommendation}` : ''}`)
      .join('

');
    return `${title}:
${items}`;
  }

  const importantStr = sectionFromArray('Important clauses', analysis?.important);
  const tenantStr = sectionFromArray('Potential tenant concerns', analysis?.tenant_issues);
  const landlordStr = sectionFromArray('Potential landlord concerns', analysis?.landlord_issues);
  const missingStr = sectionFromArray('Missing or unclear items', analysis?.missing_or_unclear);

  [importantStr, tenantStr, landlordStr, missingStr].forEach(s => { if (s) sections.push(s); });

  sections.push('Privacy note: files are kept only as needed for processing and may be deleted automatically afterward.');

  sections.push(
    `Was this review helpful?
We would love a one-sentence review (we may publish it with your permission):
https://www.theleasereview.com/review

Thank you,
The Lease Review team`
  );

  const text = sections.filter(Boolean).join('

');
  const subject = 'Your lease review – copy of results';
  return { to: toEmail, subject, text };
}

function buildHtmlEmail({
  toEmail,
  orderID,
  originalFile,
  parsedTextFile,
  fileName,
  fileSizeBytes,
  analysis,
}) {
  const now = new Date().toLocaleString('en-US');

  const escape = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const section = (title, body) => body ? `
    <div style="margin:16px 0;">
      <div style="font-weight:800;color:#111827;margin-bottom:8px;font-size:16px;">${escape(title)}</div>
      <div style="white-space:pre-wrap;line-height:1.7;color:#1f2937;">${body}</div>
    </div>` : '';

  const severityLabel = (sev) => {
    const s = String(sev || '').toLowerCase();
    if (s === 'high') return 'High';
    if (s === 'medium') return 'Medium';
    if (s === 'low') return 'Low';
    return String(sev || '');
  };
  const sevColors = (sev) => {
    const s = String(sev || '').toLowerCase();
    if (s === 'high') return { bg:'#fee2e2', border:'#fecaca', text:'#991b1b' };
    if (s === 'medium') return { bg:'#fef3c7', border:'#fde68a', text:'#92400e' };
    return { bg:'#dbeafe', border:'#bfdbfe', text:'#1e3a8a' };
  };
  const sevBadge = (sev) => {
    const c = sevColors(sev);
    return `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;background:${c.bg};border:1px solid ${c.border};color:${c.text};font-weight:700;font-size:12px;">${severityLabel(sev)}</span>`;
  };

  const listFromArray = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return '';
    const items = arr.map((i, idx) => `
      <li style="margin-bottom:12px;padding:12px;border:1px solid #e5e7eb;border-radius:12px;background:#fafafa;list-style:none;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="font-weight:800;color:#0f172a;">(${idx + 1})</span>
          <span style="font-weight:700;color:#0f172a;">${escape(i.clause)}</span>
          ${sevBadge(i.severity)}
        </div>
        <div style="color:#374151;">${escape(i.explanation)}</div>
        ${i.recommendation ? `<div style=\"color:#1f4f7a;margin-top:6px;font-weight:600;\">Recommendation:</div><div style=\"color:#1f4f7a;\">${escape(i.recommendation)}</div>` : ''}
      </li>`).join('');
    return `<ul style="margin:0;padding-left:0;">${items}</ul>`;
  };

  const general = `
    <div>- Date: ${escape(now)}</div>
  `;

  const html = `
  <div dir="ltr" style="direction:ltr;text-align:left;font-family: 'DM Sans', Roboto, Arial, sans-serif;background:#f9fafb;padding:16px;">
    <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:16px 20px;">
      <div style="font-size:18px;font-weight:800;color:#1d4ed8;margin-bottom:12px;">Your lease review – copy of results</div>
      <div style="color:#111827;margin-bottom:10px;">Hello, your residential lease review is ready.</div>
      ${section('General', general)}
      ${analysis?.summary ? section('Summary', `<div>${escape(analysis.summary)}</div>`) : ''}
      ${section('Important clauses', listFromArray(analysis?.important))}
      ${section('Potential tenant concerns', listFromArray(analysis?.tenant_issues))}
      ${section('Potential landlord concerns', listFromArray(analysis?.landlord_issues))}
      ${section('Missing or unclear items', listFromArray(analysis?.missing_or_unclear))}
      <div style="margin-top:12px;color:#6b7280;font-size:12px;">Privacy note: files are kept only as needed for processing and may be deleted automatically afterward.</div>
      <div style="margin-top:20px;padding:16px;border-radius:12px;background:#eff6ff;border:1px solid #bfdbfe;">
        <div style="font-weight:800;color:#1d4ed8;margin-bottom:8px;">Was this review helpful?</div>
        <div style="color:#1e3a8a;margin-bottom:10px;line-height:1.6;">Send a one-sentence review. With your permission we may publish it on the site.</div>
        <a href="https://www.theleasereview.com/review" style="display:inline-block;background:#1d4ed8;color:#ffffff;text-decoration:none;font-weight:700;padding:10px 16px;border-radius:9999px;">Leave a short review</a>
      </div>
    </div>
  </div>`;

  const subject = 'Your lease review – copy of results';
  return { to: toEmail, subject, html };
}

// ---------------- PayPal Helpers ----------------
async function getPayPalAccessToken() {
  const PAYPAL_ENV = process.env.PAYPAL_ENV || 'sandbox';
  const PAYPAL_CLIENT_ID = PAYPAL_ENV === 'sandbox' ? process.env.PAYPAL_SANDBOX_CLIENT_ID : process.env.PAYPAL_CLIENT_ID;
  const PAYPAL_CLIENT_SECRET = PAYPAL_ENV === 'sandbox' ? process.env.PAYPAL_SANDBOX_CLIENT_SECRET : process.env.PAYPAL_CLIENT_SECRET;
  const PAYPAL_API = PAYPAL_ENV === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("PayPal credentials not set in environment.");
  }

  const res = await axios.post(
    `${PAYPAL_API}/v1/oauth2/token`,
    'grant_type=client_credentials',
    {
      auth: { username: PAYPAL_CLIENT_ID, password: PAYPAL_CLIENT_SECRET },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      timeout: 10000,
    }
  );
  return res.data.access_token;
}

async function getOrder(orderID) {
  const PAYPAL_ENV = process.env.PAYPAL_ENV || 'sandbox';
  const PAYPAL_API = PAYPAL_ENV === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

  const token = await getPayPalAccessToken();
  const res = await axios.get(`${PAYPAL_API}/v2/checkout/orders/${orderID}`, {
    headers: { Authorization: `Bearer ${token}` },
    timeout: 10000,
  });
  return res.data;
}

// ---------------- Vision OCR Helper ----------------
console.log('[vision] Initializing Google Cloud Vision client');
const visionClient = new ImageAnnotatorClient();

// Storage namespace so TLR files stay separate from Schirut in the shared Firebase project.
const STORAGE_PREFIX = process.env.TLR_STORAGE_PREFIX || 'tlr';

async function ocrPdfFromGcs(bucket, sourcePath) {
  const bucketName = bucket.name;
  const outputPrefix = `${STORAGE_PREFIX}/ocr-output/${Date.now()}_${Math.random().toString(36).slice(2)}/`;
  const destinationUri = `gs://${bucketName}/${outputPrefix}`;
  const sourceUri = `gs://${bucketName}/${sourcePath}`;

  console.log('[vision] Starting async PDF OCR', { sourceUri, destinationUri });
  const request = {
    requests: [
      {
        inputConfig: {
          mimeType: 'application/pdf',
          gcsSource: { uri: sourceUri },
        },
        features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
        outputConfig: {
          gcsDestination: { uri: destinationUri },
          batchSize: 2,
        },
      },
    ],
  };

  const [operation] = await visionClient.asyncBatchAnnotateFiles(request);
  await operation.promise();

  // Read all output JSON files and aggregate text
  const [files] = await bucket.getFiles({ prefix: outputPrefix });
  if (!files || files.length === 0) {
    console.warn('[vision] No OCR output files found');
    throw new Error('No OCR output files produced');
  }
  let aggregatedText = '';
  for (const file of files) {
    const [contents] = await file.download();
    const json = JSON.parse(contents.toString());
    const responses = json.responses || [];
    for (const resp of responses) {
      const text = resp.fullTextAnnotation?.text || '';
      if (text) aggregatedText += (aggregatedText ? "\n\n" : "") + text.trim();
    }
  }

  console.log('[vision] OCR completed', { outputFiles: files.length, textLength: aggregatedText.length });

  // Cleanup OCR output
  await Promise.all(files.map(f => f.delete().catch(() => {})));

  return aggregatedText.trim();
}

// ---------------- Rejected-file archival ----------------
// Moves an uploaded file that failed validation from `tlr/contracts/...` to
// `tlr/rejected/<reason>/...` and writes a sidecar `<path>.meta.json` with
// diagnostic context, so rejections can be reviewed manually later.
async function archiveRejectedFile({ bucket, fileRef, sourcePath, reason, context }) {
  try {
    const contractsRoot = `${STORAGE_PREFIX}/contracts/`;
    const destPath = sourcePath.startsWith(contractsRoot)
      ? sourcePath.replace(contractsRoot, `${STORAGE_PREFIX}/rejected/${reason}/`)
      : `${STORAGE_PREFIX}/rejected/${reason}/${sourcePath}`;
    await fileRef.move(destPath);
    console.log('[storage] archived rejected file', { from: sourcePath, to: destPath, reason });

    const metaPath = `${destPath}.meta.json`;
    const metaPayload = {
      reason,
      rejectedAt: new Date().toISOString(),
      originalPath: sourcePath,
      archivedPath: destPath,
      ...context,
    };
    await bucket.file(metaPath).save(JSON.stringify(metaPayload, null, 2), {
      contentType: 'application/json',
      public: false,
    });
    console.log('[storage] wrote rejection metadata', { metaPath });
    return destPath;
  } catch (err) {
    console.error('[storage] failed to archive rejected file; leaving in place', {
      sourcePath,
      reason,
      message: err?.message,
    });
    return null;
  }
}

async function captureOrder(orderID) {
  const PAYPAL_ENV = process.env.PAYPAL_ENV || 'sandbox';
  const PAYPAL_API = PAYPAL_ENV === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

  const token = await getPayPalAccessToken();
  const res = await axios.post(
    `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
    {},
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, timeout: 20000 }
  );
  return res.data;
}

// Capture a PayPal authorization (when the order intent is AUTHORIZE)
async function captureAuthorization(orderID) {
  const PAYPAL_ENV = process.env.PAYPAL_ENV || 'sandbox';
  const PAYPAL_API = PAYPAL_ENV === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

  // Get the order to find the authorization id
  const order = await getOrder(orderID);
  const auth = order?.purchase_units?.[0]?.payments?.authorizations?.[0];
  const authorizationId = auth?.id;
  if (!authorizationId) {
    throw new Error(`No authorization found on order ${orderID}`);
  }

  const token = await getPayPalAccessToken();
  const res = await axios.post(
    `${PAYPAL_API}/v2/payments/authorizations/${authorizationId}/capture`,
    {},
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, timeout: 20000 }
  );
  return res.data;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForCaptureCompleted(orderID, attempts = 3, delayMs = 2000) {
  for (let i = 0; i < attempts; i++) {
    try {
      const order = await getOrder(orderID);
      const status = String(order?.status || '').toUpperCase();
      const pu0 = order?.purchase_units?.[0];
      const captures = pu0?.payments?.captures || [];
      const anyCaptureCompleted = Array.isArray(captures) && captures.some(c => String(c?.status).toUpperCase() === 'COMPLETED');
      if (status === 'COMPLETED' || anyCaptureCompleted) {
        console.log('[payment] waitForCaptureCompleted: completed', { orderID, status, anyCaptureCompleted });
        return true;
      }
      console.log('[payment] waitForCaptureCompleted: pending', { orderID, status, attempt: i + 1 });
    } catch (e) {
      console.warn('[payment] waitForCaptureCompleted: error', { orderID, message: e?.message });
    }
    await sleep(delayMs);
  }
  return false;
}

// Explicitly authorize an order (if the client did not do it)
async function authorizeOrder(orderID) {
  const PAYPAL_ENV = process.env.PAYPAL_ENV || 'sandbox';
  const PAYPAL_API = PAYPAL_ENV === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';
  const token = await getPayPalAccessToken();
  const res = await axios.post(
    `${PAYPAL_API}/v2/checkout/orders/${orderID}/authorize`,
    {},
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, timeout: 30000 }
  );
  return res.data;
}

async function isOrderAuthorized(orderID) {
  const order = await getOrder(orderID);
  if (['COMPLETED','APPROVED'].includes(order.status)) return true;
  return !!order.purchase_units?.[0]?.payments?.authorizations?.length;
}

// Validate the order details (amount, currency, payee, and intent)
async function validateOrderDetails(orderID) {
  const expectedAmount = String(process.env.PAYPAL_EXPECTED_AMOUNT || '19.99');
  const expectedCurrency = String(process.env.PAYPAL_EXPECTED_CURRENCY || 'USD');

  const order = await getOrder(orderID);
  const intentOk = String(order?.intent || '').toUpperCase() === 'AUTHORIZE';
  const pu0 = order?.purchase_units?.[0] || {};
  const amountOk = String(pu0?.amount?.value || '') === expectedAmount;
  const currencyOk = String(pu0?.amount?.currency_code || '').toUpperCase() === expectedCurrency.toUpperCase();

  const ok = intentOk && amountOk && currencyOk;
  console.log('[payment] validateOrderDetails', { orderID, intentOk, amountOk, currencyOk, ok, expectedAmount, expectedCurrency });
  return ok;
}

function isResidentialRentalAgreement(text) {
  const lower = (text || "").toLowerCase();

  // Core rental terms (Hebrew + English)
  const coreHeb = ["שכירות", "שוכר", "משכיר", "השכרה", "חוזה שכירות", "הסכם שכירות", "דייר"]; 
  const coreEn = ["rent", "lease", "tenant", "landlord", "rental", "leasing"]; 

  // Residential property terms (Hebrew + English)
  const propHeb = ["דירה", "בית", "נכס", "מושכר", "יחידה", "כתובת", "מגורים", "דירת"]; 
  const propEn = ["apartment", "flat", "house", "home", "property", "unit", "residence", "address"]; 

  const containsAny = (terms) => terms.some(t => lower.includes(t));
  const countMatches = (terms) => terms.reduce((acc, t) => acc + (lower.includes(t) ? 1 : 0), 0);

  const coreCount = countMatches(coreHeb) + countMatches(coreEn);
  const propCount = countMatches(propHeb) + countMatches(propEn);

  // Heuristic: at least 2 core rental terms and at least 1 residential property term
  return coreCount >= 2 && propCount >= 1;
}

// ---------------- Gemini Helper ----------------
async function runGeminiAnalysis(contractText, customPrompt,GEMINI_API_KEY) {
  const prompt = customPrompt?.trim() || ENGLISH_PROMPT;

  try {
    // Initialize GenAI client (no apiKey needed if running on GCP with proper service account)
    const ai = new GoogleGenAI({vertexai: false, apiKey: GEMINI_API_KEY});

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt + "\n\n---\nLease:\n" + contractText }
          ]
        }
      ],
      responseSchema: {
        type: "object",
        properties: {
          important: { type: "array", items: { type: "string" } },
          tenant_issues: { type: "array", items: { type: "string" } },
          landlord_issues: { type: "array", items: { type: "string" } },
          missing_or_unclear: { type: "array", items: { type: "string" } },
          summary: { type: "string" }
        },
        additionalProperties: false
      }
    });
    console.debug(response.text);
    let cleanText = response.text.trim();

    // Remove markdown fences like ```json ... ```
    cleanText = cleanText.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  
    const obj = JSON.parse(cleanText);
    return analysisSchema.parse(obj);

  } catch (err) {
    console.error("Gemini API request failed", err);
    throw new Error("Gemini analysis failed: " + (err.message || "unknown error"));
  }
}

// Health
app.get('/', (req,res)=>res.send('Backend API running'));

// Verify PayPal
app.post('/verify-paypal-payment', express.json(), async (req,res)=>{
  const { orderID } = req.body || {};
  if (!orderID) return res.status(400).json({ error: 'Missing orderID' });
  try {
    const ok = await isOrderAuthorized(orderID);
    return ok ? res.json({ success: true }) : res.status(402).json({ error: 'Payment not authorized/completed' });
  } catch(err) {
    console.error('verify-paypal-payment error', err?.response?.data || err.message || err);
    return res.status(500).json({ error: 'PayPal verification failed' });
  }
});

// Contact endpoint: send email to site owner (also used for reviews)
app.post('/contact', express.json(), async (req, res) => {
  try {
    const { name, email, message, type, city, allowPublish } = req.body || {};
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

    const transporter = getMailTransporter();
    if (!transporter) return res.status(500).json({ error: 'Email is not configured' });

    const to = 'hello@theleasereview.com';
    const isReview = String(type || '').toLowerCase() === 'review';
    const subject = isReview
      ? `New customer review${city ? ` – ${city}` : ''}`
      : 'New contact form message';
    const publishLine = isReview
      ? `\nAllow publish on site: ${allowPublish === false || allowPublish === 'false' ? 'No' : 'Yes'}\nCity: ${city || '-'}\n`
      : '';
    const text = `Name: ${name}\nEmail: ${email}${publishLine}\nMessage:\n${message}`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      replyTo: email,
      subject,
      text,
    });
    return res.json({ success: true });
  } catch (err) {
    console.error('[contact] failed to send message', { message: err?.message });
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

// Upload Route
app.post("/upload", express.raw({ type: "*/*", limit: "25mb" }), async (req, res) => {
  try {
    console.log('[upload] Incoming request');
    const filename = req.headers["x-filename"];
    const userId = req.headers["x-userid"];
    const orderID = req.headers["x-orderid"];
    const customPrompt = req.headers["x-prompt"];
    const userEmail = req.headers["x-email"];

    console.log('[upload] headers', {
      filename,
      userId,
      orderID,
      hasCustomPrompt: !!customPrompt,
      userEmail,
      contentType: req.headers["content-type"],
    });

    if (!filename || !userId || !orderID || !userEmail) return res.status(400).json({ error: "Missing required headers" });

    const fileBuffer = req.body;
    
    console.log('[upload] received buffer', { length: fileBuffer?.length });
    
    if (!fileBuffer || fileBuffer.length === 0) return res.status(400).json({ error: "No file uploaded" });

    console.log('[payment] PAYPAL_ENV', process.env.PAYPAL_ENV);

    if (process.env.PAYPAL_ENV !== "sandbox") {
      console.log('[payment] verifying PayPal authorization', { orderID });
      let authorized = await isOrderAuthorized(orderID);
      if (!authorized) {
        console.warn('[payment] not authorized yet, attempting server-side authorize', { orderID });
        try {
          const authRes = await authorizeOrder(orderID);
          const status = String(authRes?.status || '').toUpperCase();
          console.log('[payment] authorize response', { orderID, status });
        } catch (e) {
          console.warn('[payment] server-side authorize failed', { orderID, message: e?.message });
        }
        authorized = await isOrderAuthorized(orderID);
      }
      if (!authorized) {
        console.warn('[payment] still not authorized after attempt', { orderID });
        return res.status(402).json({ error: "Payment not authorized" });
      }
      console.log('[payment] authorization OK', { orderID });

      // Minimal hardening: ensure amount/currency match expectations
      const detailsOk = await validateOrderDetails(orderID);
      if (!detailsOk) {
        console.warn('[payment] order details mismatch', { orderID });
        return res.status(402).json({ error: "Payment details mismatch" });
      }
      console.log('[payment] order details OK', { orderID });
    }

    const ext = path.extname(filename).toLowerCase();
    const bucket = storage.bucket();
    // Sanitize email for filename usage
    const sanitizedEmail = String(userEmail).toLowerCase().replace(/[^a-z0-9@._+-]/g, "_").slice(0, 80);
    const storageFileName = `${STORAGE_PREFIX}/contracts/${userId}/${Date.now()}__${sanitizedEmail}${ext}`;
    const fileRef = bucket.file(storageFileName);

    console.log('[storage] saving original file', { storageFileName, ext });
    await fileRef.save(fileBuffer, {
      contentType: req.headers["content-type"] || "application/octet-stream",
      public: false,
      metadata: { firebaseStorageDownloadTokens: userId },
    });
    console.log('[storage] file saved');
    
    // --- Extract text ---
    console.log('[extract] ext', ext);

    let text = "";
    if (ext === ".pdf") {
      console.log('[extract] parsing PDF');
      text = (await pdfParse(fileBuffer)).text || "";
    } else if ([".doc", ".docx"].includes(ext)) {
      console.log('[extract] parsing Word');
      text = (await mammoth.extractRawText({ buffer: fileBuffer })).value || "";
    } else {
      console.warn('[extract] unsupported file type', { ext });
      await archiveRejectedFile({
        bucket,
        fileRef,
        sourcePath: storageFileName,
        reason: 'unsupported-file-type',
        context: { userId, email: userEmail, orderID, filename, ext },
      });
      return res.status(400).json({ error: "Unsupported file type" });
    }

    // OCR fallback for PDFs using Google Cloud Vision.
    // Trigger OCR not only when pdf-parse returned nothing, but also when it
    // returned suspiciously little text, or text that clearly doesn't look like
    // a rental contract. pdf-parse often scrapes a few bytes of metadata out of
    // scanned/image-based PDFs, which would otherwise skip the OCR path entirely.
    const MIN_MEANINGFUL_CHARS = 400;
    if (ext === '.pdf') {
      const trimmedLen = text.trim().length;
      const looksLikeRental = isResidentialRentalAgreement(text);
      const needsOcr = !trimmedLen || trimmedLen < MIN_MEANINGFUL_CHARS || !looksLikeRental;
      if (needsOcr) {
        const reason = !trimmedLen
          ? 'empty'
          : (trimmedLen < MIN_MEANINGFUL_CHARS ? 'too-short' : 'not-rental-like');
        console.log('[extract] triggering Vision OCR', { reason, pdfParseLength: text.length });
        try {
          const ocrText = await ocrPdfFromGcs(bucket, storageFileName);
          if (ocrText && ocrText.trim().length > trimmedLen) {
            console.log('[extract] OCR produced more text, using it', { ocrLength: ocrText.length });
            text = ocrText;
          } else {
            console.log('[extract] OCR did not improve extraction, keeping pdf-parse text', {
              ocrLength: ocrText?.length || 0,
              pdfParseLength: text.length,
            });
          }
        } catch (ocrErr) {
          console.error('[extract] Vision OCR failed', { message: ocrErr?.message });
          if (!trimmedLen) {
            await archiveRejectedFile({
              bucket,
              fileRef,
              sourcePath: storageFileName,
              reason: 'text-extraction-failed',
              context: {
                userId,
                email: userEmail,
                orderID,
                filename,
                ext,
                pdfParseLength: text.length,
                ocrError: ocrErr?.message || 'unknown',
              },
            });
            return res.status(400).json({
              code: "TEXT_EXTRACTION_FAILED",
              error: [
                "We could not read the contents of this PDF.",
                "Important: you were not charged.",
                "",
                "Try this:",
                "• Upload a clearer, fully readable file.",
                "• If the PDF is a scan, try a higher-quality scan or a Word (doc/docx) version.",
              ].join("\n"),
            });
          }
        }
      }
    }

    if (!text.trim()) {
      await archiveRejectedFile({
        bucket,
        fileRef,
        sourcePath: storageFileName,
        reason: 'text-extraction-failed',
        context: { userId, email: userEmail, orderID, filename, ext, stage: 'post-ocr-empty' },
      });
      return res.status(400).json({
        code: "TEXT_EXTRACTION_FAILED",
        error: [
          "No readable text was found, even after OCR.",
          "Important: you were not charged.",
          "",
          "Try this:",
          "• Upload a clearer file.",
          "• Upload a Word (doc/docx) version instead of a scanned PDF.",
        ].join("\n"),
      });
    }
    console.log('[extract] extracted text length', { length: text.length });

    // Validate document looks like a residential rental agreement (Hebrew/English)
    const isRental = isResidentialRentalAgreement(text);
    console.log('[validate] residential rental agreement?', { isRental, textLength: text.length });
    if (!isRental) {
      await archiveRejectedFile({
        bucket,
        fileRef,
        sourcePath: storageFileName,
        reason: 'not-rental-agreement',
        context: {
          userId,
          email: userEmail,
          orderID,
          filename,
          ext,
          textLength: text.length,
          textSample: text.slice(0, 2000),
        },
      });
      return res.status(400).json({
        code: "NOT_RENTAL_AGREEMENT",
        error: [
          "This file was not recognized as a residential lease agreement.",
          "Important: you were not charged.",
          "",
          "Before uploading again, check that:",
          "• The file is a full apartment/house lease (English).",
          "• The document is clear and complete (not a partial scan or short draft).",
          "",
          "If this keeps happening with a real lease, contact us via the Contact page.",
        ].join("\n"),
      });
    }

    const txtFileName = storageFileName.replace(ext, ".txt");
    const txtFileRef = bucket.file(txtFileName);
    console.log('[storage] saving parsed text', { txtFileName });
    await txtFileRef.save(text, {
      contentType: "text/plain",
      public: false,
      metadata: { firebaseStorageDownloadTokens: userId },
    });
    console.log('[storage] saved text');
    
    // --- Run Gemini analysis ---
    let analysis;
    try {
      console.log('[gemini] starting analysis');
      const geminiApiKey = process.env.GEMINI_API_KEY;
      if (!geminiApiKey) throw new Error("GEMINI_API_KEY not set in env or Firebase config");

      analysis = await runGeminiAnalysis(text, customPrompt, geminiApiKey);
      console.log('[gemini] analysis complete');
    } catch (err) {
      console.error("[gemini] analysis failed", { filename, userId, message: err?.message });
      return res.status(500).json({
        error: "Gemini analysis failed, but file saved",
        originalFile: storageFileName,
        parsedTextFile: txtFileName,
        parsedText: text,
      });
    }

    // --- Capture payment (block results if capture fails in production) ---
    let captureOk = true;
    try {
      if (process.env.PAYPAL_ENV !== "sandbox") {
        console.log('[payment] capturing payment', { orderID });
        // Prefer capturing authorization if present (intent=AUTHORIZE). If missing, try authorize then capture.
        let captureResponse;
        try {
          captureResponse = await captureAuthorization(orderID);
          console.log('[payment] authorization capture response', { orderID, status: captureResponse?.status });
        } catch (authErr) {
          console.warn('[payment] authorization capture failed, trying to authorize then capture', { orderID, message: authErr?.message });
          try {
            await authorizeOrder(orderID);
            captureResponse = await captureAuthorization(orderID);
            console.log('[payment] authorization->capture response', { orderID, status: captureResponse?.status });
          } catch (authThenCaptureErr) {
            console.warn('[payment] authorize->capture failed, attempting order capture', { orderID, message: authThenCaptureErr?.message });
            captureResponse = await captureOrder(orderID);
            console.log('[payment] order capture response', { orderID, status: captureResponse?.status });
          }
        }

        // Determine capture success; if not, poll a few times
        const status = String(captureResponse?.status || '').toUpperCase();
        const pu0 = captureResponse?.purchase_units?.[0];
        const captures = pu0?.payments?.captures || [];
        const anyCaptureCompleted = Array.isArray(captures) && captures.some(c => String(c?.status).toUpperCase() === 'COMPLETED');
        captureOk = status === 'COMPLETED' || anyCaptureCompleted;
        if (!captureOk) {
          const settled = await waitForCaptureCompleted(orderID, 3, 2000);
          captureOk = settled;
        }
        console.log('[payment] capture evaluation', { orderID, status, anyCaptureCompleted, captureOk });
      }
    } catch (err) {
      console.warn('[payment] capture threw error', { orderID, message: err?.message });
      captureOk = false;
    }

    if (process.env.PAYPAL_ENV !== "sandbox" && !captureOk) {
      console.warn('[payment] blocking results due to failed capture', { orderID });
      return res.status(402).json({ error: "Payment capture failed. No charge made." });
    }

    // Send results email (best-effort; errors are logged but do not fail the response)
    try {
      const transporter = getMailTransporter();
      if (transporter) {
        console.log('[email] sending results email', { to: String(userEmail) });
        const mailText = buildPlainTextEmail({
          toEmail: String(userEmail),
          orderID: String(orderID),
          originalFile: storageFileName,
          parsedTextFile: txtFileName,
          fileName: String(filename),
          fileSizeBytes: Buffer.isBuffer(fileBuffer) ? fileBuffer.length : undefined,
          analysis,
        });
        const mailHtml = buildHtmlEmail({
          toEmail: String(userEmail),
          orderID: String(orderID),
          originalFile: storageFileName,
          parsedTextFile: txtFileName,
          fileName: String(filename),
          fileSizeBytes: Buffer.isBuffer(fileBuffer) ? fileBuffer.length : undefined,
          analysis,
        });
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: mailText.to,
          subject: mailText.subject,
          text: mailText.text,
          html: mailHtml.html,
        });
        console.log('[email] email sent');
      }
    } catch (mailErr) {
      console.error('[email] failed to send results email', { message: mailErr?.message });
    }

    return res.json({
      success: true,
      originalFile: storageFileName,
      parsedTextFile: txtFileName,
      parsedText: text.slice(0, 500) + (text.length > 500 ? "..." : ""),
      analysis,
    });

  } catch (err) {
    console.error("Unhandled upload error", err);
    return res.status(500).json({ error: "Server error during upload." });
  }
});

// Separate Cloud Function name so this can share the Schirut Firebase project
// without colliding with Schirut's existing `api` function.
export const tlrApi = onRequest(app);