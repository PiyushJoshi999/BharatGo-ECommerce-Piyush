import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { cartList } = useContext(CartContext);
  const navigate = useNavigate();

  const cartCount = cartList.reduce((count, item) => count + (item.quantity || 1), 0);

  return (
    <nav className="navbar">
      <div className="brand" onClick={() => navigate("/")}>Shopit</div>
      <ul className="nav-links">
        <li>Shop</li>
        <li>Skills</li>
        <li>Stories</li>
        <li>About</li>
        <li onClick={() => navigate("/orders")}>Your Orders</li>
      </ul>
      <Link to="/cart" className="cart-button">
        Your Cart ({cartCount})
      </Link>
    </nav>
  );
};

export default Navbar;
