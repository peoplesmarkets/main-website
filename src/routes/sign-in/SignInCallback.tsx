import { useNavigate, useSearchParams } from "@solidjs/router";
import { onMount } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { INDEX_PATH } from "../../App";

export default function SignInCallback() {
  const { startSessionWithCode } = useAccessTokensContext();
  const [{ code, state }] = useSearchParams();
  const navigate = useNavigate();

  onMount(async () => {
    try {
      await startSessionWithCode(code, state);
    } catch (err) {
      console.error(err);
    }
    navigate(INDEX_PATH);
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
    ></div>
  );
}
