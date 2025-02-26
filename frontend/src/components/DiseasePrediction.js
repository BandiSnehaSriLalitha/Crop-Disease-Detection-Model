// import React, { useState } from "react";
// import "./styles/DiseasePrediction.css"; // Import the CSS file

// const classNames = [
//   "Apple___Apple_scab",
//   "Apple___Black_rot",
//   "Apple___Cedar_apple_rust",
//   "Apple___healthy",
//   "Blueberry___healthy",
//   "Cherry_(including_sour)___Powdery_mildew",
//   "Cherry_(including_sour)___healthy",
//   "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
//   "Corn_(maize)___Common_rust_",
//   "Corn_(maize)___Northern_Leaf_Blight",
//   "Corn_(maize)___healthy",
//   "Grape___Black_rot",
//   "Grape___Esca_(Black_Measles)",
//   "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
//   "Grape___healthy",
//   "Orange___Haunglongbing_(Citrus_greening)",
//   "Peach___Bacterial_spot",
//   "Peach___healthy",
//   "Pepper,_bell___Bacterial_spot",
//   "Pepper,_bell___healthy",
//   "Potato___Early_blight",
//   "Potato___Late_blight",
//   "Potato___healthy",
//   "Raspberry___healthy",
//   "Soybean___healthy",
//   "Squash___Powdery_mildew",
//   "Strawberry___Leaf_scorch",
//   "Strawberry___healthy",
//   "Tomato___Bacterial_spot",
//   "Tomato___Early_blight",
//   "Tomato___Late_blight",
//   "Tomato___Leaf_Mold",
//   "Tomato___Septoria_leaf_spot",
//   "Tomato___Spider_mites Two-spotted_spider_mite",
//   "Tomato___Target_Spot",
//   "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
//   "Tomato___Tomato_mosaic_virus",
//   "Tomato___healthy",
// ];

// const DiseasePrediction = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [prediction, setPrediction] = useState(null);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(URL.createObjectURL(file));
//     }
//   };

//   const handlePredict = () => {
//     // Simulating a model prediction (replace with actual ML model API call)
//     const randomIndex = Math.floor(Math.random() * classNames.length);
//     setPrediction(`Model is predicting it's a ${classNames[randomIndex]}`);
//   };

//   return (
//     <div className="disease-container">
//       <h1>Disease Recognition</h1>

//       <div className="upload-section">
//         <div className="image-container">
//         <img src="/home_page.jpeg" alt="Placeholder" />

//         </div>

//         <div className="file-upload">
//           <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
//         </div>
//       </div>

//       <button onClick={handlePredict} className="predict-btn">
//         Predict
//       </button>

//       {prediction && <div className="prediction-result">{prediction}</div>}
//     </div>
//   );
// };

// export default DiseasePrediction;



import React, { useState } from "react";
import "./styles/DiseasePrediction.css";

const DiseasePrediction = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPrediction(`Model is predicting it's a ${data.prediction}`);
    } catch (error) {
      console.error("Error predicting:", error);
      setPrediction("Error in prediction");
    }
  };

  return (
    <div className="disease-container">
      <h1>Upload, Analyze, and Heal Your Crops</h1>

      <div className="upload-section">
        <div className="image-container">
          {previewImage ? (
            <img src={previewImage} alt="Uploaded Preview" />
          ) : (
            <img src="/home_page.jpeg" alt="Placeholder" />
          )}
        </div>

        <div className="file-upload">
          <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
        </div>
      </div>

      <button onClick={handlePredict} className="predict-btn">
        Predict
      </button>

      {prediction && <div className="prediction-result">{prediction}</div>}
    </div>
  );
};

export default DiseasePrediction;
