import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./authentication/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import CartProvider from "./contexts/CartContext";
import SignUp from "./authentication/SignUp";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <CartProvider>
      <Router basename="/BharatGo-ECommerce-Piyush">
        <div>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
