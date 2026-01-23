import axios from "axios";

// Sử dụng URL tuyệt đối trỏ thẳng đến cổng 9000
const INFERENCE_URL = "http://127.0.0.1:9000/predict"; 

export const predictChestDisease = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile); 

  try {
    const response = await axios.post("http://127.0.0.1:9000/predict", formData);
    
    // Log để kiểm chứng: console.log(response.data) sẽ ra [{"image":"Normal"}]
    // Cách trích xuất:
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0].image; // Trả về đúng chữ "Normal"
    }
    
    return response.data.image || response.data; 
  } catch (err) {
    throw new Error(err.response?.data?.error || "Lỗi kết nối Server");
  }
};