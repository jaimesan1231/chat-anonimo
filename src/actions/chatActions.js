export const startNewChat = (transmitterId, receiverId, chatName, messages) => {
  console.log(messages);
  if (!messages) {
    messages = [];
  }
  return {
    type: "START_CHAT",
    payloadTransmitter: transmitterId,
    payloadReceiver: receiverId,
    payloadChatName: chatName,
    payloadMessages: messages,
  };
};

//traer mensajes
export const bringMessages = (chats, currentChat) => {
  console.log(chats);
  if (chats.length == 0) {
    console.log("entro aqui");
    localStorage.setItem("chats", JSON.stringify([currentChat]));
  }
  const currentChats = JSON.parse(localStorage.getItem("chats"));
  console.log(currentChats);

  const chatIds = currentChats.map((chat) => {
    return { transmitterId: chat.transmitter, receiverId: chat.receiver };
  });

  console.log(chatIds);
  console.log(currentChat);
  console.log(chats);
  const chatFilter = chats.filter(
    (item) =>
      !(
        item.receiver == currentChat.receiver &&
        item.transmitter == currentChat.transmitter
      )
  );
  const newChats = chatFilter.filter(
    (item) =>
      !(
        item.receiver == currentChat.transmitter &&
        item.transmitter == currentChat.receiver
      )
  );

  console.log(JSON.parse(sessionStorage.getItem("currentUser")).name);
  console.log(chatFilter);
  console.log(newChats);

  if (
    chats.filter(
      (item) =>
        item.receiver == currentChat.transmitter &&
        item.transmitter == currentChat.receiver
    ).length > 0
  ) {
    const chatReceived = chats.filter(
      (item) =>
        item.receiver == currentChat.transmitter &&
        item.transmitter == currentChat.receiver
    );

    newChats.push(...chatReceived);
  } else {
    console.log("nuevo chat receptor creado");

    const chatReceived = {
      transmitter: currentChat.receiver,
      receiver: currentChat.transmitter,
      chatName: JSON.parse(sessionStorage.getItem("currentUser")).name,
      messages: currentChat.messages,
    };
    console.log(chatReceived);
    newChats.push(chatReceived);
  }
  //parte2
  if (
    chats.filter(
      (item) =>
        item.receiver == currentChat.receiver &&
        item.transmitter == currentChat.transmitter
    ).length > 0
  ) {
    const chatReceived = chats.filter(
      (item) =>
        item.receiver == currentChat.receiver &&
        item.transmitter == currentChat.transmitter
    );
    console.log(chatReceived);
    newChats.push(...chatReceived);
    console.log("Existe ya");
    localStorage.setItem("chats", JSON.stringify(newChats));
    console.log(newChats);
    return {
      type: "UPDATE_CHAT",
      payload: newChats,
    };
  } else {
    const chatReceived = {
      transmitter: currentChat.transmitter,
      receiver: currentChat.receiver,
      chatName: currentChat.chatName,
      messages: currentChat.messages,
    };
    console.log(chatReceived);
    newChats.push(chatReceived);
    console.log("No existe a huevo");
    localStorage.setItem("chats", JSON.stringify(newChats));
    console.log(currentChats);
    return {
      type: "UPDATE_CHAT",
      payload: newChats,
    };
  }
};
//fin

export const sendMessage = (currentChat, message) => {
  console.log(currentChat);
  console.log(message);
  const chats = JSON.parse(localStorage.getItem("chats"));
  console.log(chats);
  console.log(chats[chats.length - 1]);
  console.log(chats[chats.length - 1].messages);
  // const newChats = chats.filter(
  //   (chat) =>
  //     !(
  //       chat.transmitter == currentChat.transmitter &&
  //       chat.receiver == currentChat.receiver
  //     )
  // );
  const chatSendMessage = chats.filter(
    (chat) =>
      chat.transmitter == currentChat.transmitter &&
      chat.receiver == currentChat.receiver
  );
  // const chatReceivedMessage = chats.filter(
  //   (chat) =>
  //     chat.transmitter == currentChat.receiver &&
  //     chat.receiver == currentChat.transmitter
  // );
  // console.log(chatReceivedMessage);
  // if (chatReceivedMessage.length == 0) {
  //   const chatReceived = {
  //     transmitter: currentChat.receiver,
  //     receiver: currentChat.transmitter,
  //     chatName: JSON.parse(sessionStorage.getItem("currentUser")).name,
  //     messages: [],
  //   };
  //   console.log(chatReceived);
  //   newChats.push(chatReceived);
  // }

  // console.log(chatSendMessage);
  // console.log(newChats);
  // const newChatUpdated = {
  //   ...chatSendMessage[0],
  //   messages: [...chatSendMessage[0].messages, message],
  // };
  // newChats.push(newChatUpdated);
  // console.log(newChatUpdated);
  return {
    type: "SEND_MESSAGE",
    payload: [...chatSendMessage[0].messages, message],
  };
};

