import styled from "styled-components";

interface GrayFontStyle {
  taskList?: boolean;
}
const GrayFont = styled.div<GrayFontStyle>`
  padding: ${(props) => props.taskList && "0 0 0 10px"};
  color: #656667;
  font-family: NanumSquare_acB;
  font-size: 12px;
`;

export default GrayFont;
