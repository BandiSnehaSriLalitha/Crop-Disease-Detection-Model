import React from "react";
import "./styles/about.css"; // Import the CSS file

const crops = [
  { name: "Apple", image: "/images/apple.png" },
  { name: "Cherry", image: "/images/cherry.webp" },
  { name: "Corn", image: "/images/corn.jpg" },
  { name: "Grape", image: "/images/grapes.jpg" },
  { name: "Potato", image: "/images/potato.jpg" },
  { name: "Tomato", image: "/images/Tomato.jpg" },
  { name: "Orange", image: "/images/Orange.jpg" },
  { name: "Pepper", image: "/images/Pepper.jpg" },
  { name: "Raspberry", image: "/images/Raspberry.jpg" },
  { name: "Squash", image: "/images/Squash.webp" },
  { name: "Soya Bean", image: "/images/Soyabean.jpg" },
  { name: "Strawberry", image: "/images/Strawberry.webp" },
  { name: "Peach", image: "/images/peach.jpg" }
];

const About = () => {
  return (
    <div className="about-container">
      <h1>We bring nature closer to people through technology</h1>
      <p>
        Our Crop Disease Detection Model uses AI to help farmers and gardeners quickly 
        identify plant diseases and get treatment suggestions. By simply uploading an image, 
        our model provides accurate insights to protect your crops.
      </p>

      <h2>Why Choose Us?</h2>
      <ul>
        <li><strong>Accuracy:</strong> Our system utilizes state-of-the-art machine learning techniques for accurate disease detection.</li>
        <li><strong>User-Friendly:</strong> Simple and intuitive interface for seamless user experience.</li>
        <li><strong>Fast and Efficient:</strong> Receive results in seconds, allowing for quick decision-making.</li>
      </ul>

      <h2>Crops We Predict</h2>
      <div className="crops-grid">
        {crops.map((crop, index) => (
          <div key={index} className="crop-card">
            <img src={crop.image} alt={crop.name} />
            <h3>{crop.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
