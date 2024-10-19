from flask import Flask, request, jsonify, render_template
from PIL import Image
import os

app = Flask(__name__)

# Create a folder to save uploaded images
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('upload.html')

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'diseaseImage' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['diseaseImage']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # Save the uploaded image
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)
    
    # Here you can add image processing logic
    disease_info = analyze_image(file_path)

    return jsonify(disease_info)

def analyze_image(image_path):
    # Simulate image analysis. Replace this with your actual analysis logic.
    # You might use machine learning models or external APIs.
    
    # For demonstration purposes, we return static data
    return {
        "disease": "Powdery Mildew",
        "prevention": "Ensure good air circulation and avoid overhead watering.",
        "solution": "Apply fungicides as per instructions."
    }

if __name__ == '__main__':
    app.run(debug=True)
