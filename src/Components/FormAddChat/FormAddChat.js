import React, { useState } from "react";
import {
  ButtonSection,
  FormButton,
  FormInput,
  FormLabel,
  FormSection,
  FormWrapper,
  StyledForm,
} from "./FormAddChatElements";
import Dropdown from "../Dropdowm/Dropdowm";

function FormAddChat({ handleClose, addGroupChat }) {
  const [groupChat, setGroupChat] = useState({});
  const handleSubmit = (e) => {
    const groupChats =
      JSON.parse(localStorage.getItem("groupChats")) !== null
        ? JSON.parse(localStorage.getItem("groupChats"))
        : [];
    e.preventDefault();
    const newGroupChat = {
      ...groupChat,
      id: groupChats ? groupChats.length + 1 : 1,
    };
    groupChats.push(newGroupChat);
    localStorage.setItem(
      "groupChats",
      JSON.stringify(groupChats ? groupChats : newGroupChat)
    );
    addGroupChat(newGroupChat);
    handleClose();
  };
  const handleInputChange = (e) => {
    setGroupChat({
      ...groupChat,
      chatName: e.target.value,
    });
  };
  const handleCategory = (category) => {
    setGroupChat({
      ...groupChat,
      category: category,
    });
  };

  return (
    <FormWrapper>
      <h2>Crear Chat Grupal</h2>
      <StyledForm>
        <FormSection>
          <FormInput
            required
            onChange={(e) => handleInputChange(e)}
            name="name"
          ></FormInput>
          <FormLabel htmlFor="name">
            <span>Nombre</span>
          </FormLabel>
        </FormSection>

        <Dropdown
          handleCategory={handleCategory}
          title="Categoria"
          items={["Categoria 1", "Categoria 2", "Categoria 3"]}
        />
        <ButtonSection>
          <FormButton onClick={handleClose}>Cancelar</FormButton>
          <FormButton onClick={(e) => handleSubmit(e)}>Crear</FormButton>
        </ButtonSection>
      </StyledForm>
    </FormWrapper>
  );
}

export default FormAddChat;
