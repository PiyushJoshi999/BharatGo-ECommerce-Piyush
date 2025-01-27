import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./AuthForm.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      alert("Sign up successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <span className="link" onClick={() => navigate("/login")}>
          Login
        </span>
      </p>
    </div>
  );
};

export default SignUp;
