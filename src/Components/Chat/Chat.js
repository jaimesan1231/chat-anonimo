import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bringMessages,
  sendMessage,
  updateChat,
  updateGroupChat,
} from "../../actions/chatActions";
import { addChat, startNewChat } from "../../actions/chatActions";
import {
  ChatContainer,
  ChatFooter,
  ChatHeader,
  ChatInput,
  ChatMessages,
  ChatTextArea,
  MessageBox,
  SendIcon,
} from "./ChatElements";
import Message from "../../Message/Message";

function Chat({ chatName }) {
  const currentChat = useSelector((state) => state.currentChat);
  sessionStorage.setItem("currentChat", JSON.stringify(currentChat));
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.currentChat);
  console.log(currentChat);
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef(null);
  console.log(messages);
  const handleChangeInput = (e) => {
    setMessage(e.target.value);
  };
  const handleKeyInput = (e) => {
    console.log(e.which || e.keyCode);
    const codigo = e.which || e.keyCode;
    console.log(codigo);
    if (codigo === 13 && !e.shiftKey) {
      e.preventDefault();

      sendNewMessage();

      console.log("Se presiono el enter");
    }
  };
  const sendNewMessage = () => {
    console.log(JSON.parse(sessionStorage.getItem("currentChat")));
    console.log(currentChat);
    if (!message.trim() == "") {
      dispatch(
        sendMessage(currentChat, {
          message: message.trim(),
          user: currentUser.id,
        })
      );
    }
    setMessage("");
    console.log(currentChat);
  };
  useEffect(() => {
    if (currentChat.id) {
      dispatch(
        updateGroupChat(
          JSON.parse(localStorage.getItem("groupChats")),
          currentChat
        )
      );
    } else {
      if (JSON.parse(localStorage.getItem("chats"))) {
        console.log("si esta entrando");
        dispatch(
          updateChat(JSON.parse(localStorage.getItem("chats")), currentChat)
        );
      } else {
        dispatch(updateChat([], currentChat));
      }
    }

    messagesEndRef.current?.scrollIntoView();
  }, [messages.length]);
  return (
    <ChatContainer>
      <ChatHeader>
        <h1>{chatName}</h1>
      </ChatHeader>
      <ChatMessages>
        {messages &&
          messages.map((message, index) => (
            <MessageBox
              key={index}
              user={message ? message.user : 0}
              currentUser={currentUser.id}
            >
              <Message
                user={message ? message.user : 0}
                currentUser={currentUser.id}
                message={message.message}
              />
            </MessageBox>
          ))}
        <div ref={messagesEndRef}></div>
      </ChatMessages>
      <ChatFooter>
        <ChatInput
          onChange={(e) => handleChangeInput(e)}
          onKeyPress={handleKeyInput}
          value={message}
          placeholder="Escriba su mensaje aqui"
        />
        <SendIcon onClick={() => sendNewMessage()} />
      </ChatFooter>
    </ChatContainer>
  );
}

export default Chat;
