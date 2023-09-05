import { useNavigate, useSearchParams } from "@solidjs/router";
import { onMount } from "solid-js";

import { DASHBOARD_PATH, INDEX_PATH } from "../../App";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { Cover } from "../../components/layout/Cover";

export default function SignInCallback() {
  const { startSessionWithCode } = useAccessTokensContext();
  const [{ code, state }] = useSearchParams();
  const navigate = useNavigate();

  onMount(async () => {
    try {
      await startSessionWithCode(code, state);
      navigate(DASHBOARD_PATH, { replace: true, resolve: true });
    } catch (err) {
      // TODO: add error notice
      navigate(INDEX_PATH, { replace: true });
    }
  });

  return <Cover />;
}
