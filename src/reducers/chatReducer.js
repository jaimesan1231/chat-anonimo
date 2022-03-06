import { combineReducers } from "redux";

const currentChat = {
  transmitter: "",
  receiver: "",
  chatName: "",
  messages: [],
};
const allChats = {
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

    default: {
      return state;
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
