import React from "react";
import { Link } from "react-router-dom";
import { HeartPulse, Github, Facebook, Twitter, Mail, Phone } from "lucide-react";
import "./Footer.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1: Giới thiệu */}
        <div className="footer-section about">
          <div className="footer-logo">
            <HeartPulse size={24} color="#22c55e" />
            <h3>HealthCompass <span>AI</span></h3>
          </div>
          <p>
            Giải pháp hỗ trợ sức khỏe thông minh sử dụng trí tuệ nhân tạo. 
            Chúng tôi giúp bạn thấu hiểu cơ thể mình hơn mỗi ngày.
          </p>
          <div className="social-icons">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Github size={20} /></a>
          </div>
        </div>

        {/* Cột 2: Điều hướng nhanh */}
        <div className="footer-section links">
          <h4>Tính năng</h4>
          <ul>
            <li><Link to="/diagnosis">Chẩn đoán AI</Link></li>
            <li><Link to="/nutrition">Phân tích thực phẩm</Link></li>
            <li><Link to="/chat">Trò chuyện chuyên gia</Link></li>
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div className="footer-section contact">
          <h4>Liên hệ</h4>
          <p><Mail size={16} /> nguyenquocanh170205@gmail.com </p>
          <p><Phone size={16} /> +84 369 329 533</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} HealthCompass AI. Kết quả từ AI chỉ mang tính chất tham khảo.</p>
      </div>
    </footer>
  );
};