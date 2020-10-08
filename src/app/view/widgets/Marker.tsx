import styled from "styled-components";

interface Mode {
  mode?: string;
  category: "사입" | "반품" | "교환" | "기타" | "샘플" | "샘반" | "미송";
}

const handleCategory = (category: string) => {
  switch (category) {
    case "샘플":
      return "#02c886";
    case "샘반":
      return "#ec06e8";
    case "반품":
      return "#ff4f5e";
    case "사입":
      return "#4865f3";
    case "미송":
      return "#47538f";
    case "교환":
      return "#ffb700";
    case "기타":
      return "#848485";
    default:
      return "";
  }
};

const Marker = styled.div<Mode>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  margin-left: ${(props) => (props.mode === "taskList" ? "-5px" : "0")};
  border: solid 1px #ffffff;
  border-radius: 50%;
  background-color: ${({ category }) => handleCategory(category)};
  color: #ffffff;
  font-family: NanumSquare_acB;
  font-size: 10px;
  text-align: center;
`;

export default Marker;
