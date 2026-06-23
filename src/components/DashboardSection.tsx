import React, { useState, useEffect, useRef } from "react";
import { Terminal, Shield, Cpu, Database, Key, HelpCircle } from "lucide-react";
import { COMMAND_LINUX_LOGS, SKILLS } from "../data";

// Custom type for terminal input history
interface TerminalLine {
  text: string;
  type: "system" | "user" | "error" | "success";
}

export default function DashboardSection() {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { text: "JARVIS OS [v3.5.12-BUILD-2026]", type: "system" },
    { text: "Initializing Core Telemetry...", type: "system" },
    { text: "Loading Jayanth Kumar N's developer logs...", type: "success" },
    { text: "Connection stream established over Port 3000.", type: "success" },
    { text: "Type 'help' to audit system capabilities.", type: "system" },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLines]);

  // Handle command execution
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newLines: TerminalLine[] = [
      ...terminalLines,
      { text: `guest@jkn-command:~# ${terminalInput}`, type: "user" }
    ];

    switch (cmd) {
      case "help":
        newLines.push(
          { text: "Available System Directives:", type: "system" },
          { text: "  about     - Audit candidate background and profile.", type: "system" },
          { text: "  skills    - Output engineering expertise vector matrices.", type: "system" },
          { text: "  projects  - Index active code base projects.", type: "system" },
          { text: "  contact   - Display secure developer mail channels.", type: "system" },
          { text: "  clear     - Flush terminal console buffer logs.", type: "system" },
          { text: "  neofetch  - Output system information diagnostics summary.", type: "system" }
        );
        break;
      case "clear":
        setTerminalLines([]);
        setTerminalInput("");
        return;
      case "about":
        newLines.push(
          { text: "Candidate: Jayanth Kumar N", type: "success" },
          { text: "Specialization: Frontend Developer / Software Engineer", type: "system" },
          { text: "Degree: B.E in Information Science and Engineering @ APS College of Engineering", type: "system" },
          { text: "Focus: High-performance React, modern fullstack structures, and AI/ML pipelines.", type: "success" }
        );
        break;
      case "skills":
        newLines.push({ text: "Core Technical Competencies:", type: "success" });
        SKILLS.slice(0, 8).forEach((sk) => {
          newLines.push({ text: `  • ${sk.name} : [${"█".repeat(Math.round(sk.level / 12))}${"░".repeat(8 - Math.round(sk.level / 12))}] (${sk.level}%)`, type: "system" });
        });
        break;
      case "projects":
        newLines.push(
          { text: "Core Registries Found:", type: "success" },
          { text: "  1. ScanGluco         - OCR Medical Assistant Application [AI / PyTorch]", type: "system" },
          { text: "  2. Pneumonia System  - Deep Learning chest screening scan [Keras / CNN]", type: "system" },
          { text: "  3. Travel Explorer   - Responsive Weather platform web hub [API]", type: "system" }
        );
        break;
      case "contact":
        newLines.push(
          { text: "Secure Communications Stream Node:", type: "success" },
          { text: "  EMAIL: jayanthkumarn870@gmail.com", type: "system" },
          { text: "  TELEPHONE: +91 8867353499", type: "system" },
          { text: "  LOCATION: Bengaluru, Karnataka, India", type: "system" }
        );
        break;
      case "neofetch":
        newLines.push(
          { text: "   JKN_HUD_TERMINAL   ", type: "success" },
          { text: "   ----------------   ", type: "success" },
          { text: "   OS: JARVIS Linux v3.5 (Web container)", type: "system" },
          { text: "   HOST: Google Cloud Run Platform", type: "system" },
          { text: "   SHELL: node-express-bash", type: "system" },
          { text: "   RESOURCES: React 19 / Three.js / Tailwind CSS v4", type: "system" },
          { text: "   PORT: 3000 (Secure SSL)", type: "system" },
          { text: "   CANDIDATE: Jayanth Kumar N", type: "success" }
        );
        break;
      default:
        newLines.push({
          text: `Command not found: '${cmd}'. Reference 'help' for diagnostics directory.`,
          type: "error"
        });
    }

    setTerminalLines(newLines);
    setTerminalInput("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-mono">
      
      {/* Left Column: Technology Sonar Radar & Metrics */}
      <div className="lg:col-span-5 bg-black/60 border border-purple-500/10 p-6 rounded-2xl relative flex flex-col justify-between backdrop-blur-md">
        
        {/* Decorative corner brackets */}
        <div className="absolute top-2 left-2 text-purple-400 text-xs text-opacity-45 select-none">[0x51A]</div>
        <div className="absolute top-2 right-2 text-purple-400 text-xs text-opacity-45 select-none">SCANNING</div>
        
        <div className="mb-4">
          <h4 className="text-sm font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#00f5ff] animate-spin" />
            VIRTUAL COGNITIVE RADAR
          </h4>
          <p className="text-[11px] text-gray-500">REAL-TIME SKILLS SECTOR COVERAGE</p>
        </div>

        {/* Beautiful Interactive Custom SVG Sonar Radar Chart */}
        <div className="w-full flex justify-center items-center my-6 relative">
          <svg viewBox="0 0 200 200" className="w-[180px] md:w-[220px] h-[180px] md:h-[220px]">
            {/* Radar scanner sweep effect */}
            <circle cx="100" cy="100" r="90" className="stroke-purple-600/10 fill-none" strokeWidth="1" />
            <circle cx="100" cy="100" r="65" className="stroke-purple-600/15 fill-none" strokeWidth="1" />
            <circle cx="100" cy="100" r="40" className="stroke-purple-600/20 fill-none" strokeWidth="1" />
            <circle cx="100" cy="100" r="15" className="stroke-purple-600/25 fill-none" strokeWidth="1" />

            {/* Radar intersecting lines */}
            <line x1="100" y1="10" x2="100" y2="190" className="stroke-purple-500/15" strokeWidth="1" />
            <line x1="10" y1="100" x2="190" y2="100" className="stroke-purple-500/15" strokeWidth="1" />
            <line x1="36.4" y1="36.4" x2="163.6" y2="163.6" className="stroke-purple-500/15" strokeWidth="1" />
            <line x1="36.4" y1="163.6" x2="163.6" y2="36.4" className="stroke-purple-500/15" strokeWidth="1" />

            {/* Glowing radar sweeping triangle */}
            <path
              d="M100,100 L160,50 A80,80 1 0,0 100,20 Z"
              fill="url(#radarGradient)"
              className="origin-center animate-[spin_6s_linear_infinite]"
              style={{ transformOrigin: "100px 100px" }}
            />

            {/* Radar Points representing key strengths (Coordinates manually calibrated on radial nodes)
                Nodes: [Frontend: 100, 20], [ML/AI: 160, 75], [DB: 140, 150], [Prog: 70, 160], [Tools: 40, 95]
            */}
            <polygon
              points="100,22 170,70 145,140 70,155 45,95"
              className="fill-[#00f5ff]/20 stroke-[#00f5ff] stroke-[1.5]"
              style={{ strokeDasharray: "4 2" }}
            />

            {/* Floating Point indicators */}
            <circle cx="100" cy="22" r="3.5" className="fill-[#14f195]" />
            <circle cx="170" cy="70" r="3.5" className="fill-[#8b5cf6]" />
            <circle cx="145" cy="140" r="3.5" className="fill-[#00f5ff]" />
            <circle cx="70" cy="155" r="3.5" className="fill-[#14f195]" />
            <circle cx="45" cy="95" r="3.5" className="fill-[#8b5cf6]" />

            {/* Labels inside chart */}
            <text x="100" y="15" textAnchor="middle" className="fill-white text-[7px] font-mono tracking-wider font-bold">FRONTEND</text>
            <text x="175" y="70" textAnchor="start" className="fill-white text-[7px] font-mono tracking-wider font-bold">AI / ML</text>
            <text x="150" y="145" textAnchor="start" className="fill-white text-[7px] font-mono tracking-wider font-bold">DATABASE</text>
            <text x="65" y="165" textAnchor="end" className="fill-white text-[7px] font-mono tracking-wider font-bold">LANGUAGE</text>
            <text x="35" y="95" textAnchor="end" className="fill-white text-[7px] font-mono tracking-wider font-bold">GIT / DEV</text>

            <defs>
              <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Decorative Sweep overlay HUD text */}
          <div className="absolute right-3 bottom-0 bg-black/60 border border-white/5 py-1 px-2 rounded font-mono text-[9px] text-[#14f195]">
            SWEEP: ACTIVE [75Hz]
          </div>
        </div>

        {/* Quick parameters list bar */}
        <div className="space-y-2 text-left pt-4 border-t border-purple-500/10">
          <div className="flex justify-between text-xs text-gray-400">
            <span>LANGUAGE MODULES</span>
            <span className="text-[#14f195] font-bold">Java (OOPs), Python, JS</span>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>WEB ARCHITECTURE</span>
            <span className="text-[#00f5ff] font-bold">React.js, MERN stack, HTML5</span>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>DATA FRAMEWORKS</span>
            <span className="text-[#8b5cf6] font-bold">TensorFlow, Tableau, MySQL</span>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Terminal HUD Console */}
      <div className="lg:col-span-7 bg-[#050816] border border-cyan-500/20 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-[0_0_30px_rgba(0,245,255,0.05)]">
        
        {/* Terminal Header Bar */}
        <div className="bg-slate-950 px-4 py-3 border-b border-cyan-500/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-400 tracking-wider">SECURE DIRECT HUD CORE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
          </div>
        </div>

        {/* Console lines display */}
        <div className="p-4 overflow-y-auto h-[240px] md:h-[300px] text-xs space-y-2 bg-[#02050e]/90 text-left">
          {terminalLines.map((line, key) => (
            <div
              key={key}
              className={`leading-relaxed break-words whitespace-pre-wrap ${
                line.type === "success"
                  ? "text-[#14f195]"
                  : line.type === "user"
                  ? "text-cyan-400 font-bold"
                  : line.type === "error"
                  ? "text-red-400"
                  : "text-slate-300"
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input prompt line footer */}
        <form
          onSubmit={handleCommand}
          className="bg-slate-950 border-t border-cyan-500/10 flex items-center p-2 px-3 pl-4"
        >
          <span className="text-cyan-400 pr-2 font-bold select-none">[guest@jkn] ~$</span>
          <input
            type="text"
            className="flex-1 bg-transparent text-white border-none outline-none focus:ring-0 font-mono text-xs caret-cyan-400 py-1"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            placeholder="Type 'help' to begin catalog scan..."
          />
        </form>
      </div>
    </div>
  );
}
