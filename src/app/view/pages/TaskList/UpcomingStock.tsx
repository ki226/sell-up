import React, { useState, useEffect } from "react";
import styled from "styled-components";
import container from "../../../../injector";
import * as ViewModel from "../../../view-model";
import { Week } from "../../../../domain/entity";
import {
  useProductCodeState,
  useProductCodeDispatch,
} from "../../contexts/ProductCodeContext";
import Button from "../../widgets/Button";
import HeaderTitle from "../../widgets/HeaderTitle";
import close from "../../images/ca-icon-top-navigation-close-idle@2x.png";
import MenuDown from "../../images/ca-icon-action-menu-down-idle.png";
import ControlBox from "../../widgets/ControlBox";
import checkOn from "../../images/ca-icon-selection-radio-selected.png";
import checkOff from "../../images/ca-icon-selection-radio-unselected.png";

interface CheckState {
  firstCheck: boolean;
  secondCheck: boolean;
  thirdCheck: boolean;
}

const year = new window.Date().getFullYear();
const month = new window.Date().getMonth() + 1;

const UpcomingStock: React.FunctionComponent = () => {
  const state = useProductCodeState();
  const dispatch = useProductCodeDispatch();
  const { quantity, prepaidQuantity, dayList } = state;
  const [isQtyBoxOpen, setIsQtyBoxOpen] = useState<boolean>(false);
  const [checkClick, setCheckClick] = useState<CheckState>({
    firstCheck: false,
    secondCheck: false,
    thirdCheck: false,
  });
  const { firstCheck, secondCheck, thirdCheck } = checkClick;
  const [thisWeek, setThisWeek] = useState<Week[]>([]);

  const vm: ViewModel.ProductDetailViewModel = container.get<
    ViewModel.ProductDetailViewModel
  >("ProductDetailViewModel");

  useEffect(() => {
    vm.getDate().then((res) => {
      console.log(res);
      setThisWeek(res);
    });
  }, []);

  const clickStockModal = () => {
    dispatch({ type: "SET_MODAL" });
    dispatch({
      type: "SET_MEMO",
      prepaidQuantity: prepaidQuantity,
      dayList: dayList,
    });
  };

  return (
    <>
      <StockSectionLayout>
        <StockWrapper>
          <TopArrow>
            <img
              src={close}
              alt="arrow"
              onClick={() => clickStockModal()} //child
            />
          </TopArrow>
          <StockLayout>
            <TaskCompletionViewer>미송 입고 예정</TaskCompletionViewer>
            <SubViewer>
              미송 수량
              <ControlBox>
                수량: {prepaidQuantity} / {quantity}
                <img
                  src={MenuDown}
                  alt="menudown"
                  onClick={() => setIsQtyBoxOpen(!isQtyBoxOpen)}
                />
                {isQtyBoxOpen ? (
                  <QtyBox>
                    {new Array(Number(quantity))
                      .fill(null)
                      .map((filtered, idx) => {
                        return (
                          <QtyNum
                            key={idx}
                            onClick={(e) => {
                              dispatch({
                                type: "SET_PREQTY",
                                prepaidQuantity: e.target.innerText,
                              });
                              setIsQtyBoxOpen(!isQtyBoxOpen);
                            }}
                          >
                            {idx + 1}
                          </QtyNum>
                        );
                      })}
                  </QtyBox>
                ) : (
                  false
                )}
              </ControlBox>
            </SubViewer>
          </StockLayout>
          <DateLayout>
            <Date>
              {year}년&nbsp;
              {month}월-{month + 1}월
            </Date>
            <DateDes>
              <CalendarBox>
                {thisWeek &&
                  thisWeek.map(
                    (oneDay, idx) =>
                      oneDay[1] !== "토밤" && (
                        <EachDateBox
                          key={idx}
                          onClick={() => {
                            if (
                              dayList.length === 2 &&
                              !dayList.includes(oneDay[0])
                            ) {
                              return;
                            }
                            dispatch({
                              type: "SET_DAY",
                              day: oneDay[0],
                            });
                          }}
                          dayPaint={dayList && dayList.includes(oneDay[0])}
                        >
                          <HeaderTitle>{oneDay[0]}</HeaderTitle>
                          <DateNight>{oneDay[1]}</DateNight>
                        </EachDateBox>
                      )
                  )}
              </CalendarBox>
            </DateDes>
            <StockCheck>
              <DateCheck
                onClick={() =>
                  setCheckClick({
                    ...checkClick,
                    firstCheck: !firstCheck,
                  })
                }
                src={firstCheck ? checkOn : checkOff}
              />
              <DateList>이번주 중</DateList>
              <DateCheck
                onClick={() =>
                  setCheckClick({
                    ...checkClick,
                    secondCheck: !secondCheck,
                  })
                }
                src={secondCheck ? checkOn : checkOff}
              />
              <DateList>다음주 중</DateList>
              <DateCheck
                onClick={() =>
                  setCheckClick({
                    ...checkClick,
                    thirdCheck: !thirdCheck,
                  })
                }
                src={thirdCheck ? checkOn : checkOff}
              />
              <DateList>입고 예정</DateList>
            </StockCheck>
          </DateLayout>
          <Button
            mode="dateConfirm"
            buttonColor={firstCheck || secondCheck || thirdCheck}
            onClick={() => clickStockModal()}
          >
            확인
          </Button>
        </StockWrapper>
      </StockSectionLayout>
    </>
  );
};
export default UpcomingStock;

