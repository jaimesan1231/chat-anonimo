import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Users,
  SidebarContainer,
  SidebarSwitch,
  ActiveChats,
  ChatList,
  StyledModal,
  GroupChatList,
  GroupChats,
  ButtonContainer,
  AddChatButton,
  ChatListItem,
  SwitchButton,
} from "./SidebarElements";
import PersonIcon from "@mui/icons-material/Person";
import FormAddChat from "../FormAddChat/FormAddChat";
import { useChatMessages } from "../../hooks/useChatMessages";

function Sidebar({ userList }) {
  const currentChat = useSelector((state) => state.currentChat);
  const [chatList, setChatList] = useState([]);
  const [sidebarState, setSidebarState] = useState("users");
  const [modal, setModal] = useState(false);
  const { startChat, startNewGroupChat } = useChatMessages();
  const users = JSON.parse(localStorage.getItem("users"));
  const groupChatList = JSON.parse(localStorage.getItem("groupChatList"));
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const activeChats = JSON.parse(sessionStorage.getItem("activeChats"));
  useEffect(() => {
    if (userList != null && currentUser != null) {
      const otherUsers = userList.filter((user) => user.id !== currentUser.id);
      setChatList(otherUsers);
    }
  }, [userList]);

  const addGroupChat = (newGroupChat) => {
    groupChatList
      ? localStorage.setItem(
          "groupChatList",
          JSON.stringify([...groupChatList, newGroupChat])
        )
      : localStorage.setItem("groupChatList", JSON.stringify([newGroupChat]));
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
  return (
    <SidebarContainer>
      <StyledModal
        open={modal}
        children={
          <FormAddChat handleClose={handleClose} addGroupChat={addGroupChat} />
        }
      ></StyledModal>
      <SidebarSwitch>
        <SwitchButton
          onClick={setUserSidebar}
          active={sidebarState === "users"}
        >
          Usuarios
        </SwitchButton>
        <SwitchButton
          onClick={setGroupSidebar}
          active={sidebarState === "groups"}
        >
          Grupos
        </SwitchButton>
      </SidebarSwitch>
      {sidebarState === "users" ? (
        <>
          <ActiveChats>
            <h3>Chats activos</h3>
            {activeChats &&
              activeChats.map((user) => (
                <ChatList>
                  <ChatListItem
                    key={user.id}
                    onClick={() =>
                      startChat(
                        currentChat,
                        currentUser.id,
                        user.receiver,
                        user.name
                      )
                    }
                  >
                    <PersonIcon />
                    {user.chatName}
                  </ChatListItem>
                </ChatList>
              ))}
          </ActiveChats>
          <Users>
            <h3>Usuarios</h3>
            <ChatList>
              {users != null &&
                chatList.map((user) => (
                  <ChatListItem
                    active={user.id === currentChat.receiver ? true : false}
                    key={user.id}
                    onClick={() =>
                      startChat(currentChat, currentUser.id, user.id, user.name)
                    }
                  >
                    <PersonIcon />
                    {user.name}
                  </ChatListItem>
                ))}
            </ChatList>
          </Users>
        </>
      ) : (
        <>
          <GroupChats>
            <GroupChatList>
              {groupChatList !== null &&
                groupChatList.map((chat) => (
                  <li key={chat.id} onClick={() => startNewGroupChat(chat.id)}>
                    {chat.chatName} <span>{chat.category}</span>
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
