import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./authentication/SignUp";
import Login from "./authentication/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const App = () => {
  const isAuthenticated = sessionStorage.getItem("authToken");

  return (
    <Router>
      <div>
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              isAuthenticated ? <Home /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
