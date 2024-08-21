import axios from "axios";
import React, { useState } from "react";

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const url = import.meta.env.VITE_API_URL;

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = { user: "user", text: input };
      setMessages([...messages, newMessage]);

      // Mengirimkan pesan ke API dan mendapatkan balasan
      const response = await axios
        .post(
          url + "/chat/input/no-auth",
          {
            user_message: input,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          const data = res.data.data;
          const botMessage = { user: "bot", text: data };
          setMessages([...messages, newMessage, botMessage]);
          setInput("");
        });

      //   const data = await response.json();
      //   const botMessage = { user: "bot", text: data.reply };
      //   setMessages([...messages, newMessage, botMessage]);
      //   setInput("");
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-4">
      <div className="flex flex-col space-y-2 overflow-y-auto mb-4 h-64">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.user === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                message.user === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;
