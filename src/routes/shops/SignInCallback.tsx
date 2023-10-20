import { useNavigate, useRouteData, useSearchParams } from "@solidjs/router";
import _ from "lodash";
import { createEffect, createResource } from "solid-js";

import { Page } from "../../components/layout";
import { Cover } from "../../components/layout/Cover";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { base64ToUtf8, resourceIsReady } from "../../lib";
import { buildDashboardPath, buildIndexPath } from "../main-routing";
import { ShopData } from "./ShopData";

export default function SignInCallback() {
  const { startSessionWithCode } = useAccessTokensContext();
  const [{ code, state }] = useSearchParams();
  const navigate = useNavigate();

  const { shopDomainService } = useServiceClientContext();

  const shopData = useRouteData<typeof ShopData>();

  const [shopDomain] = createResource(shopData?.shopId, async (shopId) =>
    shopDomainService.getDomainStatus(shopId).then((res) => res.domainStatus)
  );
  const [startSession] = createResource(
    () => (resourceIsReady(shopDomain) ? shopDomain()?.clientId : undefined),
    async (clientId) => startSessionWithCode(code, clientId)
  );

  createEffect(() => {
    if (resourceIsReady(startSession)) {
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
