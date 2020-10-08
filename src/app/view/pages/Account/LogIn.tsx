import React, { useState } from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import Animate, { FadeIn } from "animate-css-styled-components";
import container from "../../../../injector";
import * as ViewModel from "../../../view-model";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Label from "../../widgets/Label";
import InputBox from "../../widgets/InputBox";
import Logo from "../../images/sell-up-logo.png";

interface LogInValue {
  emailInput: string;
  passwordInput: string;
}

interface LoginData extends RouteComponentProps<any, any, LoginData> {
  emailInput: string;
  passwordInput: string;
}

const LogIn: React.FunctionComponent<LoginData> = (props) => {
  const initLogInValueState: LogInValue = {
    emailInput: "",
    passwordInput: "",
  };

  const [changeValue, setChangeValue] = useState<LogInValue>(
    initLogInValueState
  );

  const [checkValid, setCheckValid] = useState<boolean>(true);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangeValue({
      ...changeValue,
      [name]: value,
    });
  };

  const vm: ViewModel.LogInViewModel = container.get<ViewModel.LogInViewModel>(
    "LogInViewModel"
  );

  const btnOnClickHandler = () => {
    vm.matchUser(changeValue)
      .then((res) => {
        console.log(res);
        setCheckValid(true);
        alert("로그인 성공!");
      })
      .catch((err) => {
        console.log(err);
        setCheckValid(false);
      });
  };

  return (
    <Animate Animation={[FadeIn]} duration={["0.8s"]} delay={["0.2s"]}>
      <Nav />
      <LayOut>
        <LogoLayOut>
          <img src={Logo} />
        </LogoLayOut>
        <Label>이메일</Label>
        <InputBox
          inputStyle="logIn"
          name="emailInput"
          onChange={inputHandler}
          value={changeValue.emailInput}
        />
        <Label>비밀번호</Label>
        <InputBox
          inputStyle="logIn"
          name="passwordInput"
          type="password"
          onChange={inputHandler}
          value={changeValue.passwordInput}
        />
        {!checkValid && changeValue.passwordInput.length > 0 && (
          <Validation>
            <p>이메일과 암호가 일치하지 않습니다. 다시 시도해보세요.</p>
          </Validation>
        )}
        <LogInLayOut>
          <button onClick={btnOnClickHandler}>로그인</button>
        </LogInLayOut>
        <SignUpBtn>
          <p onClick={() => props.history.push("/signup")}>
            아직 회원이 아니신가요?&nbsp;회원가입
          </p>
        </SignUpBtn>
      </LayOut>
      <Footer />
    </Animate>
  );
};
export default LogIn;

const LayOut = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  @media (min-width: 768px) {
    width: 375px;
  }
`;
const LogoLayOut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 51px 127px 51px 128px;
  img {
    width: 120px;
    height: 57px;
  }
`;
const Validation = styled.div`
  height: 13px;
  p {
    font-size: 12px;
    font-stretch: normal;
    margin-top: -10px;
    letter-spacing: 0.28px;
    color: #ff0000;
  }
`;
const LogInLayOut = styled.div`
  button {
    width: 150px;
    height: 46px;
    margin-top: 86px;
    border-radius: 23px;
    border: 1px solid red;
    background-color: #f44016;
    color: #fff;
    font-family: NanumSquare_acB;
    font-size: 14px;
  }
`;
const SignUpBtn = styled.div`
  margin-top: 120px;
  margin-bottom: 50px;
  p {
    font-family: NanumSquare_acB;
    font-size: 14px;
    text-align: center;
    color: #000000;
    cursor: pointer;
  }
`;
