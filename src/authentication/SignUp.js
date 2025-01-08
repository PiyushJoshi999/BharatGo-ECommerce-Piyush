import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    city: "",
    street: "",
    number: "",
    zipcode: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      name: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      address: {
        city: formData.city,
        street: formData.street,
        number: parseInt(formData.number),
        zipcode: formData.zipcode,
      },
      phone: formData.phone,
    };

    // localStorage.setItem("userData", payload);
    // alert("Sign up successful! Please log in.");
    // navigate("/login");

    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data) {
        console.log('userData during signup', data);
        alert("Sign up successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
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
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="number"
          placeholder="Street Number"
          value={formData.number}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="zipcode"
          placeholder="Zip Code"
          value={formData.zipcode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
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
