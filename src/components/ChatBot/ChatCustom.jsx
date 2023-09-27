// import React, { useState } from "react";
// import "./Chat.scss"; // CSS file for styling

// export default function ChatbotWindow() {
//   const [messages, setMessages] = useState([]); // Lưu trữ danh sách tin nhắn
//   const [newMessage, setNewMessage] = useState(""); // Tin nhắn người dùng đang nhập

//   // Hàm để gửi tin nhắn từ người dùng
//   function sendMessage() {
//     if (newMessage.trim() !== "") {
//       // Tạo một tin nhắn người dùng mới
//       const userMessage = { text: newMessage, sender: "user" };
//       setMessages([...messages, userMessage]);
//       setNewMessage("");

//       // Xử lý và gửi phản hồi từ chatbot
//       handleChatbotResponse(newMessage);
//     }
//   }

//   // Hàm để xử lý và gửi phản hồi từ chatbot (cần tùy chỉnh)
//   function handleChatbotResponse(userMessage) {
//     // Gửi userMessage đến server hoặc logic xử lý chatbot
//     // Sau đó, thêm phản hồi từ chatbot vào state.messages
//     // Ví dụ:
//     const botMessage = { text: "Hello from the chatbot!", sender: "bot" };
//     setMessages((prevMessages) => [...prevMessages, botMessage]);
//   }

//   // Hàm để cập nhật newMessage khi người dùng gõ
//   function handleInputChange(e) {
//     setNewMessage(e.target.value);
//   }

//   // Hàm để xử lý khi người dùng ấn Enter
//   function handleKeyPress(e) {
//     if (e.key === "Enter") {
//       sendMessage();
//     }
//   }

//   return (
//     <div className="chatbot-window">
//       <div className="chatbot-messages">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`message ${message.sender === "user" ? "user" : "bot"}`}
//           >
//             {message.text}
//           </div>
//         ))}
//       </div>
//       <div className="message-input">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={handleInputChange}
//           onKeyPress={handleKeyPress}
//           placeholder="Type a message..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }
import { bot } from "../../assets/bg";
import { TypeAnimation } from "react-type-animation";
import React, { useState } from "react";
import "./Chat.scss";
import { Button } from "antd";
import {
  MessageOutlined,
  CloseOutlined,
  SendOutlined,
} from "@ant-design/icons";
export default function ChatbotWindow() {
  const [isOpen, setIsOpen] = useState(false); // Trạng thái của cửa sổ chat

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  function sendMessage() {
    if (newMessage.trim() !== "") {
      const userMessage = { text: newMessage, sender: "user" };
      setMessages([userMessage, ...messages]);
      setNewMessage("");
      handleChatbotResponse(newMessage);
    }
  }

  function handleChatbotResponse(userMessage) {
    let botMessage = {};
    setTimeout(async () => {
      botMessage = await { text: "Hello from the chatbot!", sender: "bot" };
      setMessages((prevMessages) => {
        const listMes = [...prevMessages];
        listMes.shift();
        return [botMessage, ...listMes];
      });
    }, 2000);
    const waitRespone = { text: "đang xử lý", sender: "bot" };
    if (!botMessage.text) {
      setMessages((prevMessages) => [waitRespone, ...prevMessages]);
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
          {messages.map((message, index) => (
            <>
              <div
                key={index}
                className={`message ${
                  message.sender === "user" ? "user" : "bot"
                }`}
              >
                <div className="content">{message.text}</div>
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
