import { useNavigate, useSearchParams } from "@solidjs/router";
import _ from "lodash";
import { onMount } from "solid-js";

import { Redirect } from "../components/navigation/Redirect";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { base64ToUtf8 } from "../lib";
import { buildIndexPath } from "./main/main-routing";

export default function SignOutCallback() {
  const navigate = useNavigate();
  const [{ state }] = useSearchParams();

  const { removeAccessTokens } = useAccessTokensContext();

  onMount(() => {
    removeAccessTokens();

    if (!_.isNil(state) && !_.isEmpty(state)) {
      navigate(base64ToUtf8(state), { replace: true });
    } else {
      navigate(buildIndexPath(), { replace: true });
    }
  });

  return (
    <>
      <Redirect />
    </>
  );
}
