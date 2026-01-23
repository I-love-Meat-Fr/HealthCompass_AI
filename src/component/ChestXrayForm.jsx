import React, { useState } from "react";
import { predictChestDisease } from "../hooks/useService";
import "./ChestXrayForm.css"; // Import file CSS ở đây

export const ChestXrayForm = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult("");
    }
  };

  const onAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const prediction = await predictChestDisease(image);
      setResult(prediction);
    } catch (err) {
      setResult(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isNormal = result.toString().toLowerCase().includes("normal");

  return (
    <div className="medical-container">
      <div className="header-section">
        <div className="icon-wrapper">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="title">Chẩn đoán X-quang</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <label className="upload-label">
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#64748b' }}>
              <span style={{ color: '#2563eb', fontWeight: 700 }}>Nhấn để tải lên</span> hoặc kéo thả
            </p>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>PNG, JPG (MAX. 5MB)</p>
          </div>
          <input type="file" style={{ display: 'none' }} accept="image/*" onChange={onFileChange} />
        </label>

        {preview && (
          <div className="preview-container">
            <div className="image-frame">
              <img src={preview} alt="X-ray" className="preview-image" />
            </div>
            <button className="remove-btn" onClick={() => { setImage(null); setPreview(null); setResult(""); }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <button onClick={onAnalyze} disabled={loading || !image} className="analyze-btn">
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <div className="spinner"></div>
              <span>Đang phân tích...</span>
            </div>
          ) : "Bắt đầu phân tích"}
        </button>
      </div>

      {result && (
        <div className={`result-card ${isNormal ? 'result-normal' : 'result-pneumonia'}`}>
          <span className={`badge ${isNormal ? 'badge-normal' : 'badge-pneumonia'}`}>Kết quả AI</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>
            {isNormal ? "PHỔI BÌNH THƯỜNG" : "DẤU HIỆU VIÊM PHỔI"}
          </div>
        </div>
      )}
    </div>
  );
};