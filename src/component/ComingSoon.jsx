import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, ArrowLeft, Construction, Bell } from "lucide-react";
import "./ComingSoon.css";

export const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="coming-soon-wrapper">
      <motion.div 
        className="coming-soon-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="icon-container"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Rocket size={60} color="#007bff" />
        </motion.div>

        <span className="status-badge">
          <Construction size={14} /> Under Construction
        </span>

        <h1>Tính năng này đang được <span>hoàn thiện</span></h1>
        
        <p>
          Đội ngũ kỹ thuật của HealthCompass AI đang làm việc hết công suất để mang đến 
          cho bạn trải nghiệm tốt nhất. Hãy quay lại sau nhé!
        </p>

        <div className="coming-soon-actions">
          <button className="btn-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} /> Quay lại
          </button>
          <button className="btn-notify">
            <Bell size={18} /> Nhận thông báo
          </button>
        </div>

        {/* Thanh tiến trình giả (Progress Bar) */}
        <div className="progress-container">
          <div className="progress-label">
            <span>Tiến độ hoàn thành</span>
            <span>75%</span>
          </div>
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};