import React from "react";
import { useNutritionAnalyzer } from "./useNutritionAnalyzer";
import "./NutritionAnalyzer.css";

export const NutritionAnalyzerForm = () => {
  const { analyzeImage, handleFileChange, handleSend, loading, result, image } =
    useNutritionAnalyzer();
  return (
    <div>
      <div className="p-4">
        <h2>Phân tích dinh dưỡng qua ảnh</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {image && <p>Đã chọn: {image.name}</p>}

        <button onClick={handleSend} disabled={loading}>
          {loading ? "Đang phân tích..." : "Gửi phân tích"}
        </button>

        {result && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <h3>Kết quả:</h3>
            <p className="analyses-text">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};
