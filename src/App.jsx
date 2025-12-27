import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";
import Chatbot from "./component/GeminiUI.jsx";
// import SymptomForm from "src/component/SymptomForm.jsx";
import { SymptomForm } from "./component/SymptomForm.jsx";
import GeminiUI from "./component/GeminiUI.jsx";
// import Navbar from "src/component/Navbar/Navbar.jsx";
import { Navbar } from "./component/Navbar/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./component/Home.jsx";
import { NutritionAnalyzerForm} from "./component/NutritionAnalyzerForm.jsx";
import { Footer } from "./component/Footer/Footer";
import { ComingSoon } from "./component/ComingSoon.jsx";

function App() {
  return (
    <Router>
      <div className="container">
        {/* Navbar luôn hiển thị ở trên cùng */}
        <Navbar />

        {/* Phần nội dung thay đổi dựa theo đường dẫn (URL) */}
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diagnosis" element={<SymptomForm />} />
            <Route path="/nutrition" element={<NutritionAnalyzerForm />} />
            <Route path="/chat" element={<ComingSoon />} />
          </Routes>                                 
        </div>
        <Footer />  
      </div>
    </Router>
  );
}

export default App;
