import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    width: 80%;
    text-align: center;
    border-bottom: 2px solid grey;
    height: 50px;
    padding: 10px 0px;
    border-radius: 30px 30px 0px 0px;
    color: black;
    background-color: white;
    position: relative;
    .icon {
      font-size: 40px;
      position: absolute;
      top: 5px;
      right: 5px;
      color: black;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
`;
export const StyledForm = styled.form`
  width: 80%;
  display: flex;
  background-color: white;
  border-radius: 0px 0px 30px 30px;
  flex-wrap: wrap;
  height: 400px;
  justify-content: space-between;
  padding: 20px 20px;
`;
export const FormLabel = styled.label`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-bottom: 1px solid grey;
  span {
    position: absolute;
    bottom: 15px;
    left: 20px;
    transition: all 0.3s ease;
    color: black;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0%;
    bottom: -1px;
    width: 100%;
    height: 100%;
    border-bottom: 3px solid blue;
    transform: translateX(-100%);
    transition: all 0.3s ease;
  }
`;
export const FormInput = styled.input`
  outline: none;
  padding: 0 20px;
  align-items: center;
  width: 100%;
  height: 49px;
  margin-top: 11px;
  border: none;
  background: none;
  color: black;
  &:focus + ${FormLabel} span,
  &:valid + ${FormLabel} span {
    transform: translateY(-150%);
    font-size: 14px;
  }
  &:focus + ${FormLabel}:after, &:valid + ${FormLabel}:after {
    transform: translateX(0%);
  }
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.075);
  z-index: auto;
`;
export const FormSection = styled.div`
  width: 100%;
  height: 60px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

export const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const FormButton = styled.button`
  width: 40%;
  color: white;
  height: 40px;
  margin-top: 20px;
  background-color: blue;
  border: none;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const FormError = styled.div``;
