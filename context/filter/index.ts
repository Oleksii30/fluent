import { useContext } from "react";
import { FilterProvider } from "./FilterProvider";
import { FilterStateContext, FilterDispatchContext } from "./Context";
import { changeName, changeLang, changeShowNotLearned } from "./actions";


function useFilterState() {
  const context = useContext(FilterStateContext);
  if (context === undefined) {
    throw new Error("useFilterState must be used within a FilterProvider");
  }
  return context;
}

function useFilterDispatch() {
  const context = useContext(FilterDispatchContext);
  if (context === undefined) {
    throw new Error("useFilterDispatch must be used within a FilterProvider");
  }
  return context;
}

function useFilter() {
  return [useFilterState(), useFilterDispatch()];
}

export default useFilter;

export {
  useFilterState,
  useFilterDispatch,
  FilterProvider,
  changeName,
  changeLang,
  changeShowNotLearned,
};
