import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bringMessages,
  sendMessage,
  updateChat,
} from "../../actions/chatActions";
import { addChat, startNewChat } from "../../actions/chatActions";
import {
  ChatContainer,
  ChatFooter,
  ChatHeader,
  ChatInput,
  ChatMessages,
  SendIcon,
} from "./ChatElements";

function Chat({ chatName }) {
  const currentChat = useSelector((state) => state.currentChat);
  sessionStorage.setItem("currentChat", JSON.stringify(currentChat));
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.currentChat);
  const allChat = useSelector((state) => state.allChats);
  console.log(allChat);
  console.log(currentChat);
  const [message, setMessage] = useState("");
  const [startMessage, setStartMessage] = useState(true);

  console.log(messages);
  const handleChangeInput = (e) => {
    setMessage(e.target.value);
  };
  const updateMessages = (chats) => {
    console.log(chats);
  };
  const sendNewMessage = () => {
    dispatch(sendMessage(currentChat, { message: message, state: "enviado" }));
  };
  useEffect(() => {
    // if (JSON.parse(localStorage.getItem("chats"))) {
    //   if (
    //     !(
    //       JSON.parse(localStorage.getItem("chats"))[
    //         JSON.parse(localStorage.getItem("chats")).length - 2
    //       ].transmitter == currentChat.transmitter &&
    //       JSON.parse(localStorage.getItem("chats"))[
    //         JSON.parse(localStorage.getItem("chats")).length - 2
    //       ].receiver == currentChat.receiver
    //     )
    //   ) {
    //     console.log(JSON.parse(localStorage.getItem("chats")));
    //     console.log(currentChat);
    //     console.log("entro aqui :v xddddddddd");
    //   } else {
    //     console.log("Ahora esta aqui :'VVVVVV");
    //     dispatch(
    //       bringMessages(JSON.parse(localStorage.getItem("chats")), currentChat)
    //     );
    //   }
    // }

    if (
      startMessage ||
      (JSON.parse(localStorage.getItem("chats"))[
        JSON.parse(localStorage.getItem("chats")).length - 2
      ].transmitter == currentChat.transmitter &&
        JSON.parse(localStorage.getItem("chats"))[
          JSON.parse(localStorage.getItem("chats")).length - 2
        ].receiver == currentChat.receiver)
    ) {
      if (JSON.parse(localStorage.getItem("chats"))) {
        console.log("si esta entrando");
        dispatch(
          updateChat(JSON.parse(localStorage.getItem("chats")), currentChat)
        );
      } else {
        dispatch(updateChat([], currentChat));
      }
    } else {
      console.log("se actualiza");
      if (JSON.parse(localStorage.getItem("chats"))) {
        console.log("si esta entrando");
        dispatch(
          updateChat(JSON.parse(localStorage.getItem("chats")), currentChat)
        );
      } else {
        dispatch(updateChat([], currentChat));
      }
      const chats = JSON.parse(localStorage.getItem("chats"));
      console.log(chats);
    }
    setStartMessage(false);
  }, [messages.length]);
  return (
    <ChatContainer>
      <ChatHeader>
        <h1>{chatName}</h1>
      </ChatHeader>
      <ChatMessages>
        {messages &&
          messages.map((message, index) => (
            <div key={index}>{message.message}</div>
          ))}
      </ChatMessages>
      <ChatFooter>
        <ChatInput onChange={(e) => handleChangeInput(e)} />
        <SendIcon onClick={() => sendNewMessage()} />
      </ChatFooter>
    </ChatContainer>
  );
}

export default Chat;
