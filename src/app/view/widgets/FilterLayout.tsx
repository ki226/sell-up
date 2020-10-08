import styled from "styled-components";
interface HeightChange {
  heightChange?: boolean;
}
const FilterLayout = styled.div<HeightChange>`
  width: 100%;
  height: ${(props) => (props.heightChange ? "416px" : "100%")};
  margin: 0 auto;
  @media (min-width: 768px) {
    width: 375px;
  }
`;
export default FilterLayout;
