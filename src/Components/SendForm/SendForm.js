import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useChatMessages } from "../../hooks/useChatMessages";
import { SendFormContainer, SendIcon, SendInput } from "./SendFormElements";

function SendForm() {
  const { updateChatMessages } = useChatMessages();
  const [message, setMessage] = useState("");
  const currentChat = useSelector((state) => state.currentChat);
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const handleChangeInput = (e) => {
    setMessage(e.target.value);
  };
  const handleKeyInput = (e) => {
    const codigo = e.which || e.keyCode;
    if (codigo === 13 && !e.shiftKey) {
      e.preventDefault();
      sendNewMessage();
    }
  };
  const sendNewMessage = () => {
    if (!message.trim() == "") {
      updateChatMessages(currentChat, {
        message: message,
        user: currentUser.id,
      });
    }
    setMessage("");
  };
  return (
    <SendFormContainer>
      <SendInput
        onChange={(e) => handleChangeInput(e)}
        onKeyPress={handleKeyInput}
        value={message}
        placeholder="Escriba su mensaje aqui"
      />
      <SendIcon onClick={() => sendNewMessage()} />
    </SendFormContainer>
  );
}

export default SendForm;
