from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torchvision.transforms as transforms
from torchvision.models import resnet50
from PIL import Image
import os
import google.generativeai as genai
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, create_access_token


# saved model link : https://colab.research.google.com/drive/1i4l88WelwZoEEfo5KLdzyqYfswbsZXEA

# Initialize Flask App
app = Flask(__name__)
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
CORS(app)
# # CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)



app.config["MONGO_URI"] = "mongodb+srv://snehasrilalitha:Sneha@cluster0.4yj67.mongodb.net/Planty?retryWrites=true&w=majority&appName=Cluster0"
mongo = PyMongo(app)

db = mongo.db

if api_key:
    genai.configure(api_key=api_key)
else:
    print("❌ GOOGLE_API_KEY not found. Set it in .env!")

# Initialize Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")
chat = model.start_chat(history=[])

def get_gemini_response(question):
    try:
        response = chat.send_message(question, stream=True)
        return ''.join([chunk.text for chunk in response])
    except Exception as e:
        return f"Error: {str(e)}"

@app.route("/chat", methods=["POST"])
def chat_with_planty():
    try:
        data = request.get_json()
        user_message = data.get("message", "")

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
    

# Image-Based Plant Disease Prediction API Route
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
    model = resnet50(weights=None)  # Load ResNet-50 without pretrained weights
    num_ftrs = model.fc.in_features
    model.fc = torch.nn.Linear(num_ftrs, 38)  # Assuming 38 classes, update if needed
    model.load_state_dict(torch.load("plant_disease_model.pth", map_location=torch.device("cpu")))
    model.eval()
    return model

model = load_model()  # Load model during startup

# Image Preprocessing
def preprocess_image(image_path):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    image = Image.open(image_path).convert("RGB")
    return transform(image).unsqueeze(0)  # Add batch dimension



jwt = JWTManager(app) 

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    phone = data.get('phone')
    password = data.get('password')  # Capture password

    print(username, phone, password)  

    if not username or not phone or not password:
        return jsonify({'error': 'Username, phone number, and password are required'}), 400
    
    if not phone.isdigit() or len(phone) != 10:
        return jsonify({'error': 'Invalid phone number'}), 400
    
    if db.users.find_one({'phone': phone}):
        return jsonify({'error': 'Phone number already exists'}), 400
    
    # Store password in database
    db.users.insert_one({'username': username, 'phone': phone, 'password': password})
    
    return jsonify({'message': 'Registration successful'}), 201



# Reference to users collection
users = mongo.db.users




@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = users.find_one({"username": username})
    if not user:
        return jsonify({"error": "User not found"}), 400

    if user["password"] != password:
        return jsonify({"error": "Invalid credentials"}), 400

    access_token = create_access_token(identity=str(user["_id"]))
    return jsonify({"message": "Login successful", "token": access_token})

if __name__ == "__main__":
    app.run(debug=True)
