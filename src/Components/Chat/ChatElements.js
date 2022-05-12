import styled from "styled-components";
import { Send } from "@mui/icons-material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export const ChatContainer = styled.div`
  width: calc(100vw - 250px);
  height: calc(100vh - 60px);
  margin-left: 250px;
  overflow: hidden;
`;
export const ChatHeader = styled.div`
  width: 100%;
  height: 10%;
  background: ${(props) => props.theme.black_12};
  color: ${(props) => props.theme.fontColor};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  padding-left: 20px;
`;
export const ChatFooter = styled.div`
  width: 100%;
  height: 10%;
  background: ${(props) => props.theme.black_12};
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
export const ChatMessages = styled.div`
  width: 100%;
  height: 80%;
  padding: 0px 10px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #0084ff;
    border-radius: 4px;
  }
`;
export const ChatInput = styled(TextareaAutosize)`
  width: 80%;
  border: none;
  font-family: "Roboto";
  outline: none;
  resize: none;
  padding: 10px;
  background: ${(props) => props.theme.black_20 || props.theme.gray};
  border-radius: 10px;
  color: ${(props) => props.theme.fontColor};
`;

export const MessageBox = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.user == props.currentUser ? "flex-end" : "flex-start"};
  height: auto;
  white-space: normal;
  position: relative;
`;
export const SendIcon = styled(Send)`
  color: ${(props) => props.theme.main};
`;
