"""
FastAPI entrypoint for Vercel Services.
Exports `app` from `backend.server`.
"""

import sys
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from server import app

__all__ = ["app"]
