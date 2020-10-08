import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../widgets/Button";
import Top from "../../widgets/Top";
import Title from "../../widgets/Title";
import CheckBox from "../../widgets/CheckBox";
import arrow from "../../images/ca-icon-top-navigation-back-arrow-idle@2x.png";
import close from "../../images/ca-icon-top-navigation-close-idle@2x.png";
import check from "../../images/check@2x.png";
import emptyBox from "../../images/checkbox@2x.png";

interface PolicyProps {
  gotoAuth: () => void;
  gotoLogin: (any: any) => void;
}

interface CheckState {
  firstCheck: boolean;
  secondCheck: boolean;
  thirdCheck: boolean;
  forthCheck: boolean;
  optionalCheck: boolean;
}

const SignUpPolicy: React.FunctionComponent<PolicyProps> = (props) => {
  const [contentShow, setContentShow] = useState<boolean>(false);
  const [checkClick, setCheckClick] = useState<CheckState>({
    firstCheck: false,
    secondCheck: false,
    thirdCheck: false,
    forthCheck: false,
    optionalCheck: false,
  });

  const {
    firstCheck,
    secondCheck,
    thirdCheck,
    forthCheck,
    optionalCheck,
  } = checkClick;

  const allCheckClick = () => {
    setCheckClick({
      ...checkClick,
      firstCheck: firstCheck || !firstCheck,
      secondCheck: secondCheck || !secondCheck,
      thirdCheck: thirdCheck || !thirdCheck,
      forthCheck: forthCheck || !forthCheck,
      optionalCheck: optionalCheck || !optionalCheck,
    });

    if (
      firstCheck &&
      secondCheck &&
      thirdCheck &&
      forthCheck &&
      optionalCheck
    ) {
      setCheckClick({
        ...checkClick,
        firstCheck: !firstCheck,
        secondCheck: !firstCheck,
        thirdCheck: !thirdCheck,
        forthCheck: !forthCheck,
        optionalCheck: !optionalCheck,
      });
    }
  };

  return (
    <>
      <PolicyLayout>
        <Top>
          {contentShow ? (
            <img
              onClick={() => setContentShow(!contentShow)}
              src={close}
              alt="close"
            />
          ) : (
            <img
              src={arrow}
              alt="arrow"
              onClick={() => props.gotoLogin(null)}
            />
          )}
        </Top>
        <PolicyLayoutInner>
          {contentShow ? (
            <>
              <Title mode="policyName">약관이름</Title>
              <Content>약관내용</Content>
            </>
          ) : (
            <>
              <Title mode="normalTitle">
                <div>약관에 동의하고</div>
                <div>본인인증을 해주세요.</div>
              </Title>
              <CheckBoxTitle>
                <CheckBox
                  onClick={allCheckClick}
                  src={
                    firstCheck &&
                    secondCheck &&
                    thirdCheck &&
                    forthCheck &&
                    optionalCheck
                      ? check
                      : emptyBox
                  }
                  alt="checkbox"
                />
                이용약관 전체동의
              </CheckBoxTitle>
              <CheckBoxText>
                <CheckBox
                  onClick={() =>
                    setCheckClick({
                      ...checkClick,
                      firstCheck: !firstCheck,
                    })
                  }
                  src={firstCheck ? check : emptyBox}
                  alt="checkbox"
                />
                서비스 이용약관(필수)
                <span onClick={() => setContentShow(!contentShow)}>
                  내용보기
                </span>
              </CheckBoxText>
              <CheckBoxText>
                <CheckBox
                  onClick={() =>
                    setCheckClick({
                      ...checkClick,
                      secondCheck: !secondCheck,
                    })
                  }
                  src={secondCheck ? check : emptyBox}
                  alt="checkbox"
                />
                개인정보 수집 및 이용 동의(필수)
                <span onClick={() => setContentShow(!contentShow)}>
                  내용보기
                </span>
              </CheckBoxText>
              <CheckBoxText>
                <CheckBox
                  onClick={() =>
                    setCheckClick({
                      ...checkClick,
                      thirdCheck: !thirdCheck,
                    })
                  }
                  src={thirdCheck ? check : emptyBox}
                  alt="checkbox"
                />
                개인정보 제 3자 제공에 대한 동의(필수)
                <span onClick={() => setContentShow(!contentShow)}>
                  내용보기
                </span>
              </CheckBoxText>
              <CheckBoxText>
                <CheckBox
                  onClick={() =>
                    setCheckClick({
                      ...checkClick,
                      forthCheck: !forthCheck,
                    })
                  }
                  src={forthCheck ? check : emptyBox}
                  alt="checkbox"
                />
                개인정보 처리 위탁에 대한 동의(필수)
                <span onClick={() => setContentShow(!contentShow)}>
                  내용보기
                </span>
              </CheckBoxText>
              <CheckBoxText>
                <CheckBox
                  onClick={() =>
                    setCheckClick({
                      ...checkClick,
                      optionalCheck: !optionalCheck,
                    })
                  }
                  src={optionalCheck ? check : emptyBox}
                  alt="checkbox"
                />
                개인정보 수집 및 이용 동의(선택)
                <span onClick={() => setContentShow(!contentShow)}>
                  내용보기
                </span>
              </CheckBoxText>
              <Button
                mode="policy"
                buttonColor={
                  firstCheck && secondCheck && thirdCheck && forthCheck
                }
                onClick={() =>
                  firstCheck &&
                  secondCheck &&
                  thirdCheck &&
                  forthCheck &&
                  props.gotoAuth()
                }
              >
                인증
              </Button>
            </>
          )}
        </PolicyLayoutInner>
      </PolicyLayout>
    </>
  );
};

export default SignUpPolicy;

const PolicyLayout = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 375px;
  }
`;

const PolicyLayoutInner = styled.section`
  padding: 0 20px;
`;

const CheckBoxTitle = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  font-size: 16px;
  border-bottom: 1px solid #e0e0e1;
`;

const CheckBoxText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  margin-bottom: 4px;
  font-size: 12px;

  span {
    margin-left: auto;
    font-size: 12px;
    text-align: right;
    color: #848485;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Content = styled.div`
  height: 444px;
  margin-bottom: 60px;
  background-color: #e7e7e7;
  font-size: 12px;
`;
