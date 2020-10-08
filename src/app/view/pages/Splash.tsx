import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import OrangeLogo from "../images/SellUpLogo.png";
import Animate, { FadeOut } from "animate-css-styled-components";

const Splash: React.FunctionComponent<RouteComponentProps> = (props) => {
  setTimeout(() => {
    props.history.push("/login");
  }, 3500);

  return (
    <Animate Animation={[FadeOut]} duration="0.5s" delay="3s">
      <Wrapper>
        <img src={OrangeLogo} />
      </Wrapper>
    </Animate>
  );
};

export default Splash;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: #f44016;
`;
