import { useNavigate, useSearchParams } from "@solidjs/router";
import { createEffect, createResource, onMount } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { Cover } from "../../components/layout/Cover";
import { buildDashboardPath } from "../dashboard/DashboardRoutes";
import { buildIndexPath } from "../MainRoutes";
import _ from "lodash";
import { base64ToUtf8 } from "../../lib";
import { isResolved } from "../../components/content";

export default function SignInCallback() {
  const { startSessionWithCode } = useAccessTokensContext();
  const [{ code, state }] = useSearchParams();
  const navigate = useNavigate();

  const [startSession] = createResource(
    () => code,
    async (code) => startSessionWithCode(code)
  );

  createEffect(() => {
    if (isResolved(startSession.state)) {
      if (!_.isNil(state) && !_.isEmpty(state)) {
        navigate(base64ToUtf8(state), { replace: true });
      } else {
        navigate(buildDashboardPath(), { replace: true });
      }
    }

    if (startSession.state === "errored") {
      navigate(buildIndexPath(), { replace: true });
    }
  });

  return <Cover pageLoad />;
}
