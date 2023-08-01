import { useNavigate, useSearchParams } from "@solidjs/router";
import { onMount } from "solid-js";
import _ from "lodash";

import { useAccessTokensContext } from "~/AccessTokensContext";

export default function SignInCallback() {
  const { startSessionWithCode } = useAccessTokensContext();
  const [{ code, state }] = useSearchParams();
  const navigate = useNavigate();

  onMount(async () => {
    startSessionWithCode(code, state);
    navigate("/");
  });

  return <></>;
}
