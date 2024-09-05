import { ActionTypes } from "./actionTypes";
import { IFilterAction } from "./reducer";
import { Dispatch } from "react";

export function changeName(dispatch: Dispatch<IFilterAction>, data: string) {
  dispatch({ type: ActionTypes.NAME, payload: data });
}

export function changeLang(dispatch: Dispatch<IFilterAction>, data: string) {
  dispatch({ type: ActionTypes.LANG, payload: data });
}

export function changeShowNotLearned(dispatch: Dispatch<IFilterAction>, data: boolean) {
  dispatch({ type: ActionTypes.SHOW_NOT_FINISHED, payload: data });
}

