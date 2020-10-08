import styled from "styled-components";

interface PaddingStyle {
  padding: string;
}

const handlePaddingType = (padding: string) => {
  switch (padding) {
    case "wholesale":
      return "0 6px 0 10px";
    case "retail":
      return "0 0 20px 0";
    case "subInfo":
      return "7px 0 0 0";
    case "product":
      return "23px 20px 21px";
    case "filter":
      return "14px 0 20px 0";
    case "completeTask":
      return "30px 20px";
    default:
      return 0;
  }
};

const SpaceBetweenLayout = styled.div<PaddingStyle>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ padding }) => handlePaddingType(padding)};
  border-bottom: ${(props) =>
    props.padding === "completeTask" && "1px solid #e0e0e1"};
`;

export default SpaceBetweenLayout;
