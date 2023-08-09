import { ParentProps, createContext, useContext } from "solid-js";
import _ from "lodash";
import { createStore } from "solid-js/store";
import { isServer } from "solid-js/web";

import { AuthServiceClient } from "../../clients";
import { parseJwtPayload } from "../lib/codecs";
import { endSession, getToken, refreshToken } from "../lib/auth";

const ACCESS_TOKENS_STORAGE_KEY: string = "access_tokens_storage";
const SESSION_STORAGE_KEY: string = "session_storage";

type AccessTokens = {
  accessToken: string | null;
  expiresAt: Date | null;
  refreshToken: string | null;
  idToken: string | null;
  state?: string | null;
};

const emptyAccessTokens = {
  accessToken: null,
  expiresAt: null,
  refreshToken: null,
  idToken: null,
  state: null,
};

type Session = {
  userId: string | null;
  loginName: string | null;
  userName: string | null;
  displayName: string | null;
};

const emptySession: Session = {
  userId: null,
  loginName: null,
  userName: null,
  displayName: null,
};

type AccessTokensResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  id_token: string;
  state?: string;
};

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

// private

function initialize() {
  const [storedAccessTokens, storedSession] = getFromStore();
  const [accessTokens, setAccessTokens] =
    createStore<AccessTokens>(storedAccessTokens);
  const [session, setSession] = createStore<Session>(storedSession);

  async function fetchSessions() {
    const authClient = new AuthServiceClient(accessTokens.accessToken);
    const { result } = await authClient.client.ListMyUserSessions({});

    const claims = parseJwtPayload(accessTokens.accessToken!);

    const currentSession = _.find(
      result,
      (session) => session.userId === claims.sub
    );

    if (_.isNil(currentSession)) {
      setSession(emptySession);
      setAccessTokens(emptyAccessTokens);
    } else {
      const sessionToStore: Session = {
        userId: currentSession.userId,
        loginName: currentSession.loginName,
        userName: currentSession.userName,
        displayName: currentSession.displayName,
      };

      setSession(sessionToStore);
      setSessionToStore(session);
    }
  }

  function storeAccessTokens({
    access_token,
    expires_in,
    refresh_token,
    id_token,
    state,
  }: AccessTokensResponse) {
    let expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expires_in);

    const accessTokensToStore: AccessTokens = {
      accessToken: access_token,
      expiresAt,
      refreshToken: refresh_token,
      idToken: id_token,
      state,
    };

    setAccessTokens(accessTokensToStore);
    setAccessTokensToStore(accessTokens);
  }

  function removeAccessTokens() {
    setAccessTokens(emptyAccessTokens);
    setSession(emptySession);
    removeFromStore();
  }

  async function ensureFreshTokens() {
    if (_.isNil(accessTokens.expiresAt)) {
      return;
    }

    if (accessTokens.expiresAt < new Date() && accessTokens.refreshToken) {
      try {
        const refreshedTokens = await refreshToken(accessTokens.refreshToken);

        storeAccessTokens(await refreshedTokens.json());
        fetchSessions();
      } catch (err) {
        removeAccessTokens();
      }
    }
  }

  return {
    startSessionWithCode: async (code: string, state?: string) => {
      const token = await getToken(code);
      storeAccessTokens(await token.json());
      await fetchSessions();
    },
    endSession: () => {
      removeAccessTokens();
      endSession();
    },
    ensureFreshTokens,
    isAuthenticated: () => {
      return (
        !_.isNil(accessTokens.accessToken) &&
        !_.isNil(accessTokens.expiresAt) &&
        accessTokens.expiresAt > new Date()
      );
    },
    currentSession: () => {
      return session;
    },
    accessToken: async () => {
      await ensureFreshTokens();
      return accessTokens.accessToken;
    },
  } as const;
}

function setAccessTokensToStore(accessTokens: AccessTokens) {
  if (isServer) throw new Error("Session Storage not available on server");

  sessionStorage.setItem(
    ACCESS_TOKENS_STORAGE_KEY,
    JSON.stringify(accessTokens, [
      "accessToken",
      "expiresAt",
      "refreshToken",
      "idToken",
      "state",
    ])
  );
}

function setSessionToStore(session: Session) {
  if (isServer) throw new Error("Session Storage not available on server");

  sessionStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify(session, ["userId", "loginName", "userName", "displayName"])
  );
}

function removeFromStore() {
  if (isServer) throw new Error("Session Storage not available on server");

  sessionStorage.removeItem(ACCESS_TOKENS_STORAGE_KEY);
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}

function getFromStore(): [AccessTokens, Session] {
  if (isServer) throw new Error("Session Storage not available on server");

  const tokensFromStore = sessionStorage.getItem(ACCESS_TOKENS_STORAGE_KEY);
  const sessionFromStore = sessionStorage.getItem(SESSION_STORAGE_KEY);

  if (_.isNil(tokensFromStore) || _.isNil(sessionFromStore)) {
    removeFromStore();

    return [emptyAccessTokens, emptySession];
  }

  try {
    const parsedAccessTokens = JSON.parse(tokensFromStore);
    const parsedSession = JSON.parse(sessionFromStore);

    return schemaValid(parsedAccessTokens, parsedSession);
  } catch (err) {
    removeFromStore();
  }

  return [emptyAccessTokens, emptySession];
}

function schemaValid(
  parsedAccessTokens?: Record<string, any>,
  parsedSession?: Record<string, any>
): [AccessTokens, Session] {
  if (
    !_.isNil(parsedAccessTokens) &&
    !_.isNil(parsedSession) &&
    _.has(parsedAccessTokens, "accessToken") &&
    _.isString(parsedAccessTokens.accessToken) &&
    _.has(parsedAccessTokens, "expiresAt") &&
    _.has(parsedAccessTokens, "refreshToken") &&
    _.isString(parsedAccessTokens.refreshToken) &&
    _.has(parsedAccessTokens, "idToken") &&
    _.isString(parsedAccessTokens.idToken) &&
    _.has(parsedSession, "userId") &&
    _.isString(parsedSession.userId) &&
    _.has(parsedSession, "loginName") &&
    _.isString(parsedSession.loginName) &&
    _.has(parsedSession, "userName") &&
    _.isString(parsedSession.userName) &&
    _.has(parsedSession, "displayName") &&
    _.isString(parsedSession.displayName)
  ) {
    return [
      {
        accessToken: parsedAccessTokens.accessToken,
        expiresAt: new Date(parsedAccessTokens.expiresAt),
        refreshToken: parsedAccessTokens.refreshToken,
        idToken: parsedAccessTokens.idToken,
        state: parsedAccessTokens.state,
      },
      {
        userId: parsedSession.userId,
        loginName: parsedSession.loginName,
        userName: parsedSession.userName,
        displayName: parsedSession.displayName,
      },
    ];
  }

  return [emptyAccessTokens, emptySession];
}
