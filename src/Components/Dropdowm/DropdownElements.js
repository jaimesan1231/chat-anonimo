import styled, { css } from "styled-components";

export const DropdownWrapper = styled.div`
  width: 100%;
  height: 60px;
  position: relative;
  margin-top: 6px;
`;

export const DropDownSelected = styled.div`
  font-size: 16px;
`;

export const DropdownHeader = styled.div`
  display: flex;
  padding: 0 20px;
  align-items: center;
  height: 100%;
  border-bottom: 1px solid black;
  justify-content: space-between;
  z-index: auto;
  position: relative;

  &:after {
    transition: all 0.3s ease;
    content: "";
    position: absolute;
    width: 0%;
    border-bottom: 3px solid blue;
    left: 0;
    bottom: -1px;
  }
  ${(props) =>
    props.isOpen &&
    css`
      &:after {
        width: 100%;
      }
    `}
`;
export const DropdownTitle = styled.div`
  font-size: 16px;
  transition: all 0.3s ease;
  position: absolute;
  left: 20px;
  ${(props) =>
    props.isOpen &&
    css`
      transform: translateY(-140%);
      font-size: 14px;
      color: #683090;
    `}
`;
export const DropdownAction = styled.div`
  user-select: none;
  svg {
    font-size: 25px;
    cursor: pointer;
  }
`;
export const DropdownList = styled.ul`
  list-style: none;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.075);
  z-index: 100;
  position: absolute;
`;
export const DropdownListItem = styled.li`
  width: 100%;
  margin: 0;

  &:last-of-type button {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
export const DropdownButton = styled.button`
  width: 100%;
  padding: 15px 20px;
  display: flex;
  background-color: white;
  border: 0;
  font-size: 16px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;
