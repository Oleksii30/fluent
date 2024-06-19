import UserPool from "userPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { ActionTypes } from "./actionTypes";
import { ISignup } from 'interfaces/signup.interface';
import { ILogin } from 'interfaces/login.interface';
import { IAuthAction } from "./reducer";
import { Dispatch } from "react";
import { toast } from 'react-toastify';


export async function signUpUser(dispatch: Dispatch<IAuthAction>, data: ISignup) {
  UserPool.signUp(data.email, data.password, [], [], (error, data) => {
    if(data) {
      dispatch({ type: ActionTypes.SUCCESS, payload: data.user });
    }
    if(error) {
      toast.error(error.message);
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
      toast.error(error.message);
    },
    newPasswordRequired: data => {
      console.log(data)
    }
  })
}

export async function getSession(dispatch: Dispatch<IAuthAction>) {
  const user = UserPool.getCurrentUser()
  if(user) {
    user.getSession((error: any, session: any) => {
      if(session) {
        dispatch({ type: ActionTypes.SUCCESS, payload: user })
      }

      if(error) {
        toast.error(error.message);
      }
    })
  }
}

export async function forgotPassword(dispatch: Dispatch<IAuthAction>, email:string) {
  const user = new CognitoUser({
    Username: email,
    Pool: UserPool
  })

  user.forgotPassword({
    onSuccess: data => {
      console.log('success', data)
    },
    onFailure: error => {
      toast.error(error.message);
    },
    inputVerificationCode: data => {
      dispatch({ type: ActionTypes.VERIFICATION_CODE_RECEIVED})
    }
  })
}

export async function confirmPassword(dispatch: Dispatch<IAuthAction>, data: ILogin) {
  const { email, password, code } = data;
  const user = new CognitoUser({
    Username: email,
    Pool: UserPool
  })

  user.confirmPassword(code as string, password, {
    onSuccess: data => {
      toast.success('You successfully changed the password');
      login(dispatch, {email, password});
    },
    onFailure: error => {
      toast.error(error.message);
    },
  })
}

export async function logOut(dispatch: Dispatch<IAuthAction>) {
  const user = UserPool.getCurrentUser()
  if(user) {
    user.signOut()
  }
  dispatch({ type: ActionTypes.LOGOUT })
}
