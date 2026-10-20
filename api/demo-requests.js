// Vercel Serverless Function: MedBuilds Demo Request Handler
// Destination inbox: team@rotstruck.in

let nodemailer;
try {
  nodemailer = require("nodemailer");
} catch (e) {
  // nodemailer will be used if installed, otherwise Resend API or log fallback
}

// In-memory rate limiting map for basic spam throttling per lambda instance
const rateLimitMap = new Map();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json({ ok: true, status: "healthy", endpoint: "/api/demo-requests" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed. Use POST." });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (err) {
        body = {};
      }
    }
    body = body || {};

    // 1. Honeypot trap: if 'w' is filled by bots, silently succeed
    if (body.w && String(body.w).trim() !== "") {
      return res.status(200).json({ ok: true });
    }

    // 2. Rate limiting check (1 per 30 seconds per IP)
    const clientIp =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.headers["x-real-ip"] ||
      req.socket?.remoteAddress ||
      "unknown";

    const lastTime = rateLimitMap.get(clientIp);
    const now = Date.now();
    if (lastTime && now - lastTime < 30000) {
      return res.status(429).json({
        ok: false,
        error: "Too many submissions. Please wait 30 seconds before sending another message.",
      });
    }
    rateLimitMap.set(clientIp, now);

    // 3. Clean & Validate inputs (MedBuilds demo request format)
    const clean = (val, max = 250) =>
      typeof val === "string" ? val.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";

    const hospital = clean(body.hospital || body.c || body.company);
    const name = clean(body.name || body.n);
    const role = clean(body.role);
    const city = clean(body.city);
    const email = clean(body.email || body.e);
    const phone = clean(body.phone || body.p);
    const challenge = typeof body.challenge === "string"
      ? body.challenge.trim().slice(0, 4000)
      : typeof body.d === "string"
      ? body.d.trim().slice(0, 4000)
      : "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !emailRegex.test(email)) {
      return res.status(422).json({
        ok: false,
        error: "Please provide a valid name and email address.",
      });
    }

    const TO = process.env.CONTACT_TO || process.env.ADMIN_EMAIL || "team@rotstruck.in";
    const FROM = process.env.CONTACT_FROM || process.env.SMTP_FROM || "team@rotstruck.in";

    const textContent = `New Demo Request — MEDBUILDS by Rotstruck
--------------------------------------------------
Hospital/Institution: ${hospital || "Not specified"}
Contact Name:         ${name}
Designation / Role:   ${role || "Not specified"}
City / Region:        ${city || "Not specified"}
Email:                ${email}
Phone:                ${phone || "Not specified"}

Current Operational Challenge:
${challenge || "Not specified"}

--------------------------------------------------
Timestamp: ${new Date().toISOString()}
Client IP: ${clientIp}
`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px; color: #0f172a; background: #ffffff; border: 1px solid #cffafe; border-radius: 16px; box-shadow: 0 4px 20px rgba(6, 182, 212, 0.08);">
        <div style="border-bottom: 2px solid #06b6d4; padding-bottom: 16px; margin-bottom: 20px;">
          <h1 style="margin: 0; color: #0891b2; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">MEDBUILDS by Rotstruck</h1>
          <p style="margin: 4px 0 0 0; color: #64748b; font-size: 13px;">New Hospital Demo & Platform Enquiry</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px;">
          <tr><td style="padding: 10px 0; color: #64748b; width: 160px;"><strong>Hospital / Org</strong></td><td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${hospital || "—"}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;"><strong>Contact Name</strong></td><td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${name}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;"><strong>Role / Title</strong></td><td style="padding: 10px 0; color: #334155;">${role || "—"}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;"><strong>City / Region</strong></td><td style="padding: 10px 0; color: #334155;">${city || "—"}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;"><strong>Email</strong></td><td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #0891b2; text-decoration: none; font-weight: 600;">${email}</a></td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;"><strong>Phone</strong></td><td style="padding: 10px 0; color: #334155;">${phone || "—"}</td></tr>
        </table>
        ${
          challenge
            ? `
        <div style="margin-top: 24px; padding: 18px; background: #ecfeff; border-radius: 10px; border-left: 4px solid #06b6d4;">
          <h3 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #0e7490; font-weight: 700;">Operational Challenge / Requirements</h3>
          <p style="margin: 0; line-height: 1.6; color: #164e63; font-size: 14px; white-space: pre-wrap;">${challenge}</p>
        </div>`
            : ""
        }
        <div style="margin-top: 28px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 14px;">
          MEDBUILDS Enterprise Health Platform &bull; Received on ${new Date().toUTCString()}
        </div>
      </div>
    `;

    // Strategy 1: Resend API (Preferred for Vercel Serverless)
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || "MEDBUILDS <onboarding@resend.dev>",
            to: [TO],
            reply_to: email,
            subject: `New Demo Request: ${hospital || name} — MEDBUILDS`,
            text: textContent,
            html: htmlContent,
          }),
        });

        if (resendRes.ok) {
          return res.status(200).json({ ok: true, message: "Demo request received. Our team will reach out shortly." });
        } else {
          const errData = await resendRes.json().catch(() => ({}));
          console.error("[Resend API Error]", errData);
        }
      } catch (resendErr) {
        console.error("[Resend Exception]", resendErr);
      }
    }

    // Strategy 2: SMTP Transport via Nodemailer
    if (process.env.SMTP_HOST && process.env.SMTP_USER && nodemailer) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === "true" || Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"MEDBUILDS" <${FROM}>`,
          to: TO,
          replyTo: email,
          subject: `New Demo Request: ${hospital || name} — MEDBUILDS`,
          text: textContent,
          html: htmlContent,
        });

        return res.status(200).json({ ok: true, message: "Demo request received. Our team will reach out shortly." });
      } catch (smtpErr) {
        console.error("[SMTP Error]", smtpErr);
      }
    }

    // Strategy 3: Console log fallback
    console.log("==================== MEDBUILDS NEW DEMO REQUEST ====================");
    console.log(textContent);
    console.log("===================================================================");

    return res.status(200).json({
      ok: true,
      delivered: false,
      message: "Demo request received. Our team will reach out shortly.",
      note: "Enquiry logged successfully. Set RESEND_API_KEY or SMTP variables in Vercel to dispatch email.",
    });
  } catch (error) {
    console.error("[Demo Request API Error]", error);
    return res.status(500).json({
      ok: false,
      error: "An unexpected error occurred while processing your request. Please email team@rotstruck.in directly.",
    });
  }
}
