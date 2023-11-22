import { createContext } from "react";
import { IAuthState, IAuthAction } from "./reducer";

const AuthStateContext = createContext<any>(null);
const AuthDispatchContext = createContext<any>(null);

export { AuthStateContext, AuthDispatchContext };
