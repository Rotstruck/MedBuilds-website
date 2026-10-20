"""
Vercel Serverless Function entry point for MEDBUILDS API.
Vercel looks for the `app` instance in this module.
"""

import sys
from pathlib import Path

# Ensure root and backend directories are in python search path
CURRENT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = CURRENT_DIR.parent
BACKEND_DIR = PROJECT_ROOT / "backend"

for p in (str(PROJECT_ROOT), str(BACKEND_DIR)):
    if p not in sys.path:
        sys.path.insert(0, p)

from backend.server import app

# Vercel ASGI application handler
# Vercel's Python runtime automatically recognizes `app`
__all__ = ["app"]
