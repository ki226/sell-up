import styled from "styled-components";

interface IconStyle {
  UnderBarIcon?: boolean;
}

const SmallIcon = styled.img<IconStyle>`
  display: ${(props) => props.UnderBarIcon && "block"};
  width: 24px;
  height: 24px;
  margin: ${(props) => props.UnderBarIcon && "0 auto"};
  cursor: pointer;
`;

export default SmallIcon;
