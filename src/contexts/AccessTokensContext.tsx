import { ParentProps, createContext, useContext } from "solid-js";

import { initialize } from "@peoplesmarkets/frontend-lib";

type AccessTokenContextType = ReturnType<typeof initialize>;

export const AccessTokenContext = createContext<AccessTokenContextType>(
  initialize()
);

export function AccessTokenProvider(props: ParentProps) {
  const accessTokensHandle = initialize();

  return (
    <AccessTokenContext.Provider value={accessTokensHandle}>
      {props.children}
    </AccessTokenContext.Provider>
  );
}

export function useAccessTokensContext() {
  return useContext(AccessTokenContext);
}
