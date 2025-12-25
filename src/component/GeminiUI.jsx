import React from "react";
import "../App.css"; // Import file CSS đã tạo ở trên
import { Server } from "../useGemini";

const GeminiUI = () => {
  // Giả sử history, input, setInput, handleSend, loading đã được định nghĩa ở đây
  const { input, setInput, history, loading, handleSend } = Server();
  return (
    <div className="app-container">
      <h2>Gemini Chatbot</h2>

      <div className="chat-window">
        {history.map((msg, index) => (
          <div
            key={index}
            className={`message-wrapper ${
              msg.role === "user" ? "user" : "gemini"
            }`}
          >
            <p className="message-bubble">
              <strong>{msg.role === "user" ? "Bạn: " : "Gemini: "}</strong>
              {msg.text}
            </p>
          </div>
        ))}
        {loading && <p>Gemini đang suy nghĩ...</p>}
      </div>

      <div className="input-area">
        <input
          className="input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Nhập tin nhắn..."
        />
        <button className="send-button" onClick={handleSend}>
          Gửi
        </button>
      </div>
    </div>
  );
};

export default GeminiUI;
