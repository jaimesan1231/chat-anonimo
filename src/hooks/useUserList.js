import { useState } from "react";

export const useUserList = () => {
  const [userList, setUserList] = useState();
  const users = localStorage.getItem("users");
  const updateUserList = (list) => {
    setUserList(list);
  };
  const createUserList = () => {
    if (users != null) {
      const newUserList = [
        ...JSON.parse(users),
        { id: JSON.parse(users).length + 1, name: "Anonimo" },
      ];
      setUserList(newUserList);
      localStorage.setItem("users", JSON.stringify(newUserList));
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify(newUserList[newUserList.length - 1])
      );
      sessionStorage.setItem("activeChats", JSON.stringify([]));
    } else {
      const newUser = [{ id: 1, name: "Anonimo" }];
      localStorage.setItem("users", JSON.stringify(newUser));
      sessionStorage.setItem("currentUser", JSON.stringify(...newUser));
      sessionStorage.setItem("activeChats", JSON.stringify([]));
    }
  };
  return {
    userList,
    updateUserList,
    createUserList,
  };
};
