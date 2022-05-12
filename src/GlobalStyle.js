import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  /* color:${(props) => props.theme.fontColor} ;
  background-color:${(props) => props.theme.body} ; */
}
  body{
    font-family: 'Roboto', sans-serif;
    display: flex;
    background-color:${(props) => props.theme.black_7} ;
  }
`;
