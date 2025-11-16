import os

UPLOAD_FOLDER = "uploads"
EXTRACT_FOLDER = "extracted"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "bmp", "gif"}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(EXTRACT_FOLDER, exist_ok=True)
