import React from "react";
import { Link, useLocation } from "react-router-dom"; // Dùng Link thay vì thẻ <a> để không load lại trang
import { HeartPulse, Home, Stethoscope, Salad, MessageSquare } from "lucide-react"; // Thêm icon

import "./Navbar.css";

export const Navbar = () => {
  const location = useLocation(); // Dùng để highlight trang đang đứng

  const isActive = (path) => (location.pathname === path ? "active" : "");
  
  return (
    <nav className="navbar"> 
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <HeartPulse size={28} color="#22c55e" />
          <h2>HealthCompass <span>AI</span></h2>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive("/")}>
              <Home size={18} /> Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/diagnosis" className={isActive("/diagnosis")}>
              <Stethoscope size={18} /> Chẩn đoán
            </Link>
          </li>
          <li>
            <Link to="/nutrition" className={isActive("/nutrition")}>
              <Salad size={18} /> Dinh dưỡng
            </Link>
          </li>
          <li>
            <Link to="/chest" className={isActive("/chest")}>
              <MessageSquare size={18} /> Chuẩn đoán phổi
            </Link>
          </li>
          <li>
            <Link to="/chat" className={isActive("/chat")}>
              <MessageSquare size={18} /> AI Chat
            </Link>
          </li>
          
                   
        </ul>

        <div className="navbar-actions">
          <button className="btn-get-started">Bắt đầu</button>
        </div>
      </div>
    </nav>
  );
};

