import React, { useState, useEffect, useReducer } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import container from "../../../../injector";
import * as ViewModel from "../../../view-model";
import { Retailer, Wholesale, Task } from "../../../../domain/entity";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Top from "../../widgets/Top";
import SmallIcon from "../../widgets/SmallIcon";
import BigIcon from "../../widgets/BigIcon";
import Title from "../../widgets/Title";
import HeaderTitle from "../../widgets/HeaderTitle";
import TaskMainTitle from "../../widgets/TaskMainTitle";
import TaskMainBtn from "../../widgets/TaskMainBtn";
import CompleteBtn from "../../widgets/CompleteBtn";
import LightGrayFont from "../../widgets/LightGrayFont";
import GrayFont from "../../widgets/GrayFont";
import Marker from "../../widgets/Marker";
import SpaceBetweenLayout from "../../widgets/SpaceBetweenLayout";
import ControlBox from "../../widgets/ControlBox";
import arrow from "../../../../../src/app/view/images/ca-icon-top-navigation-back-arrow-idle@2x.png";
import phone from "../../images/ca-icon-action-phone-idle@2x.png";
import edit from "../../images/ca-icon-action-edit@2x.png";
import downArrow from "app/view/images/ca-icon-action-edit@2x.png";

export interface WholesaleId {
  id: string;
}

type State = {
  openList: number[];
  tasksByRetail: { [key: string]: Task[] };
  price: { [key: string]: number };
  retails: Retailer[];
  wholesale: Wholesale;
};

type Action =
  | { type: "OPEN_LIST"; openList: number }
  | { type: "CLOSE_ALL" }
  | { type: "SET_TASKS"; payload: { [key: string]: Task[] } }
  | { type: "SET_PRICE"; price: { [key: string]: number } }
  | { type: "SET_RETAIL"; retails: Retailer[] }
  | { type: "SET_WHOLESALE"; wholesale: Wholesale };

const initialState: State = {
  openList: [],
  tasksByRetail: {},
  retails: [],
  price: {},
  wholesale: {},
};

const reducer: React.Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  console.log(state, action);
  switch (action.type) {
    case "OPEN_LIST": {
      if (state.openList.includes(action.openList)) {
        return {
          ...state,
          openList: state.openList.filter(
            (retail) => retail !== action.openList
          ),
        };
      } else {
        return { ...state, openList: [...state.openList, action.openList] };
      }
    }
    case "CLOSE_ALL": {
      return { ...state, openList: [] };
    }
    case "SET_TASKS": {
      return { ...state, tasksByRetail: action.payload };
    }
    case "SET_PRICE": {
      return { ...state, price: action.price };
    }
    case "SET_RETAIL": {
      return { ...state, retails: action.retails };
    }
    case "SET_WHOLESALE": {
      return { ...state, wholesale: action.wholesale };
    }
    default:
      return state;
  }
};

