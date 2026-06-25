import { Project, Skill, Certificate, EducationTimelineItem } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "travel-explorer",
    title: "Travel Explorer",
    description: "An immersive, responsive tourism platform designed to provide interactive destination search, elegant transitions, and mock real-time weather API synchronization.",
    features: [
      "Dynamic destination index and filtering",
      "Interactive, polished responsive visual cards",
      "Live weather telemetry and image synchronization via external third-party API proxies",
      "Sub-second layout query responses"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "REST APIs"],
    githubUrl: "https://github.com/Jayanth00412",
    liveUrl: "https://jayanthkumarn870.github.io",
    glowColor: "#00F5FF"
  },
  {
    id: "scangluco",
    title: "ScanGluco",
    description: "An intelligent OCR-driven medical assistant application capable of parsing daily blood glucose reports, digitizing visual records, and classifying outputs.",
    features: [
      "Sub-second scanned medical image OCR ingestion",
      "Robust Tesseract and EasyOCR engine pipeline integration",
      "PyTorch classification layer to categorize medical document parameters",
      "Simulates real industrial paper-work digitizing flows"
    ],
    technologies: ["React Native", "Python", "Tesseract", "EasyOCR", "PyTorch", "Machine Learning"],
    githubUrl: "https://github.com/Jayanth00412",
    liveUrl: "#scangluco-demo",
    glowColor: "#8B5CF6"
  },
  {
    id: "pneumonia-detection",
    title: "Pneumonia Detection AI",
    description: "A deep-learning scanning system engineered with convolutional neural network (CNN) architectures to assist in rapid pneumonia detection via chest X-ray digital screening.",
    features: [
      "Custom, multi-layer convolutional network model design",
      "Model optimization pipelines built using Keras and TensorFlow",
      "Immersive, interactive classification result and accuracy displays",
      "Deep X-ray image transformation and matrix parsing visual outputs"
    ],
    technologies: ["Python", "TensorFlow", "Keras", "CNN", "Image Processing"],
    githubUrl: "https://github.com/jayanthkumarn870",
    liveUrl: "#pneumonia-demo",
    glowColor: "#14F195"
  }
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: "React.js", category: "Frontend", level: 90, glow: "#00F5FF", description: "State management, Hooks, Virtual DOM, and custom fullstack integration" },
  { name: "JavaScript", category: "Frontend", level: 88, glow: "#00F5FF", description: "ES6+, Event execution, Async/Await operations, and DOM optimization" },
  { name: "HTML5", category: "Frontend", level: 95, glow: "#00F5FF", description: "Semantic markup, layout architecture, and high accessibility compliance" },
  { name: "CSS3 / Tailwind", category: "Frontend", level: 92, glow: "#00F5FF", description: "Responsive layouts, animations, and high fidelity neon glow styles" },

  // Programming
  { name: "Python", category: "Programming", level: 85, glow: "#8B5CF6", description: "Data structures, script engineering, AI models, and file processing" },
  { name: "Java", category: "Programming", level: 80, glow: "#8B5CF6", description: "Object-oriented principles, core data structures, and algorithmic loops" },

  // Databases
  { name: "MySQL", category: "Database", level: 82, glow: "#14F195", description: "Relational queries, index optimizations, and database schematics" },
  { name: "MongoDB", category: "Database", level: 78, glow: "#14F195", description: "Document-based arrays, aggregation pipelines, and NoSQL architecture" },

  // Tools
  { name: "Git", category: "Tools", level: 85, glow: "#F97316", description: "Version tracking, checkout processes, and branching architectures" },
  { name: "GitHub", category: "Tools", level: 89, glow: "#F97316", description: "CI/CD routines, project repository control, and collaboration feeds" },
  { name: "VS Code", category: "Tools", level: 95, glow: "#F97316", description: "Sleek extension setups, console debug, and custom styling presets" },

  // Data & Machine Learning
  { name: "TensorFlow / Keras", category: "Data & AI", level: 75, glow: "#EC4899", description: "Neural network configurations, model validation, and image training" },
  { name: "Tableau", category: "Data & AI", level: 80, glow: "#EC4899", description: "Data analytics streams, visual story layouts, and dashboard graphs" },
  { name: "Power BI", category: "Data & AI", level: 82, glow: "#EC4899", description: "Interactive workspace reports, custom charts, and enterprise models" }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "cert-python",
    title: "Python Programming",
    issuer: "Infosys Springboard",
    credentialUrl: "https://springboard.infosys.com",
    glowColor: "#8B5CF6",
    date: "2024"
  },
  {
    id: "cert-frontend",
    title: "Front-End Web Development",
    issuer: "Edunet Foundation + AICTE",
    credentialUrl: "https://www.edunetfoundation.org",
    glowColor: "#00F5FF",
    date: "2024"
  },
  {
    id: "cert-mern",
    title: "MERN Stack Web Development",
    issuer: "Edunet Foundation + AICTE",
    credentialUrl: "https://www.edunetfoundation.org",
    glowColor: "#14F195",
    date: "2025"
  }
];

export const EDUCATION: EducationTimelineItem[] = [
  {
    year: "2022 — 2026",
    institution: "APS College of Engineering, Bengaluru",
    degree: "B.E. in Information Science and Engineering",
    gpa: "8.10 / 10.0 CGPA",
    location: "Bengaluru, Karnataka",
    details: [
      "Specializing in modern information processing, software methodologies, database architectures, and algorithms.",
      "Successfully led the organization of college-wide tech event 'Prompt Warriors', coordinating operations, materials, and participant workflows.",
      "Consistent participant in state-level hackathons and competitive software events."
    ]
  }
];

export const COMMAND_LINUX_LOGS: string[] = [
  "systemctl start jkn-portfolio.service",
  "Initializing Cybernetic HUD Terminal...",
  "Loading portfolio data profiles [OK]",
  "Establishing secure API proxies with JARVIS [OK]",
  "Syncing 3D WebGL projection arrays [OK]",
  "Scanning competencies... frontend, java, python detected.",
  "System parameters locked. Portfolio status: OPERATIONAL."
];
