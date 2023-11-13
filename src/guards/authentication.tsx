import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { buildAuthorizationRequest } from "../lib";

export async function requireAuthentication(redirectTo: string) {
  const { ensureFreshTokens, isAuthenticated } = useAccessTokensContext();

  await ensureFreshTokens();

  if (!isAuthenticated()) {
    const signInUrl = await buildAuthorizationRequest(
      "select_account",
      redirectTo
    );
    window.location.href = signInUrl.toString();
    return;
  }

  return true;
}
