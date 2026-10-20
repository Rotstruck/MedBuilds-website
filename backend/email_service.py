"""
MEDBUILDS Email Service
Handles SMTP email dispatch for demo requests and administrative alerts.
Supports Gmail, Resend SMTP, SendGrid, Brevo, AWS SES, Mailgun, custom SMTP relays.
"""

import os
import smtplib
import ssl
import logging
from email.message import EmailMessage
from email.utils import formataddr
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)


def get_smtp_config() -> Dict[str, Any]:
    """Retrieve SMTP configuration from environment variables."""
    host = os.environ.get("SMTP_HOST", "").strip()
    port_str = os.environ.get("SMTP_PORT", "").strip()
    user = os.environ.get("SMTP_USER") or os.environ.get("SMTP_USERNAME", "").strip()
    password = os.environ.get("SMTP_PASSWORD") or os.environ.get("SMTP_PASS", "").strip()
    from_email = os.environ.get("SMTP_FROM_EMAIL") or user or "notifications@medbuilds.com"
    from_name = os.environ.get("SMTP_FROM_NAME", "MEDBUILDS by Rotstruck")
    to_email = os.environ.get("SMTP_TO_EMAIL") or os.environ.get("ADMIN_EMAIL") or user or ""

    # Port handling
    try:
        port = int(port_str) if port_str else (465 if os.environ.get("SMTP_SSL", "").lower() in ("true", "1") else 587)
    except ValueError:
        port = 587

    # SSL / TLS inference
    use_ssl = (
        os.environ.get("SMTP_SSL", "").lower() in ("true", "1")
        or port == 465
    )
    use_tls = (
        os.environ.get("SMTP_TLS", "").lower() in ("true", "1")
        or (not use_ssl and port in (587, 25, 2525))
    )

    return {
        "host": host,
        "port": port,
        "user": user,
        "password": password,
        "from_email": from_email,
        "from_name": from_name,
        "to_email": to_email,
        "use_ssl": use_ssl,
        "use_tls": use_tls,
    }


def is_smtp_configured() -> bool:
    """Check if minimum required SMTP settings are present."""
    config = get_smtp_config()
    return bool(config["host"])


