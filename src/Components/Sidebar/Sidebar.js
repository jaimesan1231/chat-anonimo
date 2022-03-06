import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Users, SidebarContainer, CategoryGroups } from "./SidebarElements";
import PersonIcon from "@mui/icons-material/Person";
import { startNewChat } from "../../actions/chatActions";

function Sidebar({ userList }) {
  const dispatch = useDispatch();
  const [chatList, setChatList] = useState([]);

  const users = JSON.parse(localStorage.getItem("users"));
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
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
        if (chat.receiver == receiverId) {
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
  console.log(chatList);
  return (
    <SidebarContainer>
      <CategoryGroups></CategoryGroups>
      <Users>
        <h3>Usuarios</h3>
        <ul>
          {users != null &&
            chatList.map((user) => (
              <li
                key={user.id}
                onClick={() => startChat(currentUser.id, user.id, user.name)}
              >
                <PersonIcon />
                {user.name}
              </li>
            ))}
        </ul>
      </Users>
    </SidebarContainer>
  );
}

export default Sidebar;
