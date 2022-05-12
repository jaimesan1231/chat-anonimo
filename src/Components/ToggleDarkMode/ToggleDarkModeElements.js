import styled from "styled-components";
export const ToggleContainer = styled.div`
  height: 40px;
  width: 80px;
  border-radius: 50px;
  background-color: ${(props) =>
    props.currentTheme == "light" ? props.theme.main : props.theme.black_7};
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-around;
  svg {
    color: yellow;
  }
  z-index: 100;
`;

export const Notch = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: ${(props) =>
    props.currentTheme == "light" ? "white" : props.theme.black_15};
  position: absolute;
  left: ${(props) => (props.currentTheme == "light" ? "5px" : "45px")};
  transition: all 0.3s ease;
`;
