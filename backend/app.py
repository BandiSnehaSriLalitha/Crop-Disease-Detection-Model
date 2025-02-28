from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torchvision.transforms as transforms
from torchvision.models import resnet50
from PIL import Image
import os
import google.generativeai as genai
from dotenv import load_dotenv
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, create_access_token
import random
# saved model link : https://colab.research.google.com/drive/1i4l88WelwZoEEfo5KLdzyqYfswbsZXEA

# Initialize Flask App
app = Flask(__name__)
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

app.config["MONGO_URI"] = "mongodb+srv://snehasrilalitha:Sneha@cluster0.4yj67.mongodb.net/Planty?retryWrites=true&w=majority&appName=Cluster0"
mongo = PyMongo(app)
db = mongo.db

if api_key:
    genai.configure(api_key=api_key)
else:
    print("\u274C GOOGLE_API_KEY not found. Set it in .env!")

# Initialize Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")
chat = model.start_chat(history=[])

greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"]

def is_plant_related(question):
    plant_keywords = ["plant", "crop", "agriculture", "disease", "leaf", "fruit", "vegetable", "soil", "fertilizer", "pesticide"]
    return any(word in question.lower() for word in plant_keywords)

def get_gemini_response(question):
    try:
        if question.lower() in greetings:
            return random.choice(["Hello! How can I assist you with plant diseases?", "Hi there! Need help diagnosing a plant issue?", "Hey! What plant-related query do you have?"])
        
        if not is_plant_related(question):
            return "I'm designed to assist only with plant diseases and related topics. Please ask me about plants!"

        response = chat.send_message(question, stream=True)
        bot_reply = ''.join([chunk.text for chunk in response])

        keywords = ["fungal", "bacterial", "viral", "nutrient deficiency", "pesticide", "climate"]
        follow_up_questions = {
            "fungal": "Would you like to know about effective antifungal treatments?",
            "bacterial": "Should I provide natural remedies or chemical treatments?",
            "viral": "Would you like guidance on preventing viral spread in crops?",
            "nutrient deficiency": "Do you need recommendations for fertilizers or soil amendments?",
            "pesticide": "Are you looking for eco-friendly pesticide options?",
            "climate": "Do you want insights on how weather affects plant diseases?"
        }

        for key in keywords:
            if key in bot_reply.lower():
                return f"{bot_reply}\n\n{follow_up_questions[key]}"

        return bot_reply
    except Exception as e:
        return f"Error: {str(e)}"

@app.route("/chat", methods=["POST"])
def chat_with_planty():
    try:
        data = request.get_json()
        user_message = data.get("message", "").strip()
        if not user_message:
            return jsonify({"error": "Message is required"}), 400
        bot_response = get_gemini_response(user_message)
        return jsonify({"response": bot_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/diagnose", methods=["POST"])
def diagnose():
    try:
        data = request.json
        crop_name = data.get("cropName", "")
        symptoms = data.get("symptoms", "")
        location = data.get("location", "")
        if not crop_name or not symptoms or not location:
            return jsonify({"error": "Missing details"}), 400
        diagnosis = get_gemini_response(f"Diagnose {crop_name} with symptoms: {symptoms} in {location}")
        return jsonify({"response": diagnosis})
    except Exception as e:
        print(f"Diagnosis Error: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files['file']
    image_path = "temp.jpg"
    file.save(image_path)
    image = preprocess_image(image_path)
    with torch.no_grad():
        output = model(image)
        predicted_class = torch.argmax(output, dim=1).item()
    return jsonify({"prediction": class_names[predicted_class]})

# Class names for disease prediction
class_names = [
    "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
    "Blueberry___healthy", "Cherry_(including_sour)___Powdery_mildew", "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy", "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)", "Peach___Bacterial_spot", "Peach___healthy",
    "Pepper,_bell___Bacterial_spot", "Pepper,_bell___healthy", "Potato___Early_blight",
    "Potato___Late_blight", "Potato___healthy", "Raspberry___healthy", "Soybean___healthy",
    "Squash___Powdery_mildew", "Strawberry___Leaf_scorch", "Strawberry___healthy",
    "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight",
    "Tomato___Leaf_Mold", "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot", "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy"
]

# Load Image Classification Model
def load_model():
    model = resnet50(weights=None)
    num_ftrs = model.fc.in_features
    model.fc = torch.nn.Linear(num_ftrs, 38)
    model.load_state_dict(torch.load("plant_disease_model.pth", map_location=torch.device("cpu")))
    model.eval()
    return model

model = load_model()

def preprocess_image(image_path):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    image = Image.open(image_path).convert("RGB")
    return transform(image).unsqueeze(0)

if __name__ == "__main__":
    app.run(debug=True)




