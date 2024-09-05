import React, { useReducer } from "react";
import { FilterStateContext, FilterDispatchContext } from "./Context";
import filterReducer, { initialState } from "./reducer";

type Props = {
  children: JSX.Element,
};

export function FilterProvider({ children }:Props) {
  const [state, dispatch] = useReducer(filterReducer, initialState)

  return (
    <FilterStateContext.Provider value={state}>
      <FilterDispatchContext.Provider value={dispatch}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterStateContext.Provider>
  );
}
