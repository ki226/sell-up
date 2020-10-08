import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import container from "../../../../injector";
import * as ViewModel from "../../../view-model";
import { Retailer, Building } from "../../../../domain/entity";
import {
  useFilterState,
  useFilterDispatch,
  State,
} from "../../contexts/FilterContext";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Top from "../../widgets/Top";
import HeaderTitle from "../../widgets/HeaderTitle";
import TaskMainBtn from "../../widgets/TaskMainBtn";
import TaskMainTitle from "../../widgets/TaskMainTitle";
import SpaceBetweenLayout from "../../widgets/SpaceBetweenLayout";
import FilterLayout from "../../widgets/FilterLayout";
import close from "../../images/ca-icon-top-navigation-close-idle@2x.png";
import switchOn from "../../images/ca-icon-selection-switch-on.png";
import Initialization from "../../images/ca-icon-action-clear.png";
import switchOff from "../../images/ca-icon-selection-switch-off.png";

const FilterPage: React.FunctionComponent<RouteComponentProps> = (props) => {
  const state: State = useFilterState();
  const dispatch = useFilterDispatch();
  const {
    switchBtn,
    filter,
    retails,
    buildings,
    types,
    activeBtnRetailList,
    activeBtnBuildingList,
    activeBtnTypeList,
  } = state;

  const vm: ViewModel.FilterViewModel = container.get<
    ViewModel.FilterViewModel
  >("FilterViewModel");

  useEffect(() => {
    if (filter !== undefined) {
      dispatch({ type: "SET_ACTIVE_RETAIL_BTNS", retails: filter.retail });
      dispatch({
        type: "SET_ACTIVE_BUILDING_BTNS",
        buildings: filter.building,
      });
      dispatch({ type: "SET_ACTIVE_TYPES_BTNS", types: filter.type });
    }
    console.log("filter", filter);
  }, [filter]);

  useEffect(() => {
    if (retails.length > 0 && buildings.length > 0 && types.length > 0) {
      vm.getFilter().then((res) => {
        console.log("filter", res);
        dispatch({ type: "SET_FILTER", filter: res });
      });
    }
  }, [retails, buildings, types]);

  useEffect(() => {
    vm.getTasks()
      .then((res) => {
        console.log("task", res);
        vm.getRetailsByIds(res)
          .then((res) => {
            console.log("retail", res);
            dispatch({ type: "SET_RETAIL", retails: res });
          })
          .catch((err) => {
            console.log(err);
          });
        vm.getWholesalesByIds(res)
          .then((res) => {
            console.log("wholesale", res);
            vm.getBuildingsByIds(res)
              .then((res) => {
                console.log("building", res);
                dispatch({ type: "SET_BUILDINGS", buildings: res });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
    vm.getTypes()
      .then((res) => {
        console.log(res);
        dispatch({ type: "SET_TYPES", types: res });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const saveFilter = () => {
    vm.saveFilter(filter)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  const changeBtnColor = (
    taskId: string,
    list: Retailer[] | Building[]
  ): boolean => {
    const listIds: string[] =
      list &&
      list.map((el: any) => {
        return el.id;
      });
    if (listIds && listIds.includes(taskId)) {
      return Boolean(true);
    } else {
      return Boolean(false);
    }
  };

  return (
    <>
      <Nav />
      <FilterLayout>
        <Top>
          <img
            src={close}
            alt="close"
            onClick={() => props.history.push("/tasks")}
          />
          <TaskMainTitle top>필터</TaskMainTitle>
          <TaskMainBtn colorChange onClick={saveFilter}>
            확인
          </TaskMainBtn>
        </Top>
        <SpaceBetweenLayout padding="completeTask">
          <TaskMainTitle>완료 업무 보기</TaskMainTitle>
          <SwitchBtn>
            <img
              src={switchBtn ? switchOn : switchOff}
              alt="switch"
              onClick={() => {
                dispatch({ type: "SWITCH" });
              }}
            />
          </SwitchBtn>
        </SpaceBetweenLayout>

        <ViewerLayout>
          <SpaceBetweenLayout padding="filter">
            <HeaderTitle>소매업체</HeaderTitle>
            <TaskMainBtn
              name="retail"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                dispatch({
                  type: "CLICK_ALL_BTNS",
                  name: e.target.name,
                  category: retails,
                });
              }}
            >
              전체 선택
            </TaskMainBtn>
          </SpaceBetweenLayout>
          <TaskNumber>
            <TaskContainer>
              {retails &&
                retails.map((retail, idx) => {
                  return (
                    <TaskLayout
                      name="retail"
                      key={idx}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        dispatch({
                          type: "CLICK_FILTER_BTN",
                          name: e.target.name,
                          btn: retail,
                        });
                      }}
                      btnColor={changeBtnColor(retail.id, activeBtnRetailList)}
                    >
                      {retail.name}
                    </TaskLayout>
                  );
                })}
            </TaskContainer>
          </TaskNumber>
        </ViewerLayout>

        <ViewerLayout>
          <SpaceBetweenLayout padding="filter">
            <HeaderTitle>상가</HeaderTitle>
            <TaskMainBtn
              name="building"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                dispatch({
                  type: "CLICK_ALL_BTNS",
                  name: e.target.name,
                  category: buildings,
                })
              }
            >
              전체 선택
            </TaskMainBtn>
          </SpaceBetweenLayout>
          <TaskNumber>
            <TaskContainer>
              {buildings &&
                buildings.map((building, idx) => {
                  return (
                    <TaskLayout
                      name="building"
                      key={idx}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        dispatch({
                          type: "CLICK_FILTER_BTN",
                          name: e.target.name,
                          btn: building,
                        })
                      }
                      btnColor={changeBtnColor(
                        building.id,
                        activeBtnBuildingList
                      )}
                    >
                      {building.fullName}
                    </TaskLayout>
                  );
                })}
            </TaskContainer>
          </TaskNumber>
        </ViewerLayout>

        <ViewerLayout>
          <SpaceBetweenLayout padding="filter">
            <HeaderTitle>업무</HeaderTitle>
            <TaskMainBtn
              name="type"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                dispatch({
                  type: "CLICK_ALL_BTNS",
                  name: e.target.name,
                  category: types,
                })
              }
            >
              전체 선택
            </TaskMainBtn>
          </SpaceBetweenLayout>
          <TaskNumber>
            <TaskContainer>
              {types &&
                types.map((type, idx) => {
                  return (
                    <TaskLayout
                      key={idx}
                      onClick={() => {
                        dispatch({ type: "CLICK_TYPE_BTN", payload: type });
                      }}
                      btnColor={
                        activeBtnTypeList && activeBtnTypeList.includes(type)
                      }
                    >
                      {type}
                    </TaskLayout>
                  );
                })}
            </TaskContainer>
          </TaskNumber>
        </ViewerLayout>
        <InitializationLayout>
          <img src={Initialization} alt="close" />
          필터 초기화
        </InitializationLayout>
      </FilterLayout>
      <Footer />
    </>
  );
};

export default FilterPage;

interface BtnColor {
  btnColor?: boolean;
}

const SwitchBtn = styled.div`
  display: flex;
`;

const ViewerLayout = styled.div`
  width: 100%;
  height: 179px;
  padding: 13px 20px;
  @media (min-width: 768px) {
    width: 375px;
  }
`;

const TaskNumber = styled.div`
  height: 87px;
  margin-top: 3px;
`;

const TaskContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TaskLayout = styled.button<BtnColor>`
  width: 65px;
  height: 36px;
  border-radius: 44.5px;
  border: ${(props) => (props.btnColor ? "none" : "solid 1px #b2b2b2")};
  align-content: center;
  margin-right: 15px;
  margin-bottom: 15px;
  color: ${(props) => (props.btnColor ? "#fff" : "#000")};
  background-color: ${(props) => (props.btnColor ? "#f44016" : "#fff")};
`;

const InitializationLayout = styled.div`
  width: 100%;
  height: 60px;
  display: inline-grid;
  justify-items: center;
  padding-top: 5px;
  margin-bottom: 30px;
`;
