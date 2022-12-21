import Chat from "./Components/Chat/Chat";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import { GlobalStyle } from "./GlobalStyle";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lighTheme } from "./themes";
import { useUserList } from "./hooks/useUserList";
import { useChatMessages } from "./hooks/useChatMessages";

function App() {
  const currentChat = useSelector((state) => state.currentChat);
  const theme = useSelector((state) => state.theme);
  const { userList, updateUserList, createUserList } = useUserList();
  const { updateCurrentReceiverChatMessages } = useChatMessages();
  useEffect(() => {
    createUserList();
    window.addEventListener(
      "storage",
      (e) => {
        if (e.key === "users") {
          updateUserList(JSON.parse(localStorage.getItem("users")));
        }
        if (e.key === "chats") {
          console.log("se cambioaron chats");
          updateCurrentReceiverChatMessages();
        }
      },
      false
    );
  }, []);

  return (
    <>
      <ThemeProvider
        theme={
          theme.theme === "light"
            ? { ...lighTheme, main: theme.main }
            : { ...darkTheme, main: theme.main }
        }
      >
        <GlobalStyle />
        <Header />
        <Sidebar userList={userList} />
        {currentChat.chatName !== "" && (
          <Chat chatName={currentChat.chatName} />
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