export const receiveMessage = (message) => {
  // console.log(currentChat);
  const chats = JSON.parse(localStorage.getItem("chats"));
  console.log(chats);
  console.log(message);
  const messageReceived = message[message.length - 1];
  // const chatReceivedMessage = chats.filter(
  //   (chat) =>
  //     chat.transmitter == currentChat.transmitter &&
  //     chat.receiver == currentChat.receiver
  // );
  // console.log(chatReceivedMessage);
  // console.log({ ...messageReceived, state: "recibido" });
  return {
    type: "RECEIVE_MESSAGE",
    // payload: [...chatReceivedMessage[0].messages, messageReceived],
    payload: message,
  };
};

export const addChat = (chat) => {
  console.log(chat);
  return {
    type: "ADD_CHAT",
    payload: chat,
  };
};
export const updateChat = (chats, currentChat) => {
  console.log(chats);
  if (chats.length == 0) {
    console.log("entro aqui");
    localStorage.setItem("chats", JSON.stringify([currentChat]));
  }
  const currentChats = JSON.parse(localStorage.getItem("chats"));
  console.log(currentChats);

  const chatIds = currentChats.map((chat) => {
    return { transmitterId: chat.transmitter, receiverId: chat.receiver };
  });

  console.log(chatIds);
  console.log(currentChat);
  console.log(chats);
  const chatFilter = chats.filter(
    (item) =>
      !(
        item.receiver == currentChat.receiver &&
        item.transmitter == currentChat.transmitter
      )
  );
  const newChats = chatFilter.filter(
    (item) =>
      !(
        item.receiver == currentChat.transmitter &&
        item.transmitter == currentChat.receiver
      )
  );

  console.log(JSON.parse(sessionStorage.getItem("currentUser")).name);
  console.log(chatFilter);
  console.log(newChats);

  if (
    chats.filter(
      (item) =>
        item.receiver == currentChat.transmitter &&
        item.transmitter == currentChat.receiver
    ).length > 0
  ) {
    const chatReceived = chats.filter(
      (item) =>
        item.receiver == currentChat.transmitter &&
        item.transmitter == currentChat.receiver
    );
    const newChatReceived = {
      ...chatReceived[0],
      messages: currentChat.messages,
    };
    // if (currentChat.messages.length > 0) {
    //   console.log(chatReceived);
    //   const messagesReceived = currentChat.messages;
    //   console.log(messagesReceived);
    //   const newMessagesReceived = messagesReceived.map((message, index) => {
    //     console.log(index);
    //     if (index == messagesReceived.length - 1) {
    //       return {
    //         ...message,
    //         state: "recibido",
    //       };
    //     } else {
    //       return chatReceived[0].messages[index];
    //     }
    //   });
    //   console.log(newMessagesReceived);
    //   const newChatReceived = {
    //     ...chatReceived[0],
    //     messages: [...newMessagesReceived],
    //   };
    //   newChats.push(newChatReceived);
    //   console.log(newChatReceived);
    // } else {
    //   const newChatReceived = {
    //     ...chatReceived[0],
    //     messages: [...chatReceived[0].messages],
    //   };
    //   console.log(newChatReceived);
    //   newChats.push(newChatReceived);
    // }
    newChats.push(newChatReceived);
  } else {
    console.log("nuevo chat receptor creado");

    const chatReceived = {
      transmitter: currentChat.receiver,
      receiver: currentChat.transmitter,
      chatName: JSON.parse(sessionStorage.getItem("currentUser")).name,
      messages: currentChat.messages,
    };
    console.log(chatReceived);
    newChats.push(chatReceived);
  }
  //parte2
  if (
    chats.filter(
      (item) =>
        item.receiver == currentChat.receiver &&
        item.transmitter == currentChat.transmitter
    ).length > 0
  ) {
    console.log("Existe ya");
    const chatReceived = chats.filter(
      (item) =>
        item.receiver == currentChat.receiver &&
        item.transmitter == currentChat.transmitter
    );
    const newChatReceived = {
      ...chatReceived[0],
      messages: currentChat.messages,
    };
    newChats.push(newChatReceived);
    // if (currentChat.messages.length > 0) {
    //   const newChatReceived = {
    //     ...chatReceived[0],
    //     messages: [...currentChat.messages],
    //   };
    //   newChats.push(newChatReceived);
    //   console.log(newChatReceived);
    // } else {
    //   const newChatReceived = {
    //     ...chatReceived[0],
    //     messages: [...chatReceived[0].messages],
    //   };
    //   console.log(newChatReceived);
    //   newChats.push(newChatReceived);
    // }
    localStorage.setItem("chats", JSON.stringify(newChats));
    console.log(newChats);
    return {
      type: "UPDATE_CHAT",
      payload: newChats,
    };
  } else {
    const chatReceived = {
      transmitter: currentChat.transmitter,
      receiver: currentChat.receiver,
      chatName: currentChat.chatName,
      messages: currentChat.messages,
    };
    console.log(chatReceived);
    newChats.push(chatReceived);
    console.log("No existe a huevo");
    localStorage.setItem("chats", JSON.stringify(newChats));
    console.log(currentChats);
    return {
      type: "UPDATE_CHAT",
      payload: newChats,
    };
  }

  //termina Parte 2
};
