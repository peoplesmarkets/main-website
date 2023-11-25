import _ from "lodash";

import { buildSignInCallbackUrl } from "../routes/main/main-routing";
import { ShopDomainService } from "../services";
import { getDomainFromWindow, isCustomDomain } from "./env";
import { hashCodeVerifier, utf8ToBase64 } from "./string-manipulation";

export const CODE_CHALLENGE_STORAGE_KEY = "sign-in-code-challange";

export async function buildAuthorizationRequest(
  prompt?: "create" | "select_account" | "login",
  redirectTo?: string
) {
  let codeVerifier = sessionStorage.getItem(CODE_CHALLENGE_STORAGE_KEY);

  if (_.isNil(codeVerifier) || _.isEmpty(codeVerifier)) {
    // sha256 hash of random string in base64 encoded
    codeVerifier = crypto.randomUUID();
    sessionStorage.setItem(CODE_CHALLENGE_STORAGE_KEY, codeVerifier);
  }

  const codeChallenge = await hashCodeVerifier(codeVerifier);

  const requestUri = new URL(
    `${import.meta.env.VITE_AUTH_OAUTH_URL}/oauth/v2/authorize`
  );

  if (isCustomDomain()) {
    const shopDomainService = new ShopDomainService(async () => null);
    const domain = getDomainFromWindow();
    const { clientId } = await shopDomainService.getClientIdForDomain(domain);
    if (_.isNil(clientId) || _.isEmpty(clientId)) {
      throw new Error(`Could not get clientId for domain '${domain}'`);
    }

    requestUri.searchParams.set("client_id", clientId);
  } else {
    requestUri.searchParams.set(
      "client_id",
      import.meta.env.VITE_AUTH_OAUTH_CLIENT_ID
    );
  }

  requestUri.searchParams.set("redirect_uri", buildSignInCallbackUrl());

  const scope = `openid email profile offline_access urn:zitadel:iam:org:project:id:zitadel:aud urn:zitadel:iam:user:metadata urn:zitadel:iam:org:id:${
    import.meta.env.VITE_AUTH_OAUTH_ORG_ID
  }`;

  requestUri.searchParams.set("scope", scope);
  requestUri.searchParams.set("response_type", "code");
  requestUri.searchParams.set("code_challenge", codeChallenge);
  requestUri.searchParams.set("code_challenge_method", "S256");
  if (prompt) {
    requestUri.searchParams.set("prompt", prompt);
  }
  if (redirectTo) {
    requestUri.searchParams.set("state", utf8ToBase64(redirectTo));
  }

  return requestUri;
}

export async function getToken(
  code: string,
  clientId?: string
): Promise<Response> {
  const codeVerifier = sessionStorage.getItem(CODE_CHALLENGE_STORAGE_KEY);
  sessionStorage.removeItem(CODE_CHALLENGE_STORAGE_KEY);

  if (_.isNil(codeVerifier)) {
    throw new Error("no code verifier");
  }

  const body = new URLSearchParams();
  body.set("grant_type", "authorization_code");
  body.set("code", code);
  body.set("redirect_uri", buildSignInCallbackUrl());

  if (!_.isNil(clientId) && !_.isEmpty(clientId)) {
    body.set("client_id", clientId);
  } else {
    body.set("client_id", import.meta.env.VITE_AUTH_OAUTH_CLIENT_ID);
  }

  body.set("code_verifier", codeVerifier);

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
  body.set("redirect_uri", buildSignInCallbackUrl());
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

export function buildEndSessionRequest(
  redirectTo?: string,
  clientId?: string | undefined,
  state?: string | undefined
): string {
  const requestUri = new URL(
    `${import.meta.env.VITE_AUTH_OAUTH_URL}/oidc/v1/end_session`
  );

  if (!_.isNil(redirectTo) && !_.isEmpty(redirectTo)) {
    requestUri.searchParams.set("post_logout_redirect_uri", redirectTo);
  } else {
    requestUri.searchParams.set(
      "post_logout_redirect_uri",
      import.meta.env.VITE_AUTH_OAUTH_LOGOUT_REDIRECT_URL
    );
  }

  if (!_.isNil(clientId) && !_.isEmpty(clientId)) {
    requestUri.searchParams.set("client_id", clientId);
  } else {
    requestUri.searchParams.set(
      "client_id",
      import.meta.env.VITE_AUTH_OAUTH_CLIENT_ID
    );
  }

  if (!_.isNil(state) && !_.isEmpty(state)) {
    requestUri.searchParams.set("state", state);
  }

  return requestUri.toString();
}

export function endSession(
  redirectTo?: string,
  clientId?: string | undefined,
  state?: string
) {
  const requestUri = buildEndSessionRequest(redirectTo, clientId, state);
  window.location.href = requestUri.toString();
}
