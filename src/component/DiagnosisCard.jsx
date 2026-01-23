import React from "react";
import "./DiagnosisCard.css";

export const DiagnosisCard = ({ diagnosisResults }) => {
  // Lọc chỉ lấy những kết quả có điểm dương để tránh nhiễu
  const validResults = diagnosisResults?.filter(r => r.score > 0) || [];

  if (validResults.length === 0) {
    return <div className="no-data">Không tìm thấy mã ICD phù hợp.</div>;
  }

  return (
    <div className="diagnosis-wrapper">
      <div className="section-header">
        <h4 className="title">DANH MỤC ĐỐI SOÁT ICD-11</h4>
        <span className="count">Tìm thấy {validResults.length} kết quả</span>
      </div>
      
      {validResults.map((result, index) => (
        <div key={result.uri || index} className="medical-card">
          <div className="card-main">
            <div className="info-side">
              <div className="badge-row">
                <span className="icd-badge">ICD-11 ENTITY</span>
                <span className="code-text">Mã: {result.code || "N/A"}</span>
              </div>
              
              <h3 className="disease-title-vn">{result.title}</h3>
              <h4 className="disease-title-en">{result.titleEn || "Scientific Term"}</h4>
            </div>
            
            <div className="score-side">
              <div className="score-circle">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="circle" 
                    strokeDasharray={`${Math.max(0, result.score * 100)}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  />
                </svg>
                <div className="percentage">{Math.round(result.score * 100)}%</div>
              </div>
              <span className="score-label">ĐỘ KHỚP</span>
            </div>
          </div>
          
          <div className="card-action">
            <a href={result.uri} target="_blank" rel="noreferrer" className="who-link">
              Truy cập dữ liệu WHO.int
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};