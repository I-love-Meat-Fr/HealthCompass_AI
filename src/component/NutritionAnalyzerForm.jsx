import React from "react";
import { useNutritionAnalyzer } from "../hooks/useNutritionAnalyzer";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Zap, ClipboardList, Info } from "lucide-react";
import "./NutritionAnalyzer.css";

export const NutritionAnalyzerForm = () => {
  const { handleFileChange, handleSend, loading, result, image } = useNutritionAnalyzer();

  // Tạo URL để xem trước ảnh
  const imagePreview = image ? URL.createObjectURL(image) : null;

  return (
    <motion.div 
      className="nutrition-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="header-info">
        <h2>Phân tích dinh dưỡng <span className="ai-badge">AI</span></h2>
        <p className="subtitle">Chụp ảnh món ăn để biết chính xác hàm lượng Calo và Macro.</p>
      </div>

      <div className="instruction-steps">
        <div className="step"><div className="step-num">1</div> Tải ảnh lên</div>
        <div className="step"><div className="step-num">2</div> Nhấn phân tích</div>
        <div className="step"><div className="step-num">3</div> Nhận kết quả</div>
      </div>

      <div className="upload-section">
        <label className="custom-file-upload">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <Upload size={24} />
          <span>{image ? "Đổi ảnh khác" : "Chọn ảnh món ăn"}</span>
        </label>

        {imagePreview && (
          <motion.div className="preview-container" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
            <img src={imagePreview} alt="Preview" className="image-preview" />
            <p className="file-name">{image.name}</p>
          </motion.div>
        )}

        <button 
          className="btn-analyze" 
          onClick={handleSend} 
          disabled={loading || !image}
        >
          {loading ? (
            <div className="loader-container">
              <div className="spinner"></div> Đang tính toán...
            </div>
          ) : (
            <><Zap size={20} /> Gửi phân tích ngay</>
          )}
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div 
            className="result-box"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <div className="result-header">
              <ClipboardList size={20} />
              <h3>Báo cáo dinh dưỡng</h3>
            </div>
            <div className="analyses-text">{result}</div>
            <div className="disclaimer">
              <Info size={14} /> 
              Thông tin chỉ mang tính tham khảo. Hãy tham khảo ý kiến chuyên gia y tế.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};