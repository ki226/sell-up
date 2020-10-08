import styled from "styled-components";

interface WholesaleStyle {
  top?: boolean;
}

const TaskMainTitle = styled.h3<WholesaleStyle>`
  ${(props) =>
    props.top &&
    `
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  `}
  font-family: NanumSquare_acEB;
  font-size: 16px;
  letter-spacing: 0.37px;
`;

export default TaskMainTitle;
