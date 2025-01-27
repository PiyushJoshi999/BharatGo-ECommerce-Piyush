import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        alert("User Logged-in successfully!");
        navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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
