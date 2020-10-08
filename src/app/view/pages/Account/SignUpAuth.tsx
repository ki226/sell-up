import React from "react";
import Button from "../../widgets/Button";
import { CertResponse } from "../../../../domain/entity";
import container from "../../../../injector";
import * as ViewModel from "../../../view-model";

interface AuthProps {
  gotoForm: (res: CertResponse) => void;
}

const SignUpAuth: React.FunctionComponent<AuthProps> = (props) => {
  const vm: ViewModel.SignUpViewModel = container.get<
    ViewModel.SignUpViewModel
  >("SignUpViewModel");

  const authClick = () => {
    vm.getCertResponse()
      .then((res) => {
        console.log(res);
        props.gotoForm(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Button mode="authBtn" buttonColor onClick={authClick}>
      확인
    </Button>
  );
};

export default SignUpAuth;
