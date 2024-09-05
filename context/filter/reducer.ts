import { ActionTypes } from "./actionTypes";

export interface IFilterAction {
	type: ActionTypes;
	payload?: any;
}

export interface IFilterState {
  name: string;
  lang: string;
  showNotLearned: boolean;
}

export const initialState:IFilterState = {
	name: '',
	lang: '',
	showNotLearned: false
};

function filterReducer(state:IFilterState, action:IFilterAction) {
	switch (action.type) {
		case ActionTypes.NAME: {
			return {
        ...state,
        name: action.payload
			}
		}
		case ActionTypes.LANG: {
			return {
        ...state,
        lang: action.payload
			}
		}

		case ActionTypes.SHOW_NOT_FINISHED: {
			return {
        ...state,
        showNotLearned: action.payload
			}
		}

		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

export default filterReducer
