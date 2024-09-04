import { useContext } from "react";
import { ServerSideMobileContext } from "./Context";
import { ServerSideMobileProvider } from "./ServerSideMobileProvider";

function useIsServerSideMobile() {
  const context = useContext(ServerSideMobileContext);
  if (context === undefined) {
    throw new Error("useIsServerSideMobile must be used within a ServerSideMobileProvider");
  }
  return context;
}

export {
  useIsServerSideMobile,
  ServerSideMobileProvider
};
