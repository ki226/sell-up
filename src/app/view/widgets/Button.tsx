import styled from "styled-components";

interface ButtonStyle {
  mode: "policy" | "form" | "filter" | "dateConfirm" | "authBtn";
  buttonColor?: boolean;
}

const handleMarginType = (mode: string) => {
  switch (mode) {
    case "form":
      return "40px auto 0";
    case "policy":
      return "48px auto 183px";
    case "dateConfirm":
      return "40px auto 30px";
    case "authBtn":
      return "531px auto 0";
    default:
      return "30px auto 48px";
  }
};

const Button = styled.button<ButtonStyle>`
  display: block;
  width: 150px;
  height: 46px;
  margin: ${({ mode }) => handleMarginType(mode)};
  border: none;
  border-radius: 23px;
  background-color: ${(props) => (props.buttonColor ? "#f44016" : "#d0d1d1")};
  color: #ffffff;
  font-family: NanumSquare_acB;
  font-size: 14px;
  text-align: center;
`;

export default Button;
