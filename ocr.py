import pytesseract
from PIL import Image
def extract_text(image_path):
    """Extract text from an image using Tesseract OCR."""
    img = Image.open(image_path)
    text = pytesseract.image_to_string(img)
    return text
