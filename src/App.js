import Chat from "./Components/Chat/Chat";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import { GlobalStyle } from "./GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  addChat,
  receiveMessage,
  sendMessage,
  updateChat,
} from "./actions/chatActions";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lighTheme } from "./themes";

function App() {
  const dispatch = useDispatch();
  const currentChat = useSelector((state) => state.currentChat);
  const theme = useSelector((state) => state.theme);
  console.log(theme);
  console.log(currentChat);
  const usuario = localStorage.getItem("users");
  console.log(JSON.parse(usuario));
  sessionStorage.setItem("currentChat", JSON.stringify(currentChat));
  const [userList, setUserList] = useState([]);
  const updateList = (list) => {
    console.log("se actualizo lista");
    setUserList(list);
  };
  useEffect(() => {
    if (usuario != null) {
      console.log("1");
      const usuarios = [
        ...JSON.parse(usuario),
        { id: JSON.parse(usuario).length + 1, name: "Anonimo" },
      ];
      console.log(usuarios);
      setUserList(usuarios);
      localStorage.setItem("users", JSON.stringify(usuarios));
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify(usuarios[usuarios.length - 1])
      );
      console.log(sessionStorage.getItem("currentUser"));
    } else {
      const usuarios = [{ id: 1, name: "Anonimo" }];
      console.log("2");
      localStorage.setItem("users", JSON.stringify(usuarios));
      sessionStorage.setItem("currentUser", JSON.stringify(...usuarios));
      console.log(localStorage.getItem("usuarios"));
    }
    window.addEventListener(
      "storage",
      (e) => {
        if (e.key == "users") {
          updateList(JSON.parse(localStorage.getItem("users")));
        }
        if (e.key == "chats") {
          const chats = JSON.parse(localStorage.getItem("chats"));
          console.log(chats);
          const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
          const currentUserMessages = chats.filter((chat) => {
            if (chat.receiver == currentUser.id) {
              return chat;
            }
          });
          const ultimoChat = chats[chats.length - 1];
          console.log(ultimoChat);
          const chatToUpdate = chats.filter((chat) => {
            if (
              chat.transmitter == currentUser.id &&
              chat.receiver == ultimoChat.transmitter
            ) {
              return chat;
            }
          });
          console.log(chatToUpdate);

          const newChat = {
            transmitter: ultimoChat.receiver,
            receiver: ultimoChat.transmitter,
            chatName: "ANOnimo",
            messages: [],
          };
          console.log(ultimoChat);
          console.log(newChat);
          console.log("entro aqui wtf");

          console.log(currentUser);
          console.log(currentChat);
          console.log(currentUserMessages);
          console.log(currentUserMessages[0].messages);
          console.log(JSON.parse(sessionStorage.getItem("currentChat")));
          console.log(sessionStorage.getItem("currentChat"));
          if (
            JSON.parse(sessionStorage.getItem("currentChat")).transmitter ==
              chatToUpdate[0].transmitter &&
            JSON.parse(sessionStorage.getItem("currentChat")).receiver ==
              chatToUpdate[0].receiver
          ) {
            if (chatToUpdate[0].messages.length > 0) {
              console.log(currentChat);
              dispatch(receiveMessage(chatToUpdate[0].messages));
            }
          }
        }
      },
      false
    );
  }, []);

  return (
    <>
      <ThemeProvider
        theme={
          theme.theme == "light"
            ? { ...lighTheme, main: theme.main }
            : { ...darkTheme, main: theme.main }
        }
      >
        <GlobalStyle />
        <Header />
        <Sidebar userList={userList} />
        {currentChat.receiver !== "" && (
          <Chat chatName={currentChat.chatName} />
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
