import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { auth } from "../config/firebase";
import "./Navbar.css";

const Navbar = () => {
  const { cartList } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const cartCount = cartList.reduce((count, item) => count + (item.quantity || 1), 0);

  return (
    <nav className="navbar">
      <div className="brand" onClick={() => navigate("/")}>Shopit</div>
      <ul className="nav-links">
        <li>Shop</li>
        <li>Skills</li>
        <li>Stories</li>
        <li>About</li>
        {user && (
          <>
            <li onClick={() => navigate("/orders")}>Your Orders</li>
            <Link to="/cart" className="cart-button">
              Your Cart ({cartCount})
            </Link>
          </>
        )}
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
