# Vercel Services Deployment & SMTP Setup Guide

This project is configured to deploy as a unified **Vercel Services** project, combining the React frontend and FastAPI backend under one domain and project with shared routing.

---

## 🏗️ Architecture & Services Configuration

The root `vercel.json` defines two services:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "services": {
    "frontend": {
      "root": "frontend",
      "framework": "create-react-app",
      "bindings": [
        {
          "type": "service",
          "service": "backend",
          "format": "url",
          "env": "BACKEND_URL"
        }
      ]
    },
    "backend": {
      "root": "backend",
      "framework": "fastapi",
      "entrypoint": "main:app"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": {
        "service": "backend"
      }
    },
    {
      "source": "/api",
      "destination": {
        "service": "backend"
      }
    },
    {
      "source": "/(.*)",
      "destination": {
        "service": "frontend"
      }
    }
  ]
}
```

### Services Breakdown:
- **`frontend`** (Public on `/(.*)`):
  - Root: `frontend/`
  - Framework: `create-react-app`
  - Binding: Bound to the `backend` service, injecting its URL into `BACKEND_URL`.
- **`backend`** (Public on `/api/(.*)` & `/api`):
  - Root: `backend/`
  - Framework: `fastapi`
  - Entrypoint: `main:app` (points to `backend/main.py:app` and `backend/server.py`)

---

## 🚀 Deployment Instructions

### 1. Push to Git
```bash
git add .
git commit -m "Configure Vercel Services and SMTP"
git push origin main
```

### 2. Import into Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** &rarr; **Project**.
3. Select your repository.
4. Vercel automatically detects the `services` defined in `vercel.json`.

### 3. Set Environment Variables
In **Project Settings &rarr; Environment Variables**, configure your SMTP provider:

| Variable | Required | Description | Example |
|---|---|---|---|
| `SMTP_HOST` | **Yes (for email)** | SMTP host server | `smtp.gmail.com` |
| `SMTP_PORT` | **Yes (for email)** | SMTP port | `587` |
| `SMTP_USER` | **Yes (for email)** | SMTP username / email | `your-email@gmail.com` |
| `SMTP_PASSWORD` | **Yes (for email)** | SMTP app password | `xxxx xxxx xxxx xxxx` |
| `SMTP_FROM_EMAIL` | Optional | Sender address | `your-email@gmail.com` |
| `SMTP_FROM_NAME` | Optional | Sender display name | `MEDBUILDS by Rotstruck` |
| `SMTP_TO_EMAIL` | Optional | Where lead alerts are sent | `sales@yourcompany.com` |
| `MONGO_URL` | Optional | MongoDB Atlas connection string | `mongodb+srv://...` |
| `DB_NAME` | Optional | Database name | `medbuilds` |

Click **Deploy**!

---

## 🧪 Local Testing with Vercel CLI

Test all services running concurrently with binding injection:
```bash
vercel dev
```
Vercel CLI starts both `frontend` and `backend` and injects `BACKEND_URL` automatically.
