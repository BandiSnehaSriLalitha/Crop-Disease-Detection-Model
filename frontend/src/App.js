import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import DiseasePrediction from "./components/DiseasePrediction";
import Planty from "./components/Planty";
import Navbar from "./components/Navbar";
import "./App.css";
import Registration from "./components/Registration";
import Login from "./components/login";


const Footer = () => (
  <footer className="footer">
    &copy; 2025 Plant Care. All rights reserved.
  </footer>
);

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/disease-prediction" element={<DiseasePrediction />} />
          <Route path="/planty" element={<Planty />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
