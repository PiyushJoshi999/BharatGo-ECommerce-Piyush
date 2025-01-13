import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SignUp from "./authentication/SignUp";
// import Login from "./authentication/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import CartProvider from "./contexts/CartContext";

//"homepage": "https://PiyushJoshi999.github.io/Appscrip-task-Piyush",

const App = () => {
  //const isAuthenticated = sessionStorage.getItem("authToken");

  return (
    // <Router>
    //   <div>
    //     {isAuthenticated && <Navbar />}
    //     <Routes>
    //       <Route path="/signup" element={<SignUp />} />
    //       <Route path="/login" element={<Login />} />
    //       <Route
    //         path="/"
    //         element={
    //           isAuthenticated ? <Home /> : <Navigate to="/login" replace />
    //         }
    //       />
    //     </Routes>
    //   </div>
    // </Router>
    <CartProvider>
      <Router basename="/Appscrip-task-Piyush">
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
