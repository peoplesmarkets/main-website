import { useNavigate, useSearchParams } from "@solidjs/router";
import { onMount } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { INDEX_PAGE_PATH } from "../../App";

export default function SignInCallback() {
  const { startSessionWithCode } = useAccessTokensContext();
  const [{ code, state }] = useSearchParams();
  const navigate = useNavigate();

  onMount(async () => {
    await startSessionWithCode(code, state);
    navigate(INDEX_PAGE_PATH);
  });

  return <></>;
}
