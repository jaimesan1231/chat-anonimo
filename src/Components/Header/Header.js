import React, { useState } from "react";
import {
  EditIcon,
  HeaderContainer,
  NickName,
  NickNameInput,
  Profile,
  SaveIcon,
  UserAvatar,
} from "./HeaderElements";

function Header() {
  const [nickname, setNickname] = useState("Anónimo");
  const [editMode, setEditMode] = useState(false);
  const handleChangeInput = (e) => {
    setNickname(e.target.value);
  };
  const saveNickname = () => {
    setEditMode(false);
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    currentUser.name = nickname;
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    const userList = JSON.parse(localStorage.getItem("users"));
    console.log(currentUser);
    console.log(userList);
    const newUserList = userList.map((user) => {
      if (currentUser.id == user.id) {
        console.log(currentUser);
        return currentUser;
      } else {
        return user;
      }
    });
    localStorage.setItem("users", JSON.stringify(newUserList));
    console.log(newUserList);
  };
  return (
    <HeaderContainer>
      <Profile>
        <UserAvatar fontSize="large" />
        {editMode ? (
          <>
            <NickNameInput
              type="text"
              value={nickname}
              onChange={(e) => handleChangeInput(e)}
            />
            <SaveIcon onClick={() => saveNickname()} />
          </>
        ) : (
          <>
            <NickName>{nickname}</NickName>
            <EditIcon onClick={() => setEditMode(true)} />
          </>
        )}
      </Profile>
    </HeaderContainer>
  );
}

export default Header;
