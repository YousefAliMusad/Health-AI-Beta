import React, { useState, useEffect, useRef, useContext } from "react";
import { MdSend, MdPerson, MdSmartToy } from "react-icons/md";
import "../ChatPage.css";
import { DietPlanContext } from './DietPlanContext';
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const ChatPage = () => {
  const { t } = useTranslation(); // Use the useTranslation hook
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { dietPlan } = useContext(DietPlanContext); // Access the diet plan from context

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      let aiResponse = "";

      // Prepare diet plan context
      const dietPlanContext = `Here is the user's diet plan:\n\n${JSON.stringify(dietPlan, null, 2)}\n\nUser's question: ${inputMessage}`;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDmQ5XQV7gwYyYHwRwdSsjdDef_V-gM9Ug",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: dietPlanContext }] }],
          }),
        }
      );

      const data = await response.json();
      console.log("AI Response:", data);

      if (!data || !data.candidates || data.candidates.length === 0) {
        throw new Error(t("invalidResponseStructure")); // Use t() for translations
      }

      aiResponse = data.candidates[0].content.parts[0].text;

      setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
    } catch (error) {
      console.error("Error sending message to AI:", error);
      setMessages((prev) => [
        ...prev,
        { text: t("errorMessage"), sender: "ai" }, // Use t() for translations
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-100 to-gray-200 p-6 border" style={{ minHeight: "70vh", marginTop: "75px" }}>
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6 tracking-wide">
        {t("aiChat")} {/* Use t() for translations */}
      </h1>
      <div className="flex-1 overflow-y-auto bg-white p-6 border-gray-300">
        {messages.length === 0 ? (
          <div className="text-teal-950 text-3xl py-10 text-center" style={{ height: "min-content", fontWeight: "bolder" }}>
            {t("askAboutDietPlan")} {/* Use t() for translations */}
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start space-x-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                {/* Bot Icon */}
                {msg.sender === "ai" && (
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-300 rounded-full text-gray-800">
                    <MdSmartToy size={24} />
                  </div>
                )}

                {/* Message Bubble */}
                <div className={`relative p-4 max-w-xs rounded-2xl text-sm font-medium shadow-md transition-transform duration-200 transform ${
                  msg.sender === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "mr-auto bg-gray-200 text-gray-900"
                }`}>
                  {msg.text}
                  {/* Timestamp */}
                  {msg.sender === "user" && (
                    <div className="text-xs mt-1 text-blue-200">{msg.timestamp || t("justNow")}</div> 
                  )}
                </div>

                {/* User Icon */}
                {msg.sender === "user" && (
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-600 rounded-full text-white">
                    <MdPerson size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {isTyping && <div className="text-gray-500 text-sm italic">{t("aiTyping")}</div>} 
        <div ref={messagesEndRef} />
      </div>
      <div className="sticky bottom-0 bg-white border-t pt-3 p-3">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder={t("typeYourMessage")} 
          />
          <button
            className="ml-3 p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition shadow-md"
            onClick={sendMessage}
          >
            <MdSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;