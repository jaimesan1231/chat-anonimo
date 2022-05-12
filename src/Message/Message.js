import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { MessageContainer } from "./MessageElements";

function Message({ message, user, currentUser }) {
  const [deletedMessage, setDeletedMessage] = useState(false);
  const handleDeleteMessage = () => {
    setDeletedMessage(true);
  };
  return (
    <MessageContainer
      user={user}
      currentUser={currentUser}
      deletedMessage={deletedMessage}
    >
      <DeleteIcon onClick={handleDeleteMessage} />
      <span>{deletedMessage ? "Se elimino este mensaje" : message}</span>
    </MessageContainer>
  );
}

export default Message;
