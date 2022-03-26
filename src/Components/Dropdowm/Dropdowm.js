import React, { useState } from "react";
import {
  DropdownAction,
  DropdownButton,
  DropdownHeader,
  DropdownList,
  DropdownListItem,
  DropDownSelected,
  DropdownTitle,
  DropdownWrapper,
} from "./DropdownElements";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Dropdown({ title, items, handleCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [moveDropdown, setMoveDropdown] = useState(false);
  const handleOpenClick = () => {
    setMoveDropdown(true);
    setIsOpen(true);
  };
  const handleCloseClick = () => {
    setMoveDropdown(true);
    setIsOpen(false);
    if (selectedItem !== "") {
      setMoveDropdown(true);
    } else {
      setMoveDropdown(false);
    }
  };
  const selectItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    handleCategory(item);
  };
  return (
    <DropdownWrapper>
      <DropdownHeader isOpen={moveDropdown}>
        <DropdownTitle isOpen={moveDropdown}>{title}</DropdownTitle>
        <DropDownSelected>{selectedItem ? selectedItem : ""}</DropDownSelected>
        <DropdownAction>
          {isOpen ? (
            <ArrowDropUpIcon onClick={handleCloseClick} />
          ) : (
            <ArrowDropDownIcon onClick={handleOpenClick} />
          )}
        </DropdownAction>
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {items.map((item) => (
            <DropdownListItem>
              <DropdownButton onClick={() => selectItem(item)}>
                <span>{item}</span>
              </DropdownButton>
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
}

export default Dropdown;
