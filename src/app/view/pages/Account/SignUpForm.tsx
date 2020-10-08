import React, { useReducer, useCallback } from "react";
import styled from "styled-components";
import container from "../../../../injector";
import * as ViewModel from "../../../view-model";
import Title from "../../widgets/Title";
import Button from "../../widgets/Button";
import Top from "../../widgets/Top";
import Label from "../../widgets/Label";
import InputBox from "../../widgets/InputBox";
import arrow from "../../images/ca-icon-top-navigation-back-arrow-idle@2x.png";
import close from "../../images/ca-icon-top-navigation-close-idle@2x.png";

interface SignUpProps {
  gotoPolicy: () => void;
  gotoLogin: () => void;
  name: string;
}

interface SignUpInput {
  nameInput: string;
  emailInput: string;
  passwordInput: string;
  passwordConfirm: string;
}

interface Valid {
  nameValid: boolean;
  emailValid: boolean;
  passwordValid: boolean;
  passwordConfirmValid: boolean;
}

const regex = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/; //숫자,특수문자 1개, 문자 2개 최소 9자리
const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

type State = {
  signUpInput: SignUpInput;
  valid: Valid;
  signUpSuccess: boolean;
};
type Action =
  | { type: "EMAIL_INPUT"; name: string; value: string }
  | { type: "NAME_INPUT"; name: string; value: string }
  | { type: "PASSWORD_INPUT"; name: string; value: string }
  | { type: "PASSWORD_CONFIRM"; name: string; value: string }
  | { type: "INFO_VALID"; value: string }
  | { type: "PASSWORD_CONFIRM_VALID"; value: string }
  | { type: "SIGNUP_SUCCESS" };

const initialState = {
  signUpSuccess: false,
  signUpInput: {
    nameInput: "",
    passwordInput: "",
    passwordConfirm: "",
    emailInput: "",
  },
  valid: {
    emailValid: false,
    passwordValid: false,
    nameValid: false,
    passwordConfirmValid: false,
  },
};

const signUpFormReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "EMAIL_INPUT":
      return {
        ...state,
        signUpInput: {
          ...state.signUpInput,
          [action.name]: action.value,
        },
      };
    case "NAME_INPUT":
      return {
        ...state,
        signUpInput: {
          ...state.signUpInput,
          [action.name]: action.value,
        },
      };
    case "PASSWORD_INPUT":
      return {
        ...state,
        signUpInput: {
          ...state.signUpInput,
          [action.name]: action.value,
        },
      };
    case "PASSWORD_CONFIRM":
      return {
        ...state,
        signUpInput: {
          ...state.signUpInput,
          [action.name]: action.value,
        },
      };
    case "INFO_VALID":
      return {
        ...state,
        valid: {
          ...state.valid,
          emailValid: regExp.test(action.value) ? true : state.valid.emailValid,
          nameValid: action.value.length > 0 ? true : state.valid.nameValid,
          passwordValid: regex.test(action.value)
            ? true
            : state.valid.passwordValid,
        },
      };
    case "PASSWORD_CONFIRM_VALID":
      return {
        ...state,
        valid: {
          ...state.valid,
          passwordConfirmValid:
            state.signUpInput.passwordInput ===
            state.signUpInput.passwordConfirm
              ? true
              : state.valid.passwordConfirmValid,
        },
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        signUpSuccess:
          state.valid.emailValid &&
          state.valid.nameValid &&
          state.valid.passwordValid &&
          state.valid.passwordConfirmValid
            ? true
            : state.signUpSuccess,
      };
  }
};

