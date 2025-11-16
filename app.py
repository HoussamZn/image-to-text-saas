import os
from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename
from config import UPLOAD_FOLDER, EXTRACT_FOLDER, ALLOWED_EXTENSIONS
from ocr import extract_text

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files.get("image")

        if not file or not allowed_file(file.filename):
            return render_template("index.html", error="Invalid file type.")

        filename = secure_filename(file.filename)
        image_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(image_path)

        # Extract text
        text = extract_text(image_path)

        # Save extracted text to file
        text_filename = filename.rsplit(".", 1)[0] + ".txt"
        text_path = os.path.join(EXTRACT_FOLDER, text_filename)

        with open(text_path, "w", encoding="utf-8") as f:
            f.write(text)

        return render_template("result.html", text=text)

    return render_template("index.html")
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

