import styled from "styled-components";

export const ModalContainer = styled.div`
  background-color: ${(props) => props.theme.black_20 || "white"};
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  color: ${(props) => props.theme.fontColor};
`;
export const Title = styled.h3`
  text-align: center;
`;
export const Button = styled.div`
  width: 100px;
  height: 20px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.main};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;
export const ColorsContainer = styled.div`
  width: 60%;
  user-select: none;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px 0px;
  justify-items: center;
`;
export const Color = styled.input`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: none;
  outline: none;
  color: transparent;
  cursor: pointer;
`;
