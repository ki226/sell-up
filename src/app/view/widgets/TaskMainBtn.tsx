import styled from "styled-components";

interface ColorChange {
  colorChange?: boolean;
}

const TaskMainBtn = styled.button<ColorChange>`
  justify-self: flex-end;
  margin-left: auto;
  font-family: NanumSquare_acB;
  font-size: 14px;
  text-align: right;
  color: ${(props) => props.colorChange && "#d0d1dd1"};
  background-color: #ffff;
  border: none;
  cursor: pointer;
`;

export default TaskMainBtn;
