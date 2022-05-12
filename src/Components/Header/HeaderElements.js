import styled from "styled-components";
import { Save, ModeEdit, AccountCircle } from "@mui/icons-material";
import { Modal } from "@mui/material";

export const HeaderContainer = styled.div`
  width: 100vw;
  height: 60px;
  background: ${(props) => props.theme.body};
  display: flex;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
`;
export const Profile = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const NickName = styled.span`
  font-size: 18px;
  color: ${(props) => props.theme.fontColor};
`;

export const NickNameInput = styled.input`
  font-size: 18px;
  width: 100px;
  height: 20px;
  padding: 10px 0;
`;

export const UserAvatar = styled(AccountCircle)`
  font-size: 20px;
  color: ${(props) => props.theme.main};
`;

export const EditIcon = styled(ModeEdit)`
  cursor: pointer;
  color: ${(props) => props.theme.main};
`;
export const SaveIcon = styled(Save)`
  color: ${(props) => props.theme.main};
  cursor: pointer;
`;
export const Setting = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    cursor: pointer;
    color: ${(props) => props.theme.main};
  }
`;
export const StyledModal = styled(Modal)`
  width: 400px;
  height: 400px;
  margin: auto;
`;
