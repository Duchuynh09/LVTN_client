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
      if (newMessage === "clear") {
        setMessages([]);
        setNewMessage("");
      } else {
        const userMessage = { sender: "user", message: newMessage };
        setMessages([userMessage, ...messages]);
        setNewMessage("");
        handleChatbotResponse(userMessage);
      }
    }
  }
  async function buttonSender(title, payload) {
    if (title.trim() !== "") {
      const userMessage = { sender: "user", message: title };
      setMessages([userMessage, ...messages]);
      setNewMessage("");
      handleChatbotResponse({ sender: "user", message: payload });
    }
  }
  async function handleChatbotResponse(userMessage) {
    try {
      const BOTRespone = await chatBotApi.sendMess(JSON.stringify(userMessage));
      let botMessage = await {
        buttons: BOTRespone[0].buttons ? [...BOTRespone[0].buttons] : [],
        message: BOTRespone[0].text,
        sender: "bot",
      };
      setMessages((prevMessages) => {
        const listMes = [...prevMessages];
        return [botMessage, ...listMes];
      });
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
          {messages.map(({ message, sender, buttons }, index) => (
            <>
              <div
                key={index}
                className={`message ${sender === "user" ? "user" : "bot"}`}
              >
                <div className="content">
                  {message}
                  {buttons
                    ? buttons.map(({ payload, title }) => {
                        return (
                          <Button
                            className="bg-dark"
                            onClick={() => buttonSender(title, payload)}
                          >
                            {title}
                          </Button>
                        );
                      })
                    : ""}
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="message-input">
          <input
            spellCheck="false"
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
