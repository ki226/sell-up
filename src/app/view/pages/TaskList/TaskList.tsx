import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import container from "../../../../injector";
import * as ViewModel from "../../../view-model";
import { Retailer, Task } from "../../../../domain/entity";
import {
  useTaskListState,
  useTaskListDispatch,
  State,
} from "../../contexts/TaskListContext";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import UnderBar from "../../components/UnderBar";
import Tag from "../../widgets/Tag";
import Marker from "../../widgets/Marker";
import Title from "../../widgets/Title";
import HeaderTitle from "../../widgets/HeaderTitle";
import GrayFont from "../../widgets/GrayFont";
import TaskMainTitle from "../../widgets/TaskMainTitle";
import BigIcon from "../../widgets/BigIcon";
import SmallIcon from "../../widgets/SmallIcon";
import SpaceBetweenLayout from "../../widgets/SpaceBetweenLayout";
import TopFilter from "../../images/ca-icon-action-filter@2x.png";
import TopSort from "../../images/ca-icon-action-sort@2x.png";
import ClearBtn from "../../images/ca-icon-action-tag-clear-idle@2x.png";
import Floor from "../../images/ca-icon-action-floor-filter-idle@2x.png";
import Cloud from "../../images/ca-icon-content-cloud-upload@2x.png";

const day = new Date();

const TaskList: React.FunctionComponent<RouteComponentProps> = (props) => {
  const state: State = useTaskListState();
  const dispatch = useTaskListDispatch();
  const {
    filter,
    taskInfo,
    wholesaleInfo,
    buildingInfo,
    retailInfo,
    floorList,
  } = state;
  const [clickFloor, setClickFloor] = useState<{} | null>(null);

  const vm: ViewModel.TaskListViewModel = container.get<
    ViewModel.TaskListViewModel
  >("TaskListViewModel");

  useEffect(() => {
    vm.getFilter().then((res) => {
      dispatch({
        type: "SET_FILTER",
        data: res,
      });
      vm.getTasksByFilter(res).then((res) => {
        console.log("tasks", res);
        dispatch({
          type: "SET_TASK",
          data: res,
        });
        vm.getWholesaleByTasks(res).then((res) => {
          console.log("whole", res);
          dispatch({
            type: "SET_WHOLESALE",
            data: res,
          });

          vm.getBuildingsByWholesale(res).then((res) => {
            console.log("building", res);
            dispatch({
              type: "SET_BUILDING",
              data: res,
            });
          });
        });
        vm.getRetailByTasks(res).then((res) => {
          console.log("retail", res);
          dispatch({
            type: "SET_RETAIL",
            data: res,
          });
        });
      });
    });
  }, []);

  const removeBuilding = (name: string) => {
    vm.deleteBuildings(name).then((res) => {
      console.log("delete", res, filter);
      dispatch({
        type: "SET_FILTER",
        data: res,
      });
    });
  };

  const removeRetail = (name: string) => {
    vm.deleteRetails(name).then((res) => {
      console.log("delete", res, filter);
      dispatch({
        type: "SET_FILTER",
        data: res,
      });
    });
  };

  return (
    <>
      <Nav />
      <Layout>
        <TopContainer>
          <HeaderTitle>
            {day.getFullYear()}년 {day.getMonth() + 1}월 {day.getDate()}일
          </HeaderTitle>
          <SpaceBetweenLayout padding="none">
            <TopIcon type="filter">
              <SmallIcon
                src={TopFilter}
                alt="filter"
                onClick={() => props.history.push("/filter")}
              />
            </TopIcon>
            <TopIcon type="sort">
              <SmallIcon src={TopSort} alt="sort" />
            </TopIcon>
          </SpaceBetweenLayout>
        </TopContainer>
        <FilteredForm>
          <FilteredTasks>
            {filter &&
              filter.retail.map((retail, idx) => (
                <Tag key={idx} mode="middle" display="noClick">
                  <span>{retail.name}</span>
                  <img
                    src={ClearBtn}
                    alt="clearBtn"
                    onClick={() => removeRetail(retail.name)}
                  />
                </Tag>
              ))}
          </FilteredTasks>
          <FilteredBuildings>
            {filter &&
              filter.building.map((building, idx) => (
                <Tag
                  key={idx}
                  display={
                    buildingInfo &&
                    !Object.keys(buildingInfo).includes(building.fullName)
                      ? "click"
                      : "noClick"
                  }
                  mode="big"
                >
                  <a href={`#${building.fullName}`}>
                    <span>{building.fullName}</span>
                  </a>
                  <img
                    onClick={() => removeBuilding(building.fullName)}
                    src={ClearBtn}
                    alt="clearBtn"
                  />
                </Tag>
              ))}
          </FilteredBuildings>
        </FilteredForm>
        {buildingInfo &&
          Object.keys(buildingInfo).map((building, idx) => (
            <MainContent key={idx}>
              <MainTitleLayout>
                <Title mode="taskTitle">{building}</Title>
                <FloorContainer>
                  <FloorIconContainer>
                    <BigIcon src={Floor} alt="floorIcon" />
                  </FloorIconContainer>
                  <FloorListLayout>
                    {floorList.map((floor, idx) => (
                      <FloorList
                        key={idx}
                        floorFont={clickFloor && clickFloor[building] === floor}
                      >
                        &nbsp;&nbsp;
                        <span
                          className="floors"
                          onClick={() =>
                            setClickFloor({ ...clickFloor, [building]: floor })
                          }
                        >
                          {floor}
                        </span>
                      </FloorList>
                    ))}
                  </FloorListLayout>
                </FloorContainer>
              </MainTitleLayout>
              {buildingInfo[building].map(
                (whole: string) =>
                  wholesaleInfo &&
                  wholesaleInfo.map(
                    (wholesale, idx) =>
                      whole === wholesale.id &&
                      clickFloor &&
                      clickFloor[building] === wholesale.address.floor && (
                        <MainLayout
                          key={idx}
                          onClick={() =>
                            props.history.push(`/wtask/${wholesale.id}`)
                          }
                        >
                          <MainContentLayout>
                            <SpaceBetweenLayout padding="none">
                              <TextTitle>
                                <TaskMainTitle>{wholesale.name}</TaskMainTitle>
                                <GrayFont taskList>
                                  {wholesale.address.detail}
                                </GrayFont>
                              </TextTitle>

                              <CloudImg>
                                <SmallIcon src={Cloud} alt="upload" />
                              </CloudImg>
                            </SpaceBetweenLayout>

                            <MainContentTask>
                              <TaskListContainer>
                                {retailInfo &&
                                  retailInfo[whole].map(
                                    (retail: Retailer, idx: number) => (
                                      <Tag
                                        mode="small"
                                        key={idx}
                                        display="noClick"
                                      >
                                        <span>{retail.name}</span>
                                        <img src={ClearBtn} alt="clearBtn" />
                                      </Tag>
                                    )
                                  )}
                              </TaskListContainer>
                              <TaskCategoryContainer>
                                {taskInfo &&
                                  taskInfo[whole].map(
                                    (task: Task[], idx: number) => (
                                      <Marker
                                        key={idx}
                                        mode="taskList"
                                        category={task.type}
                                      >
                                        {task.type}
                                      </Marker>
                                    )
                                  )}
                              </TaskCategoryContainer>
                            </MainContentTask>
                          </MainContentLayout>
                        </MainLayout>
                      )
                  )
              )}
            </MainContent>
          ))}

        <UnderBar />
      </Layout>
      <Footer />
    </>
  );
};

