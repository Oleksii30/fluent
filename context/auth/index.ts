import { useContext } from "react";

import { AuthProvider } from "./AuthProvider";
import { AuthStateContext, AuthDispatchContext } from "./Context";
import { signUpUser, login, getSession, logOut, forgotPassword, confirmPassword } from "./actions";


function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
}

function useProfile() {
  return [useAuthState(), useAuthDispatch()];
}

export default useProfile;

export {
  AuthProvider,
  useAuthState,
  useAuthDispatch,
  signUpUser,
  login,
  getSession,
  logOut,
  forgotPassword,
  confirmPassword
};