interface BtnStyle {
  buttonColor: boolean;
}

interface dayBackground {
  dayPaint: boolean;
}

const StockSectionLayout = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 51px;
  z-index: 100;
  width: 100%;
  height: 667px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.65);
  @media (min-width: 768px) {
    width: 375px;
  }
`;

const TopArrow = styled.div`
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #e0e0e1;
  display: flex;
  justify-content: flex-end;
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-right: -10px;
  }
`;

const StockWrapper = styled.div`
  width: 100%;
  height: 416px;
  background-color: #ffffff;
  margin-top: 251px;
`;

const StockLayout = styled.div`
  align-items: center;
  margin: 21px 20px;
  border-bottom: 1px solid #e0e0e1;
  background-color: #ffffff;
  justify-content: space-between;
  padding-bottom: 22px;
`;

const TaskCompletionViewer = styled.h1`
  background-color: #ffffff;
  height: 29px;
  font-size: 26px;
  margin-bottom: 10px;
`;

const SubViewer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const QtyBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
  position: absolute;
  top: 30px;
  width: 90px;
  height: 180px;
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
  overflow-x: hidden;
  cursor: pointer;
`;

const QtyNum = styled.div<BtnStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 3px;
  width: 100%;
  height: 40px;
  cursor: pointer;
  &:hover {
    background-color: #e7ecf1;
  }
`;

const DateLayout = styled.div`
  padding: 0 20px;
`;

const Date = styled.div`
  font-size: 14px;
  letter-spacing: 0.32px;
  color: #848485;
`;

const DateDes = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  margin-top: 15px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CalendarBox = styled.button<BtnStyle>`
  display: flex;
  width: auto;
  text-align: center;
  border: none;
  background: none;
`;

const EachDateBox = styled.div<dayBackground>`
  width: 44px;
  margin-right: 20px;
  background-color: ${(props) => props.dayPaint && "#e7ecf1"};
  &:hover {
    background-color: #e7ecf1;
  }
`;

const DateNight = styled.div`
  width: 100%;
  font-size: 12px;
  color: #848485;
`;

const StockCheck = styled.div`
  display: flex;
  margin-top: 30px;
  img {
    width: 20px;
  }
`;

const DateCheck = styled.img`
  padding-top: 2px;
  font-size: 14px;
`;

const DateList = styled.div`
  padding: 2px 10px 0 10px;
`;