const SignUpForm: React.FunctionComponent<SignUpProps> = (props) => {
  const [state, dispatch] = useReducer(signUpFormReducer, initialState);
  const { passwordInput, emailInput } = state.signUpInput;
  const {
    emailValid,
    passwordValid,
    nameValid,
    passwordConfirmValid,
  } = state.valid;
  const { signUpSuccess } = state;

  const vm: ViewModel.SignUpViewModel = container.get<
    ViewModel.SignUpViewModel
  >("SignUpViewModel");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: "EMAIL_INPUT",
      name,
      value,
    });
    dispatch({
      type: "NAME_INPUT",
      name,
      value,
    });
    dispatch({
      type: "PASSWORD_INPUT",
      name,
      value,
    });
    dispatch({
      type: "PASSWORD_CONFIRM",
      name,
      value,
    });
    dispatch({
      type: "INFO_VALID",
      value,
    });
  }, []);

  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      dispatch({
        type: "PASSWORD_CONFIRM",
        name,
        value,
      });
      dispatch({
        type: "PASSWORD_CONFIRM_VALID",
        value,
      });
    },
    []
  );

  const signUpConfirm = () => {
    vm.createUser(state.signUpInput)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch({
      type: "SIGNUP_SUCCESS",
    });
  };

  const buttonColorChange = (): boolean => {
    return Boolean(
      emailValid && passwordValid && nameValid && passwordConfirmValid
    );
  };

  return (
    <LayOut>
      {console.log(signUpSuccess)}
      <Top>
        <img
          src={!signUpSuccess ? arrow : close}
          alt="top-button"
          onClick={() =>
            !signUpSuccess ? props.gotoPolicy() : props.gotoLogin()
          }
        />
      </Top>
      <InnerLayOut>
        <TextContainer>
          <Title mode="normalTitle">
            {!signUpSuccess
              ? `${props.name}님 환영합니다!`
              : "회원 가입되었습니다!"}
            <span>
              {!signUpSuccess
                ? "아래 정보를 입력하고 회원가입을 완료하세요."
                : "관리자가 가입 검토 후 연락을 드릴 예정입니다."}
            </span>
            {signUpSuccess && <span>문구는 최종이 아닙니다.</span>}
          </Title>
        </TextContainer>
        <InputForm signUpComplite={signUpSuccess}>
          <Label>사용자 이름</Label>
          <InputBox
            inputStyle="signUpForm"
            name="nameInput"
            placeholder="사용자 이름 입력"
            type="text"
            onChange={onChange}
          ></InputBox>
          <Label>이메일</Label>
          <InputBox
            inputStyle="signUpForm"
            name="emailInput"
            placeholder="이메일 입력"
            type="text"
            onChange={onChange}
          ></InputBox>
          <EmailErr emailValidResult={!emailValid && emailInput.length > 0}>
            *올바른 이메일 형식으로 입력해주세요.
          </EmailErr>
          <Label>비밀번호</Label>
          <InputBox
            inputStyle="signUpForm"
            name="passwordInput"
            placeholder="비밀번호 입력"
            type="password"
            onChange={onChange}
          ></InputBox>
          <PasswordErr
            passwordValidResult={!passwordValid && passwordInput.length > 0}
          >
            *문자 2개와 숫자, 특수문자를 조합한 9자리 이상의 비밀번호를
            입력해주세요.
          </PasswordErr>
          <Label>비밀번호 확인</Label>
          <InputBox
            inputStyle="signUpForm"
            name="passwordConfirm"
            placeholder="비밀번호 입력"
            type="password"
            onChange={onChangePasswordConfirm}
          ></InputBox>
        </InputForm>
        <Button
          mode="form"
          buttonColor={buttonColorChange()}
          onClick={
            !signUpSuccess
              ? signUpConfirm
              : () => {
                  props.gotoLogin();
                }
          }
        >
          {!signUpSuccess ? "확인" : "셀업 시작하기"}
        </Button>
      </InnerLayOut>
    </LayOut>
  );
};

export default SignUpForm;

interface emailValidResult {
  emailValidResult: boolean;
}

interface passwordValidResult {
  passwordValidResult: boolean;
}

interface signUpComplite {
  signUpComplite: boolean;
}

const LayOut = styled.div`
  display: block;
  margin: auto;
  @media (min-width: 768px) {
    width: 375px;
  }
`;

const InnerLayOut = styled.div`
  margin: auto;
  padding: 0 20px;
  width: 100%;
  background-color: #ffffff;
  @media (min-width: 768px) {
    width: 375px;
  }
`;

const TextContainer = styled.div`
  span {
    display: block;
    font-size: 14px;
    margin-top: 12px;
    font-family: NanumSquare_acR;
  }
`;

const InputForm = styled.form<signUpComplite>`
  display: ${(props) => props.signUpComplite && "none"};
  width: 100%;
  margin: 0 auto;
`;

const EmailErr = styled.span<emailValidResult>`
  display: ${(props) => (props.emailValidResult ? "block" : "none")};
  font-size: 10px;
  text-indent: 5px;
  color: red;
  padding-bottom: 10px;
`;

const PasswordErr = styled.span<passwordValidResult>`
  display: ${(props) => (props.passwordValidResult ? "block" : "none")};
  font-size: 10px;
  text-indent: 5px;
  color: red;
  padding-bottom: 10px;
`;
