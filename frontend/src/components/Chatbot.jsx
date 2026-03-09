import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {

      const res = await axios.post(
        "http://localhost:4000/api/chatbot/chat",
        { message: input }
      );

      const botMessage = {
        sender: "bot",
        text: res.data.message || JSON.stringify(res.data)
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Server error" }
      ]);

    }

    setLoading(false);
    setInput("");

  };

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center text-xl"
      >
        💬
      </button>

      {/* Chat Window */}

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] h-[500px] bg-white shadow-2xl rounded-xl flex flex-col border">

          {/* Header */}

          <div className="bg-blue-600 text-white p-4 rounded-t-xl flex justify-between items-center">

            <div>
              <h3 className="font-semibold">AI Health Assistant</h3>
              <p className="text-xs opacity-80">Online</p>
            </div>

            <button onClick={() => setIsOpen(false)}>✖</button>

          </div>

          {/* Messages */}

          <div className="flex-1 overflow-y-auto p-4 space-y-3">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`px-4 py-2 rounded-lg text-sm max-w-[70%] ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>

              </div>

            ))}

            {loading && (
              <div className="text-sm text-gray-500">
                AI is typing...
              </div>
            )}

          </div>

          {/* Input */}

          <div className="p-3 border-t flex gap-2">

            <input
              type="text"
              placeholder="Ask about doctors, booking..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>

          </div>

        </div>
      )}
    </>
  );
};

export default Chatbot;