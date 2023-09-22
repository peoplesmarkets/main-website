import { useNavigate, useSearchParams } from "@solidjs/router";
import { onMount } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { Cover } from "../../components/layout/Cover";
import { buildDashboardPath } from "../dashboard/DashboardRoutes";
import { buildIndexPath } from "../MainRoutes";
import _ from "lodash";
import { base64ToUtf8 } from "../../lib";

export default function SignInCallback() {
  const { startSessionWithCode } = useAccessTokensContext();
  const [{ code, state }] = useSearchParams();
  const navigate = useNavigate();

  onMount(async () => {
    try {
      await startSessionWithCode(code);

      if (!_.isNil(state) && !_.isEmpty(state)) {
        navigate(base64ToUtf8(state), { replace: true });
      } else {
        navigate(buildDashboardPath(), { replace: true, resolve: true });
      }
    } catch (err) {
      // TODO: add error notice
      navigate(buildIndexPath(), { replace: true });
    }
  });

  return <Cover />;
}
