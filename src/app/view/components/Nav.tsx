import React from "react";
import styled from "styled-components";
import logo from "../images/sell-up-logo@2x.png";

const Nav: React.FunctionComponent = () => {
  return (
    <NavBox>
      <ImgBox>
        <img src={logo} alt="logo" />
      </ImgBox>
    </NavBox>
  );
};

export default Nav;

const NavBox = styled.div`
  display: none;
  width: 100vw;
  height: 60px;
  border-bottom: 1px solid #e0e0e1;
  background: #ffffff;

  @media (min-width: 768px) {
    display: block;
  }
`;

const ImgBox = styled.div`
  width: 1024px;
  margin: 0 auto;

  img {
    width: 96px;
    height: auto;
    margin-top: 5px;
    object-fit: contain;
  }
`;
