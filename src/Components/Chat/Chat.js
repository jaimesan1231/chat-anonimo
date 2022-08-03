import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  ChatContainer,
  ChatHeader,
  ChatMessages,
  MessageBox,
} from "./ChatElements";

import Message from "../Message/Message";
import { useChats } from "../../hooks/useChats";
import SendForm from "../SendForm/SendForm";

function Chat({ chatName }) {
  const currentChat = useSelector((state) => state.currentChat);
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  sessionStorage.setItem("currentChat", JSON.stringify(currentChat));

  const { updateChats } = useChats(JSON.parse(localStorage.getItem("chats")));

  const messagesEndRef = useRef(null);

  useEffect(() => {
    updateChats(currentChat);
    messagesEndRef.current?.scrollIntoView();
  }, [currentChat.messages.length]);
  return (
    <ChatContainer>
      <ChatHeader>
        <span>{chatName}</span>
      </ChatHeader>
      <ChatMessages>
        {currentChat.messages &&
          currentChat.messages.map((message, index) => (
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
      <SendForm />
    </ChatContainer>
  );
}

export default Chat;
