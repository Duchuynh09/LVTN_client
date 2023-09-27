import { Launcher } from "react-chat-window";
import React, { useState } from "react";
import "./Chat.css";
import chatBotApi from "../../api/chatBotApi";
function ChatWindow() {
  const [messageList, setMessageList] = useState([]);
  async function _onMessageWasSent(message) {
    const mess = {
      sender: "user",
      message: message.data.text,
    };
    console.log(mess);
    const BOTRespone = (await chatBotApi.sendMess(mess)).data;
    console.log(BOTRespone);

    // setMessageList([...messageList, message]);
  }

  // handleClick                            Intercept the click event on the launcher. No argument sent when function is called.
  // isOpen		                            Force the open/close state of the chat window. If this is not set, it will open and close when clicked.
  // mute	            boolean             Don't play sound for incoming messages. Defaults to false.
  // newMessagesCount	                    The number of new messages. If greater than 0, this number will be displayed in a badge on the launcher. Defaults to 0.
  // onFilesSelected	function(fileList)	Called after file has been selected from dialogue in chat window.
  // onMessageWasSent	function(message)	yes	Called when a message is sent, with a message object as an argument.
  // showEmoji	        boolean	        	Whether or not to show the emoji button in the input bar. Defaults to true.
  return (
    <Launcher
      agentProfile={{
        teamName: "Chat Bot",
        imageUrl:
          "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
      }}
      onMessageWasSent={(inputMess) => {
        _onMessageWasSent(inputMess);
      }}
      messageList={messageList}
      showEmoji={false}
    />
  );
}

export default ChatWindow;
