import { createStore } from "redux";
import { chatReducer } from "../reducers/chatReducer";

export const store = createStore(chatReducer);