const WTask: React.FunctionComponent<RouteComponentProps<WholesaleId>> = (
  props
) => {
  console.log("inspect", props);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { openList, tasksByRetail, price, retails, wholesale } = state;
  const [complete, setComplete] = useState<boolean>(false);
  const vm: ViewModel.WTaskViewModel = container.get<ViewModel.WTaskViewModel>(
    "WTaskViewModel"
  );

  useEffect(() => {
    vm.getWTask(props.match.params.id).then((res) => {
      console.log("whole", res);
      dispatch({ type: "SET_WHOLESALE", wholesale: res });
    });
    vm.getFilter()
      .then((res) => {
        console.log("filter", res);
        vm.getTasksByWholesaler(res, props.match.params.id)
          .then((res) => {
            console.log("tasks", res);
            vm.getTasksByRetailer(res, props.match.params.id).then((res) => {
              console.log("taskByRetail", res);
              dispatch({ type: "SET_TASKS", payload: res });
              vm.getTotalPrice(res).then((res) => {
                console.log("price", res);
                dispatch({ type: "SET_PRICE", price: res });
              });
            });
            vm.getRetailsByIds(res).then((res) => {
              console.log("retails", res);
              dispatch({ type: "SET_RETAIL", retails: res });
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Nav />
      <WholesaleLayout>
        <Top>
          <img
            src={arrow}
            alt="arrow"
            onClick={() => props.history.push("/tasks")}
          />
          <TaskMainTitle top>업무 상세</TaskMainTitle>
          <TaskMainBtn
            onClick={() => {
              setComplete(true);
              dispatch({ type: "CLOSE_ALL" });
            }}
          >
            전체 완료
          </TaskMainBtn>
        </Top>
        <WholesaleLayoutInner>
          <SpaceBetweenLayout padding="wholesale">
            <div>
              <LightGrayFont mode="subTitle" bigGrayFont>
                {wholesale.address && wholesale.address.building.fullName}&nbsp;
                {wholesale.address && wholesale.address.floor}&nbsp;
                {wholesale.address && wholesale.address.detail}
              </LightGrayFont>
              <HeaderTitle>{wholesale && wholesale.name}</HeaderTitle>
            </div>
            <BigIcon src={phone} alt="phone" />
          </SpaceBetweenLayout>
          {tasksByRetail &&
            Object.keys(tasksByRetail).map((retailId, idx) => {
              return (
                <RetailLayout key={idx}>
                  <RetailBox
                    onClick={() =>
                      dispatch({ type: "OPEN_LIST", openList: idx })
                    }
                  >
                    <SpaceBetweenLayout padding="retail">
                      {retails &&
                        retails.map((retail, idx) => {
                          return (
                            retail.id === retailId && (
                              <Title mode="taskTitle" key={idx}>
                                {retail.name}
                              </Title>
                            )
                          );
                        })}
                      <CompleteBtn onClick={() => setComplete(true)}>
                        완료
                      </CompleteBtn>
                    </SpaceBetweenLayout>
                    <SpaceBetweenLayout padding="default">
                      <LightGrayFont mode="normalPadding">
                        총 합계
                      </LightGrayFont>
                      <HeaderTitle>
                        {complete ? price[retailId].toLocaleString() : "0"}
                      </HeaderTitle>
                    </SpaceBetweenLayout>
                  </RetailBox>
                  {openList && openList.includes(idx) && (
                    <>
                      <RetailBox shipping>
                        <LightGrayFont mode="inputTitle">화물비</LightGrayFont>
                        <ShippingBox>
                          <ShippingInput />
                          <SmallIcon src={edit} alt="edit" />
                        </ShippingBox>
                      </RetailBox>
                      {tasksByRetail &&
                        tasksByRetail[retailId].map((task, idx) => {
                          return (
                            <Product
                              key={idx}
                              onClick={() =>
                                props.history.push(`/productcode/${task.id}`)
                              }
                            >
                              <Marker category={task.type}>{task.type}</Marker>
                              <ProductTextBox>
                                <SpaceBetweenLayout padding="default">
                                  <TaskMainTitle>
                                    {task.productName}
                                  </TaskMainTitle>
                                  <TaskMainTitle>
                                    {task.productPrice.toLocaleString()}
                                    &nbsp;원
                                  </TaskMainTitle>
                                </SpaceBetweenLayout>
                                <SpaceBetweenLayout padding="subInfo">
                                  <GrayFont>{task.productOption}</GrayFont>
                                  <ControlBox>
                                    수량: {task.requestedQuantity}
                                    <img src={downArrow} alt="downArrow" />
                                  </ControlBox>
                                </SpaceBetweenLayout>
                              </ProductTextBox>
                            </Product>
                          );
                        })}
                    </>
                  )}
                </RetailLayout>
              );
            })}
        </WholesaleLayoutInner>
      </WholesaleLayout>
      <Footer />
    </>
  );
};
export default WTask;

interface WholesaleStyle {
  shipping?: boolean;
}

const WholesaleLayout = styled.div`
  width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 375px;
  }
`;

const WholesaleLayoutInner = styled.div`
  background: #f4f6f8;
  height: calc(100vh - 111px);
  padding: 21px 10px 20px;
`;

const RetailLayout = styled.div`
  margin-top: 20px;
  border-radius: 3px;
  box-shadow: 0 7px 20px 5px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

const RetailBox = styled.div<WholesaleStyle>`
  padding: 20px;
  border-top: ${(props) => props.shipping && "1px solid #e0e0e1"};
`;

const ShippingBox = styled.div`
  display: flex;
  align-items: center;
`;

const ShippingInput = styled.input`
  width: 100%;
  height: 46px;
  padding-left: 10px;
  margin-right: 20px;
  border-radius: 2px;
  border: solid 1px #e0e0e1;
  font-size: 14px;
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px 13px 11px;
  border-top: 1px solid #e0e0e1;
`;

const ProductTextBox = styled.div`
  flex: 1;
  padding-left: 11px;
`;
