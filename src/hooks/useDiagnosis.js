// import { useState } from 'react';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import axios from 'axios';

// // Cấu hình Gemini
// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// export const useDiagnosis = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [diagnosisResults, setDiagnosisResults] = useState([]);

//   // 1. Hàm trích xuất thuật ngữ y khoa bằng Gemini
//   const extractMedicalTerms = async (description) => {
//     const prompt = `
//       You are a Medical Entity Extractor. Extract medical terms from: "${description}".
//       Return ONLY a JSON object: {"entities": [{"term": "English term", "confidence": 0.9}]}.
//       Always return English terms for ICD-11 compatibility.
//     `;
    
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
    
//     // Bóc tách JSON từ kết quả của AI
//     const jsonMatch = text.match(/\{.*\}/s);
//     if (!jsonMatch) throw new Error("AI không trả về đúng định dạng dữ liệu.");
//     return JSON.parse(jsonMatch[0]);
//   };

//   // 2. Hàm gọi API ICD-11 (Thông qua Proxy Backend của bạn)
//   const fetchICD11Data = async (searchTerm) => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/icd/search', {
//         params: { q: searchTerm }
//       });
//       console.log('ICD-11 API response:', response.data);
//       return response.data; // Giả định backend trả về danh sách mã bệnh
//     } catch (err) {
//       console.error(`Lỗi tra cứu ICD cho ${searchTerm}:`, err);
//       return [];
//     }
//   };

//   // 3. Hàm điều phối chính (Hàm này sẽ được gọi từ UI)
//   const runDiagnosis = async (userDescription) => {
//     if (!userDescription) return;
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       // BƯỚC 1: Hiểu triệu chứng
//       const data = await extractMedicalTerms(userDescription);
      
//       // BƯỚC 2: Tra cứu sự thật từ ICD-11
//       const allResults = await Promise.all(
//         data.entities.map(entity => fetchICD11Data(entity.term))
//       );

//       // BƯỚC 3: Làm sạch và gộp dữ liệu (Flatten array)
//       const flattenedResults = allResults.flat();
//       setDiagnosisResults(flattenedResults);

//     } catch (err) {
//       setError("Có lỗi xảy ra trong quá trình phân tích. Vui lòng thử lại.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { runDiagnosis, loading, error, diagnosisResults };
// };