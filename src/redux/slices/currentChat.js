import { createSlice } from "@reduxjs/toolkit";

const currentChat = {
  id: "",
  transmitter: "",
  receiver: "",
  chatName: "",
  messages: [],
  category: "",
};
export const currentChatSlice = createSlice({
  name: "currentChat",
  initialState: currentChat,
  reducers: {
    startNewChat: (state, action) => {
      if (!action.payload.messages) {
        state.messages = [];
        console.log("no hay mensajes");
      } else {
        state.messages = action.payload.messages;
      }
      state.transmitter = action.payload.transmitter;
      state.receiver = action.payload.receiver;
      state.chatName = action.payload.chatName;
      state.id = "";
    },
    addMessage: (state, action) => {
      state.messages = action.payload;
    },
    startGroupChat: (state, action) => {
      state.id = action.payload.id;
      state.category = action.payload.category;
      state.chatName = action.payload.chatName;
      if (!action.payload.messages) {
        state.messages = [];
      } else {
        state.messages = action.payload.messages;
      }
      state.transmitter = "";
      state.receiver = "";
    },
  },
});

export const { startNewChat, addMessage, startGroupChat } =
  currentChatSlice.actions;
export default currentChatSlice.reducer;
