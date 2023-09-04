import { useNavigate, useSearchParams } from "@solidjs/router";
import { onMount } from "solid-js";

import { DASHBOARD_PATH, INDEX_PATH } from "../../App";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";

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

  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        "background-color": "var(--blend-color)",
        opacity: "var(--blend-opacity)",
        overflow: "hidden",
      }}
      class="no-scroll"
    />
  );
}
