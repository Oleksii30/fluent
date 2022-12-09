import React, { useReducer } from "react"

import { AuthStateContext, AuthDispatchContext } from "./Context"
import authReducer, { initialState } from "./reducer"

type Props = {
    children: JSX.Element,
};

export function AuthProvider({ children }:Props) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}
