import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom"; // Thêm để chuyển trang
import axios from "axios"; // Thêm để gọi Backend
import { a } from "framer-motion/client";
export const useUserSymptom = () => {
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    symptom: "",
  });
  const [loading, setLoading] = useState(false);
  const [diagnosisResults, setDiagnosisResults] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(""); // Lưu kết quả phân tích vào đây
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  // export: cho phép các file khác (như UserForm.jsx) có thể mượn bộ não này để sử dụng
  // UserSymptom: Tên hàm bắt đầu bằng use, báo cho React biết đây là một Hook.
  //formData: Là một Object. Thay vì tạo 4 cái useState riêng lẻ cho tên, tuổi...
  // ta gộp chung vào 1 Object để quản lý tập trung. Điều này giúp code gọn hơn rất nhiều.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //e.target: Khi bạn gõ vào một ô <input>, e.target chính là cái ô đó.
  //const { name, value }: Lấy ra cái tên của ô (ví dụ: "fullName") và giá trị bạn vừa gõ.
  //...prev (Spread Operator): Đây là lệnh "Giữ lại những gì đang có".
  // Nếu bạn sửa Tên, nó sẽ giữ nguyên Tuổi và Giới tính, không làm mất chúng.
  //[name]: value: Đây là kỹ thuật Computed Property Name. Nó sẽ tự hiểu: "Nếu name là age, hãy cập nhật giá trị vào biến age trong Object".
  //Lợi ích: Bạn chỉ cần duy nhất 1 hàm này để xử lý cho 10 hay 100 ô nhập liệu khác nhau, thay vì mỗi ô một hàm.
  // Hàm hỗ trợ dịch thuật
  const translateTitle = async (englishText) => {
  try {
    console.log("--- Bắt đầu dịch thuật ngữ:", englishText); // Log đầu vào
    const response = await axios.post("http://127.0.0.1:5001/translate", {
      text: englishText,
      source: "en",
      target: "vi",
    });

    console.log("Dữ liệu thô từ Server 5001:", response.data); // Quan trọng: Xem cấu trúc JSON trả về

    // Ép kiểu trả về để đảm bảo lấy đúng field
    const result = response.data.translatedText || response.data.text || response.data;
    console.log("Kết quả sau khi bóc tách:", result);
    
    return result;
  } catch (error) {
    console.error("Lỗi kết nối Server 5001:", error.message);
    return englishText;
  }
};
  const handleSend = async () => {
    if (loading) return;
    // Kiểm tra dữ liệu đầu vào
    if (!formData.symptom.trim()) {
      alert("Vui lòng nhập triệu chứng!");
      return;
    }

    setLoading(true);
    try {
      // Tối ưu Prompt để AI phân tích chính xác hơn
      // Đừng để AI dịch từng từ, hãy ép nó xử lý 1 chuỗi dài
  const fullPrompt = `Convert these symptoms to medical English: "${formData.symptom}". Return JSON array only.`;
      const result = await model.generateContent(fullPrompt);
      const aiResponseText = result.response.text();
      // Xử lý chuỗi JSON từ AI (loại bỏ các ký tự markdown nếu có)
      const cleanJson = aiResponseText.replace(/```json|```/g, "").trim();
      const keywords = JSON.parse(cleanJson);
      console.log("Keywords AI đã trích xuất:", keywords);
      // setAnalysisResult(aiResponseText); // Cập nhật kết quả vào state
      if (keywords && keywords.length > 0) {
        const searchTerm = keywords[0];

        // 1. Gọi Backend ICD để lấy danh sách mã bệnh (Tiếng Anh)
        const response = await axios.get(
          `http://localhost:5000/api/icd/search`,
          {
            params: { q: searchTerm },
          },
        );

        const rawResults = response.data; // Đây là mảng chứa các object có title tiếng Anh

        // 2. DUYỆT QUA MẢNG VÀ DỊCH TỪNG TITLE
        // Dùng Promise.all để dịch tất cả cùng lúc cho nhanh
        const translatedResults = await Promise.all(
          rawResults.map(async (item) => {
            const translatedTitle = await translateTitle(item.title);
            return {
              ...item,
              title: translatedTitle, // Thay thế title gốc bằng title đã dịch
              titleEn: item.title
            };
          }),
        );

        // 3. Cập nhật kết quả cuối cùng (đã dịch) vào State
        setDiagnosisResults(translatedResults);
        setAnalysisResult(`Đã tra cứu xong cho: ${searchTerm}`);
      }
    } catch (error) {
      console.error("Lỗi gọi API hoặc trong luồn xử lý:", error);
      setAnalysisResult(
        "Rất tiếc, hệ thống không thể phân tích lúc này. Vui lòng thử lại. Hoặc không thể kết nối với hệ thống dữ liệu y tế.",
      );
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Thông tin người dùng đã nhập:", formData);
    // alert("Cập nhật thông tin thành công!");
    handleSend(); // Gọi AI phân tích
  };

  //e.preventDefault(): Mặc định khi bấm nút submit, trình duyệt sẽ tải lại trang (F5). Dòng này ngăn việc đó lại để ứng dụng React chạy mượt mà không bị ngắt quãng.

  //formData: Lúc này toàn bộ dữ liệu người dùng đã nằm gọn trong biến này, sẵn sàng để gửi đi.
  return {
    formData,
    handleChange,
    handleSubmit,
    handleSend,
    loading,
    analysisResult,
    diagnosisResults,
  };
};
