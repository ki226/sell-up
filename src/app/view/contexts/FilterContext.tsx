import React, { useReducer, createContext, Dispatch, useContext } from "react";
import { Retailer, Building, TaskType, Filter } from "../../../domain/entity";

export type State = {
  switchBtn: boolean;
  filter: Filter;
  retails: Retailer[];
  buildings: Building[];
  types: TaskType[];
  activeBtnRetailList: Retailer[];
  activeBtnBuildingList: Building[];
  activeBtnTypeList: TaskType[];
};

type Action =
  | { type: "SWITCH" }
  | { type: "SET_FILTER"; filter: Filter }
  | { type: "SET_RETAIL"; retails: Retailer[] }
  | { type: "SET_BUILDINGS"; buildings: Building[] }
  | { type: "SET_TYPES"; types: TaskType[] }
  | {
      type: "CLICK_ALL_BTNS";
      name: string;
      category: Retailer[] | Building[] | TaskType[];
    }
  | { type: "SET_ACTIVE_RETAIL_BTNS"; retails: Retailer[] }
  | { type: "SET_ACTIVE_BUILDING_BTNS"; buildings: Building[] }
  | { type: "SET_ACTIVE_TYPES_BTNS"; types: TaskType[] }
  | { type: "CLICK_FILTER_BTN"; name: string; btn: Retailer | Building }
  | { type: "CLICK_TYPE_BTN"; payload: TaskType };

const initialState: State = {
  switchBtn: false,
  filter: {},
  retails: [],
  buildings: [],
  types: [],
  activeBtnRetailList: [],
  activeBtnBuildingList: [],
  activeBtnTypeList: [],
};

const reducer: React.Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  switch (action.type) {
    case "SWITCH": {
      return { ...state, switchBtn: !state.switchBtn };
    }
    case "SET_FILTER": {
      return { ...state, filter: action.filter };
    }
    case "SET_RETAIL": {
      return { ...state, retails: action.retails };
    }
    case "SET_BUILDINGS": {
      return { ...state, buildings: action.buildings };
    }
    case "SET_TYPES": {
      return { ...state, types: action.types };
    }
    case "CLICK_ALL_BTNS": {
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.name]:
            state.filter[action.name].length === action.category.length
              ? []
              : action.category,
        },
      };
    }
    case "CLICK_FILTER_BTN": {
      const filterIds: string[] = state.filter[action.name].map(
        (filterList: Retailer[] | Building[]) => {
          return filterList.id;
        }
      );
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.name]: filterIds.includes(action.btn.id)
            ? state.filter[action.name].filter(
                (task: any) => task.id !== action.btn.id
              )
            : [...state.filter[action.name], action.btn],
        },
      };
    }
    case "CLICK_TYPE_BTN": {
      return {
        ...state,
        filter: {
          ...state.filter,
          type: state.filter.type.includes(action.payload)
            ? state.filter.type.filter(
                (filterType) => filterType !== action.payload
              )
            : [...state.filter.type, action.payload],
        },
      };
    }
    case "SET_ACTIVE_RETAIL_BTNS": {
      return {
        ...state,
        activeBtnRetailList: action.retails,
      };
    }
    case "SET_ACTIVE_BUILDING_BTNS": {
      return {
        ...state,
        activeBtnBuildingList: action.buildings,
      };
    }
    case "SET_ACTIVE_TYPES_BTNS": {
      return {
        ...state,
        activeBtnTypeList: action.types,
      };
    }
    default:
      return state;
  }
};

const FilterStateContext = createContext<State | undefined>(undefined);
const FilterDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
);

export const useFilterState = () => {
  const state = useContext(FilterStateContext);
  if (!state) throw new Error("FilterProvider not found");
  return state;
};

export const useFilterDispatch = () => {
  const dispatch = useContext(FilterDispatchContext);
  if (!dispatch) throw new Error("FilterProvider not found");
  return dispatch;
};

export const FilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FilterDispatchContext.Provider value={dispatch}>
      <FilterStateContext.Provider value={state}>
        {children}
      </FilterStateContext.Provider>
    </FilterDispatchContext.Provider>
  );
};
