import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import SignUpPolicy from "./SignUpPolicy";
import SignUpForm from "./SignUpForm";
import SignUpAuth from "./SignUpAuth";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { CertResponse } from "domain/entity";

export interface SignUpResponse {
  emailInput: string;
  passwordInput: string;
}

const SignUp: React.FunctionComponent<RouteComponentProps> = (props) => {
  const [policyShow, setPolicyShow] = useState<boolean>(true);
  const [authShow, setAuthShow] = useState<boolean>(false);
  const [formShow, setFormShow] = useState<boolean>(false);
  const [certData, setCertData] = useState<CertResponse>();

  const gotoPolicy = () => {
    setFormShow(false);
    setPolicyShow(true);
  };

  const gotoAuth = () => {
    setPolicyShow(false);
    setAuthShow(true);
  };

  const gotoForm = (cert: CertResponse) => {
    setCertData(cert);
    setAuthShow(false);
    setFormShow(true);
  };

  const gotoLogin = () => {
    // signUpInfo === null
    //   ? props.history.push("/login")
    //   : props.history.push({
    //       pathname: "/login",
    //       state: {
    //         emailInput: signUpInfo.emailInput,
    //         passwordInput: signUpInfo.passwordInput,
    //       },
    //     });
    props.history.push("/login");
  };

  return (
    <>
      <Nav />
      {policyShow && <SignUpPolicy gotoAuth={gotoAuth} gotoLogin={gotoLogin} />}
      {authShow && <SignUpAuth gotoForm={gotoForm} />}
      {formShow && (
        <SignUpForm
          gotoPolicy={gotoPolicy}
          gotoLogin={gotoLogin}
          name={certData ? certData.name : ""}
        />
      )}
      <Footer />
    </>
  );
};

export default SignUp;
