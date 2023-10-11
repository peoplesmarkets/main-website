import { useNavigate, useRouteData, useSearchParams } from "@solidjs/router";
import _ from "lodash";
import { createEffect, createResource } from "solid-js";

import { isResolved } from "../../components/content";
import { Cover } from "../../components/layout/Cover";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { base64ToUtf8 } from "../../lib";
import { buildIndexPath, buildDashboardPath } from "../main-routing";
import { ShopData } from "./ShopData";
import { Page } from "../../components/layout";

export default function SignInCallback() {
  const { startSessionWithCode } = useAccessTokensContext();
  const [{ code, state }] = useSearchParams();
  const navigate = useNavigate();

  const shopData = useRouteData<typeof ShopData>();

  const [startSession] = createResource(
    () => shopData?.shopDomain()?.clientId,
    async (clientId) => startSessionWithCode(code, clientId)
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

  return (
    <Page>
      <Cover pageLoad />
    </Page>
  );
}
