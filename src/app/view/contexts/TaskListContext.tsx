import React, { useReducer, useContext, createContext, Dispatch } from "react";
import {
  Building,
  Retailer,
  Task,
  Wholesale,
  Filter,
} from "../../../domain/entity";

type State = {
  filter: Filter | null;
  wholesaleInfo: Wholesale[];
  buildingInfo: Building | null;
  taskInfo: Task[];
  retailInfo: Retailer[];
  floorList: string[];
};

type Action =
  | { type: "SET_FILTER"; data: Filter }
  | { type: "SET_TASK"; data: Task[] }
  | { type: "SET_WHOLESALE"; data: Wholesale[] }
  | { type: "SET_BUILDING"; data: Building }
  | { type: "SET_RETAIL"; data: Retailer[] }
  | { type: "REMOVE_BUILDING"; name: string };

const initialState: State = {
  filter: null,
  wholesaleInfo: [],
  buildingInfo: null,
  taskInfo: [],
  retailInfo: [],
  floorList: ["B2", "B1", "1F", "2F", "3F", "4F"],
};

const taskListReducer: React.Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        filter: action.data,
      };
    case "SET_WHOLESALE": {
      return {
        ...state,
        wholesaleInfo: action.data,
      };
    }
    case "SET_BUILDING": {
      return {
        ...state,
        buildingInfo: action.data,
      };
    }
    case "SET_TASK": {
      return {
        ...state,
        taskInfo: action.data,
      };
    }
    case "SET_RETAIL": {
      return {
        ...state,
        retailInfo: action.data,
      };
    }
    default:
      return state;
  }
};

const TaskListStateContext = createContext<State | undefined>(undefined);
const TaskListDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
);

export const useTaskListState = () => {
  const state = useContext(TaskListStateContext);
  if (!state) throw new Error("TaskListProvider not found");
  return state;
};

export const useTaskListDispatch = () => {
  const dispatch = useContext(TaskListDispatchContext);
  if (!dispatch) throw new Error("TaskListProvider not found");
  return dispatch;
};

export const TaskListContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(taskListReducer, initialState);
  return (
    <TaskListDispatchContext.Provider value={dispatch}>
      <TaskListStateContext.Provider value={state}>
        {children}
      </TaskListStateContext.Provider>
    </TaskListDispatchContext.Provider>
  );
};
