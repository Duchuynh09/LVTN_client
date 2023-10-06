import { bot } from "../../assets/bg";
import React, { useState } from "react";
import "./Chat.scss";
import { Button } from "antd";
import {
  MessageOutlined,
  CloseOutlined,
  SendOutlined,
} from "@ant-design/icons";
import chatBotApi from "../../api/chatBotApi";
export default function ChatbotWindow() {
  const [isOpen, setIsOpen] = useState(false); // Trạng thái của cửa sổ chat

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  function sendMessage() {
    if (newMessage.trim() !== "") {
      const userMessage = { sender: "user", message: newMessage };
      setMessages([userMessage, ...messages]);
      setNewMessage("");
      handleChatbotResponse(userMessage);
    }
  }

  async function handleChatbotResponse(userMessage) {
    try {
      const waitRespone = { message: "...", sender: "bot" };
      setMessages((prevMessages) => [waitRespone, ...prevMessages]);
      const BOTRespone = await chatBotApi.sendMess(JSON.stringify(userMessage));
      console.log(BOTRespone);
      // let botMessage = await { message: BOTRespone[0].text, sender: "bot" };
      // setMessages((prevMessages) => {
      //   const listMes = [...prevMessages];
      //   listMes.shift();
      //   return [botMessage, ...listMes];
      // });
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleInputChange(e) {
    setNewMessage(e.target.value);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  // Hàm để mở/closed cửa sổ chat
  function toggleChatWindow() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Button
        className="chatbot-toggle-button"
        icon={isOpen ? <CloseOutlined /> : <MessageOutlined />}
        shape="circle"
        size="large"
        onClick={toggleChatWindow}
        style={{ width: "50px", height: "50px", padding: "10px" }}
      />
      <div
        style={{
          backgroundImage: `url('${bot}')`,
        }}
        className={`chatbot-window ${isOpen ? "open" : "closed"}`}
      >
        <div className={"chatbot-messages"}>
          {messages.map(({ message, sender }, index) => (
            <>
              <div
                key={index}
                className={`message ${sender === "user" ? "user" : "bot"}`}
              >
                <div className="content">{message}</div>
              </div>
            </>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
          />
          <Button
            icon={<SendOutlined />}
            className="btn-send"
            onClick={sendMessage}
          ></Button>
        </div>
      </div>
    </>
  );
}
