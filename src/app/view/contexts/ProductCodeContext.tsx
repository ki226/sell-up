import React, { useReducer, createContext, useContext, Dispatch } from "react";
import { Task, StateStatus, TaskType } from "../../../domain/entity";

type State = {
  openModal: boolean;
  quantity: string;
  memo: string;
  prepaidQuantity: number | null;
  dayList: number[];
  task: Task;
  status: StateStatus[];
  selectedStatus: string;
};

type Action =
  | { type: "SET_ACTIVE"; text: string }
  | { type: "SET_MODAL" }
  | { type: "SET_QTY"; qty: string }
  | {
      type: "SET_MEMO";
      prepaidQuantity?: null;
      dayList?: number[];
      memo: string;
    }
  | { type: "SET_PREQTY"; prepaidQuantity: number }
  | { type: "SET_DAY"; day: number }
  | { type: "SET_TASK"; task: Task }
  | { type: "SET_STATUS"; status: StateStatus[] }
  | { type: "WRITE_MEMO"; memo: string };

const initialState: State = {
  openModal: false,
  quantity: "",
  memo: "",
  prepaidQuantity: null,
  dayList: [],
  task: [],
  status: [],
  selectedStatus: "",
};

const reducer: React.Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  console.log(state, action);
  switch (action.type) {
    case "SET_ACTIVE":
      return { ...state, selectedStatus: action.text };
    case "SET_MODAL":
      return { ...state, openModal: !state.openModal };
    case "SET_QTY":
      return {
        ...state,
        quantity: action.qty,
      };
    case "SET_MEMO":
      return {
        ...state,
        memo:
          state.dayList.length === 1
            ? `${action.prepaidQuantity}장 / 8월 ${action.dayList[0]}일`
            : `${action.prepaidQuantity}장 / 8월 ${action.dayList[0]}일 - ${action.dayList[1]}일`,
      };
    case "SET_PREQTY":
      return { ...state, prepaidQuantity: action.prepaidQuantity };
    case "SET_DAY":
      return {
        ...state,
        dayList: state.dayList.includes(action.day)
          ? state.dayList.filter((list: any) => list !== action.day)
          : [...state.dayList, action.day],
      };

    case "SET_TASK":
      return { ...state, task: action.task };
    case "SET_STATUS":
      return { ...state, status: action.status };
    case "WRITE_MEMO":
      return { ...state, status: action.memo };
    default:
      return state;
  }
};

const ProductCodeStateContext = createContext<State | undefined>(undefined);
const ProductCodeDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
);

export const useProductCodeState = () => {
  const state = useContext(ProductCodeStateContext);
  if (!state) throw new Error("ProductCodeProvider not found");
  return state;
};
export const useProductCodeDispatch = () => {
  const dispatch = useContext(ProductCodeDispatchContext);
  if (!dispatch) throw new Error("ProductCodeProvider not found");
  return dispatch;
};

export const ProductCodeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ProductCodeDispatchContext.Provider value={dispatch}>
      <ProductCodeStateContext.Provider value={state}>
        {children}
      </ProductCodeStateContext.Provider>
    </ProductCodeDispatchContext.Provider>
  );
};
