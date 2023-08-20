import { useNavigate } from "@solidjs/router";
import _ from "lodash";

import { useAccessTokensContext } from "../contexts/AccessTokensContext";

export async function authGuardRedirect(
  path: string,
  redirectWhenAuthenticated?: boolean
) {
  const { ensureFreshTokens, isAuthenticated } = useAccessTokensContext();
  const navigate = useNavigate();

  await ensureFreshTokens();

  if (redirectWhenAuthenticated && isAuthenticated()) {
    navigate(path);
  }

  if (!redirectWhenAuthenticated && !isAuthenticated()) {
    navigate(path);
  }
}
