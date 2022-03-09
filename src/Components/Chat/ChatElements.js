import styled from "styled-components";
import { Send } from "@mui/icons-material";

export const ChatContainer = styled.div`
  width: 80%;
  background: black;
  height: calc(100vh - 60px);
  margin-left: 200px;
`;
export const ChatHeader = styled.div`
  width: 100%;
  height: 10%;
  background: brown;
`;
export const ChatFooter = styled.div`
  width: 100%;
  height: 10%;
  background: gray;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
export const ChatMessages = styled.div`
  background: yellow;
  width: 100%;
  height: 80%;
`;
export const ChatInput = styled.input`
  width: 80%;
  border: none;
  height: 30px;
  outline: none;
`;
export const MessageBox = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.user == props.currentUser ? "flex-end" : "flex-start"};
`;
export const SendIcon = styled(Send)``;
