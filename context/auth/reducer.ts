import { ActionTypes } from "./actionTypes";

export interface IAuthAction {
	type: ActionTypes;
	payload?: any;
}

export interface IAuthState {
	user: any,
	loading: boolean,
	error: any,
	isLoggedIn: boolean
}

export const initialState:IAuthState = {
	user: null,
	loading: true,
	error: null,
	isLoggedIn: false
};

function authReducer(state:IAuthState, action:IAuthAction) {
	switch (action.type) {
		case ActionTypes.SUCCESS: {
			return {
				user: action.payload,
				loading: false,
				error: null,
				isLoggedIn: true
			}
		}
		case ActionTypes.ERROR: {
			return {
				user: null,
				loading: false,
				error: action.payload,
				isLoggedIn: false
			}
		}

		case ActionTypes.LOGOUT: {
			return {
				user: null,
				loading: false,
				error: null,
				isLoggedIn: false
			}
		}

		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

export default authReducer
