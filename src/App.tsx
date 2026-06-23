import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  User,
  Cpu,
  Layers,
  GraduationCap,
  Award,
  MessageSquare,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  Download,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Terminal as TermIcon,
  MousePointer,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, SKILLS, CERTIFICATES, EDUCATION } from "./data";
import LaptopCanvas from "./components/LaptopCanvas";
import SkillsUniverse from "./components/SkillsUniverse";
import DashboardSection from "./components/DashboardSection";
import JarvisWidget from "./components/JarvisWidget";

export default function App() {
  // System Boot States
  const [bootProgress, setBootProgress] = useState(0);
  const [isBooted, setIsBooted] = useState(false);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("BENGALURU, IN | 12:00:00");

  // Keep ticking clock synced
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTimeStr(`BENGALURU, IN | ${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Typing effect parameters
  const ROLES = ["Frontend Developer", "Software Engineer", "React Developer", "Full Stack Developer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Interactive mouse tracker positions
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmitSuccess, setTransmitSuccess] = useState(false);

  // Project highlight filters
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Counter stats
  const [stats, setStats] = useState({ projects: 0, skills: 0, certifications: 0, hackathons: 0 });

  // References and screen triggers
  const resumeRef = useRef<HTMLDivElement>(null);

  // Initialize neons and screen responsive trackers
  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // System Boot Loading Process simulation
  useEffect(() => {
    const logs = [
      "Initializing AI HUD core systems...",
      "Configuring viewport canvas rasterizers...",
      "Syncing 3D WebGL rotating coordinates...",
      "Connecting JARVIS neural link tunnels...",
      "Loading Jayanth Kumar N's developer directories...",
      "System fully online and decrypted. Welcome, Recruiter."
    ];

    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < logs.length) {
        setBootLogs((prev) => [...prev, logs[logIdx]]);
        logIdx++;
      }
    }, 400);

    const progressInterval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          setTimeout(() => {
            setIsBooted(true);
            // Trigger counts to start rising
            triggerCounterRise();
          }, 400);
          return 100;
        }
        return prev + 1.25;
      });
    }, 30);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, []);

  // Dynamic values rises for statistics counters
  const triggerCounterRise = () => {
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const counterInterval = setInterval(() => {
      stepCount++;
      setStats({
        projects: Math.min(Math.round((8 / steps) * stepCount), 8),
        skills: Math.min(Math.round((14 / steps) * stepCount), 14),
        certifications: Math.min(Math.round((3 / steps) * stepCount), 3),
        hackathons: Math.min(Math.round((5 / steps) * stepCount), 5)
      });

      if (stepCount >= steps) {
        clearInterval(counterInterval);
      }
    }, intervalTime);
  };

  // Typing loops script
  useEffect(() => {
    if (!isBooted) return;

    let timer: NodeJS.Timeout;
    const fullText = ROLES[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setRoleText((prev) => prev.slice(0, -1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setRoleText((prev) => fullText.slice(0, prev.length + 1));
      }, 100);
    }

    if (!isDeleting && roleText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && roleText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex, isBooted]);

  // Section highlight tracker via scroll index
  useEffect(() => {
    if (!isBooted) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = ["home", "about", "skills", "projects", "education", "certificates", "dashboard", "contact"];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBooted]);

  // Smooth scroll handler
  const scrollToId = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Safe resume mock downloader
  const handleDownloadResume = () => {
  const link = document.createElement("a");
  link.href = "/Jayanth_Kumar_N_Resume.pdf";
  link.download = "Jayanth_Kumar_N_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
  // Send message mock with interactive visual streams
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setIsTransmitting(true);
    setTransmitSuccess(false);

    // Simulate cyber socket packet upload transmission
    setTimeout(() => {
      setIsTransmitting(false);
      setTransmitSuccess(true);
      setContactForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setTransmitSuccess(false), 5000);
    }, 2500);
  };

  // Categories extraction
  const CATEGORIES = ["all", "Frontend", "Machine Learning", "Databases"];

  return (
    <div className="relative min-h-screen bg-[#050816] text-white overflow-hidden cyber-grid border-8 border-[#00F5FF]/10">
      
      {/* HUD Scanline Overlays to reinforce Cyberpunk feel */}
      <div className="scanlines" />

      {/* Custom Glowing Mouse follower node on desktop */}
      {!isMobileScreen && isBooted && (
        <div
          className="fixed pointer-events-none z-50 w-6 h-6 rounded-full border-2 border-cyan-400 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-screen flex items-center justify-center shadow-[0_0_15px_rgba(0,245,255,0.6)]"
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#14f195]" />
        </div>
      )}

      {/* Real-time scroll indicator progress bar */}
      {isBooted && (
        <div className="fixed top-0 inset-x-0 h-1 bg-slate-900 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-600 to-[#14f195]"
            style={{
              scaleX: typeof window !== "undefined" ? undefined : 0,
              transformOrigin: "0%"
            }}
            animate={{
              scaleX: typeof window !== "undefined" ? (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) : 0
            }}
          />
        </div>
      )}

      {/* 1. INITIAL SYSTEM BOOT LOADER SCREEN */}
      <AnimatePresence>
        {!isBooted && (
          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="fixed inset-0 z-[100] bg-[#02050e] flex flex-col items-center justify-center p-4"
          >
            <div className="w-full max-w-lg text-left font-mono border border-cyan-500/20 bg-black/80 p-8 rounded-2xl relative shadow-[0_0_80px_rgba(0,245,255,0.08)]">
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 text-[#00f5ff] text-xs">[JK_BOOT_LOAD-S]</div>
              <div className="absolute bottom-2 right-2 text-gray-500 text-xs">V3.5</div>

              {/* Holographic CPU spin loader */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full border border-dashed border-cyan-400 animate-[spin_5s_linear_infinite]" />
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-widest">JAYANTH_KUMAR_N</h2>
                    <p className="text-[10px] text-cyan-400 font-mono tracking-wider">COMMAND HUD BOOT PANEL</p>
                  </div>
                </div>
                <span className="text-xl font-bold font-mono text-[#14f195]">{Math.floor(bootProgress)}%</span>
              </div>

              {/* Diagnostic Boot Streams */}
              <div className="min-h-[140px] space-y-1.5 text-xs text-slate-300 font-mono mb-8 overflow-hidden">
                <AnimatePresence>
                  {bootLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-[#14f195]">&gt;</span>
                      <span>{log}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Progress Loading Bar */}
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5 relative">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-purple-600 to-[#14f195] transition-all duration-100 ease-out"
                  style={{ width: `${bootProgress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN SYSTEM HUDS (Sticky Navbar) */}
      {isBooted && (
        <>
          <header className="fixed top-0 inset-x-0 z-40 bg-[#050816]/85 hover:bg-[#050816]/95 backdrop-blur-xl border-b border-[#00F5FF]/20 transition-all duration-300 select-none">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
              
              {/* Logo JK with Drop Shadow */}
              <div
              onClick={() => scrollToId("home")}
               className="flex items-center gap-4 cursor-pointer group"
              >
                <div className="text-2xl font-black tracking-tighter text-[#00F5FF] drop-shadow-[0_0_8px_rgba(0,245,255,0.8)] select-none">
                  JK
                </div>
                <div className="hidden sm:block h-4 w-[1px] bg-[#00F5FF]/20" />
                <span className="hidden sm:inline text-[9px] font-mono tracking-widest text-[#00F5FF]/60 uppercase">
                  ACTIVE_OS
                </span>
              </div>

              {/* Desktop Nav Actions styled with cyber links */}
              <nav className="hidden lg:flex items-center gap-1.5">
                {["home", "about", "skills", "projects", "education", "certificates", "dashboard", "contact"].map((link) => {
                  const getLinkLabel = (id: string) => {
                    if (id === "home") return "SYS.MAIN";
                    if (id === "about") return "EXP.ABOUT";
                    if (id === "skills") return "EXP.SKILLS";
                    if (id === "projects") return "EXP.PROJECTS";
                  if (id === "education") return "EXP.EDUCATION";
                    if (id === "certificates") return "EXP.CERTS";
                    if (id === "dashboard") return "SYS.CONSOLE";
                    if (id === "contact") return "SYS.CONTACT";
                    return id.toUpperCase();
                  };
                  return (
                    <button
                      key={link}
                      onClick={() => scrollToId(link)}
                      className={`px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-widest cursor-pointer transition-all duration-200 ${
                        activeSection === link
                          ? "text-[#00F5FF] border-b-2 border-[#00F5FF]"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {getLinkLabel(link)}
                    </button>
                  );
                })}
              </nav>

           {/* Action Buttons & System Diagnostics */}
<div className="hidden lg:flex items-center gap-4">

  {/* Diagnostics */}
  <div className="text-[10px] font-mono text-[#14F195] flex items-center gap-1">
    <div className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" />
    STABLE
  </div>

  <div className="bg-[#00F5FF]/10 px-2.5 py-0.5 border border-[#00F5FF]/30 text-[10px] font-mono uppercase tracking-wider text-[#00F5FF]">
    {timeStr}
  </div>

  <div className="h-4 w-[1px] bg-white/10" />

  <div className="flex items-center gap-2">

    {/* Resume Download Button */}
    <a
      href="/Jayanth_Kumar_N_Resume.pdf"
      download
      className="border border-[#00F5FF] text-[#00F5FF] font-black text-[10px] uppercase tracking-widest px-3.5 py-1.5 hover:bg-[#00F5FF]/10 transition-colors cursor-pointer"
    >
      DOWNLOAD CV
    </a>

    {/* Hire Me Button */}
    <button
      onClick={() => scrollToId("contact")}
      className="bg-[#00F5FF] text-black font-black text-[10px] uppercase tracking-widest px-3.5 py-1.5 hover:bg-white transition-colors cursor-pointer"
    >
      HIRE ME
    </button>

  </div>
</div>

              {/* Hamburger Toggle */}
              <div className="lg:hidden flex items-center gap-3">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-1.5 rounded-lg border border-[#00F5FF]/20 text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-2.5" />}
                </button>
              </div>
            </div>

            {/* Mobile Actions Drawer */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden border-t border-[#00F5FF]/20 bg-[#050816]/95 backdrop-blur-2xl px-4 py-4 space-y-2 text-left"
                >
                  {["home", "about", "skills", "projects", "education", "certificates", "dashboard", "contact"].map((link) => (
                    <button
                      key={link}
                      onClick={() => scrollToId(link)}
                      className={`block w-full text-left px-4 py-2.5 rounded-xl font-mono capitalize text-xs ${
                        activeSection === link
                          ? "bg-cyan-950/50 text-[#00f5ff] border-l-2 border-[#00F5FF]"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link}
                    </button>
                  ))}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 font-mono">
                    <button
                      onClick={handleDownloadResume}
                      className="bg-slate-900 border border-white/5 p-2 rounded-xl text-center text-xs text-white flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      Resume
                    </button>
                    <button
                      onClick={() => scrollToId("contact")}
                      className="bg-[#00F5FF] text-black font-black p-2 rounded-xl text-center text-xs flex items-center justify-center cursor-pointer"
                    >
                      Hire Me
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          {/* MAIN SECTOR SECTIONS CONTAINERS */}
          <main className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-24 space-y-28 md:space-y-40">
            
            {/* 2. LANDING HOME SECTION AREA */}
            <section
              id="home"
              className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 pt-12 text-left relative"
            >
              
              {/* Left Column Content panel */}
              <div className="flex-1 space-y-6 max-w-xl z-20">
                
                {/* Floating Micro-Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-950/40 to-cyan-950/40 border border-[#8b5cf6]/20 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-[#00f5ff] uppercase backdrop-blur-sm self-start">
                  <span className="w-2 h-2 rounded-full bg-[#14f195] animate-pulse" />
                  SECURE PORTFOLIO ONLINE
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-mono text-gray-400 uppercase tracking-widest block">IDENTIFICATION MATRIX:</span>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black tracking-tight text-white leading-[1.1] uppercase">
                    JAYANTH <span className="text-[#00F5FF] drop-shadow-[0_0_8px_#00F5FF]">KUMAR N</span>
                  </h1>
                </div>

                {/* Subtitle with dynamic typing loops */}
                <div className="min-h-[36px] flex items-center">
                  <span className="text-sm font-mono text-gray-400 pr-2 select-none">&gt;&gt; ACT_ROLE: </span>
                  <span className="text-lg sm:text-xl font-mono text-[#14f195] font-bold">
                    {roleText}
                    <span className="text-cyan-400 cursor-blink">_</span>
                  </span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed max-w-md font-sans">
                  Information Science Engineering scholar specialized in fullstack web architecture, 
                  machine learning models, and custom software systems. Engineering high performance 
                  digital experiences and data solutions.
                </p>

                {/* Grid Action Panel */}
                <div className="flex flex-wrap items-center gap-4 pt-2 font-mono">
                  <button
                    onClick={() => scrollToId("projects")}
                    className="px-6 py-3 bg-[#00F5FF] text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                  >
                    View Work
                  </button>
                  <button
                    onClick={() => scrollToId("contact")}
                    className="px-6 py-3 border border-[#00F5FF] text-[#00F5FF] font-black text-xs uppercase tracking-widest hover:bg-[#00F5FF]/10 transition-colors cursor-pointer"
                  >
                    Contact Link
                  </button>
                </div>
              </div>

         {/* Right Column: Profile + 3D Laptop */}
<div className="flex-1 w-full flex flex-col items-center justify-center relative gap-8">

  {/* Neon Glow */}
  <div className="absolute w-[250px] h-[250px] bg-purple-600/10 rounded-full blur-[80px]" />
  <div className="absolute w-[200px] h-[200px] bg-cyan-500/10 rounded-full blur-[80px] translate-x-20" />

  {/* Profile Photo */}
<div className="relative z-10">
  <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-3xl animate-pulse"></div>

  <img
    src="/profile.jpeg"
    alt="Jayanth Kumar N"
    className="relative w--80d:w-80 md:h-80 object-cover object-top rounded-full border-4 border-cyan-400 shadow-[0_0_50px_rgba(0,245,255,0.8)]"
     style={{
    objectPosition: "center 10%"
  }}
  />

  <div className="absolute -inset-2 border border-cyan-400 rounded-full animate-spin"></div>
</div>

  {/* 3D Laptop */}
  <div className="relative z-10 w-full max-w-md">
    <LaptopCanvas />
  </div>

</div>
 
            </section>

            {/* 3. ABOUT SECTION EXPERIENCE */}
            <section id="about" className="space-y-12">
              <div className="text-left">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-1">AUDITING BACKGROUND</span>
                <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white uppercase flex items-center gap-3">
                  <span className="text-[#00f5ff] font-mono">01.</span> ABOUT CANDIDATE
                </h2>
                <div className="h-0.5 w-16 bg-[#00f5ff] mt-2" />
              </div>

              {/* Interactive Glassmorphism Bio Deck */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Biography card */}
                <div className="lg:col-span-7 bg-slate-950/65 border-2 border-purple-500/10 p-6 md:p-8 rounded-2xl relative shadow-[0_0_30px_rgba(139,92,246,0.02)] backdrop-blur-md flex flex-col justify-between text-left">
                  {/* Glowing corners */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-400 translate-x-[-1px] translate-y-[-1px]" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-400 translate-x-[1px] translate-y-[1px]" />

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full border-2 border-[#8B5CF6] p-1 relative shrink-0">
                        <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-xl font-black border border-white/20 select-none">
                          JK
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-[#14F195] text-black text-[8px] px-1.5 py-0.5 font-black rounded uppercase leading-none">
                          ACTIVE
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold uppercase tracking-tight text-white">Jayanth Kumar N</h3>
                        <p className="text-xs font-mono text-cyan-400">B.E Information Science</p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed font-sans">
                      I am a passionate Information Science and Engineering student based in Bengaluru, India. 
                      My technical command focus includes robust front-end web layers via React.js, NoSQL schema arrays, 
                      and AI-driven models utilizing PyTorch and TensorFlow.
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">
                      With a current CGPA rating of <strong className="text-[#00f5ff]">8.10/10.0</strong>, I maintain high 
                      conceptual execution rates inside object-oriented loops (Java), database query pipelines (MySQL), 
                      and analytics visualizers like Tableau to deliver production-grade modular products.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5 font-mono text-xs">
                    <div className="flex items-center gap-2 bg-[#02050e] p-2.5 rounded border border-white/5">
                      <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                      <span className="text-gray-400">LOC: <strong className="text-white">Bengaluru, India</strong></span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#02050e] p-2.5 rounded border border-white/5">
                      <GraduationCap className="w-4 h-4 text-[#00f5ff] shrink-0" />
                      <span className="text-gray-400">DEG: <strong className="text-white">B.E Information Science</strong></span>
                    </div>
                  </div>
                </div>

                {/* Stats Counters Bento Grid */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                  
                  {/* projects count */}
                  <div className="bg-[#050816]/55 border border-cyan-500/10 p-5 rounded-2xl flex flex-col justify-center items-center backdrop-blur-md relative">
                    <span className="text-3xl md:text-4xl font-extrabold font-mono text-[#00f5ff] mb-1">{stats.projects}+</span>
                    <span className="text-[10px] font-mono text-gray-400 uppercase text-center">Projects Compiled</span>
                  </div>

                  {/* skills count */}
                  <div className="bg-[#050816]/55 border border-cyan-500/10 p-5 rounded-2xl flex flex-col justify-center items-center backdrop-blur-md relative">
                    <span className="text-3xl md:text-4xl font-extrabold font-mono text-[#14f195] mb-1">{stats.skills}+</span>
                    <span className="text-[10px] font-mono text-gray-400 uppercase text-center">Targeted Tech</span>
                  </div>

                  {/* certificates count */}
                  <div className="bg-[#050816]/55 border border-cyan-500/10 p-5 rounded-2xl flex flex-col justify-center items-center backdrop-blur-md relative">
                    <span className="text-3xl md:text-4xl font-extrabold font-mono text-[#8b5cf6] mb-1">{stats.certifications}</span>
                    <span className="text-[10px] font-mono text-gray-400 uppercase text-center">Verified Certs</span>
                  </div>

                  {/* hackathons count */}
                  <div className="bg-[#050816]/55 border border-cyan-500/10 p-5 rounded-2xl flex flex-col justify-center items-center backdrop-blur-md relative">
                    <span className="text-3xl md:text-4xl font-extrabold font-mono text-[#f97316] mb-1">{stats.hackathons}</span>
                    <span className="text-[10px] font-mono text-gray-400 uppercase text-center">Events Coordinated</span>
                  </div>

                </div>
              </div>
            </section>

            {/* 4. SKILLS SECTION EXPERIENCES Globe */}
            <section id="skills" className="space-y-12">
              <div className="text-left">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-1">COMPETENCY ATLAS</span>
                <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white uppercase flex items-center gap-3">
                  <span className="text-[#00f5ff] font-mono">02.</span> 3D SKILLS UNIVERSE
                </h2>
                <div className="h-0.5 w-16 bg-[#00f5ff] mt-2" />
              </div>

              {/* Renders interactive Fibonacci spiral rotating globe */}
              <SkillsUniverse />
            </section>

            {/* 5. PROJECTS SECTION EXPERIENCES */}
            <section id="projects" className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="text-left">
                  <span className="text-xs font-mono text-[#14f195] uppercase tracking-widest block mb-1">ACTIVE REGISTRIES</span>
                  <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white uppercase flex items-center gap-3">
                    <span className="text-[#00f5ff] font-mono">03.</span> FEATURED PROJECTS
                  </h2>
                  <div className="h-0.5 w-16 bg-[#14f195] mt-2" />
                </div>

                {/* Sleek inline category switchers */}
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full capitalize cursor-pointer transition-all duration-250 ${
                        selectedCategory === cat
                          ? "bg-slate-950 text-[#14f195] border border-[#14f195]/40"
                          : "text-gray-400 hover:text-white bg-slate-900 border border-transparent"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid lists of Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {PROJECTS.filter((p) => {
                  if (selectedCategory === "all") return true;
                  if (selectedCategory === "Frontend") return p.technologies.some(t => ["HTML5", "CSS3", "JavaScript", "React", "React Native", "REST APIs"].includes(t));
                  if (selectedCategory === "Machine Learning") return p.technologies.some(t => ["Python", "TensorFlow", "Keras", "CNN", "PyTorch", "EasyOCR", "Tesseract", "Machine Learning"].includes(t));
                  if (selectedCategory === "Databases") return p.technologies.some(t => ["MySQL", "MongoDB"].includes(t));
                  return true;
                }).map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="cyber-card rounded-2xl overflow-hidden p-6 hover:translate-y-[-6px] flex flex-col justify-between relative group"
                    style={{
                      border: `1px solid ${project.glowColor}25`,
                    }}
                  >
                    {/* Top Accent Gradient Border */}
                    <div 
                      className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r"
                      style={{ backgroundImage: `linear-gradient(to right, ${project.glowColor}, transparent)` }}
                    />
                    <div>
                      <div className="text-[8.5px] font-mono text-slate-500 mb-2.5 uppercase tracking-widest">
                        Project_0{index + 1} // {project.technologies[0]?.toUpperCase() || "WEB_APP"}
                      </div>

                      <h3
                        className="text-xl font-sans font-bold tracking-tight text-white mt-1 mb-3 transition-colors duration-200"
                        style={{ color: project.glowColor }}
                      >
                        {project.title}
                      </h3>

                      <p className="text-xs text-slate-300 mb-4 leading-relaxed font-sans">
                        {project.description}
                      </p>

                      {/* features bullets */}
                      <ul className="space-y-1 mb-6 text-[11px] font-mono text-slate-400">
                        {project.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-cyan-400 shrink-0">&gt;</span>
                            <span className="leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      {/* Badges of technos */}
                      <div className="flex flex-wrap gap-1.5 mb-5 select-none text-[10px] font-mono">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="bg-slate-950 px-2 py-1 rounded text-gray-400 border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action trigger links */}
                      <div className="flex items-center gap-3 pt-4 border-t border-white/5 font-mono text-[11px]">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 bg-slate-950 hover:bg-slate-900 border border-white/10 p-2.5 rounded-xl text-center text-slate-300 hover:text-white transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>SOURCE REPO</span>
                        </a>
                        <a
                          href={project.liveUrl}
                          onClick={(e) => {
                            if (project.liveUrl?.startsWith("#")) {
                              e.preventDefault();
                              alert(`JARVIS Diagnostics: Deploy matrix check for '${project.title}' is simulation-ready and local. Contact Jayanth to explore.`);
                            }
                          }}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 bg-[#050816] hover:bg-[#00f5ff]/10 border border-[#00f5ff]/20 text-[#00f5ff] p-2.5 rounded-xl text-center transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer"
                          style={{
                            boxShadow: `inset 0 0 10px ${project.glowColor}0a`
                          }}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>LIVE PREVIEW</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 6. EDUCATION TIMELINE TIMEFRAMES */}
            <section id="education" className="space-y-12">
              <div className="text-left">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-1">ACADEMICS CHRONOLOGY</span>
                <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white uppercase flex items-center gap-3">
                  <span className="text-[#00f5ff] font-mono">04.</span> STUDY MILESTONES
                </h2>
                <div className="h-0.5 w-16 bg-[#00f5ff] mt-2" />
              </div>

              {/* Vertical Scroll activated timeline */}
              <div className="max-w-3xl mx-auto relative pl-6 border-l-2 border-dashed border-purple-500/20 py-4 font-sans text-left">
                {EDUCATION.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative mb-8"
                  >
                    {/* Glowing pulsing timeline point */}
                    <span className="absolute left-[-32px] top-1.5 w-4.5 h-4.5 rounded-full bg-slate-950 border-2 border-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.8)] flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#14f195] animate-ping" />
                    </span>

                    <div className="bg-slate-950/65 border border-purple-500/10 p-6 md:p-8 rounded-2xl relative shadow-[0_0_20px_rgba(139,92,246,0.01)] backdrop-blur-md">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#00f5ff] bg-cyan-950/40 border border-cyan-400/20 px-2.5 py-1 rounded-sm uppercase tracking-wider mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        {edu.year}
                      </span>

                      <h3 className="text-xl font-bold tracking-tight text-white mb-1 uppercase">
                        {edu.institution}
                      </h3>
                      <div className="text-sm font-semibold text-purple-400 mb-2 font-mono">
                        {edu.degree}
                      </div>

                      <div className="inline-block bg-[#14f195]/10 border border-[#14f195]/20 text-[#14f195] font-mono text-[11px] px-2.5 py-1 rounded mb-4 font-bold uppercase">
                        GRADE RATINGS: {edu.gpa}
                      </div>

                      <ul className="space-y-2 text-slate-300 text-sm leading-relaxed list-inside">
                        {edu.details.map((det, key) => (
                          <li key={key} className="flex items-start gap-1.5">
                            <span className="text-[#00f5ff] shrink-0 font-mono mt-0.5">&gt;</span>
                            <span>{det}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 7. CERTIFICATES CARDS CHIPS */}
            <section id="certificates" className="space-y-12">
              <div className="text-left">
                <span className="text-xs font-mono text-[#14f195] uppercase tracking-widest block mb-1">VERIFIED ACCREDITATIONS</span>
                <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white uppercase flex items-center gap-3">
                  <span className="text-[#00f5ff] font-mono">05.</span> SYSTEM CERTIFICATIONS
                </h2>
                <div className="h-0.5 w-16 bg-[#14f195] mt-2" />
              </div>

              {/* Certification Glass Deck */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                {CERTIFICATES.map((cert) => (
                  <motion.div
                    key={cert.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#050816]/65 border p-5 sm:p-6 rounded-2xl relative backdrop-blur-md cursor-pointer group flex flex-col justify-between h-full"
                    style={{
                      borderColor: `${cert.glowColor}25`
                    }}
                  >
                    {/* Glowing highlight anchor */}
                    <div className="absolute top-2 right-3 text-xs bg-white/5 py-1 px-2.5 rounded font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5 group-hover:text-white transition-colors duration-300 border border-white/5">
                      <Award className="w-3.5 h-3.5 text-[#14f195] animate-bounce" />
                      <span>SECURE</span>
                    </div>

                    <div className="pt-4 space-y-2">
                      <div className="text-[10px] font-mono text-gray-400">ISSUER: {cert.issuer}</div>
                      <h4
                        className="text-lg font-sans font-bold text-white transition-colors duration-300 uppercase leading-snug group-hover:text-[#00f5ff]"
                        style={{ color: cert.glowColor }}
                      >
                        {cert.title}
                      </h4>
                    </div>

                    <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center font-mono text-xs">
                      <span className="text-[#14f195]">YEAR: {cert.date}</span>
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#00f5ff] hover:underline flex items-center gap-1"
                      >
                        <span>AUDIT CHAIN</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 8. SOFTWARE ENGINEER CUSTOM DASHBOARD HUD */}
            <section id="dashboard" className="space-y-12">
              <div className="text-left">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-1">COMMAND CONSOLE</span>
                <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white uppercase flex items-center gap-3">
                  <span className="text-[#00f5ff] font-mono">06.</span> DEVELOPER COGNITIVE CENTER
                </h2>
                <div className="h-0.5 w-16 bg-[#00f5ff] mt-2" />
              </div>

              {/* Renders custom terminal & sonar radar */}
              <DashboardSection />
            </section>

            {/* 9. CONTACT SECTOR AREA */}
            <section id="contact" className="space-y-12 pb-12">
              <div className="text-left">
                <span className="text-xs font-mono text-[#14f195] uppercase tracking-widest block mb-1">COMMUNICATION SOCS</span>
                <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white uppercase flex items-center gap-3">
                  <span className="text-[#00f5ff] font-mono">07.</span> TRANSMIT SECTOR DATA
                </h2>
                <div className="h-0.5 w-16 bg-[#14f195] mt-2" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left Side: Direct dials parameters */}
                <div className="lg:col-span-5 bg-slate-950/65 border border-[#14f195]/20 p-6 md:p-8 rounded-2xl relative shadow-[0_0_20px_rgba(20,241,149,0.02)] backdrop-blur-md flex flex-col justify-between text-left">
                  {/* Decorative bracket marks */}
                  <div className="absolute top-2 left-2 text-[#14f195]/30 text-[10px]">[MATRIX_COMM_LINK]</div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[#14f195] font-bold text-lg uppercase mb-2">Jayanth Kumar N</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        I am highly available for prospective recruiter alignments, college competitive coordinate teams, 
                        and freelance web scaling projects. Complete the communication socket form to initialize streaming with me.
                      </p>
                    </div>

                    <div className="space-y-4 font-mono text-xs">
                      <div className="flex items-center gap-3.5 p-3.5 rounded bg-[#02050e] border border-white/5">
                        <Mail className="w-4 h-4 text-[#00f5ff] shrink-0" />
                        <div>
                          <div className="text-gray-500 font-bold uppercase mb-0.5">SECURE MAIL</div>
                          <a href="mailto:jayanthkumarn870@gmail.com" className="text-slate-200 hover:text-[#00f5ff] transition-colors">{`jayanthkumarn870@gmail.com`}</a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3.5 p-3.5 rounded bg-[#02050e] border border-white/5">
                        <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                        <div>
                          <div className="text-gray-500 font-bold uppercase mb-0.5">TELEPHONE LINK</div>
                          <a href="tel:+918867353499" className="text-slate-200 hover:text-purple-400 transition-colors">+91 8867353499</a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3.5 p-3.5 rounded bg-[#02050e] border border-white/5">
                        <MapPin className="w-4 h-4 text-[#14f195] shrink-0" />
                        <div>
                          <div className="text-gray-500 font-bold uppercase mb-0.5">COORDS PREFECT</div>
                          <span className="text-slate-200">Bengaluru, Karnataka, India</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social array grids */}
                  <div className="pt-6 border-t border-white/5 mt-8 font-mono text-xs">
                    <p className="text-slate-500 mb-3 text-left uppercase font-bold tracking-wider">Public Decryption Matrices</p>
                    <div className="flex items-center gap-3">
                      <a
                        href="https://github.com/jayanthkumarn870"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-slate-950 border border-white/10 p-3 rounded-xl hover:text-cyan-400 hover:border-cyan-400/40 transition-all duration-300 flex items-center justify-center cursor-pointer"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/jayanth-kumar-n"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-slate-950 border border-white/10 p-3 rounded-xl hover:text-cyan-400 hover:border-cyan-400/40 transition-all duration-300 flex items-center justify-center cursor-pointer"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Side: Communication form */}
                <div className="lg:col-span-7 bg-slate-950/65 border border-purple-500/10 p-6 md:p-8 rounded-2xl relative backdrop-blur-md text-left flex flex-col justify-between">
                  <form onSubmit={handleContactSubmit} className="space-y-4 font-mono text-xs">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-500 uppercase font-bold mb-1.5">IDENTIFICATION NAME</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-black text-white p-3 rounded-xl border border-white/10 outline-none focus:border-cyan-400 transition-colors"
                          placeholder="e.g. Recruiter Agent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 uppercase font-bold mb-1.5">TRANSMITTING EMAIL</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-black text-white p-3 rounded-xl border border-white/10 outline-none focus:border-cyan-400 transition-colors"
                          placeholder="e.g. info@firm.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-500 uppercase font-bold mb-1.5">SUBJECT PARAMETER</label>
                      <input
                        type="text"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full bg-black text-white p-3 rounded-xl border border-white/10 outline-none focus:border-cyan-400 transition-colors"
                        placeholder="e.g. Frontend developer opportunity"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-500 uppercase font-bold mb-1.5">MESSAGE CONSOLE STREAM</label>
                      <textarea
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full bg-black text-white p-3 rounded-xl border border-white/10 outline-none focus:border-cyan-400 transition-colors resize-none"
                        placeholder="Stream your instructions here..."
                      />
                    </div>

                    {isTransmitting ? (
                      <div className="bg-cyan-950/40 border border-cyan-400/30 p-3 rounded-xl text-[#00f5ff] text-center font-bold animate-pulse flex items-center justify-center gap-2">
                        <Cpu className="w-4 h-4 animate-spin" />
                        <span>TRANSMITTING FREQUENCY ARRAY STATE...</span>
                      </div>
                    ) : transmitSuccess ? (
                      <div className="bg-[#14f195]/10 border border-[#14f195]/30 p-3 rounded-xl text-[#14f195] text-center font-bold flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#14f195]" />
                        <span>PAKET ENCRYPTED & TRANSMITTED COMPLETED!</span>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="w-full bg-[#00F5FF] hover:bg-white text-black font-black p-3.5 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer text-xs font-mono uppercase"
                      >
                        <Send className="w-4 h-4" />
                        <span>EMIT COMMUNICATIONS WIRE</span>
                      </button>
                    )}
                  </form>
                </div>

              </div>
            </section>

          </main>

          {/* 10. SYSTEM FOOTER INFO CHANNELS */}
          <footer className="border-t border-white/10 py-6 bg-slate-950/20 font-mono text-[10px] select-none relative">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500">
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <span>ROOT@JK:~$ PORTFOLIO_BUILD_2026</span>
                <span className="text-[#00F5FF]">GITHUB: /jayanthkumarn870</span>
                <span className="text-[#8B5CF6]">LINKEDIN: /jayanth-kumar-n</span>
              </div>
              <div className="text-center md:text-right">
                DESIGNED & DEVELOPED BY JAYANTH KUMAR N &copy; 2026
              </div>
            </div>
          </footer>

          {/* 11. JARVIS FLOATING INTELLIGENCE INTERACTIVE WIDGET */}
          <JarvisWidget />
        </>
      )}

    </div>
  );
}
