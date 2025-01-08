import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="brand" onClick={() => navigate('/')}>Shopit</div>
      <ul className="nav-links">
        <li>Shop</li>
        <li>Skills</li>
        <li>Stories</li>
        <li>About</li>
        <li onClick={() => navigate('/orders')}>Your Orders</li>
      </ul>
      <Link to="/cart" className="cart-button">
        Your Cart
      </Link>
    </nav>
  );
};

export default Navbar;
