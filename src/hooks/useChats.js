import { useState } from "react";

export const useChats = (initialChats) => {
 
  const [chats, setChats] = useState(initialChats);

  chats == null && setChats([]);
  if (initialChats == null) {
    initialChats = [];
  }

  const updateReceiverChat = (currentChat) => {
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
     
      return newChatReceived;
    } else {
      

      const newChatReceived = {
        transmitter: currentChat.receiver,
        receiver: currentChat.transmitter,
        chatName: JSON.parse(sessionStorage.getItem("currentUser")).name,
        messages: currentChat.messages,
      };
 
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


      const newChatSent = {
        ...chat[0],
        messages: currentChat.messages,
      };
  
      return newChatSent;
    } else {
      const newChatSent = {
        transmitter: currentChat.transmitter,
        receiver: currentChat.receiver,
        chatName: currentChat.chatName,
        messages: currentChat.messages,
      };


      return newChatSent;
    }
  };
  const updateChats = (currentChat) => {
    if (currentChat.id) {
      const groupChats = JSON.parse(localStorage.getItem("groupChats"));
     
      const chatFilter = groupChats.filter(
        (chat) => chat.id !== currentChat.id
      );
      chatFilter.push(currentChat);
      localStorage.setItem("groupChats", JSON.stringify(chatFilter));
    } else {

      const chatFilter = initialChats.filter(
        (item) =>
          !(
            item.receiver === currentChat.receiver &&
            item.transmitter === currentChat.transmitter
          )
      );

      const chatFilter2 = initialChats.filter(
        (item) =>
          !(
            item.receiver === currentChat.receiver &&
            item.transmitter === currentChat.transmitter
          )
      );
      const newChats = chatFilter2.filter(
        (item) =>
          !(
            item.receiver === currentChat.transmitter &&
            item.transmitter === currentChat.receiver
          )
      );
      const chatReceived = updateReceiverChat(currentChat);
      const chatSent = updateSenderChat(currentChat);
      newChats.push(chatReceived);
      newChats.push(chatSent);
      localStorage.setItem("chats", JSON.stringify(newChats));
      setChats(newChats);
    }
  };
  return { chats, updateChats };
};
