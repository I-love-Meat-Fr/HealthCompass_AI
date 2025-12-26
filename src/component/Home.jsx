import React from "react";
import { Link } from "react-router-dom";
import {
  BrainCircuit,
  Activity,
  Utensils,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import "./Home.css";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <div className="home-container">
      {/* 1. HERO SECTION */}
      <header className="hero-section">
        <div className="hero-content">
          <span className="badge">AI-Powered Health Assistant</span>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Làm Chủ Sức Khỏe Với <span>Trí Tuệ Nhân Tạo</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            HealthCompass AI giúp bạn chẩn đoán triệu chứng, phân tích dinh
            dưỡng qua hình ảnh và tư vấn sức khỏe cá nhân hóa chỉ trong vài
            giây.
          </motion.p>
          <div className="hero-btns">
            <Link to="/diagnosis" className="btn-primary">
              Bắt đầu ngay <ArrowRight size={20} />
            </Link>
            <Link to="/chat" className="btn-secondary">
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
        <div className="hero-image">
          {/* Bạn có thể thay bằng một ảnh minh họa y tế chuyên nghiệp */}
          <div className="image-placeholder">
            <Activity size={100} color="#22c55e" />
          </div>
        </div>
      </header>

      {/* 2. FEATURES SECTION */}
      <section className="features-section">
        <div className="section-title">
          <h2>Tính năng nổi bật</h2>
          <p>Công nghệ hiện đại cho một cuộc sống khỏe mạnh hơn</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon-box">
              <BrainCircuit />
            </div>
            <h3>Chẩn đoán AI</h3>
            <p>Phân tích triệu chứng dựa trên kho dữ liệu y khoa khổng lồ.</p>
          </div>

          <div className="feature-card">
            <div className="icon-box">
              <Utensils />
            </div>
            <h3>Phân tích Dinh dưỡng</h3>
            <p>
              Chụp ảnh món ăn, Gemini AI sẽ liệt kê lượng Calo và Macro giúp
              bạn.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon-box">
              <ShieldCheck />
            </div>
            <h3>An toàn & Bảo mật</h3>
            <p>
              Dữ liệu của bạn được bảo mật tuyệt đối với cơ sở hạ tầng của
              google.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
