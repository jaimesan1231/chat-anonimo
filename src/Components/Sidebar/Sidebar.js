import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  ChatListItem,
  UsersButton,
  GroupsButton,
  SwitchButton,
} from "./SidebarElements";
import PersonIcon from "@mui/icons-material/Person";
import { startNewChat, startNewGroupChat } from "../../actions/chatActions";
import FormAddChat from "../FormAddChat/FormAddChat";

function Sidebar({ userList }) {
  const currentChat = useSelector((state) => state.currentChat);
  const dispatch = useDispatch();
  const [chatList, setChatList] = useState([]);
  const [sidebarState, setSidebarState] = useState("users");
  const [modal, setModal] = useState(false);

  const users = JSON.parse(localStorage.getItem("users"));
  const groupChatList = JSON.parse(localStorage.getItem("groupChatList"));
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
    if (receiverId !== currentChat.receiver) {
      console.log(currentChat.transmitter);
      console.log(transmitterId);
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
          if (
            chat.transmitter == transmitterId &&
            chat.receiver == receiverId
          ) {
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
    }
  };
  const startGroupChat = (chatId) => {
    const groupChats = JSON.parse(localStorage.getItem("groupChats"));
    const currentChat = groupChats.filter((item) => item.id == chatId)[0];
    console.log(currentChat);
    dispatch(
      startNewGroupChat(
        currentChat.id,
        currentChat.category,
        currentChat.chatName,
        currentChat.messages
      )
    );
  };
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
  console.log(chatList);
  return (
    <SidebarContainer>
      <StyledModal
        open={modal}
        children={
          <FormAddChat handleClose={handleClose} addGroupChat={addGroupChat} />
        }
      ></StyledModal>
      <SidebarSwitch>
        <SwitchButton onClick={setUserSidebar} active={sidebarState == "users"}>
          Usuarios
        </SwitchButton>
        <SwitchButton
          onClick={setGroupSidebar}
          active={sidebarState == "groups"}
        >
          Grupos
        </SwitchButton>
      </SidebarSwitch>
      {sidebarState == "users" ? (
        <>
          <ActiveChats>
            <h3>Chats activos</h3>
            {activeChats &&
              activeChats.map((user) => (
                <ChatList>
                  <ChatListItem
                    key={user.id}
                    onClick={() =>
                      startChat(currentUser.id, user.receiver, user.name)
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
                    active={user.id == currentChat.receiver ? true : false}
                    key={user.id}
                    onClick={() =>
                      startChat(currentUser.id, user.id, user.name)
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
                  <li key={chat.id} onClick={() => startGroupChat(chat.id)}>
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
