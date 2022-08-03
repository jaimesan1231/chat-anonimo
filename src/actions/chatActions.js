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

export const sendMessage = (currentChat, message) => {
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
      return {
        type: "SEND_MESSAGE",
        payload: [...groupChatSendMessage[0].messages, message],
      };
    } else {
      return {
        type: "SEND_MESSAGE",
        payload: [message],
      };
    }
  }

  console.log(chats);
  console.log(chats[chats.length - 1]);
  console.log(chats[chats.length - 1].messages);
  const chatSendMessage = chats.filter(
    (chat) =>
      chat.transmitter == currentChat.transmitter &&
      chat.receiver == currentChat.receiver
  );
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const activeChats = JSON.parse(sessionStorage.getItem("activeChats"));
  if (activeChats) {
    console.log("1");
    const activechats = activeChats.filter(
      (chat) => chat.transmitter == currentUser.id
    );
    if (
      activeChats.filter(
        (chat) =>
          chat.transmitter == currentChat.transmitter &&
          chat.receiver == currentChat.receiver
      ).length > 0
    ) {
    } else {
      activechats.push(currentChat);
      sessionStorage.setItem("activeChats", JSON.stringify(activechats));
    }
  } else {
    console.log("2");
    const activechats = [];
    activechats.push(currentChat);
    sessionStorage.setItem("activeChats", JSON.stringify(activechats));
  }

  return {
    type: "SEND_MESSAGE",
    payload: [...chatSendMessage[0].messages, message],
  };
};

export const receiveMessage = (message) => {
  const chats = JSON.parse(localStorage.getItem("chats"));
  console.log(chats);
  console.log(message);
  const messageReceived = message[message.length - 1];

  return {
    type: "RECEIVE_MESSAGE",
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

export const updateGroupChat = (chats, currentChat) => {
  const newChats = chats.filter((chat) => chat.id !== currentChat.id);
  console.log(newChats);
  newChats.push(currentChat);
  localStorage.setItem("groupChats", JSON.stringify(newChats));
  return {
    type: "UPDATE_CHAT",
    payload: newChats,
  };
};

export const startNewGroupChat = (id, category, chatName, messages) => {
  if (!messages) {
    messages = [];
  }
  console.log(chatName);
  return {
    type: "START_GROUP_CHAT",
    payloadID: id,
    payloadCategory: category,
    payloadChatName: chatName,
    payloadMessages: messages,
  };
};

export const changeTheme = (theme) => {
  return {
    type: "CHANGE_THEME",
    payload: theme,
  };
};
export const changeMain = (main) => {
  return {
    type: "CHANGE_MAIN",
    payload: main,
  };
};
