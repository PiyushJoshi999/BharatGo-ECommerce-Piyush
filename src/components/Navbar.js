import React from 'react';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="brand">Shopit</div>
      <ul className="nav-links">
        <li>Shop</li>
        <li>Skills</li>
        <li>Stories</li>
        <li>About</li>
        <li>Contact Us</li>
      </ul>
    </nav>
  );
};

export default Navbar;
