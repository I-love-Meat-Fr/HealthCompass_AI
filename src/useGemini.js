import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export function Server() {
const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Khởi tạo Gemini API (Thay 'YOUR_API_KEY' bằng key của bạn)
  // Thay vì dán trực tiếp, hãy gọi process.env
 // Đổi từ process.env sang import.meta.env
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setHistory([...history, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const result = await model.generateContent(input);
      const response = await result.response;
      const botMessage = { role: "bot", text: response.text() };

      setHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Lỗi gọi API:", error);
      setHistory((prev) => [
        ...prev,
        { role: "bot", text: "Rất tiếc, đã có lỗi xảy ra!" },
      ]);
    } finally {
      setLoading(false);
    }
  }
  return { input, setInput, history, loading, handleSend };
};