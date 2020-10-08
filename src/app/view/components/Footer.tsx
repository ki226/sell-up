import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer: React.FunctionComponent = () => {
  return (
    <FooterLayout>
      <FooterBox>
        <Text>CherGround Inc. © 2020 sell-up.co.kr. All rights reserved. </Text>
        <Text right>
          <Link to="#" className="link">
            고객 센터
          </Link>
          <div></div>
          <Link to="#" className="link">
            개인정보 처리 방침
          </Link>
          <div></div>
          <Link to="#" className="link">
            서비스 이용약관
          </Link>
        </Text>
      </FooterBox>
    </FooterLayout>
  );
};

export default Footer;

interface FooterStyle {
  right?: boolean;
}

const FooterLayout = styled.div`
  position: fixed;
  bottom: 0px;
  display: none;
  justify-content: center;
  width: 100%;
  height: 52px;
  border-top: 1px solid #e0e0e1;
  background: #ffffff;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const FooterBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1024px;
`;

const Text = styled.div<FooterStyle>`
  ${(props) =>
    props.right &&
    `
   display : flex;
   align-items : center;
  `}
  color: rgb(31, 38, 62);
  font-family: NanumSquare, sans-serif;
  font-size: 12px;

  .link {
    text-decoration: none;
    color: rgb(31, 38, 62);
  }

  div {
    width: 2px;
    height: 2px;
    margin: 0px 8px;
    background-color: rgb(121, 127, 143);
  }
`;
