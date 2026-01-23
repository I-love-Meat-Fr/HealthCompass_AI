import React from "react";
import "./SymptomForm.css";
import { DiagnosisCard } from "./DiagnosisCard";

import { useUserSymptom } from "../hooks/useUserSymptom";
export const SymptomForm = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    handleSend,
    loading,
    analysisResult,
    diagnosisResults
  } = useUserSymptom();
  const onFormSubmit = (e) => {
    handleSubmit(e); // Gọi hàm ngăn load trang và log dữ liệu
    handleSend(); // Gọi AI phân tích
  };
  //Đây là dòng quan trọng nhất. Component này không tự quản lý dữ liệu. Nó "gọi điện" cho Hook useUserInfo và yêu cầu cung cấp 3 thứ:

  //formData: Dữ liệu hiện tại để hiển thị lên màn hình.

  //handleChange: Công cụ để báo cáo khi người dùng gõ phím.

  //handleSubmit: Công cụ để xử lý khi người dùng nhấn nút "Lưu".

  return (
    <div className="form-container">
      <h3>THÔNG TIN</h3>
      <form onSubmit={onFormSubmit}>
        <div className="form-group">
          <label>Triệu chứng</label>
          <textarea
            name="symptom"
            placeholder="Symptom"
            value={formData.symptom}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Đang phân tích..." : "Gửi thông tin"}
        </button>
      </form>
      {/* Chỉ hiển thị vùng kết quả nếu đã có kết quả hoặc đang load */}
      {/* {(analysisResult || loading) && ( */}
      <div className="result-container">
        <h3>Kết quả phân tích:</h3>
        {loading ? (
          <p className="loading-text">AI đang xử lý dữ liệu của bạn...</p>
        ) : (
          <DiagnosisCard diagnosisResults={diagnosisResults} />
        )}
      </div>
    </div>
  );
};
// Thẻ <form> bao quanh tất cả các ô nhập liệu.

// onSubmit={handleSubmit}: Khi người dùng nhấn nút "Lưu" (hoặc nhấn Enter),
// Form sẽ kích hoạt hàm handleSubmit (hàm này nằm bên file Hook) để xử lý dữ liệu (ví dụ: gửi đi, chặn load lại trang).

