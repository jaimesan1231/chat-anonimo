import { combineReducers } from "redux";

const currentChat = {
  id: "",
  transmitter: "",
  receiver: "",
  chatName: "",
  messages: [],
  category: "",
};
const currentGroupChat = {
  id: "",
  chatName: "",
  messages: [],
  category: "",
};
const allChats = {
  chats: [],
};
const groupChats = {
  chats: [],
};

export const currentChatReducer = (state = currentChat, action) => {
  switch (action.type) {
    case "START_CHAT": {
      return {
        transmitter: action.payloadTransmitter,
        receiver: action.payloadReceiver,
        chatName: action.payloadChatName,
        messages: action.payloadMessages,
      };
    }
    case "SEND_MESSAGE": {
      return {
        ...state,
        messages: [...action.payload],
      };
    }
    case "RECEIVE_MESSAGE": {
      return {
        ...state,
        messages: action.payload,
      };
    }
    case "START_GROUP_CHAT": {
      return {
        id: action.payloadID,
        category: action.payloadCategory,
        chatName: action.payloadChatName,
        messages: action.payloadMessages,
      };
    }

    default: {
      return state;
    }
  }
};

export const currentGroupChatReducer = (state = currentGroupChat, action) => {
  switch (action.type) {
    case "START_CHAT": {
      return {
        id: action.payloadID,
        chatName: action.payloadChatName,
        messages: action.payloadMessages,
        category: action.payloadCategory,
      };
    }
  }
};

export const groupChatReducer = (state = groupChats, action) => {
  switch (action.type) {
    case "ADD_CHAT": {
      return {
        chats: [...state.chats, action.payload],
      };
    }
  }
};
const allChatsReducer = (state = allChats, action) => {
  switch (action.type) {
    case "ADD_CHAT": {
      return {
        chats: [...state.chats, action.payload],
      };
    }
    case "UPDATE_CHAT": {
      return {
        chats: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const chatReducer = combineReducers({
  currentChat: currentChatReducer,
  allChats: allChatsReducer,
});
