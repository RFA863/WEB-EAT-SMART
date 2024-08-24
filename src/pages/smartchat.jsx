import axios from "axios";
import React, { useState } from "react";
import { ImSpinner } from "react-icons/im";

function ChatComponent() {
  const [messages, setMessages] = useState([
    { user: "bot", text: " Hi there! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const url = import.meta.env.VITE_API_URL;

  const [isSend, setIsSend] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (input.trim()) {
      setIsSend(true);
      const newMessage = { user: "user", text: input };
      // setMessages({ ...messages, newMessage });
      setMessages((prevMessages) => [...prevMessages, newMessage]);

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
          // setMessages({ ...messages, newMessage, botMessage });
          // setMessages((prevMessages) => [
          //   ...prevMessages,
          //   newMessage,
          //   botMessage,
          // ]);
          setMessages((prevMessages) => [...prevMessages, botMessage]);
          setInput("");
          setIsSend(false);
          console.log(messages);
        });

      //   const data = await response.json();
      //   const botMessage = { user: "bot", text: data.reply };
      //   setMessages([...messages, newMessage, botMessage]);
      //   setInput("");
    }
  };

  return (
    <>
      {/* <div className="flex flex-col max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-4">
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
      </div> */}

      <div className="px-36 py-16 shadow-lg">
        <div className="bg-backgroundPrimaryBolder rounded-2xl">
          {/* Header */}
          <div className="bg-backgroundPrimary shadow-md p-6">
            <h1 className="text-contentBrand self-center text-2xl font-semibold whitespace-nowrap">
              - Smart Chat -
            </h1>
          </div>
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 ">
            <div className="space-y-4 mt-5 mb-20">
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
                        ? "bg-backgroundBrand text-contentPrimaryInverse"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {/* Chat Message from Bot
              <div className="flex justify-start">
                <div className="bg-white text-gray-700 p-4 rounded-lg shadow-md max-w-xs">
                  Hi there! How can I help you today?
                </div>
              </div> */}
              {/* Chat Message from User */}
              {/* <div className="flex justify-end">
                <div className="bg-backgroundBrand text-contentPrimaryInverse p-4 rounded-lg shadow-md max-w-xs">
                  Can you recommend a healthy recipe?
                </div>
              </div> */}
              {/* More Messages */}
              {/* Repeat as needed */}
            </div>
            {/* Input Area */}
            <form onSubmit={sendMessage}>
              <div className="bg-white p-4 shadow-inner flex items-center rounded-2xl">
                <input
                  type="text"
                  placeholder="Ketikan sesuatu..."
                  className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-600 "
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isSend}
                />
                {isSend ? (
                  <button
                    type="submit"
                    className="ml-4 bg-backgroundBrand text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-700"
                    disabled={isSend}
                  >
                    <ImSpinner className="loading-icon" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-4 bg-backgroundBrand text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-700"
                    disabled={isSend}
                  >
                    Send
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatComponent;
