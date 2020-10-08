import styled from "styled-components";

interface InputStyle {
  inputStyle?: "logIn" | "signUpForm";
  taskDetail: boolean;
}

const InputBox = styled.input<InputStyle>`
  width: 100%;
  height: 46px;
  border-radius: 2px;
  background-color: #f6f6f6;
  border: none;
  margin-top: ${(props) => props.taskDetail && "5px"};
  margin-bottom: ${(props) => (props.inputStyle === "logIn" ? "20px" : "10px")};
  padding-left: ${(props) => (props.taskDetail ? "10px" : "15px")};
  font-size: ${(props) => props.taskDetail && "14px"};
`;

export default InputBox;
