import React from "react";
import { Link } from "react-router-dom"; // Dùng Link thay vì thẻ <a> để không load lại trang
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>HealthCompass AI 🩺</h2>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Trang chủ</Link>
        </li>
        <li>
          <Link to="/diagnosis">Chẩn đoán</Link>
        </li>
        <li>
          <Link to="/chat">Trò chuyện AI</Link>
        </li>
      </ul>
    </nav>
  );
};

