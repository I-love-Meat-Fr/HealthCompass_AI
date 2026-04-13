# 🏥 HealthCompass AI

**HealthCompass AI** is an intelligent health information analysis system that leverages the power of **Large Language Models (Gemini API)** to extract symptoms and map them to the **ICD-11 (International Classification of Diseases)** international medical standards. This project was developed to bridge the gap between natural language user descriptions and professional clinical classifications.

## 🚀 Key Features

* **AI Symptom Extraction:** Utilizes the Gemini API to analyze unstructured user descriptions and automatically identify primary symptoms.
* **ICD-11 Mapping:** Automatically suggests corresponding medical codes based on the World Health Organization (WHO) standards.
* **Health Mapping:** Visualizes health pathways and categories based on the processed input data.
* **Interactive Dashboard:** A modern, seamless management interface built with **React** and **Inertia.js**.
* **Secure Data Handling:** Designed with a priority on protecting sensitive user information and maintaining data privacy.

## 🛠 Tech Stack

* **Frontend:** React.js, Tailwind CSS, Vite.
* **AI Integration:** Google Gemini API (Generative AI).
* **Environment:** Developed on **WSL2 (Ubuntu)** using Docker and Laravel Sail.

## 📦 Installation & Setup

To run this project in your local environment (optimized for WSL2), follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/healthcompass-ai.git](https://github.com/yourusername/healthcompass-ai.git)
    cd healthcompass-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Copy the `.env.example` file to `.env` and configure your Database and API Key:
    ```bash
    cp .env.example .env
    ```
    *Note: Ensure you add `GEMINI_API_KEY=your_key_here` to the `.env` file.*


4.  **Run the application:**
    ```bash
    # In a separate terminal, start the Vite development server
    npm run dev
    ```

## 🧠 AI Prompt Strategy

The project implements **System Instruction** and **Few-shot Prompting** techniques to ensure the Gemini API returns highly accurate, structured **JSON** data. This allows the Backend to process and store health information efficiently.

## 📸 Screenshots & Demo
https://github.com/I-love-Meat-Fr/HealthCompass_AI/blob/main/public/images/Screenshot%202026-04-13%20203515.png
https://github.com/I-love-Meat-Fr/HealthCompass_AI/blob/main/public/images/Screenshot%202026-04-13%20203615.png
https://github.com/I-love-Meat-Fr/HealthCompass_AI/blob/main/public/images/Screenshot%202026-04-13%20203657.png
https://github.com/I-love-Meat-Fr/HealthCompass_AI/blob/main/public/images/image.png
## 🤝 Contact

* **Quoc Anh** - IT Student & AI Researcher
* **LinkedIn:** [https://www.linkedin.com/in/quoc-anh-nguyen-716617402/](https://www.linkedin.com/in/quoc-anh-nguyen-716617402/)
* **GitHub:** [https://github.com/I-love-Meat-Fr](https://github.com/I-love-Meat-Fr)

---
*Developed with ❤️ using Laravel, React, and Gemini AI.*
