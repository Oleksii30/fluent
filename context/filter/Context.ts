import { createContext } from "react";

const FilterStateContext = createContext<any>(null);
const FilterDispatchContext = createContext<any>(null);

export { FilterStateContext, FilterDispatchContext };
