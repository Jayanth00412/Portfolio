import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, ChevronUp, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  sender: "user" | "jarvis";
  text: string;
}

export default function JarvisWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "jarvis",
      text: "Greetings, Agent. I am JARVIS, Jayanth's custom Engineering Assistant. System matrices are loaded and ready. Ask me any details regarding Jayanth's projects, core skills, or timeline details.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll inside chat panel
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setHasPrompted(true);

    try {
      const response = await fetch("/api/jarvis/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          chatHistory: messages.map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, { sender: "jarvis", text: data.response }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "jarvis",
            text: "Diagnostics Alert: Secondary core connection disrupted. I cannot resolve the prompt at this moment.",
          },
        ]);
      }
    } catch (err) {
      console.error("Jarvis API chat failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "jarvis",
          text: "Critical Connection Warning: Local query limits hit. Please check your network bridge.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  // Suggestion parameters
  const SUGGESTIONS = [
    "What are his top 3 projects?",
    "Tell me about ScanGluco application.",
    "Show Python / ML competencies.",
    "How can I contact Jayanth?",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            layoutId="jarvis-orb"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gradient-to-r from-purple-950 via-[#050816] to-cyan-950 border border-cyan-400 p-3.5 px-5 rounded-full shadow-[0_0_30px_rgba(0,245,255,0.35)] cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-400 group"
          >
            {/* Animated Pulsing core */}
            <div className="relative flex items-center justify-center">
              <span className="absolute animate-ping inline-flex h-3 w-3 rounded-full bg-[#14f195] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#14f195]" />
            </div>
            <span className="text-xs font-bold text-white tracking-widest uppercase flex items-center gap-1">
              JARVIS AI
              <ChevronUp className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-y-[-2px] transition-transform duration-200" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layoutId="jarvis-orb"
            className="w-[325px] sm:w-[380px] h-[480px] sm:h-[540px] bg-black/95 border-2 border-cyan-400 rounded-3xl overflow-hidden flex flex-col justify-between shadow-[0_0_50px_rgba(0,245,255,0.2)] backdrop-blur-2xl relative"
          >
            {/* Neon Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#14f195] translate-x-1 translate-y-1"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#14f195] translate-x-[-4px] translate-y-1"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#14f195] translate-x-1 translate-y-[-4px]"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#14f195] translate-x-[-4px] translate-y-[-4px]"></div>

            {/* Header Area */}
            <div className="bg-slate-950 p-4 border-b border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {/* Micro rotating processor icon */}
                <div className="relative w-7 h-7 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0.5 border border-dashed border-[#14f195] rounded-full animate-spin"></div>
                  <Bot className="w-3.5 h-3.5 text-[#14f195]" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white tracking-wider flex items-center gap-1.5 uppercase">
                    JARVIS <span className="text-[9px] text-[#14f195] bg-[#14f195]/10 px-1 py-0.5 rounded">Core-Active</span>
                  </h4>
                  <p className="text-[9px] text-gray-400">J.K.N CUSTOM NEURAL GRID</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 px-1.5 rounded-md hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated sound waves graphic visualizer */}
            <div className="bg-cyan-950/20 py-2 border-b border-cyan-500/10 flex items-center justify-center gap-1">
              <span className={`w-1 bg-[#14f195] rounded-full ${isLoading ? "h-6 animate-[pulse_0.4s_infinite_alternate]" : "h-2"}`} />
              <span className={`w-1 bg-[#14f195] rounded-full ${isLoading ? "h-4 animate-[pulse_0.5s_infinite_alternate_0.1s]" : "h-3"}`} style={{ animationDelay: "100s" }} />
              <span className={`w-1 bg-cyan-400 rounded-full ${isLoading ? "h-8 animate-[pulse_0.3s_infinite_alternate_0.2s]" : "h-2"}`} />
              <span className={`w-1 bg-[#14f195] rounded-full ${isLoading ? "h-4 animate-[pulse_0.4s_infinite_alternate_0.3s]" : "h-4"}`} />
              <span className={`w-1 bg-cyan-400 rounded-full ${isLoading ? "h-2 animate-[pulse_0.5s_infinite_alternate_0.4s]" : "h-1"}`} />
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin text-xs">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex gap-2.5 ${m.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 border uppercase font-bold
                    ${m.sender === "user" ? "bg-slate-950 text-cyan-400 border-cyan-500/20" : "bg-[#050816] text-[#14f195] border-[#14f195]/20"}
                  `}>
                    {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : "J"}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl p-3 leading-relaxed text-left text-xs text-justify
                    ${m.sender === "user"
                      ? "bg-cyan-950/30 text-cyan-50 border border-cyan-500/20 rounded-tr-none"
                      : "bg-[#02050e]/95 text-slate-100 border border-purple-500/10 rounded-tl-none shadow-[2px_2px_15px_rgba(139,92,246,0.05)]"}
                  `}>
                    {m.text}
                  </div>
                </div>
              ))}
              
              {/* Spinning loading spinner */}
              {isLoading && (
                <div className="flex gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-slate-900 border border-[#14f195]/20 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#14f195] animate-ping" />
                  </div>
                  <div className="bg-[#02050e] border border-white/5 rounded-2xl p-3 px-4 font-mono text-xs text-[#14f195] animate-pulse">
                    Synthesizing reply matrix...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Block */}
            <div className="px-4 pb-2 text-left">
              <p className="text-[9px] text-gray-500 mb-1.5 uppercase tracking-wider">Suggested Queries</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(s)}
                    disabled={isLoading}
                    className="text-[10px] text-slate-300 hover:text-cyan-400 bg-slate-900 hover:bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 px-2 py-1.5 rounded-lg text-left transition-all duration-200 cursor-pointer disabled:opacity-40"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Input form */}
            <form onSubmit={onFormSubmit} className="p-3 bg-slate-950 border-t border-cyan-500/20 flex gap-2">
              <input
                type="text"
                className="flex-1 bg-black/60 text-white rounded-xl border border-cyan-500/10 focus:border-cyan-400 px-3 py-2 text-xs font-mono outline-none focus:ring-0 placeholder-gray-500"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask JARVIS a technical query..."
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-cyan-950/80 hover:bg-[#00f5ff]/20 border border-cyan-400/30 hover:border-cyan-400 p-2 text-cyan-400 rounded-xl transition-all duration-200 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-cyan-400/30 flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
