import React, { useEffect } from "react";
import {
  useProductCodeState,
  useProductCodeDispatch,
} from "../../contexts/ProductCodeContext";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import container from "../../../../injector";
import * as ViewModel from "../../../view-model";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Top from "../../widgets/Top";
import Button from "../../widgets/Button";
import Title from "../../widgets/Title";
import arrow from "../../images/ca-icon-top-navigation-back-arrow-idle@2x.png";
import MenuDown from "../../images/ca-icon-action-menu-down-idle.png";
import ControlBox from "../../widgets/ControlBox";
import InputBox from "../../widgets/InputBox";
import LightGrayFont from "../../widgets/LightGrayFont";
import SpaceBetweenLayout from "../../widgets/SpaceBetweenLayout";
import FilterLayout from "../../widgets/FilterLayout";
import TaskMainTitle from "../../widgets/TaskMainTitle";
import UpcomingStock from "./UpcomingStock";
import Marker from "../../widgets/Marker";

interface TaskId {
  id: string;
}

const ProductCode: React.FunctionComponent<RouteComponentProps<TaskId>> = (
  props
) => {
  const state = useProductCodeState();
  const dispatch = useProductCodeDispatch();
  const {
    openModal,
    quantity,
    memo,
    prepaidQuantity,
    task,
    status,
    selectedStatus,
  } = state;

  const vm: ViewModel.ProductDetailViewModel = container.get<
    ViewModel.ProductDetailViewModel
  >("ProductDetailViewModel");

  const saveTask = () => {
    console.log(task);
    vm.saveTaskInfo(
      quantity,
      selectedStatus,
      task.id,
      memo,
      prepaidQuantity
    ).then((res) => console.log(res));
    props.history.push(`/wtask/${task.wholesaler}`);
  };

  useEffect(() => {
    vm.getTaskDetail(props.match.params.id).then((res) => {
      console.log("a", res);
      dispatch({ type: "SET_TASK", task: res });
      vm.getStatus(res)
        .then((res) => {
          console.log(res);
          dispatch({ type: "SET_STATUS", status: res });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [props.match.params.id]);

  const clickBtn = (sequanceActive: any) => {
    dispatch({ type: "SET_ACTIVE", text: sequanceActive });
    if (sequanceActive === "미송") {
      dispatch({ type: "SET_MODAL" });
    }
  };

  return (
    <>
      <Nav />
      <FilterLayout>
        <Top>
          <img
            src={arrow}
            alt="arrow"
            onClick={() => props.history.push(`/wtask/${task.wholesaler}`)}
          />
          <TaskMainTitle top>Wholesaler</TaskMainTitle>
        </Top>
        {task && (
          <SpaceBetweenLayout padding="product">
            <div>
              <Title mode="taskTitle">{task.productCode}</Title>
              <LightGrayFont mode="taskOption" bigGrayFont>
                {task.productOption}
              </LightGrayFont>
            </div>
            <Marker category={task.type}>{task.type}</Marker>
          </SpaceBetweenLayout>
        )}
        <PriceLayout>
          <AmtBox leftBox>
            <LightGrayFont mode="inputTitle">단가</LightGrayFont>
            <InputBox value={task && task.productPrice} taskDetail />
          </AmtBox>
          <AmtBox>
            <LightGrayFont mode="inputTitle">요청수량 : 5</LightGrayFont>
            <InputBox
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({ type: "SET_QTY", qty: e.target.value });
              }}
              taskDetail
            />
          </AmtBox>
        </PriceLayout>
        <ViewerLayout>
          <TaskTitle>
            <LightGrayFont mode="normalPadding">처리 / 상품 상태</LightGrayFont>
          </TaskTitle>

          <RetailContainer>
            {status &&
              status.map((status: string, idx: number) => {
                return (
                  <ProcessBtn
                    name="status"
                    key={idx}
                    onClick={() => clickBtn(status)}
                    btnColor={selectedStatus === status}
                  >
                    {status}
                  </ProcessBtn>
                );
              })}
          </RetailContainer>
        </ViewerLayout>
        <MemoLayout>
          <LightGrayFont mode="inputTitle">메모</LightGrayFont>
          <InputBox
            value={memo}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "WRITE_MEMO", memo: event.target.value })
            }
            placeholder="메모를 입력할 수 있습니다"
            taskDetail
          />
        </MemoLayout>
        <ControlBox moveToRight>
          다른 업무에 적용
          <img src={MenuDown} alt="menudown" />
        </ControlBox>
        <Button
          mode="filter"
          buttonColor={
            Number(quantity) && selectedStatus && selectedStatus.length > 0
          }
          onClick={() => saveTask()}
        >
          저장
        </Button>
      </FilterLayout>
      {openModal && <UpcomingStock />}
      <Footer />
    </>
  );
};

export default ProductCode;

interface BtnStyle {
  btnColor: boolean;
}
interface AmtBoxStyle {
  leftBox?: boolean;
}

const PriceLayout = styled.div`
  display: flex;
  width: 100%;
  padding: 30px 20px 15px;
`;

const AmtBox = styled.div<AmtBoxStyle>`
  flex: 1;
  margin-right: ${(props) => props.leftBox && "15px"};
`;

const ViewerLayout = styled.div`
  width: 100%;
  padding: 13px 5px 13px 20px;
`;

const TaskTitle = styled.div`
  padding: 0 0 10px 0;
`;

const RetailContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ProcessBtn = styled.button<BtnStyle>`
  height: 36px;
  padding: 10px 12px;
  border-radius: 44.5px;
  border: ${(props) => (props.btnColor ? "none" : "solid 1px #b2b2b2")};
  background-color: ${(props) => (props.btnColor ? "#f44016" : "#fff")};
  color: ${(props) => (props.btnColor ? "#ffffff" : "#000000")};
  font-size: 14px;
  margin-bottom: 15px;
  margin-right: 15px;
`;

const MemoLayout = styled.div`
  width: 100%;
  margin: 15px 0 30px;
  padding: 0 20px;
`;
