import React from "react";
import "./styles/Home.css"; 

const Home = () => {
  return (
    <div className="home-container">
      
      {/* (Image - Matter) Section */}
      <div className="section">
        
        <div className="text">
          <h1>Welcome to the Crop Disease Detection Model! 🌿🔍</h1>
          <div className="extended-text">
            <p>
              Welcome to the world of intelligent farming! Our Crop Disease Detection Model is 
              designed to help farmers and plant lovers identify diseases in crops quickly and accurately. 
              By simply uploading an image, the system scans for signs of diseases and provides valuable insights 
              to protect your plants. This innovative approach ensures that you can take preventive measures in time 
              to save your crops and boost productivity.
            </p>
            <p>
              We believe that healthy plants are the foundation of a thriving harvest. With this simple tool, you can 
              reduce crop losses, cut down on harmful chemical usage, and contribute to sustainable farming practices. 
              Let's work together to create a future where technology meets agriculture, ensuring healthier plants and 
              happier farmers! 🌾
            </p>
          </div>
        </div>

        <div className="image">
          <img src="./home_page.jpeg" alt="Crop Disease Detection" />
        </div>
        
      </div>

      {/* (Matter - Image) Section */}
      <div className="section reverse">
        <div className="text">
          <h2>How It Works</h2>
          <ol>
            <li><strong>Upload Image:</strong> Navigate to the Disease Recognition page and upload a clear image of your plant. Ensure the image captures affected areas for accurate analysis.</li>
            <li><strong>Analysis:</strong>Our model will carefully examine the image to detect any potential diseases. It processes the visual data to identify symptoms and patterns associated with crop health issues.</li>
            <li><strong>Results:</strong>  Once the analysis is complete, you will receive detailed insights, including the name of the detected disease.</li>
            <li><strong>Planty AI:</strong> Need further guidance? Our Planty assistant is here to provide additional support, answering your questions and offering personalized care suggestions for your crops.</li>
          </ol>
        </div>
       
      </div>

    </div>
  );
};

export default Home;
