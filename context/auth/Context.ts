import { createContext } from "react";
import { IAuthState, IAuthAction } from "./reducer";

const AuthStateContext = createContext<IAuthState | null>(null);
const AuthDispatchContext = createContext< React.Dispatch<IAuthAction> | null>(null);

export { AuthStateContext, AuthDispatchContext };
