import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAgent } from "../lib/agentContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Bot,
  CalendarCheck,
  Loader2,
  MessageSquareDot,
  RotateCcw,
} from "lucide-react";

// ─── System Prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the official AI assistant for JN Shah Associates, a professional Chartered Accountancy firm based in India.

Your role:
- Answer questions about tax, GST, audit, accounting, compliance, business advisory, and finance
- Maintain a professional yet friendly tone
- Give concise answers (max ~120 words per reply)
- Never provide specific legal advice; always recommend consulting a professional for critical matters
- Never quote exact fee rates — if asked about pricing, say: "Our rates are discussed during a free initial consultation."

Rules:
- ONLY answer CA / finance / tax / audit / business related queries
- If a query is off-topic, politely redirect: "I'm specialised in CA and finance topics. For this query, I'd recommend consulting an appropriate professional."
- If a question is too complex or sensitive, say: "This requires personalised expert advice. I can help you schedule a consultation with our CA team."

Booking trigger (IMPORTANT):
- Whenever the user expresses intent to book, schedule, contact, or meet, you MUST reply with ONLY the following exact phrase and NOTHING else:
  "I can help you connect with our team. Please use the Instant Inquiry form below to submit your details."`;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const generateId = () => Math.random().toString(36).slice(2, 9);

const formatHistory = (messages) =>
  messages
    .filter((m) => m.id !== "welcome" && (m.role === "user" || m.role === "assistant"))
    .slice(-14)
    .map(({ role, content }) => ({ role, content }));

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
};

// ─── Component ────────────────────────────────────────────────────────────────
const ChatAgent = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { messages, hasBookingIntent, addMessage, detectBookingIntent, resetChat } =
    useAgent();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Inquiry form states
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryData, setInquiryData] = useState({ name: "", email: "", phone: "", service: "", date: "", time: "" });
  const [isInquirySubmitting, setIsInquirySubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!inquiryData.name || !inquiryData.email || !inquiryData.phone) return;

    if (inquiryData.date) {
      const selectedDate = new Date(inquiryData.date);
      const day = selectedDate.getDay(); // 0 is Sunday, 6 is Saturday
      if (day === 0 || day === 6) {
        alert("Please select a weekday (Monday to Friday) for your appointment.");
        return;
      }
    }

    if (inquiryData.time) {
      const timeParts = inquiryData.time.split(":");
      const hour = parseInt(timeParts[0], 10);
      if (hour < 10 || hour >= 19) {
        alert("Please select a time between 10:00 AM and 7:00 PM.");
        return;
      }
    }

    setIsInquirySubmitting(true);
    try {
      await fetch("https://hook.eu1.make.com/idndygus9k6uxsdras3ei4h4jz3umf4a", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...inquiryData,
          // Sending the chat context helps your team understand the user's request beforehand
          chatContext: messages.map(m => `${m.role}: ${m.content}`).join("\\n")
        })
      });
      setInquirySuccess(true);
      setTimeout(() => {
        setInquirySuccess(false);
        setShowInquiryForm(false);
        setInquiryData({ name: "", email: "", phone: "", service: "", date: "", time: "" });
        addMessage({ id: generateId(), role: "assistant", content: "Thank you! Your details have been securely submitted to our team. We will get back to you shortly to coordinate." });
      }, 3000);
    } catch (err) {
      console.error("Webhook error:", err);
      alert("Failed to submit. Please try again later.");
    } finally {
      setIsInquirySubmitting(false);
    }
  };

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const hasShownUnread = useRef(false);
  const [unreadPulse, setUnreadPulse] = useState(false);

  // Lock body scroll on mobile when panel is open
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, isOpen]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Show unread pulse after 4s if chat has never been opened
  useEffect(() => {
    if (!hasShownUnread.current) {
      const t = setTimeout(() => {
        if (!isOpen) setUnreadPulse(true);
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setUnreadPulse(false);
    hasShownUnread.current = true;
  };

  // ── Send message ────────────────────────────────────────────────────────────
  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg = { id: generateId(), role: "user", content: text };
    addMessage(userMsg);
    detectBookingIntent(text);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_KEY;
      if (!apiKey) throw new Error("Missing VITE_OPENROUTER_KEY");

      const history = formatHistory([...messages, userMsg]);

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "JN Shah Associates AI Assistant",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3.5-haiku",
          max_tokens: 300,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...history,
          ],
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `API error ${response.status}`);
      }

      const data = await response.json();
      const aiText =
        data?.choices?.[0]?.message?.content ||
        "I'm sorry, I couldn't generate a response. Please try again.";

      const aiMsg = { id: generateId(), role: "assistant", content: aiText };
      addMessage(aiMsg);
      detectBookingIntent(aiText);
    } catch (err) {
      console.error("[ChatAgent] API error:", err);
      addMessage({
        id: generateId(),
        role: "assistant",
        content:
          "Something went wrong on my end. Please try WhatsApp instead — our team is always happy to help! 💬",
        isError: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, addMessage, detectBookingIntent]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ─── Panel style: full-screen on mobile, floating card on desktop ────────────
  const panelStyle = isMobile
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
        boxShadow: "none",
      }
    : {
        position: "fixed",
        bottom: "180px",
        right: "20px",
        zIndex: 200,
        width: "clamp(320px, 92vw, 400px)",
        maxHeight: "min(78vh, 620px)",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 24px 64px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.08)",
        fontFamily: "'Inter', system-ui, sans-serif",
      };

  const panelAnimation = isMobile
    ? {
        initial: { opacity: 0, y: "100%" },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: "100%" },
        transition: { type: "spring", stiffness: 280, damping: 30 },
      }
    : {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 0.95 },
        transition: { type: "spring", stiffness: 300, damping: 28 },
      };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Floating Trigger Button ── */}
      <motion.button
        id="chat-agent-trigger"
        onClick={handleOpen}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="group"
        style={{
          position: "fixed",
          // Stacked above WhatsApp button (bottom-right)
          // WA: bottom 16px mobile / 32px desktop, height 56px mobile / 64px desktop
          bottom: isMobile ? "84px" : "108px",
          right: isMobile ? "16px" : "32px",
          zIndex: 200,
          background: "linear-gradient(135deg, #1a2b6d 0%, #2d4eb5 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: isMobile ? "56px" : "64px",
          height: isMobile ? "56px" : "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 10px 30px rgba(26,43,109,0.4)",
        }}
      >
        <MessageSquareDot size={isMobile ? 22 : 26} />

        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-white text-brand-navy px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-brand-ice">
            AI Assistant
        </span>

        {/* Pulse ring */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "rgba(45,78,181,0.35)",
            animation: "ca-chat-ping 2s cubic-bezier(0,0,0.2,1) infinite",
          }}
        />
        {/* Unread dot */}
        {unreadPulse && (
          <span
            style={{
              position: "absolute",
              top: 3,
              right: 3,
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#ef4444",
              border: "2px solid #fff",
            }}
          />
        )}
      </motion.button>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            id="chat-agent-panel"
            {...panelAnimation}
            style={panelStyle}
          >
            {/* Header — sticky */}
            <div
              style={{
                background: "linear-gradient(135deg, #1a2b6d 0%, #2d4eb5 100%)",
                padding: isMobile ? "14px 16px" : "16px 20px",
                paddingTop: isMobile
                  ? "calc(14px + env(safe-area-inset-top, 0px))"
                  : "16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Bot size={20} color="#fff" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "#fff",
                    letterSpacing: "0.01em",
                    fontFamily: "var(--font-trajan)",
                  }}
                >
                  JN Shah Assistant
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.72rem",
                    color: "rgba(255,255,255,0.7)",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#4ade80",
                      display: "inline-block",
                    }}
                  />
                  CA Chatbot
                </p>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={resetChat}
                  title="Clear chat"
                  aria-label="Clear chat"
                  style={iconBtnStyle}
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  style={iconBtnStyle}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Message Thread — flex-grow + overflow scroll */}
            <div
              id="chat-agent-messages"
              style={{
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                background: "#f8fafc",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {msg.role === "assistant" && (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg,#1a2b6d,#2d4eb5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginRight: 8,
                        marginTop: 2,
                      }}
                    >
                      <Bot size={14} color="#fff" />
                    </div>
                  )}
                  <div
                    style={{
                      maxWidth: isMobile ? "82%" : "78%",
                      padding: "10px 14px",
                      borderRadius:
                        msg.role === "user"
                          ? "16px 4px 16px 16px"
                          : "4px 16px 16px 16px",
                      background:
                        msg.role === "user"
                          ? "linear-gradient(135deg,#1a2b6d,#2d4eb5)"
                          : msg.isError
                          ? "#fef2f2"
                          : "#fff",
                      color:
                        msg.role === "user"
                          ? "#fff"
                          : msg.isError
                          ? "#b91c1c"
                          : "#1e293b",
                      fontSize: isMobile ? "0.9rem" : "0.855rem",
                      lineHeight: 1.55,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                      border:
                        msg.isError
                          ? "1px solid #fecaca"
                          : msg.role === "assistant"
                          ? "1px solid #e2e8f0"
                          : "none",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#1a2b6d,#2d4eb5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Bot size={14} color="#fff" />
                  </div>
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "4px 16px 16px 16px",
                      padding: "10px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                  >
                    <TypingDots />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Booking CTA */}
            <AnimatePresence>
              {hasBookingIntent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  style={{
                    padding: "10px 16px",
                    background: "linear-gradient(90deg,#eff6ff,#dbeafe)",
                    borderTop: "1px solid #bfdbfe",
                    flexShrink: 0,
                  }}
                >
                  {!showInquiryForm ? (
                    <button
                      id="chat-agent-book-cta"
                      onClick={() => setShowInquiryForm(true)}
                      style={{
                        width: "100%",
                        background: "linear-gradient(135deg,#1a2b6d,#2d4eb5)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        fontSize: isMobile ? "0.9rem" : "0.85rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        letterSpacing: "0.01em",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      <CalendarCheck size={16} />
                      Instant Inquiry →
                    </button>
                  ) : inquirySuccess ? (
                    <div style={{ textAlign: "center", padding: "10px", color: "#166534", fontWeight: 700, fontSize: "0.9rem" }}>
                      ✓ Received! We'll contact you shortly.
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        required 
                        value={inquiryData.name}
                        onChange={(e) => setInquiryData({...inquiryData, name: e.target.value})}
                        style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #bfdbfe", fontSize: "0.9rem", outline: "none" }}
                      />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        required 
                        value={inquiryData.email}
                        onChange={(e) => setInquiryData({...inquiryData, email: e.target.value})}
                        style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #bfdbfe", fontSize: "0.9rem", outline: "none" }}
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        required 
                        value={inquiryData.phone}
                        onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})}
                        style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #bfdbfe", fontSize: "0.9rem", outline: "none" }}
                      />
                      <select
                        value={inquiryData.service}
                        onChange={(e) => setInquiryData({...inquiryData, service: e.target.value})}
                        style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #bfdbfe", fontSize: "0.9rem", background: "#fff", outline: "none" }}
                      >
                        <option value="">Select Service...</option>
                        <option value="Direct Tax">Direct Tax</option>
                        <option value="GST">GST</option>
                        <option value="Audit">Audit</option>
                        <option value="Advisory">Advisory</option>
                        <option value="Other">Other</option>
                      </select>
                      <div style={{ display: "flex", gap: 10 }}>
                        <input 
                          type="date" 
                          required 
                          title="Preferred Date"
                          value={inquiryData.date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setInquiryData({...inquiryData, date: e.target.value})}
                          style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: "1px solid #bfdbfe", fontSize: "0.9rem", outline: "none", background: "#fff", color: inquiryData.date ? '#1e293b' : '#94a3b8', cursor: "pointer" }}
                        />
                        <input 
                          type="time" 
                          required 
                          title="Preferred Time"
                          value={inquiryData.time}
                          min="10:00"
                          max="19:00"
                          onChange={(e) => setInquiryData({...inquiryData, time: e.target.value})}
                          style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: "1px solid #bfdbfe", fontSize: "0.9rem", outline: "none", background: "#fff", color: inquiryData.time ? '#1e293b' : '#94a3b8', cursor: "pointer" }}
                        />
                      </div>
                      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                        <button type="button" onClick={() => setShowInquiryForm(false)} style={{ flex: 1, padding: "10px", background: "transparent", border: "1px solid #bfdbfe", borderRadius: 8, color: "#1e3a8a", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}>
                          Cancel
                        </button>
                        <button type="submit" disabled={isInquirySubmitting} style={{ flex: 2, padding: "10px", background: "#1a2b6d", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.9rem" }}>
                          {isInquirySubmitting ? <Loader2 size={18} className="animate-spin" /> : "Submit"}
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Row — sticky at bottom, respects iOS keyboard & notch */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 14px",
                paddingBottom: isMobile
                  ? "calc(12px + env(safe-area-inset-bottom, 0px))"
                  : "12px",
                background: "#fff",
                borderTop: "1px solid #e2e8f0",
                flexShrink: 0,
              }}
            >
              <input
                ref={inputRef}
                id="chat-agent-input"
                type="text"
                placeholder="Ask about tax, GST, audit…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                style={{
                  flex: 1,
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: isMobile ? "11px 14px" : "9px 14px",
                  fontSize: isMobile ? "1rem" : "0.855rem", // 1rem prevents iOS zoom
                  outline: "none",
                  color: "#1e293b",
                  background: isLoading ? "#f8fafc" : "#fff",
                  transition: "border-color 0.2s",
                  WebkitAppearance: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2d4eb5")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
              <button
                id="chat-agent-send"
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                style={{
                  width: isMobile ? "44px" : "40px",
                  height: isMobile ? "44px" : "40px",
                  borderRadius: "10px",
                  background:
                    isLoading || !input.trim()
                      ? "#e2e8f0"
                      : "linear-gradient(135deg,#1a2b6d,#2d4eb5)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}
              >
                {isLoading ? (
                  <Loader2
                    size={17}
                    color="#94a3b8"
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                ) : (
                  <Send size={17} color={input.trim() ? "#fff" : "#94a3b8"} />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global keyframes */}
      <style>{`
        @keyframes ca-chat-ping {
          75%, 100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ca-dot-bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40%           { transform: translateY(-5px); }
        }
        #chat-agent-messages::-webkit-scrollbar { width: 4px; }
        #chat-agent-messages::-webkit-scrollbar-track { background: transparent; }
        #chat-agent-messages::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

        /* Prevent iOS double-tap zoom on buttons */
        #chat-agent-trigger, #chat-agent-send, #chat-agent-book-cta {
          touch-action: manipulation;
        }
      `}</style>
    </>
  );
};

// ── Typing Dots ───────────────────────────────────────────────────────────────
const TypingDots = () => (
  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "#94a3b8",
          display: "inline-block",
          animation: `ca-dot-bounce 1.2s ease-in-out ${i * 0.18}s infinite`,
        }}
      />
    ))}
  </div>
);

// ── Shared icon button style ──────────────────────────────────────────────────
const iconBtnStyle = {
  width: 32,
  height: 32,
  borderRadius: "8px",
  background: "rgba(255,255,255,0.12)",
  border: "none",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  touchAction: "manipulation",
};

export default ChatAgent;
