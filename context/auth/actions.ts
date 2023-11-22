import UserPool from "userPool"
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"
import { ActionTypes } from "./actionTypes"
import { ISignup } from 'interfaces/signup.interface'
import { ILogin } from 'interfaces/login.interface'
import { IAuthAction } from "./reducer"
import { Dispatch } from "react"


export async function signUpUser(dispatch: Dispatch<IAuthAction>, data: ISignup) {
  UserPool.signUp(data.email, data.password, [], [], (error, data) => {
    if(data) {
      dispatch({ type: ActionTypes.SUCCESS, payload: data.user });
    }
    if(error) {
      console.error(error)
      dispatch({ type: ActionTypes.ERROR, payload: error });
    }
  })
}

export async function login(dispatch: Dispatch<IAuthAction>, data: ILogin) {
  const user = new CognitoUser({
    Username: data.email,
    Pool: UserPool
  })

  const authDetails = new AuthenticationDetails({
    Username: data.email,
    Password: data.password
  })


  user.authenticateUser(authDetails, {
    onSuccess: data => {
      const currentUser = UserPool.getCurrentUser()
      dispatch({ type: ActionTypes.SUCCESS, payload: currentUser })
    },
    onFailure: error => {
      console.log(error)
      dispatch({ type: ActionTypes.ERROR, payload: error });
    },
    newPasswordRequired: data => {
      console.log(data)
    }
  })
}

export async function getSession(dispatch: Dispatch<IAuthAction>) {
  const user = UserPool.getCurrentUser()
  if(user) {
    user.getSession((err: any, session: any) => {
      if(session) {
        dispatch({ type: ActionTypes.SUCCESS, payload: user })
      }

      if(err) {
        console.log(err)
      }
    })
  }
}

export async function logOut(dispatch: Dispatch<IAuthAction>) {
  const user = UserPool.getCurrentUser()
  if(user) {
    user.signOut()
  }
  dispatch({ type: ActionTypes.LOGOUT })
}
