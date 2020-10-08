import styled from "styled-components";

interface LightGrayFontStyle {
  mode:
    | "subTitle"
    | "inputTitle"
    | "normalPadding"
    | "bigGrayFont"
    | "taskOption";
  bigGrayFont?: boolean;
}

const handlePaddingType = (mode: string) => {
  switch (mode) {
    case "subTitle":
      return "0 0 10px 0";
    case "normalPadding":
      return 0;
    case "taskOption":
      return "10px 0 0 0";
    default:
      return "0 0 5px 10px";
  }
};

const LightGrayFont = styled.div<LightGrayFontStyle>`
  padding: ${({ mode }) => handlePaddingType(mode)};
  color: #848485;
  font-family: ${(props) =>
    props.bigGrayFont ? "NanumSquare_acEB" : "NanumSquare_acB"};
  font-size: ${(props) => (props.bigGrayFont ? "14px" : "12px")};
  letter-spacing: ${(props) => props.mode === "subTitle" && "0.32px"};
`;

export default LightGrayFont;
