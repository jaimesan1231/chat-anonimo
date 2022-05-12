import React, { useState } from "react";
import ToggleDarkMode from "../ToggleDarkMode/ToggleDarkMode";
import {
  Button,
  Color,
  ColorsContainer,
  ModalContainer,
  Title,
} from "./ModalSettingElements";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDispatch } from "react-redux";
import { changeMain } from "../../actions/chatActions";

function ModalSetting({ handleClose }) {
  const dispatch = useDispatch();
  const handleColorTheme = (e) => {
    dispatch(changeMain(e.target.name));
  };
  return (
    <ModalContainer>
      <Title>Personaliza tu chat</Title>
      <ToggleDarkMode />
      <span>Elige el color del chat</span>
      <ColorsContainer>
        <Color
          name="#4361ee"
          color="#4361ee"
          readOnly
          onClick={(e) => handleColorTheme(e)}
        />
        <Color
          name="#1e88e5"
          color="#1e88e5"
          readOnly
          onClick={(e) => handleColorTheme(e)}
        />
        <Color
          name="#4cc9f0"
          color="#4cc9f0"
          readOnly
          onClick={(e) => handleColorTheme(e)}
        />
        <Color
          name="#0d47a1"
          color="#0d47a1"
          readOnly
          onClick={(e) => handleColorTheme(e)}
        />
        <Color
          name="#6a00f4"
          color="#6a00f4"
          readOnly
          onClick={(e) => handleColorTheme(e)}
        />
        <Color
          name="#52b788"
          color="#52b788"
          readOnly
          onClick={(e) => handleColorTheme(e)}
        />
        <Color
          name="#ffd60a"
          color="#ffd60a"
          readOnly
          onClick={(e) => handleColorTheme(e)}
        />
        <Color
          name="#f8961e"
          color="#f8961e"
          readOnly
          onClick={(e) => handleColorTheme(e)}
        />
        <Color
          name="#e71d36"
          color="#e71d36"
          readOnly
          onClick={(e) => handleColorTheme(e)}
        />
        <Color
          name="#bc00dd"
          color="#bc00dd"
          readOnly
          onClick={(e) => handleColorTheme(e)}
        />
      </ColorsContainer>
      <Button onClick={handleClose}>Aceptar</Button>
    </ModalContainer>
  );
}

export default ModalSetting;
