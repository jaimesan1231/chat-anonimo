import styled from "styled-components";

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
  font-size: 30px;
  font-weight: 500;
  border-bottom: 1px solid
    ${(props) => props.theme.black_20 || props.theme.gray};
`;
export const ChatMessages = styled.div`
  width: 100%;
  height: 80%;
  padding: 0px 10px;
  overflow-y: auto;
  border-bottom: 1px solid
    ${(props) => props.theme.black_20 || props.theme.gray};
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #0084ff;
    border-radius: 4px;
  }
  background: ${(props) => props.theme.black_12};
`;

export const MessageBox = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.user === props.currentUser ? "flex-end" : "flex-start"};
  height: auto;
  white-space: normal;
  position: relative;
`;
