import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Users,
  SidebarContainer,
  CategoryGroups,
  SidebarSwitch,
  ActiveChats,
  ChatList,
  StyledModal,
  GroupChatList,
  GroupChats,
  ButtonContainer,
  AddChatButton,
} from "./SidebarElements";
import PersonIcon from "@mui/icons-material/Person";
import { startNewChat, startNewGroupChat } from "../../actions/chatActions";
import FormAddChat from "../FormAddChat/FormAddChat";

function Sidebar({ userList }) {
  const dispatch = useDispatch();
  const [chatList, setChatList] = useState([]);
  const [sidebarState, setSidebarState] = useState("users");
  const [modal, setModal] = useState(true);

  const users = JSON.parse(localStorage.getItem("users"));
  const groupChats = JSON.parse(localStorage.getItem("groupChats"));
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const activeChats = JSON.parse(sessionStorage.getItem("activeChats"));
  console.log(currentUser);
  useEffect(() => {
    if (userList != null && currentUser != null) {
      console.log(userList);
      const otherUsers = userList.filter((user) => {
        console.log(user.id);
        console.log(sessionStorage.getItem("currentUser"));
        if (user.id !== currentUser.id) {
          console.log(user.id);
          console.log(currentUser);
          console.log("no coincidio");
          return user;
        }
      });
      console.log(otherUsers);
      setChatList(otherUsers);
      console.log(chatList);
    }
  }, [userList]);
  const startChat = (transmitterId, receiverId, chatName) => {
    const currentChats = [];
    const allChats = JSON.parse(localStorage.getItem("chats"));
    if (allChats) {
      console.log("Si hay");
      console.log(allChats);
      currentChats.push(...allChats);
    }
    console.log(allChats);
    const chatIds = currentChats.map((chat) => {
      return { transmitterId: chat.transmitter, receiverId: chat.receiver };
    });
    console.log(chatIds);
    console.log(receiverId);
    if (
      chatIds.filter(
        (chat) =>
          chat.transmitterId == transmitterId && chat.receiverId == receiverId
      ).length > 0
    ) {
      console.log(receiverId);
      console.log("Existe");
      currentChats.map((chat) => {
        console.log(chat);
        if (chat.transmitter == transmitterId && chat.receiver == receiverId) {
          console.log("coincidio");
          dispatch(
            startNewChat(
              chat.transmitter,
              chat.receiver,
              chat.chatName,
              chat.messages
            )
          );
        }
      });
    } else {
      console.log("No coincide");
      dispatch(startNewChat(transmitterId, receiverId, chatName));
    }
  };
  const startGroupChat = (chatId) => {
    const groupChats = JSON.parse(localStorage.getItem("groupChats"));
    const currentChat = groupChats.filter((item) => item.id == chatId)[0];
    console.log(currentChat);
    dispatch(
      startNewGroupChat(currentChat.id, currentChat.category, currentChat.name)
    );
  };
  const setGroupSidebar = () => {
    setSidebarState("groups");
  };
  const setUserSidebar = () => {
    setSidebarState("users");
  };
  const handleClose = () => {
    setModal(false);
  };
  console.log(chatList);
  return (
    <SidebarContainer>
      <StyledModal
        open={modal}
        children={<FormAddChat handleClose={handleClose} />}
      ></StyledModal>
      <SidebarSwitch>
        <div onClick={setUserSidebar}>Usuarios</div>
        <div onClick={setGroupSidebar}>Grupos</div>
      </SidebarSwitch>
      {sidebarState == "users" ? (
        <>
          <ActiveChats>
            <h3>Chats activos</h3>
            {activeChats &&
              activeChats.map((user) => (
                <ChatList>
                  <li
                    key={user.id}
                    onClick={() =>
                      startChat(currentUser.id, user.receiver, user.name)
                    }
                  >
                    <PersonIcon />
                    {user.chatName}
                  </li>
                </ChatList>
              ))}
          </ActiveChats>
          <Users>
            <h3>Usuarios</h3>
            <ChatList>
              {users != null &&
                chatList.map((user) => (
                  <li
                    key={user.id}
                    onClick={() =>
                      startChat(currentUser.id, user.id, user.name)
                    }
                  >
                    <PersonIcon />
                    {user.name}
                  </li>
                ))}
            </ChatList>
          </Users>
        </>
      ) : (
        <>
          <GroupChats>
            <GroupChatList>
              {groupChats !== null &&
                groupChats.map((chat) => (
                  <li key={chat.id} onClick={() => startGroupChat(chat.id)}>
                    {chat.name} <span>{chat.category}</span>
                  </li>
                ))}
            </GroupChatList>
          </GroupChats>
          <ButtonContainer>
            <AddChatButton onClick={() => setModal(true)}>
              Agregar
            </AddChatButton>
          </ButtonContainer>
        </>
      )}
    </SidebarContainer>
  );
}

export default Sidebar;
