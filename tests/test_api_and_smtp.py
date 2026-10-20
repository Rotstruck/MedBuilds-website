import os
import unittest
from unittest.mock import patch, MagicMock
from starlette.testclient import TestClient

# Ensure project root is in sys.path
import sys
from pathlib import Path
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from backend.server import app
from backend.email_service import (
    get_smtp_config,
    is_smtp_configured,
    send_email,
    send_demo_request_emails,
    build_admin_notification_html,
    build_user_confirmation_html,
)
from api.index import app as vercel_app


class TestVercelAndSMTP(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_vercel_entrypoint_matches_app(self):
        """Verify that api/index.py exports the same FastAPI app."""
        self.assertEqual(vercel_app.title, "MEDBUILDS API")

    def test_health_check_endpoint(self):
        """GET /api/ and /api/health should return 200 with online status and config details."""
        res = self.client.get("/api/")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["status"], "online")
        self.assertIn("database", data)
        self.assertIn("smtp", data)

        res_health = self.client.get("/api/health")
        self.assertEqual(res_health.status_code, 200)

    def test_create_demo_request_valid(self):
        """POST /api/demo-requests should create a record and return 200 with id."""
        payload = {
            "hospital": "Manipal Hospital",
            "name": "Dr. Sneha Kulkarni",
            "role": "Doctor",
            "city": "Bengaluru",
            "email": "sneha@manipal.org",
            "phone": "+91 98765 43210",
            "challenge": "OPD queue congestion"
        }
        res = self.client.post("/api/demo-requests", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertTrue(data["success"])
        self.assertIn("id", data)
        self.assertIn("email_status", data)

    def test_create_demo_request_invalid(self):
        """Missing required fields should fail with 422 Unprocessable Entity."""
        res = self.client.post("/api/demo-requests", json={"hospital": "Incomplete"})
        self.assertEqual(res.status_code, 422)

    def test_list_demo_requests(self):
        """GET /api/demo-requests should return list of submitted requests."""
        res = self.client.get("/api/demo-requests")
        self.assertEqual(res.status_code, 200)
        self.assertIsInstance(res.json(), list)

    def test_smtp_config_defaults(self):
        """Verify fallback behavior for SMTP config when environment variables are unset."""
        with patch.dict(os.environ, {}, clear=True):
            config = get_smtp_config()
            self.assertEqual(config["host"], "")
            self.assertEqual(config["port"], 587)
            self.assertFalse(config["use_ssl"])
            self.assertTrue(config["use_tls"])
            self.assertFalse(is_smtp_configured())

    def test_smtp_config_ssl_port_465(self):
        """Port 465 should infer direct SSL."""
        with patch.dict(os.environ, {"SMTP_HOST": "smtp.gmail.com", "SMTP_PORT": "465"}, clear=True):
            config = get_smtp_config()
            self.assertEqual(config["host"], "smtp.gmail.com")
            self.assertEqual(config["port"], 465)
            self.assertTrue(config["use_ssl"])
            self.assertFalse(config["use_tls"])
            self.assertTrue(is_smtp_configured())

    def test_admin_email_html_content(self):
        """Admin HTML template must contain all relevant lead data."""
        demo = {
            "hospital": "Apex Heart Institute",
            "name": "Dr. Rajesh Shah",
            "role": "Owner / management",
            "city": "Ahmedabad",
            "email": "rajesh@apexheart.in",
            "phone": "+91 99000 11223",
            "challenge": "Slow discharge billing and paper charts",
            "created_at": "2026-10-20T12:00:00Z",
            "id": "apex-1234"
        }
        html = build_admin_notification_html(demo)
        self.assertIn("Apex Heart Institute", html)
        self.assertIn("Dr. Rajesh Shah", html)
        self.assertIn("Owner / management", html)
        self.assertIn("Ahmedabad", html)
        self.assertIn("rajesh@apexheart.in", html)
        self.assertIn("+91 99000 11223", html)
        self.assertIn("Slow discharge billing", html)
        self.assertIn("https://wa.me/919900011223", html)

    def test_user_confirmation_html_content(self):
        """User confirmation HTML template must contain personalization and reassuring details."""
        demo = {
            "hospital": "Sunrise Eye Clinic",
            "name": "Dr. Ananya Roy",
            "email": "ananya@sunrise.in",
            "phone": "+91 98111 22334"
        }
        html = build_user_confirmation_html(demo)
        self.assertIn("Ananya", html)
        self.assertIn("Sunrise Eye Clinic", html)
        self.assertIn("tailored 30-minute walkthrough", html)
        self.assertIn("+91 98111 22334", html)

    @patch("smtplib.SMTP")
    def test_send_email_mocked_success(self, mock_smtp_class):
        """Simulate successful SMTP delivery."""
        mock_server = MagicMock()
        mock_smtp_class.return_value.__enter__.return_value = mock_server

        with patch.dict(os.environ, {
            "SMTP_HOST": "smtp.mailtrap.io",
            "SMTP_PORT": "587",
            "SMTP_USER": "testuser",
            "SMTP_PASSWORD": "testpassword",
            "SMTP_TO_EMAIL": "admin@medbuilds.com",
            "SMTP_FROM_EMAIL": "no-reply@medbuilds.com"
        }):
            res = send_email(
                to_email="test@example.com",
                subject="Test Subject",
                html_content="<p>Test</p>"
            )
            self.assertTrue(res["success"])
            self.assertEqual(res["recipient"], "test@example.com")
            mock_server.starttls.assert_called_once()
            mock_server.login.assert_called_once_with("testuser", "testpassword")
            mock_server.send_message.assert_called_once()

    @patch("smtplib.SMTP")
    def test_send_demo_request_emails_resilient_on_auth_error(self, mock_smtp_class):
        """Even if SMTP credentials fail, send_demo_request_emails returns error details gracefully."""
        mock_server = MagicMock()
        import smtplib
        mock_server.login.side_effect = smtplib.SMTPAuthenticationError(535, b"Authentication failed")
        mock_smtp_class.return_value.__enter__.return_value = mock_server

        with patch.dict(os.environ, {
            "SMTP_HOST": "smtp.gmail.com",
            "SMTP_USER": "test@gmail.com",
            "SMTP_PASSWORD": "wrongpassword",
            "SMTP_TO_EMAIL": "admin@medbuilds.com"
        }):
            demo = {
                "hospital": "City Clinic",
                "name": "Dr. John",
                "email": "john@clinic.com",
                "phone": "+91 90000 00000",
                "id": "123"
            }
            results = send_demo_request_emails(demo)
            self.assertTrue(results["configured"])
            self.assertFalse(results["admin_sent"])
            self.assertFalse(results["user_sent"])
            self.assertTrue(len(results["errors"]) > 0)


if __name__ == "__main__":
    unittest.main()
