import styled from "styled-components";

interface TitleStyle {
  mode: "policyName" | "normalTitle" | "taskTitle";
}

const handlePaddingType = (mode: string) => {
  switch (mode) {
    case "policyName":
      return "40px 0 24px 0";
    case "taskTitle":
      return 0;
    default:
      return "40px 0";
  }
};

const Title = styled.h1<TitleStyle>`
  padding: ${({ mode }) => handlePaddingType(mode)};
  font-family: NanumSquare_acEB;
  font-size: 26px;
  line-height: 1.31;
  color: #000000;
`;

export default Title;
