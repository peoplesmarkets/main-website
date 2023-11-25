import { useNavigate, useSearchParams } from "@solidjs/router";
import _ from "lodash";
import { createResource } from "solid-js";

import { DefaultBoundary } from "../components/layout/DefaultBoundary";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { useServiceClientContext } from "../contexts/ServiceClientContext";
import { useSelectedShopContext } from "../contexts/ShopContext";
import { base64ToUtf8, getDomainFromWindow, isCustomDomain } from "../lib";
import { buildDashboardPath } from "./main/main-routing";

export default function SignInCallback() {
  const navigate = useNavigate();
  const [{ code, state }] = useSearchParams();

  const { startSessionWithCode, currentSession } = useAccessTokensContext();
  const { shopService } = useServiceClientContext();

  const { setSelectedShopId } = useSelectedShopContext();

  const [startSession] = createResource(async () => {
    let clientId: string | undefined;

    if (isCustomDomain()) {
      const response = await shopService.getByDomain(getDomainFromWindow());
      clientId = response.shop?.clientId;
    }

    return startSessionWithCode(code, clientId);
  });

  createResource(
    () => currentSession()?.userId,
    async (userId: string) => {
      const response = await shopService.listDefault({ userId });

      setSelectedShopId(_.first(response.shops)?.shopId);

      if (!_.isNil(state) && !_.isEmpty(state)) {
        navigate(base64ToUtf8(state), { replace: true });
      } else {
        navigate(buildDashboardPath(), { replace: true });
      }
    }
  );

  function loaded() {
    startSession();
    return true;
  }

  return <DefaultBoundary loaded={loaded} signIn noLogo />;
}
