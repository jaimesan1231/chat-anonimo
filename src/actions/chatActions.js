export const startNewChat = (transmitterId, receiverId, chatName, messages) => {
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
  const chats = JSON.parse(localStorage.getItem("chats"));
  const groupChats = JSON.parse(localStorage.getItem("groupChats"));
  if (currentChat.id) {
    const groupChatSendMessage = groupChats.filter(
      (chat) => chat.id === currentChat.id
    );
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
  const chatSendMessage = chats.filter(
    (chat) =>
      chat.transmitter === currentChat.transmitter &&
      chat.receiver === currentChat.receiver
  );
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const activeChats = JSON.parse(sessionStorage.getItem("activeChats"));
  if (activeChats) {
    const activechats = activeChats.filter(
      (chat) => chat.transmitter === currentUser.id
    );
    if (
      activeChats.filter(
        (chat) =>
          chat.transmitter === currentChat.transmitter &&
          chat.receiver === currentChat.receiver
      ).length > 0
    ) {
    } else {
      activechats.push(currentChat);
      sessionStorage.setItem("activeChats", JSON.stringify(activechats));
    }
  } else {
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
  return {
    type: "RECEIVE_MESSAGE",
    payload: message,
  };
};

export const addChat = (chat) => {
  return {
    type: "ADD_CHAT",
    payload: chat,
  };
};
export const updateChat = (chats, currentChat) => {
  if (chats.length === 0) {
    localStorage.setItem("chats", JSON.stringify([currentChat]));
  }
  const chatFilter = chats.filter(
    (item) =>
      !(
        item.receiver === currentChat.receiver &&
        item.transmitter === currentChat.transmitter
      )
  );
  const newChats = chatFilter.filter(
    (item) =>
      !(
        item.receiver === currentChat.transmitter &&
        item.transmitter === currentChat.receiver
      )
  );
  if (
    chats.filter(
      (item) =>
        item.receiver === currentChat.transmitter &&
        item.transmitter === currentChat.receiver
    ).length > 0
  ) {
    const chatReceived = chats.filter(
      (item) =>
        item.receiver === currentChat.transmitter &&
        item.transmitter === currentChat.receiver
    );
    const newChatReceived = {
      ...chatReceived[0],
      messages: currentChat.messages,
    };

    newChats.push(newChatReceived);
  } else {
    const chatReceived = {
      transmitter: currentChat.receiver,
      receiver: currentChat.transmitter,
      chatName: JSON.parse(sessionStorage.getItem("currentUser")).name,
      messages: currentChat.messages,
    };
    newChats.push(chatReceived);
  }
  if (
    chats.filter(
      (item) =>
        item.receiver === currentChat.receiver &&
        item.transmitter === currentChat.transmitter
    ).length > 0
  ) {
    const chatReceived = chats.filter(
      (item) =>
        item.receiver === currentChat.receiver &&
        item.transmitter === currentChat.transmitter
    );
    const newChatReceived = {
      ...chatReceived[0],
      messages: currentChat.messages,
    };
    newChats.push(newChatReceived);
    localStorage.setItem("chats", JSON.stringify(newChats));
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
    newChats.push(chatReceived);
    localStorage.setItem("chats", JSON.stringify(newChats));
    return {
      type: "UPDATE_CHAT",
      payload: newChats,
    };
  }
};

export const updateGroupChat = (chats, currentChat) => {
  const newChats = chats.filter((chat) => chat.id !== currentChat.id);
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
