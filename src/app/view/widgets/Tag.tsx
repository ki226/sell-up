import styled from "styled-components";

interface Mode {
  mode: "big" | "middle" | "small";
  display: string;
}

const handleWidth = (mode: string) => {
  switch (mode) {
    case "big":
      return "90px";
    case "middle":
      return "76px";
    case "small":
      return "48px";
    default:
      return "76px";
  }
};

const handleBackgroundColor = (mode: string) => {
  switch (mode) {
    case "big":
      return "#e0e0e1";
    case "middle":
      return "#f6f6f6";
    case "small":
      return "#848485";
    default:
      return "";
  }
};

const tagHide = (display: string) => {
  switch (display) {
    case "click":
      return "none";
    case "noClick":
      return "flex";
    default:
      return "flex";
  }
};

const Tag = styled.div<Mode>`
  display: ${({ display }) => tagHide(display)};
  justify-content: space-between;
  align-items: center;

  width: ${({ mode }) => handleWidth(mode)};
  height: ${(props) => (props.mode === "small" ? "19px" : "30px")};
  padding: ${(props) => (props.mode === "small" ? "0 4px" : "0 10px")};
  margin: ${(props) => (props.mode === "small" ? "5px 5px 0" : "5px")};
  border-radius: 2px;
  background-color: ${({ mode }) => handleBackgroundColor(mode)};

  a {
    text-decoration: none;
  }

  span {
    font-family: NanumSquare_acR;
    font-size: ${(props) => (props.mode === "small" ? "10px" : "12px")};
    text-align: center;
    color: ${(props) => (props.mode === "small" ? "#ffffff" : "#000000")};
  }

  img {
    display: ${(props) => (props.mode === "small" ? "none" : "block")};
    width: 14px;
    height: 14px;
    object-fit: contain;
    cursor: pointer;
  }
`;

export default Tag;
