import styled from "styled-components";

interface ControlBoxStyle {
  moveToRight?: boolean;
}

const ControlBox = styled.div<ControlBoxStyle>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.moveToRight && "flex-end"};
  padding-right: ${(props) => props.moveToRight && "20px"};
  font-family: NanumSquare_acB;
  font-size: 12px;
  color: #656667;
  cursor: pointer;

  img {
    display: block;
    width: 12px;
    height: 12px;
    margin-left: 4px;
  }
`;

export default ControlBox;
