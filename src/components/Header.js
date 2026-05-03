import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return <>
    <nav>
      <h1>TO DO LIST</h1>
    </nav>
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/user/1">User</Link>
    </div>
  </>
};

export default Header;