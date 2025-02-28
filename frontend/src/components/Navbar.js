import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css"; // Import CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Crop Disease Detection Model</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/disease-prediction">Disease Predictions</Link>
        <Link to="/planty">Planty AI</Link>
        {/* <Link to="/login">Login</Link>
        <Link to="/registration">Register</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
