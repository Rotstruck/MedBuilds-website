import os
import uuid
import logging
from pathlib import Path
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

# Load environment variables (.env in backend/ or root)
ROOT_DIR = Path(__file__).resolve().parent
load_dotenv(ROOT_DIR / ".env")
load_dotenv(ROOT_DIR.parent / ".env")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Import email service
try:
    from backend.email_service import (
        send_demo_request_emails,
        send_email,
        is_smtp_configured,
        get_smtp_config,
    )
except ImportError:
    from email_service import (
        send_demo_request_emails,
        send_email,
        is_smtp_configured,
        get_smtp_config,
    )

# Optional MongoDB support via motor
MOTOR_AVAILABLE = False
client = None
db = None

mongo_url = os.environ.get("MONGO_URL", "").strip()
db_name = os.environ.get("DB_NAME", "medbuilds").strip()

if mongo_url:
    try:
        from motor.motor_asyncio import AsyncIOMotorClient
        client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000)
        db = client[db_name]
        MOTOR_AVAILABLE = True
        logger.info("Connected to MongoDB database: %s", db_name)
    except ImportError:
        logger.warning("motor package not installed. Running demo requests with in-memory storage fallback.")
    except Exception as e:
        logger.warning("Could not initialize MongoDB client: %s. Using in-memory fallback.", e)
else:
    logger.info("MONGO_URL not configured. Running demo requests with in-memory storage fallback.")

# In-memory storage fallback
in_memory_demo_requests: List[Dict[str, Any]] = []

app = FastAPI(title="MEDBUILDS API", version="1.0.0")
api_router = APIRouter(prefix="/api")


class DemoRequestCreate(BaseModel):
    hospital: str
    name: str
    role: str
    city: str
    email: str
    phone: str
    challenge: str = ""


class TestEmailRequest(BaseModel):
    to_email: str


@api_router.get("/")
@api_router.get("/health")
async def health():
    smtp_info = get_smtp_config()
    return {
        "message": "MEDBUILDS API",
        "status": "online",
        "database": {
            "type": "mongodb" if (db is not None and MOTOR_AVAILABLE) else "in_memory",
            "connected": bool(db is not None and MOTOR_AVAILABLE),
        },
        "smtp": {
            "configured": bool(smtp_info["host"]),
            "host": smtp_info["host"] or None,
            "port": smtp_info["port"],
            "from_email": smtp_info["from_email"],
            "to_email": smtp_info["to_email"] or None,
            "use_ssl": smtp_info["use_ssl"],
            "use_tls": smtp_info["use_tls"],
        },
    }


@api_router.post("/demo-requests")
async def create_demo_request(input: DemoRequestCreate):
    doc = input.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()

    db_saved = False
    if db is not None and MOTOR_AVAILABLE:
        try:
            await db.demo_requests.insert_one(dict(doc))
            db_saved = True
        except Exception as e:
            logger.error("Error saving demo request to MongoDB: %s. Storing in-memory.", e)
            in_memory_demo_requests.append(dict(doc))
    else:
        in_memory_demo_requests.append(dict(doc))

    # Send SMTP emails (admin notification + requester confirmation)
    email_status = send_demo_request_emails(doc)

    return {
        "success": True,
        "id": doc["id"],
        "db_saved": db_saved,
        "email_status": email_status,
    }


@api_router.get("/demo-requests")
async def list_demo_requests():
    if db is not None and MOTOR_AVAILABLE:
        try:
            return await db.demo_requests.find({}, {"_id": 0}).to_list(1000)
        except Exception as e:
            logger.error("Error querying MongoDB demo requests: %s. Returning in-memory list.", e)
            return in_memory_demo_requests
    return in_memory_demo_requests


@api_router.post("/test-email")
async def test_email(payload: TestEmailRequest):
    """Utility endpoint to test SMTP settings without submitting a demo request."""
    if not is_smtp_configured():
        raise HTTPException(
            status_code=400,
            detail="SMTP is not configured. Set SMTP_HOST and SMTP_USER in environment variables.",
        )

    res = send_email(
        to_email=payload.to_email,
        subject="MEDBUILDS SMTP Configuration Test",
        html_content="""
        <div style="font-family: sans-serif; padding: 20px; background: #F0F9FF; border-radius: 12px; border: 1px solid #BAE6FD;">
          <h2 style="color: #0284C7; margin-top: 0;">MEDBUILDS SMTP Test</h2>
          <p>This confirms that your SMTP mail settings are properly configured and working on MEDBUILDS.</p>
        </div>
        """,
        text_content="MEDBUILDS SMTP Test: Your SMTP settings are properly configured and working.",
    )
    if not res.get("success"):
        raise HTTPException(status_code=500, detail=res.get("error", "Failed to send email"))
    return res


app.include_router(api_router)

# CORS configuration
allowed_origins_raw = os.environ.get("CORS_ORIGINS", "*")
allowed_origins = [o.strip() for o in allowed_origins_raw.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=allowed_origins if allowed_origins else ["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    if client is not None:
        try:
            client.close()
        except Exception:
            pass
