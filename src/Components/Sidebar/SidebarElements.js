import { Modal } from "@mui/material";
import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 200px;
  height: calc(100vh - 60px);
  background-color: red;
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-content: space-between;
`;

export const Users = styled.div`
  width: 100%;
  height: 45%;
  background: blue;
`;
export const ActiveChats = styled.div`
  width: 100%;
  height: 45%;
  background: pink;
`;
export const SidebarSwitch = styled.div`
  width: 100%;
  height: 5%;
  min-height: 20px;
  background: white;
  display: flex;
  div {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ChatList = styled.ul`
  list-style: none;
  li {
    background: red;
    display: flex;
    padding: 10px;
    margin: 5px 0;
  }
`;

export const StyledModal = styled(Modal)`
  width: 50%;
  height: 50%;
  margin: auto;
`;
export const GroupChatList = styled.ul`
  list-style: none;
  li {
    background: blue;
    display: flex;
    padding: 10px;
    margin: 5px 0;
    flex-direction: column;
    span {
      font-size: 12px;
    }
  }
`;
export const GroupChats = styled.div`
  width: 100%;
  height: 90%;
  background: green;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const AddChatButton = styled.div`
  width: 80%;
  height: 40px;
  background: #1877f2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`;
