// Vercel Serverless Function: Rotstruck Contact Form Handler
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

    // 3. Clean & Validate inputs
    const clean = (val, max = 250) =>
      typeof val === "string" ? val.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";

    const name = clean(body.name || body.n);
    const company = clean(body.hospital || body.company || body.c);
    const email = clean(body.email || body.e);
    const phone = clean(body.phone || body.p);
    const role = clean(body.role);
    const city = clean(body.city);
    const description = typeof body.challenge === "string"
      ? body.challenge.trim().slice(0, 4000)
      : typeof body.description === "string"
      ? body.description.trim().slice(0, 4000)
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

    const textContent = `New Project / Demo Enquiry — MEDBUILDS by Rotstruck
--------------------------------------------------
Name:       ${name}
Hospital:   ${company || "Not specified"}
Role:       ${role || "Not specified"}
City:       ${city || "Not specified"}
Email:      ${email}
Phone:      ${phone || "Not specified"}

Description / Challenge:
${description || "Not specified"}

--------------------------------------------------
Timestamp:     ${new Date().toISOString()}
Client IP:     ${clientIp}
`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="margin-top: 0; color: #0891b2; font-size: 20px;">New Enquiry from MEDBUILDS</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; color: #64748b; width: 140px;"><strong>Name</strong></td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;"><strong>Hospital/Company</strong></td><td style="padding: 8px 0;">${company || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;"><strong>Role</strong></td><td style="padding: 8px 0;">${role || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;"><strong>City</strong></td><td style="padding: 8px 0;">${city || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0891b2;">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;"><strong>Phone</strong></td><td style="padding: 8px 0;">${phone || "—"}</td></tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #ecfeff; border-radius: 8px; border-left: 4px solid #06b6d4;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #0e7490;">Details</h3>
          <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${description || "No additional details provided."}</p>
        </div>
      </div>
    `;

    // Strategy 1: Resend API
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
            subject: `New Enquiry from ${name} — MEDBUILDS`,
            text: textContent,
            html: htmlContent,
          }),
        });

        if (resendRes.ok) {
          return res.status(200).json({ ok: true, method: "resend" });
        }
      } catch (e) {
        console.error("[Resend Error]", e);
      }
    }

    // Strategy 2: Nodemailer SMTP
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
          subject: `New Enquiry from ${name} — MEDBUILDS`,
          text: textContent,
          html: htmlContent,
        });

        return res.status(200).json({ ok: true, method: "smtp" });
      } catch (smtpErr) {
        console.error("[SMTP Error]", smtpErr);
      }
    }

    // Fallback: Console log
    console.log("==================== MEDBUILDS NEW ENQUIRY ====================");
    console.log(textContent);
    console.log("===============================================================");

    return res.status(200).json({ ok: true, delivered: false });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return res.status(500).json({ ok: false, error: "An unexpected error occurred." });
  }
}
