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
    console.log(JSON.parse(localStorage.getItem("chats")));
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const ultimoChat = chats[chats.length - 1];
    console.log(ultimoChat);
    const chatToUpdate = chats.filter((chat) => {
      if (
        chat.transmitter == currentUser.id &&
        chat.receiver == ultimoChat.transmitter
      ) {
        return chat;
      }
    });
    console.log(chatToUpdate);

    if (chatToUpdate.length != 0) {
      if (
        JSON.parse(sessionStorage.getItem("currentChat")).transmitter ==
          chatToUpdate[0].transmitter &&
        JSON.parse(sessionStorage.getItem("currentChat")).receiver ==
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
        console.log("Si hay");
        console.log(allChats);
        currentChats.push(...allChats);
      }
      console.log(allChats);
      const chatIds = currentChats.map((chat) => {
        return { transmitter: chat.transmitter, receiver: chat.receiver };
      });
      console.log(chatIds);
      console.log(receiver);
      if (
        chatIds.filter(
          (chat) => chat.transmitter == transmitter && chat.receiver == receiver
        ).length > 0
      ) {
        console.log(receiver);
        console.log("Existe");
        currentChats.map((chat) => {
          console.log(chat);
          if (chat.transmitter == transmitter && chat.receiver == receiver) {
            console.log("coincidio");
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
        console.log("No coincide");
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
    console.log(newMessage);
    if (newMessage.length != 0) {
      console.log(newMessage);
      dispatch(addMessage(newMessage));
    }

    // if (currentChat.id) {
    //   dispatch(
    //     updateGroupChat(
    //       JSON.parse(localStorage.getItem("groupChats")),
    //       currentChat
    //     )
    //   );
    // } else {
    //   if (JSON.parse(localStorage.getItem("chats"))) {
    //     console.log("si esta entrando");
    //     dispatch(
    //       updateChat(JSON.parse(localStorage.getItem("chats")), currentChat)
    //     );
    //   } else {
    //     dispatch(updateChat([], currentChat));
    //   }
    // }

    // messagesEndRef.current?.scrollIntoView();
  }, [newMessage]);
  const updateChatMessages = (currentChat, message) => {
    console.log(currentChat);
    console.log(message);
    const chats = JSON.parse(localStorage.getItem("chats"));
    const groupChats = JSON.parse(localStorage.getItem("groupChats"));
    if (currentChat.id) {
      const groupChatSendMessage = groupChats.filter(
        (chat) => chat.id == currentChat.id
      );
      console.log(groupChatSendMessage[0]);
      if (groupChatSendMessage[0].messages) {
        setNewMessage([...groupChatSendMessage[0].messages, message]);
      } else {
        setNewMessage([message]);
      }
    } else {
      console.log(chats);
      console.log(currentChat);
      console.log(chats[chats.length - 1].messages);
      const chatSendMessage = chats.filter(
        (chat) =>
          chat.transmitter == currentChat.transmitter &&
          chat.receiver == currentChat.receiver
      );
      console.log(chatSendMessage);
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      let activeChats = [];
      if (JSON.parse(sessionStorage.getItem("activeChats")) !== null) {
        activeChats = JSON.parse(sessionStorage.getItem("activeChats"));
      }
      if (currentChat.transmitter == currentUser.id) {
        if (
          activeChats.filter((chat) => chat.receiver == currentChat.receiver)
            .length == 0
        ) {
          activeChats.push(currentChat);
        }
      }
      sessionStorage.setItem("activeChats", JSON.stringify(activeChats));

      // console.log(activeChats);
      // if (activeChats.length > 0) {
      //   console.log(activeChats);
      //   const activechats = [...activeChats];
      //   if (
      //     activeChats.filter(
      //       (chat) =>
      //         chat.transmitter == currentChat.transmitter &&
      //         chat.receiver == currentChat.receiver
      //     ).length > 0
      //   ) {
      //   } else {
      //     activechats.push(currentChat);
      //     sessionStorage.setItem("activeChats", JSON.stringify(activechats));
      //   }
      // } else {
      //   console.log("2");
      //   const activechats = [];
      //   activechats.push(currentChat);
      //   sessionStorage.setItem("activeChats", JSON.stringify(activechats));
      // }
      setNewMessage([...chatSendMessage[0].messages, message]);
    }
  };
  const startNewGroupChat = (id) => {
    const groupChats = JSON.parse(localStorage.getItem("groupChats"));
    console.log(groupChats);
    console.log(id);
    const currentChat = groupChats.filter((item) => item.id == id)[0];
    console.log(currentChat);
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
