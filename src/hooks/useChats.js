import { useState } from "react";

export const useChats = (initialChats) => {
  console.log(initialChats);
  const [chats, setChats] = useState(initialChats);

  chats == null && setChats([]);
  if (initialChats == null) {
    initialChats = [];
  }
  console.log(initialChats);
  const updateReceiverChat = (currentChat) => {
    console.log(chats);
    console.log(currentChat);
    const chat = initialChats.filter(
      (item) =>
        item.receiver === currentChat.transmitter &&
        item.transmitter === currentChat.receiver
    );
    if (chat.length > 0) {
      const newChatReceived = {
        ...chat[0],
        messages: currentChat.messages,
      };
      console.log(newChatReceived);
      return newChatReceived;
    } else {
      console.log("nuevo chat receptor creado");

      const newChatReceived = {
        transmitter: currentChat.receiver,
        receiver: currentChat.transmitter,
        chatName: JSON.parse(sessionStorage.getItem("currentUser")).name,
        messages: currentChat.messages,
      };
      console.log(newChatReceived);
      return newChatReceived;
    }
  };
  const updateSenderChat = (currentChat) => {
    const chat = initialChats.filter(
      (item) =>
        item.receiver === currentChat.receiver &&
        item.transmitter === currentChat.transmitter
    );
    if (chat.length > 0) {
      console.log("Existe ya");

      const newChatSent = {
        ...chat[0],
        messages: currentChat.messages,
      };
      console.log(newChatSent);
      return newChatSent;
    } else {
      const newChatSent = {
        transmitter: currentChat.transmitter,
        receiver: currentChat.receiver,
        chatName: currentChat.chatName,
        messages: currentChat.messages,
      };
      console.log("No existe a huevo");

      return newChatSent;
    }
  };
  const updateChats = (currentChat) => {
    if (currentChat.id) {
      const groupChats = JSON.parse(localStorage.getItem("groupChats"));
      console.log(groupChats);
      const chatFilter = groupChats.filter(
        (chat) => chat.id !== currentChat.id
      );
      chatFilter.push(currentChat);
      localStorage.setItem("groupChats", JSON.stringify(chatFilter));
    } else {
      console.log(chats);
      const chatFilter = initialChats.filter(
        (item) =>
          !(
            item.receiver === currentChat.receiver &&
            item.transmitter === currentChat.transmitter
          )
      );
      console.log(chatFilter);

      const chatFilter2 = initialChats.filter(
        (item) =>
          !(
            item.receiver === currentChat.receiver &&
            item.transmitter === currentChat.transmitter
          )
      );
      console.log(chatFilter2);
      const newChats = chatFilter2.filter(
        (item) =>
          !(
            item.receiver === currentChat.transmitter &&
            item.transmitter === currentChat.receiver
          )
      );
      console.log(JSON.parse(sessionStorage.getItem("currentUser")).name);
      const chatReceived = updateReceiverChat(currentChat);
      const chatSent = updateSenderChat(currentChat);
      console.log(newChats);
      newChats.push(chatReceived);
      newChats.push(chatSent);
      console.log(newChats);
      localStorage.setItem("chats", JSON.stringify(newChats));
      setChats(newChats);
    }
  };
  return { chats, updateChats };
};
