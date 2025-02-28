import { useState } from "react";
import "./styles/Registration.css"; // Import the CSS file

export default function Register() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!username || !phone || !password) {
      setMessage("All fields are required");
      return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      setMessage("Invalid phone number");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, phone, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registration successful!");
        setUsername("");
        setPhone("");
        setPassword("");
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (error) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
      
      {/* Link to Login Page */}
      <div className="login-footer">
        <p>Already have an account?</p>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