def send_email(
    to_email: str,
    subject: str,
    html_content: str,
    text_content: Optional[str] = None,
    reply_to: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Send an email via SMTP.
    Returns a dict with success boolean and details or error message.
    """
    config = get_smtp_config()

    if not config["host"]:
        logger.info("SMTP_HOST not configured. Email to %s skipped.", to_email)
        return {
            "success": False,
            "skipped": True,
            "reason": "SMTP_HOST is not configured in environment variables",
        }

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = formataddr((config["from_name"], config["from_email"]))
    msg["To"] = to_email

    if reply_to:
        msg["Reply-To"] = reply_to

    # Plain-text fallback
    if text_content:
        msg.set_content(text_content)
    else:
        # Simple plain text fallback stripped of HTML tags
        import re
        clean_text = re.sub(r"<[^>]+>", " ", html_content)
        clean_text = re.sub(r"\s+", " ", clean_text).strip()
        msg.set_content(clean_text)

    # HTML body
    msg.add_alternative(html_content, subtype="html")

    try:
        timeout = float(os.environ.get("SMTP_TIMEOUT", "10.0"))

        if config["use_ssl"]:
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(config["host"], config["port"], context=context, timeout=timeout) as server:
                if config["user"] and config["password"]:
                    server.login(config["user"], config["password"])
                server.send_message(msg)
        else:
            with smtplib.SMTP(config["host"], config["port"], timeout=timeout) as server:
                server.ehlo()
                if config["use_tls"]:
                    context = ssl.create_default_context()
                    server.starttls(context=context)
                    server.ehlo()
                if config["user"] and config["password"]:
                    server.login(config["user"], config["password"])
                server.send_message(msg)

        logger.info("Successfully sent email to %s (Subject: %s)", to_email, subject)
        return {"success": True, "recipient": to_email, "subject": subject}

    except smtplib.SMTPAuthenticationError as e:
        err_msg = f"SMTP Authentication failed: {e.smtp_error.decode() if isinstance(e.smtp_error, bytes) else str(e)}"
        logger.error(err_msg)
        return {"success": False, "error": err_msg}
    except Exception as e:
        err_msg = f"Failed to send email via SMTP: {type(e).__name__}: {str(e)}"
        logger.error(err_msg)
        return {"success": False, "error": err_msg}


def build_admin_notification_html(demo: Dict[str, Any]) -> str:
    """Generate responsive HTML for admin notification of new demo request."""
    hospital = demo.get("hospital", "N/A")
    name = demo.get("name", "N/A")
    role = demo.get("role", "N/A")
    city = demo.get("city", "N/A")
    email = demo.get("email", "N/A")
    phone = demo.get("phone", "N/A")
    challenge = demo.get("challenge") or "None specified"
    created_at = demo.get("created_at", "")
    request_id = demo.get("id", "")

    # Format phone for WhatsApp link (strip non-digits)
    phone_digits = "".join(filter(str.isdigit, phone))

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Demo Request</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F0F9FF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F0F9FF; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background: #FFFFFF; border-radius: 16px; border: 1px solid #BAE6FD; box-shadow: 0 10px 30px rgba(14, 165, 233, 0.08); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0284C7 0%, #0EA5E9 50%, #38BDF8 100%); padding: 28px 32px; color: #FFFFFF;">
              <p style="margin: 0; font-size: 11px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: #E0F2FE;">MEDBUILDS by Rotstruck</p>
              <h1 style="margin: 6px 0 0; font-size: 22px; font-weight: 700; color: #FFFFFF;">🏥 New Demo Request Received</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.5; color: #475569;">
                A new hospital has requested a personalized walkthrough of the <strong>MEDBUILDS</strong> platform:
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #E2E8F0; width: 36%; font-size: 13px; font-weight: 600; color: #64748B;">Hospital / Clinic</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #E2E8F0; font-size: 14px; font-weight: 700; color: #0284C7;">{hospital}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 600; color: #64748B;">Contact Person</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #E2E8F0; font-size: 14px; font-weight: 600; color: #0F172A;">{name}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 600; color: #64748B;">Role</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #E2E8F0; font-size: 14px; color: #334155;">{role}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 600; color: #64748B;">City</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #E2E8F0; font-size: 14px; color: #334155;">{city}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 600; color: #64748B;">Email</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #E2E8F0; font-size: 14px; color: #0284C7;">
                    <a href="mailto:{email}" style="color: #0284C7; text-decoration: none; font-weight: 600;">{email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 600; color: #64748B;">Phone / WhatsApp</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #E2E8F0; font-size: 14px; font-weight: 600; color: #0F172A;">
                    <a href="tel:{phone}" style="color: #0F172A; text-decoration: none;">{phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; font-size: 13px; font-weight: 600; color: #64748B; vertical-align: top;">Main Challenge</td>
                  <td style="padding: 14px 18px; font-size: 13px; line-height: 1.5; color: #334155; font-style: italic;">"{challenge}"</td>
                </tr>
              </table>

              <!-- Action buttons -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="left" style="padding-right: 8px;">
                    <a href="mailto:{email}?subject=MEDBUILDS%20Demo%20Walkthrough%20for%20{hospital}" style="display: inline-block; background-color: #0284C7; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 20px; border-radius: 9999px;">Reply via Email &rarr;</a>
                  </td>
                  {f'''<td align="left">
                    <a href="https://wa.me/{phone_digits}" style="display: inline-block; background-color: #10B981; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 20px; border-radius: 9999px;">WhatsApp &rarr;</a>
                  </td>''' if phone_digits else ''}
                </tr>
              </table>

              <p style="margin: 0; font-size: 12px; color: #94A3B8; border-top: 1px solid #F1F5F9; padding-top: 16px;">
                Request ID: <code style="font-family: monospace; color: #64748B;">{request_id}</code><br>
                Submitted at: {created_at}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""


def build_user_confirmation_html(demo: Dict[str, Any]) -> str:
    """Generate responsive HTML for lead confirmation email."""
    hospital = demo.get("hospital", "your hospital")
    name = (demo.get("name") or "").strip()
    parts = name.split()
    if len(parts) > 1 and parts[0].lower().rstrip(".") in ("dr", "mr", "mrs", "ms", "prof"):
        greeting_name = f"{parts[0]} {parts[1]}"
    elif parts:
        greeting_name = parts[0]
    else:
        greeting_name = "there"
    phone = demo.get("phone", "")

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MEDBUILDS Demo Request Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F0F9FF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F0F9FF; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background: #FFFFFF; border-radius: 16px; border: 1px solid #BAE6FD; box-shadow: 0 10px 30px rgba(14, 165, 233, 0.08); overflow: hidden;">
          <!-- Header banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0284C7 0%, #0EA5E9 50%, #38BDF8 100%); padding: 32px; color: #FFFFFF; text-align: left;">
              <p style="margin: 0; font-size: 11px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; color: #E0F2FE;">MEDBUILDS BY ROTSTRUCK</p>
              <h1 style="margin: 8px 0 0; font-size: 24px; font-weight: 700; color: #FFFFFF;">Your demo is being scheduled</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #334155;">
                Hello <strong>{greeting_name}</strong>,
              </p>
              <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6; color: #475569;">
                Thank you for your interest in <strong>MEDBUILDS</strong> for <strong>{hospital}</strong>. We received your request, and our clinical workflow specialist will reach out within <strong>one working day</strong>{f' at <strong>{phone}</strong>' if phone else ''} to set up your tailored 30-minute walkthrough.
              </p>

              <!-- What to expect card -->
              <div style="background: linear-gradient(180deg, #F0F9FF 0%, #E0F2FE 100%); border-radius: 12px; border: 1px solid #BAE6FD; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 12px; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #0284C7;">
                  What you will see in your walkthrough:
                </p>
                <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #1E293B;">
                  <li><strong>Unified Hospital Operations:</strong> OPD, IPD, and bed allocation running on one shared record.</li>
                  <li><strong>Real-Time Clinical Dashboards:</strong> Live vitals monitoring, ICU tracking, and nurse desk handovers.</li>
                  <li><strong>Rapid Discharge Billing:</strong> Clear itemized invoices with zero end-of-day billing delays.</li>
                  <li><strong>ABDM & Data Security:</strong> Role-based access control and hospital-grade encryption.</li>
                </ul>
              </div>

              <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.6; color: #64748B;">
                Have questions before the call or need an immediate walkthrough for your board or management? Simply reply to this email.
              </p>

              <p style="margin: 0; font-size: 14px; font-weight: 600; color: #0F172A;">
                Warm regards,<br>
                <span style="color: #0284C7; font-weight: 700;">The MEDBUILDS Team</span><br>
                <span style="font-size: 12px; font-weight: 400; color: #64748B;">Rotstruck Technologies</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 18px 32px; text-align: center; font-size: 12px; color: #94A3B8;">
              &copy; 2026 Rotstruck Technologies. All rights reserved. &bull; MEDBUILDS Hospital Management System
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""


def send_demo_request_emails(demo: Dict[str, Any]) -> Dict[str, Any]:
    """
    Send both admin alert and customer confirmation emails for a demo request.
    Non-blocking / resilient: does not fail if SMTP is not configured or fails.
    """
    config = get_smtp_config()
    results = {
        "configured": is_smtp_configured(),
        "admin_sent": False,
        "user_sent": False,
        "errors": [],
    }

    if not results["configured"]:
        logger.info("SMTP not configured. Skipping demo request email delivery.")
        return results

    # 1. Admin Alert
    admin_target = config["to_email"]
    if admin_target:
        subject = f"🏥 New Demo Request: {demo.get('hospital', 'Hospital')} ({demo.get('name', 'Contact')})"
        html_body = build_admin_notification_html(demo)
        admin_res = send_email(
            to_email=admin_target,
            subject=subject,
            html_content=html_body,
            reply_to=demo.get("email"),
        )
        results["admin_sent"] = admin_res.get("success", False)
        if not admin_res.get("success"):
            results["errors"].append(f"Admin email error: {admin_res.get('error')}")

    # 2. Requester Confirmation
    user_email = demo.get("email")
    if user_email:
        user_subject = f"Your MEDBUILDS Demo Request — {demo.get('hospital', 'Hospital Walkthrough')}"
        user_html = build_user_confirmation_html(demo)
        user_res = send_email(
            to_email=user_email,
            subject=user_subject,
            html_content=user_html,
        )
        results["user_sent"] = user_res.get("success", False)
        if not user_res.get("success"):
            results["errors"].append(f"User confirmation email error: {user_res.get('error')}")

    return results
