import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

import { INDEX_PATH } from "../../App";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { buildAuthorizationRequest } from "../../lib/auth";

export default function SignIn() {
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
