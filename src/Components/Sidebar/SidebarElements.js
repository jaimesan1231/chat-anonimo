import { Modal } from "@mui/material";
import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 250px;
  height: calc(100vh - 60px);
  background-color: ${(props) => props.theme.body};
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-content: space-between;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
`;

export const Users = styled.div`
  width: 100%;
  height: 45%;
  color: ${(props) => props.theme.fontColor};
  z-index: 0;
`;
export const ActiveChats = styled.div`
  width: 100%;
  height: 45%;
  color: ${(props) => props.theme.fontColor};
`;
export const SidebarSwitch = styled.div`
  width: 100%;
  height: 5%;
  min-height: 20px;
  color: ${(props) => props.theme.main};
  box-shadow: 0px 1px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  font-weight: 600;
  z-index: 0;
`;

export const ChatList = styled.ul`
  list-style: none;
`;

export const ChatListItem = styled.li`
  display: flex;
  padding: 10px;
  margin: 5px 0;
  align-items: center;
  background-color: ${(props) =>
    props.active ? props.theme.main : "transparent"};
  svg {
    margin-right: 10px;
  }
`;

export const StyledModal = styled(Modal)`
  width: 50%;
  height: 50%;
  margin: auto;
`;
export const GroupChatList = styled.ul`
  list-style: none;
  color: ${(props) => props.theme.fontColor};
  li {
    display: flex;
    padding: 10px;
    margin: 5px 0;
    flex-direction: column;
    text-align: left;
    span {
      font-size: 12px;
    }
  }
`;

export const GroupChats = styled.div`
  width: 100%;
  height: 90%;
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

export const SwitchButton = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.active ? `2px solid ${props.theme.main}` : "none"};
`;
