import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

import { useAccessTokensContext } from "~/AccessTokensContext";
import { buildAuthorizationRequest } from "~/lib/auth";
import { HOME_PAGE_PATH } from "~/root";

export default function SignIn() {
  const { ensureFreshTokens, isAuthenticated } = useAccessTokensContext();
  const navigate = useNavigate();

  onMount(async () => {
    await ensureFreshTokens();

    if (isAuthenticated()) {
      navigate(HOME_PAGE_PATH);
    } else {
      window.location.href = (await buildAuthorizationRequest()).toString();
    }
  });

  return <></>;
}
