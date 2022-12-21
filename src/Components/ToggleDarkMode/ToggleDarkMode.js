import React from "react";
import { Notch, ToggleContainer } from "./ToggleDarkModeElements";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../redux/slices/themes";

function ToggleDarkMode() {
  const currentTheme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const handleToggle = () => {
    const theme = currentTheme.theme === "light" ? "dark" : "light";
    dispatch(changeTheme(theme));
  };
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
