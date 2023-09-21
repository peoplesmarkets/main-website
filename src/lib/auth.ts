import { useNavigate } from "@solidjs/router";
import _ from "lodash";

import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { buildSignInCallbackPath } from "../routes/user/UserRoutes";
import { hashCodeVerifier } from "./string-manipulation";

export const CODE_CHALLENGE_STORAGE_KEY = "sign-in-code-challange";

export async function buildAuthorizationRequest(register?: boolean) {
  // sha256 hash of random string in base64 encoded
  const codeVerifier = crypto.randomUUID();
  sessionStorage.setItem(CODE_CHALLENGE_STORAGE_KEY, codeVerifier);
  const codeChallenge = await hashCodeVerifier(codeVerifier);

  const requestUri = new URL(
    `${import.meta.env.VITE_AUTH_OAUTH_URL}/oauth/v2/authorize`
  );
  requestUri.searchParams.set(
    "client_id",
    import.meta.env.VITE_AUTH_OAUTH_CLIENT_ID
  );
  requestUri.searchParams.set("redirect_uri", redirect_uri());

  const scope = `openid email profile offline_access urn:zitadel:iam:org:project:id:zitadel:aud urn:zitadel:iam:user:metadata urn:zitadel:iam:org:id:${
    import.meta.env.VITE_AUTH_OAUTH_ORG_ID
  }`;

  // requestUri.searchParams.set("state", ""); // TODO
  requestUri.searchParams.set("scope", scope);
  requestUri.searchParams.set("response_type", "code");
  requestUri.searchParams.set("code_challenge", codeChallenge);
  requestUri.searchParams.set("code_challenge_method", "S256");
  if (register) {
    requestUri.searchParams.set("prompt", "create");
  }

  return requestUri;
}

export async function getToken(code: string): Promise<Response> {
  const codeVerifier = sessionStorage.getItem(CODE_CHALLENGE_STORAGE_KEY);
  sessionStorage.removeItem(CODE_CHALLENGE_STORAGE_KEY);

  if (_.isNil(codeVerifier)) {
    throw new Error("no code verifier");
  }

  const body = new URLSearchParams();
  body.set("grant_type", "authorization_code");
  body.set("code", code);
  body.set("redirect_uri", redirect_uri());
  body.set("client_id", import.meta.env.VITE_AUTH_OAUTH_CLIENT_ID);
  body.set("code_verifier", codeVerifier!);

  return fetch(`${import.meta.env.VITE_AUTH_OAUTH_URL}/oauth/v2/token`, {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
  });
}

export async function refreshToken(refreshToken: string): Promise<Response> {
  const body = new URLSearchParams();
  body.set("grant_type", "refresh_token");
  body.set("refresh_token", refreshToken);
  body.set("redirect_uri", redirect_uri());
  body.set("client_id", import.meta.env.VITE_AUTH_OAUTH_CLIENT_ID);

  const scope = `openid email profile offline_access urn:zitadel:iam:org:project:id:zitadel:aud urn:zitadel:iam:user:metadata urn:zitadel:iam:org:id:${
    import.meta.env.VITE_AUTH_OAUTH_ORG_ID
  }`;
  body.set("scope", scope);

  return fetch(`${import.meta.env.VITE_AUTH_OAUTH_URL}/oauth/v2/token`, {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
  });
}

export async function endSession() {
  const requestUri = new URL(
    `${import.meta.env.VITE_AUTH_OAUTH_URL}/oidc/v1/end_session`
  );

  requestUri.searchParams.set(
    "client_id",
    import.meta.env.VITE_AUTH_OAUTH_CLIENT_ID
  );
  requestUri.searchParams.set(
    "post_logout_redirect_uri",
    import.meta.env.VITE_AUTH_OAUTH_LOGOUT_REDIRECT_URL
  );

  window.location.href = requestUri.toString();
}

export async function authGuardRedirect(
  path: string,
  redirectWhenAuthenticated?: boolean
) {
  const { ensureFreshTokens, isAuthenticated } = useAccessTokensContext();
  const navigate = useNavigate();

  await ensureFreshTokens();

  if (redirectWhenAuthenticated && isAuthenticated()) {
    navigate(path, { replace: true });
  }

  if (!redirectWhenAuthenticated && !isAuthenticated()) {
    navigate(path, { replace: true });
  }
}

function redirect_uri(): string {
  return `${import.meta.env.VITE_BASE_URL}${buildSignInCallbackPath()}`;
}
