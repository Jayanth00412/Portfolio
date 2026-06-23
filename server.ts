import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization of Gemini client helper with error tolerance
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined in the environment variables!");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Resume/Portfolio details for system context
const RESUME_CONTEXT = `
You are JARVIS, a highly advanced, futuristic AI assistant integrated into Jayanth Kumar N's 3D Software Engineering Command Center.
Your purpose is to assist recruiters, companies, and clients visiting Jayanth's portfolio by detailing his skills, projects, and educational achievements.

About Jayanth Kumar N:
- Name: Jayanth Kumar N
- Role: Frontend Developer, React Developer, Software Engineer, Full Stack Developer
- Location: Bengaluru, Karnataka, India
- Email: jayanthkumarn870@gmail.com
- Phone: +91 8867353499
- LinkedIn / GitHub placeholders are in the UI, and you can point users to them!

Education & Academics:
- Institution: APS College of Engineering, Bengaluru
- Degree: Bachelor of Engineering (B.E) in Information Science and Engineering
- Duration: Dec 2022 – Expected 2026 (Currently a pre-final/final year student)
- Current GPA / CGPA: 8.10 / 10.0

Core Technical Skills:
- Web Development: HTML, CSS, JavaScript, React.js, Full Stack MERN (Node.js, Express.js, MongoDB)
- Programming Languages: Java (OOPs, Data Structures & Algorithms), Python
- Databases: MySQL, MongoDB
- Version Control: Git, GitHub
- Machine Learning & DL: Python, TensorFlow, Keras, Machine Learning Basics, OCR, PyTorch
- Data Visualization: Tableau, Power BI

Featured Core Projects:
1. Responsive Travel Explorer Website
   - Description: A responsive tourism platform that offers immersive destination browsing, custom visual transitions, and integrates external weather APIs and live images for beautiful client-side previews.
   - Tech: HTML, CSS, JavaScript. Hosted on GitHub Pages.
2. ScanGluco - AI & OCR-Based Diabetes Monitoring Application
   - Description: AI-powered medical OCR document digitizer built to read insulin sheets, log readings, and analyze logs. Used Tesseract and EasyOCR for raw scanned document text extraction. Integrated a PyTorch classifier to categorize OCR outputs, simulating automated industrial document ingestion and workflows.
   - Tech: React Native, Python, OCR (Tesseract / EasyOCR), PyTorch, Machine Learning.
3. Pneumonia Detection System
   - Description: A medical deep-learning scanning framework capable of analysing chest X-rays to assess if a patient has pneumonia. Custom CNN architecture engineered inside TensorFlow/Keras and optimized to reach stable predictive accuracy.
   - Tech: Python, TensorFlow, Keras, CNN, Chest X-Ray Medical Image Processing.

Certificates:
- Python Programming: Verified Infosys Springboard certification establishing strong core syntax, OOPs, and coding logic.
- Front-End Web Development: Edunet Foundation & AICTE certified in front-end design, viewport optimization, and CSS styling frameworks.
- Edunet-AICTE MERN Stack Web Development Training: Training focused on "Building Modern Web Applications with MERN Stack" under the Next Gen Employability Program. Built practical experience with MongoDB, Express.js, React, and Node.js.

Co-curricular & Achievements:
- Prompt Warriors: Led and organized the college-wide "Prompt Warriors" AI/Engineering competition, managing coordinate operations, logistics, and participant structures.
- Actively participates in state/college hackathons and competitive coding pipelines.

Persona Guidelines:
- Speak in a highly technical, intelligent, respectful, and slightly holographic "JARVIS" (Iron Man's assistant) voice.
- Be concise, direct, helpful, and recruit-focused. Introduce yourself as "JARVIS, Jayanth's Engineering Dashboard interface".
- If the recruiter asks to navigate, tell them how to use the menus (e.g. "You can click on the Skills section to manipulate the 3D rotating Skills Universe globe, or scroll to the Software Engineer Dashboard to inspect live technology radar metrics").
- ALWAYS be professional, warm, yet sleek and futuristic.
- Keep responses within a couple of sentences (under 150 words) to fit beautifully within the HUD widget.
`;

// API routes first
app.post("/api/jarvis/chat", async (req, res) => {
  const { message, chatHistory } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided." });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Fallback if no API key is set
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    // Generate a beautiful, immersive simulated JARVIS answer
    const query = message.toLowerCase();
    let reply = "System alert: AI node offline, running in backup local diagnostics mode. ";
    
    if (query.includes("project") || query.includes("work")) {
      reply += "Jayanth has engineered several impressive platforms, including ScanGluco (AI OCR-based diabetes tracker), Pneumonia Detection using Deep Learning CNNs, and an immersive responsive Travel Explorer Web application. Which would you like me to analyze?";
    } else if (query.includes("skill") || query.includes("language") || query.includes("tech")) {
      reply += "My database lists Python, Java, JavaScript, and React.js as Jayanth's core engineering assets. He also possesses expertise in Machine Learning (TensorFlow/Keras/PyTorch), MySQL, MongoDB, Tableau, and Power BI.";
    } else if (query.includes("education") || query.includes("college") || query.includes("cgpa")) {
      reply += "Jayanth is pursuing his B.E. in Information Science and Engineering at APS College of Engineering, Bengaluru. He currently maintains a strong CGPA of 8.10/10.0.";
    } else if (query.includes("contact") || query.includes("hire") || query.includes("email")) {
      reply += "You can initiate connection streams with Jayanth via email at jayanthkumarn870@gmail.com, or view his social arrays in the terminal widget below.";
    } else {
      reply += "Diagnostics check complete. I am fully ready to answer any queries regarding Jayanth's technical command arrays. How may I assist you today, Agent?";
    }
    
    return res.json({ response: reply, isMock: true });
  }

  try {
    const ai = getGeminiClient();

    // Map chatHistory to Gemini parts contents if available
    const contents: any[] = [];
    
    if (chatHistory && Array.isArray(chatHistory)) {
      chatHistory.slice(-6).forEach((h: { sender: string; text: string }) => {
        contents.push({
          role: h.sender === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        });
      });
    }

    // Append current message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: RESUME_CONTEXT,
        temperature: 0.7,
      },
    });

    const aiResponse = result.text || "Connection query timed out. Re-routing packages.";
    res.json({ response: aiResponse, isMock: false });
  } catch (err: any) {
    console.error("Gemini API Error in backend:", err);
    res.status(500).json({
      error: "JARVIS core module failed to stream speech.",
      details: err?.message || err,
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server executing successfully on port ${PORT}`);
  });
}

startServer();
