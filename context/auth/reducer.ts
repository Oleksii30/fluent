import { ActionTypes } from "./actionTypes";

export interface IAuthAction {
	type: ActionTypes;
	payload?: any;
}

export interface IAuthState {
	user: any,
	loading: boolean,
	error: any,
	isLoggedIn: boolean,
	verificationCodeReceived: boolean
}

export const initialState:IAuthState = {
	user: null,
	loading: true,
	error: null,
	isLoggedIn: false,
	verificationCodeReceived: false
};

function authReducer(state:IAuthState, action:IAuthAction) {
	switch (action.type) {
		case ActionTypes.SUCCESS: {
			return {
				user: action.payload,
				loading: false,
				error: null,
				isLoggedIn: true,
				verificationCodeReceived: false
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
				isLoggedIn: false,
				verificationCodeReceived: false
			}
		}

		case ActionTypes.VERIFICATION_CODE_RECEIVED: {
			return {
				...state,
				verificationCodeReceived: true
			}
		}

		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

export default authReducer
