import React from "react";
import { ServerSideMobileContext } from "./Context";

type Props = {
  children: JSX.Element,
  isSsrMobile: boolean
};

export function ServerSideMobileProvider({ children, isSsrMobile}:Props) {

  return (
    <ServerSideMobileContext.Provider value={isSsrMobile}>
      {children}
    </ServerSideMobileContext.Provider>
  );
}
