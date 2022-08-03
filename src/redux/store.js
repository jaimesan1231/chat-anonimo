import { configureStore } from "@reduxjs/toolkit";
import currentChatReducer from "./slices/currentChat";
import themeReducer from "./slices/themes";

export const store = configureStore({
  reducer: { currentChat: currentChatReducer, theme: themeReducer },
});
