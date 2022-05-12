import React, { useState } from "react";
import { Button, Notch, ToggleContainer } from "./ToggleDarkModeElements";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../actions/chatActions";

function ToggleDarkMode() {
  const currentTheme = useSelector((state) => state.theme);
  const [toggleTheme, setToggleTheme] = useState("light");
  const dispatch = useDispatch();
  const handleToggle = () => {
    const theme = currentTheme.theme == "light" ? "dark" : "light";
    setToggleTheme(theme);
    console.log(currentTheme.theme);
    dispatch(changeTheme(theme));
  };
  console.log(currentTheme.theme);
  return (
    <ToggleContainer
      currentTheme={currentTheme.theme}
      onClick={() => handleToggle()}
    >
      <DarkModeIcon />
      <LightModeIcon />
      <Notch currentTheme={currentTheme.theme} isBlue={true}></Notch>
    </ToggleContainer>
  );
}

export default ToggleDarkMode;
