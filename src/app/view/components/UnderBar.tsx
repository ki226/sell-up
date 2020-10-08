import React from "react";
import styled from "styled-components";
import SmallIcon from "../widgets/SmallIcon";
import TaskIcon from "../images/ca-navigation-task-list-selected@2x.png";
import OrderIcon from "../images/ca-navigation-order-idle@2x.png";
import MyPageIcon from "../images/ca-navigation-my-page-idle@2x.png";

const UnderBar: React.FunctionComponent = () => {
  return (
    <UnderBarLayout>
      <UnderBarBox>
        <UnderBarMenu textColor="clicked">
          <SmallIcon UnderBarIcon src={TaskIcon} alt="task" />
          <span>업무</span>
        </UnderBarMenu>
        <UnderBarMenu textColor="unClicked">
          <SmallIcon UnderBarIcon src={OrderIcon} alt="order" />
          <span>주문</span>
        </UnderBarMenu>
        <UnderBarMenu textColor="unClicked">
          <SmallIcon UnderBarIcon src={MyPageIcon} alt="mypage" />
          <span>내 정보</span>
        </UnderBarMenu>
      </UnderBarBox>
    </UnderBarLayout>
  );
};

interface TextColorChange {
  textColor: string;
}

export default UnderBar;

const UnderBarLayout = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 49px;
  border-top: 1px solid #e0e0e1;
  background-color: white;

  @media (min-width: 768px) {
    bottom: 52px;
    width: 375px;
  }
`;

const UnderBarBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 5px;
`;

const UnderBarMenu = styled.div<TextColorChange>`
  display: block;

  span {
    font-family: NanumSquare_acB;
    font-size: 12px;
    text-align: center;
    color: ${(props) =>
      props.textColor === "clicked" ? "#f44016" : "#656667"};
  }
`;
