import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { useState } from "react";
import React from "react";

export const useNutritionAnalyzer = () => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const generationConfig = {
    // maxOutputTokens: 4000, // Giới hạn phản hồi trong khoảng 500 token (~300-400 từ)
    // Giảm độ sáng tạo để AI tập trung vào số liệu thực tế
    temperature: 0.2,
  };
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH, // Chỉ chặn những gì thực sự nguy hiểm
    },
    // Thêm các category khác tương tự...
  ];
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig,
    safetySettings,
  });

    const fullproPrompt = `
    Hãy phân tích hình ảnh món ăn này và thực hiện các yêu cầu sau:
    1. Nhận diện các nguyên liệu chính có trong món.
    2. Với mỗi nguyên liệu, hãy cung cấp:
      - Tên chuẩn theo USDA FoodData Central (tiếng Anh).
      - Lượng Calo ước tính dựa trên kích thước trong ảnh.
      - Trình bày như bình thường theo từng món không cần tạo bảng
    3. Tính tổng lượng Calo cho toàn bộ món ăn.
    4. Đưa ra lời khuyên dinh dưỡng ngắn gọn (về cân bằng chất, natri hoặc cách chế biến).
    
    Yêu cầu: Trình bày rõ ràng bằng tiếng Việt, ngắn gọn, đúng trọng tâm.
  `;

  async function analyzeImage(file) {
    // 1. Chuyển đổi file ảnh sang định dạng mà Google API yêu cầu
    const imageParts = await Promise.all([fileToGenerativePart(file)]);

    // 2. Gọi API với cả văn bản và hình ảnh
    const result = await model.generateContent([fullproPrompt, ...imageParts]);
    const response = await result.response;
    return response.text();
  }

  // Hàm hỗ trợ chuyển đổi File sang Base64
  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });

    return {
      inlineData: {
        data: await base64EncodedDataPromise,
        mimeType: file.type,
      },
    };
  }
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSend = async () => {
    if (!image) return alert("Vui lòng chọn ảnh!");

    setLoading(true);
    try {
      const imageParts = await Promise.all([fileToGenerativePart(image)]);
      const response = await model.generateContent([
        fullproPrompt,
        ...imageParts,
      ]);
      const text = response.response.text();
      setResult(text);
      console.log(text);
    } catch (error) {
      console.error("Lỗi API Gemini:", error);
      alert("Có lỗi xảy ra khi phân tích ảnh.");
    } finally {
      setLoading(false);
    }
  };
  return { handleFileChange, handleSend, loading, result, image };
};
