import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.token) {
        sessionStorage.setItem("authToken", data.token);
        alert("Login successful!");
        navigate("/");
      } else {
        alert("Login failed! Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <span className="link" onClick={() => navigate("/signup")}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
