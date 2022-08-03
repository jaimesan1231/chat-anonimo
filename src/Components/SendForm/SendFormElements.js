import { Send } from "@mui/icons-material";
import { TextareaAutosize } from "@mui/material";
import styled from "styled-components";

export const SendIcon = styled(Send)`
  color: ${(props) => props.theme.main};
`;

export const SendFormContainer = styled.div`
  width: 100%;
  height: 10%;
  background: ${(props) => props.theme.black_12};
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
export const SendInput = styled(TextareaAutosize)`
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
