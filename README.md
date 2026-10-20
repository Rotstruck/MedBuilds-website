# MEDBUILDS by Rotstruck

> An intelligent, clinical-grade hospital management and EMR platform designed for Indian hospitals and clinics. Unifies OPD, IPD, vitals, billing, and executive analytics into a seamless, modern experience.

---

## 🏗️ Architecture

- **Frontend**: React 19, Tailwind CSS, Lucide Icons, Sonner Toasts, Radix UI primitives.
- **Backend**: FastAPI (Python), Motor / PyMongo for MongoDB, SMTP email service with HTML lead notifications & confirmation templates.
- **Deployment**: Vercel-ready monorepo with Vercel Serverless Functions (`api/index.py`) and static SPA frontend build.

---

## ⚡ Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+ and npm
- Python 3.10+

### 2. Backend Setup
```bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Configure environment variables
cp .env.example backend/.env
# Edit backend/.env with your MongoDB and SMTP settings

# Start backend server
cd backend
uvicorn server:app --reload --port 8000
```
API will run at `http://localhost:8000/api`.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend will run at `http://localhost:3000`.

---

## 🚀 Deploying to Vercel

The repository is pre-configured for one-click deployment on **Vercel**:

1. Push this repository to GitHub / GitLab / Bitbucket.
2. Import the project into your [Vercel Dashboard](https://vercel.com).
3. The root `vercel.json` automatically:
   - Builds the React frontend (`cd frontend && npm install && npm run build`)
   - Routes `/api/*` to the Python Serverless Function (`api/index.py`)
   - Serves client-side SPA routing (`index.html`) for all page routes
4. Add your SMTP and database environment variables in **Vercel Project Settings &rarr; Environment Variables**.

👉 For detailed step-by-step instructions and provider templates (Gmail, Resend, SendGrid, Brevo, AWS SES), see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md).

---

## 📧 SMTP Configuration

When a hospital administrator or doctor submits the **"Schedule my demo"** form:
1. An **Internal Lead Alert** email is sent to `SMTP_TO_EMAIL` with full contact details, stated hospital challenges, and 1-click WhatsApp & email reply links.
2. A **Customer Confirmation** email is sent to the requester with walkthrough details and clinical workflow specialist contact info.

### Required Environment Variables:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_TO_EMAIL=sales@yourhospitaldomain.com
```

---

## 🧪 Testing

Run backend & SMTP integration tests:
```bash
python3 tests/test_api_and_smtp.py
```

---

## 📄 License
All rights reserved © Rotstruck Technologies.
