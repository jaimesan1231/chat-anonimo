import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 200px;
  height: calc(100vh - 60px);
  background-color: red;
  display: flex;
  flex-direction: column;
  position: fixed;
`;

export const Users = styled.div`
  width: 100%;
  height: 50%;
  background: blue;
  ul {
    list-style: none;
  }
  li {
    background: red;
    display: flex;
    padding: 10px;
    margin: 5px 0;
  }
`;
export const CategoryGroups = styled.div`
  width: 100%;
  height: 50%;
  background: pink;
`;
