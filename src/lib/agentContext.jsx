import { createContext, useContext, useState, useCallback } from "react";

const AgentContext = createContext(null);

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm the JN Shah Assistant 👋 Ask me anything about tax, GST, audit, or any CA-related services — I'm here to help.",
};

export const AgentProvider = ({ children }) => {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [hasBookingIntent, setHasBookingIntent] = useState(false);

  const addMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const detectBookingIntent = useCallback((text = "") => {
    const lower = text.toLowerCase();
    const triggers = [
      "book",
      "appointment",
      "consultation",
      "schedule",
      "call",
      "meet",
      "inquiry form",
      "contact",
      "connect"
    ];
    if (triggers.some((t) => lower.includes(t))) {
      setHasBookingIntent(true);
    }
  }, []);

  const resetChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    setHasBookingIntent(false);
  }, []);

  return (
    <AgentContext.Provider
      value={{
        messages,
        hasBookingIntent,
        addMessage,
        detectBookingIntent,
        resetChat,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error("useAgent must be used inside AgentProvider");
  return ctx;
};
