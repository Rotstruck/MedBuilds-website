# Vercel Deployment & SMTP Setup Guide

This guide walks you through deploying **MEDBUILDS by Rotstruck** to **Vercel** and configuring **SMTP** for instant demo request notifications and user confirmations.

---

## 🚀 Quick Deployment to Vercel (3 Steps)

### Step 1: Push Repository to GitHub / GitLab / Bitbucket
Ensure your latest changes are pushed to your Git repository:
```bash
git add .
git commit -m "Add Vercel configuration and SMTP integration"
git push origin main
```

### Step 2: Import into Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** &rarr; **"Project"**.
3. Import your `MedBuilds-website` repository.
4. **Project Settings**:
   - **Framework Preset**: `Create React App` (or Other)
   - **Root Directory**: `./` (leave as default root)
   - **Build Command**: `cd frontend && npm install && npm run build` (configured automatically via `vercel.json`)
   - **Output Directory**: `frontend/build` (configured automatically via `vercel.json`)

### Step 3: Configure Environment Variables
Under **Environment Variables** in the Vercel project configuration, add your desired configuration:

| Variable Name | Required | Example Value | Description |
|---|---|---|---|
| `SMTP_HOST` | **Yes (for email)** | `smtp.gmail.com` | SMTP host server |
| `SMTP_PORT` | **Yes (for email)** | `587` | Port (`587` for STARTTLS, `465` for SSL) |
| `SMTP_USER` | **Yes (for email)** | `admin@medbuilds.com` | SMTP username or email |
| `SMTP_PASSWORD` | **Yes (for email)** | `your-app-password` | SMTP password / API key / App Password |
| `SMTP_FROM_EMAIL` | Optional | `notifications@medbuilds.com` | From email address |
| `SMTP_FROM_NAME` | Optional | `MEDBUILDS by Rotstruck` | Sender display name |
| `SMTP_TO_EMAIL` | Optional | `sales@medbuilds.com` | Where lead notifications are delivered |
| `SMTP_TLS` | Optional | `true` | Enable STARTTLS (default `true` for 587) |
| `SMTP_SSL` | Optional | `false` | Enable direct SSL (default `true` for 465) |
| `MONGO_URL` | Optional | `mongodb+srv://user:pass@cluster.mongodb.net/?...` | MongoDB Atlas connection string |
| `DB_NAME` | Optional | `medbuilds` | Database name |
| `CORS_ORIGINS` | Optional | `*` | Allowed origins (defaults to `*`) |

Click **Deploy**!

---

## ✉️ SMTP Setup by Provider

### 1. Gmail / Google Workspace (Recommended for quick start)
1. Go to your Google Account &rarr; **Security** &rarr; enable **2-Step Verification**.
2. Go to **App Passwords** ([https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)).
3. Create a new App Password named `MEDBUILDS`.
4. Copy the generated 16-character password.
5. Set the following in Vercel:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=xxxx xxxx xxxx xxxx
   SMTP_FROM_EMAIL=your-email@gmail.com
   SMTP_TO_EMAIL=sales@yourcompany.com
   ```

### 2. Resend (SMTP Relay)
1. Sign up at [resend.com](https://resend.com) and create an API Key.
2. Verify your domain.
3. Set the following in Vercel:
   ```env
   SMTP_HOST=smtp.resend.com
   SMTP_PORT=587
   SMTP_USER=resend
   SMTP_PASSWORD=re_123456789...
   SMTP_FROM_EMAIL=notifications@yourdomain.com
   SMTP_TO_EMAIL=sales@yourdomain.com
   ```

### 3. Brevo / Sendinblue
1. Sign up at [brevo.com](https://www.brevo.com/) &rarr; **SMTP & API**.
2. Generate an SMTP key.
3. Set the following in Vercel:
   ```env
   SMTP_HOST=smtp-relay.brevo.com
   SMTP_PORT=587
   SMTP_USER=your-brevo-login-email
   SMTP_PASSWORD=your-brevo-master-key
   SMTP_FROM_EMAIL=verified-sender@yourdomain.com
   SMTP_TO_EMAIL=sales@yourdomain.com
   ```

### 4. SendGrid
1. Create an API Key in SendGrid with "Mail Send" permissions.
2. Set the following in Vercel:
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASSWORD=SG.your_api_key_here
   SMTP_FROM_EMAIL=verified-sender@yourdomain.com
   SMTP_TO_EMAIL=sales@yourdomain.com
   ```

### 5. Amazon SES (Simple Email Service)
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-smtp-username
SMTP_PASSWORD=your-ses-smtp-password
SMTP_FROM_EMAIL=verified-sender@yourdomain.com
SMTP_TO_EMAIL=sales@yourdomain.com
```

---

## 🧪 How It Works

When a visitor submits the **"Schedule my demo"** form on the website:
1. The frontend submits the lead to `/api/demo-requests`.
2. Vercel routes `/api/demo-requests` to `api/index.py` (FastAPI Serverless Function).
3. The lead is saved to MongoDB (or stored in-memory if `MONGO_URL` is omitted).
4. **Two branded emails are dispatched immediately via SMTP**:
   - **Internal Lead Alert** (sent to `SMTP_TO_EMAIL`): Contains all lead details (Hospital, Doctor name, Role, City, Email, Phone, Challenge, plus 1-click **Reply via Email** and **WhatsApp** buttons).
   - **Requester Confirmation** (sent to the visitor): A reassuring, branded confirmation email highlighting the OPD, IPD, vitals, and billing walkthrough with next steps.
5. The endpoint returns `200 OK` with `{ "success": true, "id": "...", "email_status": { ... } }`.

---

## 🔍 Verifying Your Deployment

1. **Check API Health & SMTP Status:**
   Visit: `https://your-deployment.vercel.app/api/health`
   You should see:
   ```json
   {
     "message": "MEDBUILDS API",
     "status": "online",
     "database": {
       "type": "mongodb",
       "connected": true
     },
     "smtp": {
       "configured": true,
       "host": "smtp.gmail.com",
       "port": 587,
       "from_email": "admin@medbuilds.com",
       "to_email": "sales@medbuilds.com",
       "use_ssl": false,
       "use_tls": true
     }
   }
   ```

2. **Test Sending an Email Directly:**
   You can send a POST request to `/api/test-email`:
   ```bash
   curl -X POST https://your-deployment.vercel.app/api/test-email \
     -H "Content-Type: application/json" \
     -d '{"to_email": "your-personal-email@gmail.com"}'
   ```

3. **Submit the Website Demo Form:**
   Go to `https://your-deployment.vercel.app/#contact`, fill out the demo form, and submit. Check your inbox!
