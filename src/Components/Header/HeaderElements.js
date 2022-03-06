import styled from "styled-components";
import { Save, ModeEdit, AccountCircle } from "@mui/icons-material";

export const HeaderContainer = styled.div`
  width: 100vw;
  height: 60px;
  background: green;
`;
export const Profile = styled.div`
  width: 200px;
  height: 100%;
  background: yellow;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const NickName = styled.span`
  font-size: 18px;
`;

export const NickNameInput = styled.input`
  font-size: 18px;
  width: 100px;
  height: 20px;
  padding: 10px 0;
`;

export const UserAvatar = styled(AccountCircle)`
  svg {
    font-size: 20px;
  }
`;

export const EditIcon = styled(ModeEdit)`
  cursor: pointer;
`;
export const SaveIcon = styled(Save)`
  cursor: pointer;
`;
