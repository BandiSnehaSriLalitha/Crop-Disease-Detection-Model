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
            <img src="/Prediction_img.jpeg" alt="Placeholder" />
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
