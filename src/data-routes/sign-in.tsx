import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

import { buildAuthorizationRequest } from "@peoplesmarkets/frontend-lib";

import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { INDEX_PATH } from "../App";

export function signInDataRoute() {
  const { ensureFreshTokens, isAuthenticated } = useAccessTokensContext();
  const navigate = useNavigate();

  onMount(async () => {
    await ensureFreshTokens();

    if (isAuthenticated()) {
      navigate(INDEX_PATH);
    } else {
      window.location.href = (await buildAuthorizationRequest()).toString();
    }
  });

  return <></>;
}
