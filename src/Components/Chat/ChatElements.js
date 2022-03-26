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
export const ChatInput = styled.textarea`
  width: 80%;
  border: none;
  height: 30px;
  min-height: 30px;
  outline: none;
`;
export const MessageBox = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.user == props.currentUser ? "flex-end" : "flex-start"};
  height: auto;
  white-space: normal;
`;
export const Message = styled.div`
  background-color: ${(props) =>
    props.user == props.currentUser ? "#0084FF" : "#3E4042"};
  color: white;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
  max-width: 40%;
  overflow-wrap: break-word;
`;
export const SendIcon = styled(Send)``;
