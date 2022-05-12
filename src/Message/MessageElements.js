import styled, { css } from "styled-components";

export const MessageContainer = styled.div`
  background: ${(props) =>
    props.user == props.currentUser ? props.theme.main : "#3E4042"};
  color: white;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
  max-width: 40%;
  overflow-wrap: break-word;
  position: relative;
  z-index: 10;
  svg {
    color: ${(props) => props.theme.fontColor};
    font-size: 0px;
    position: absolute;
    left: ${(props) => (props.user == props.currentUser ? "0px" : "100%")};
    transition: all 0.3s ease;
    z-index: -1;
    cursor: pointer;
  }
  ${(props) =>
    !props.deletedMessage
      ? css`
          &:hover {
            svg {
              transform: ${(props) =>
                props.user == props.currentUser ? "translateX(-100%)" : ""};
              font-size: 20px;
            }
          }
        `
      : css`
          color: #d3d2d1;
          font-style: italic;
        `}
`;
