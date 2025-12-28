import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai"; 
export const useUserSymptom = () => {
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    symptom: "",
  });
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");// Lưu kết quả phân tích vào đây
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
const handleSend = async () => {
    // Kiểm tra dữ liệu đầu vào
    if (!formData.symptom.trim()) {
        alert("Vui lòng nhập triệu chứng!");
        return;
    }

    setLoading(true);
    try {
      // Tối ưu Prompt để AI phân tích chính xác hơn
      const fullPrompt = `
        Thông tin bệnh nhân:
        - Tuổi: ${formData.age}
        - Chiều cao: ${formData.height} cm
        - Cân nặng: ${formData.weight} kg
        - Triệu chứng: ${formData.symptom}
        Các nguồn yêu cầu tham khảo: IDC-11;
        Hãy đưa ra các chẩn đoán có thể xảy ra, trình bày khoa học, có cấu trúc, nguồn gốc thông tin rõ ràng và hãy đánh mã ICD-11 cho từng chẩn đoán.
        Hãy liệt kê các bước tiếp theo nên làm (xét nghiệm, thăm khám chuyên khoa...) một cách cụ thể.
        Chuẩn hóa thông số liệu y khoa và tránh các khuyến nghị mơ hồ.
        Không cần hỏi lại thêm thông tin.
        Không cần viết dài dòng văn nói, phải sử dụng văn phong khoa học, đúng chuyên ngành và đúng chuyên môn.
      `;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      setAnalysisResult(response.text()); // Cập nhật kết quả vào state
    } catch (error) {
      console.error("Lỗi gọi API:", error);
      setAnalysisResult("Rất tiếc, hệ thống không thể phân tích lúc này. Vui lòng thử lại.");
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
 return { formData, handleChange, handleSubmit, handleSend, loading, analysisResult };
 };