export default TaskList;

interface FontStyle {
  floorFont: boolean;
}

interface Type {
  type: string;
}

const Layout = styled.div`
  margin: 0 auto 48px;

  @media (min-width: 768px) {
    margin: 0 auto 100px;
    width: 375px;
  }
`;

const TopContainer = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 18px 0 0;
  padding: 10px 10px 10px 20px;
`;

const TopIcon = styled.div<Type>`
  width: 44px;
  height: 44px;
  padding: ${(props) => (props.type === "filter" ? "10px 0 20px" : "10px 0")};
`;

const FilteredForm = styled.div`
  margin-top: 15px;
  padding: 0 0 20px 15px;
  border-bottom: 1px solid #e0e0e1;
`;

const FilteredTasks = styled.div`
  display: flex;
`;

const FilteredBuildings = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`;

const MainTitleLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0 5px 20px;
  border-bottom: 1px solid #e0e0e1;
`;

const FloorContainer = styled.div`
  margin-right: 30px;
`;

const FloorIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FloorListLayout = styled.div`
  display: flex;
`;

const FloorList = styled.div<FontStyle>`
  display: flex;
  margin-top: 5px;

  span {
    font-family: NanumSquare_acB;
    font-size: 12px;
    text-align: center;
    color: ${(props) => (props.floorFont ? "#656667" : "#d0d1d1")};
  }

  .floors {
    cursor: pointer;
  }
`;

const MainLayout = styled.div`
  border-bottom: 1px solid #e0e0e1;
`;

const MainContent = styled.div``;

const MainContentLayout = styled.div`
  padding: 10px 0;
`;

const TextTitle = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const CloudImg = styled.div`
  margin-right: 30px;
`;

const MainContentTask = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  margin-top: 15px;
`;

const TaskListContainer = styled.div`
  width: 50%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
`;

const TaskCategoryContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 30px;
`;
