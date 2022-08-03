import { createSlice } from "@reduxjs/toolkit";

const themeDefault = {
  theme: "light",
  main: "#1e88e5",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: themeDefault,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    changeMain: (state, action) => {
      state.main = action.payload;
    },
  },
});

export const { changeMain, changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
