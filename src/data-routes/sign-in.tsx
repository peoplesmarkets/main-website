import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { buildAuthorizationRequest } from "../lib";
import { buildIndexPath } from "../routes/MainRoutes";

export function signInDataRoute() {
  const { ensureFreshTokens, isAuthenticated } = useAccessTokensContext();
  const navigate = useNavigate();

  onMount(async () => {
    await ensureFreshTokens();

    if (isAuthenticated()) {
      navigate(buildIndexPath());
    } else {
      window.location.href = (await buildAuthorizationRequest()).toString();
    }
  });

  return <></>;
}
