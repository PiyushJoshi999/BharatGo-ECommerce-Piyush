import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { auth } from "../config/firebase";
import { FaCartShopping } from "react-icons/fa6";
import "./Navbar.css";

const Navbar = () => {
  const { cartList } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const cartCount = cartList.reduce(
    (count, item) => count + (item.quantity || 1),
    0
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="brand" onClick={() => navigate(user ? "/" : "/login")}>
        Shopit
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        {user ? (
          <>
            <li>Shop</li>
            <li>Skills</li>
            <li>Stories</li>
            <li>About</li>
            <li onClick={() => navigate("/orders")}>Your Orders</li>
            <Link to="/cart" className="cart-button">
              <FaCartShopping size={20} /> <span>{cartCount}</span>
            </Link>
          </>
        ) : null}
      </ul>
      {!user ? (
        <div className="auth-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      ) : (
        <button onClick={() => auth.signOut()}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
