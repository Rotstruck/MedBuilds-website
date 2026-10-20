export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  return res.status(200).json({
    ok: true,
    status: "healthy",
    service: "medbuilds-platform",
    timestamp: new Date().toISOString(),
  });
}
