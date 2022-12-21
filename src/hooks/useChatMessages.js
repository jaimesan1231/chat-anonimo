import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addMessage,
  startGroupChat,
  startNewChat,
} from "../redux/slices/currentChat";

export const useChatMessages = () => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState([]);

  const updateCurrentReceiverChatMessages = () => {
    const chats = JSON.parse(localStorage.getItem("chats"));
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const ultimoChat = chats[chats.length - 1];
    const chatToUpdate = chats.filter(
      (chat) =>
        chat.transmitter === currentUser.id &&
        chat.receiver === ultimoChat.transmitter
    );
    if (chatToUpdate.length !== 0) {
      if (
        JSON.parse(sessionStorage.getItem("currentChat")).transmitter ===
          chatToUpdate[0].transmitter &&
        JSON.parse(sessionStorage.getItem("currentChat")).receiver ===
          chatToUpdate[0].receiver
      ) {
        if (chatToUpdate[0].messages.length > 0) {
          dispatch(addMessage(chatToUpdate[0].messages));
        }
      }
    }
  };
  const startChat = (currentChat, transmitter, receiver, chatName) => {
    if (receiver !== currentChat.receiver) {
      const currentChats = [];
      const allChats = JSON.parse(localStorage.getItem("chats"));
      if (allChats) {
        currentChats.push(...allChats);
      }
      const chatIds = currentChats.map((chat) => {
        return { transmitter: chat.transmitter, receiver: chat.receiver };
      });
      if (
        chatIds.filter(
          (chat) =>
            chat.transmitter === transmitter && chat.receiver === receiver
        ).length > 0
      ) {
        currentChats.forEach((chat) => {
          if (chat.transmitter === transmitter && chat.receiver === receiver) {
            dispatch(
              startNewChat({
                transmitter: chat.transmitter,
                receiver: chat.receiver,
                chatName: chat.chatName,
                messages: chat.messages,
              })
            );
          }
        });
      } else {
        dispatch(
          startNewChat({
            transmitter,
            receiver,
            chatName,
            messages: [],
          })
        );
      }
    }
  };
  useEffect(() => {
    if (newMessage.length !== 0) {
      dispatch(addMessage(newMessage));
    }
  }, [newMessage]);
  const updateChatMessages = (currentChat, message) => {
    const chats = JSON.parse(localStorage.getItem("chats"));
    const groupChats = JSON.parse(localStorage.getItem("groupChats"));
    if (currentChat.id) {
      const groupChatSendMessage = groupChats.filter(
        (chat) => chat.id === currentChat.id
      );
      if (groupChatSendMessage[0].messages) {
        setNewMessage([...groupChatSendMessage[0].messages, message]);
      } else {
        setNewMessage([message]);
      }
    } else {
      const chatSendMessage = chats.filter(
        (chat) =>
          chat.transmitter === currentChat.transmitter &&
          chat.receiver === currentChat.receiver
      );
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      let activeChats = [];
      if (JSON.parse(sessionStorage.getItem("activeChats")) !== null) {
        activeChats = JSON.parse(sessionStorage.getItem("activeChats"));
      }
      if (currentChat.transmitter === currentUser.id) {
        if (
          activeChats.filter((chat) => chat.receiver === currentChat.receiver)
            .length === 0
        ) {
          activeChats.push(currentChat);
        }
      }
      sessionStorage.setItem("activeChats", JSON.stringify(activeChats));
      setNewMessage([...chatSendMessage[0].messages, message]);
    }
  };
  const startNewGroupChat = (id) => {
    const groupChats = JSON.parse(localStorage.getItem("groupChats"));
    const currentChat = groupChats.filter((item) => item.id === id)[0];
    dispatch(
      startGroupChat({
        id: currentChat.id,
        category: currentChat.category,
        chatName: currentChat.chatName,
        messages: currentChat.messages,
      })
    );
  };

  return {
    newMessage,
    updateChatMessages,
    startChat,
    updateCurrentReceiverChatMessages,
    startNewGroupChat,
  };
};
