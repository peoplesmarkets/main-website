import { useNavigate, useSearchParams } from "@solidjs/router";
import _ from "lodash";
import { createResource } from "solid-js";

import { DefaultBoundary } from "../components/layout/DefaultBoundary";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { useServiceClientContext } from "../contexts/ServiceClientContext";
import { useSelectedShopContext } from "../contexts/ShopContext";
import { base64ToUtf8 } from "../lib";
import { buildDashboardPath } from "./main/main-routing";

export default function SignInCallback() {
  const navigate = useNavigate();
  const [{ code, state }] = useSearchParams();

  const { startSessionWithCode, currentSession } = useAccessTokensContext();
  const { shopService } = useServiceClientContext();

  const { setSelectedShopId } = useSelectedShopContext();

  const [startSession] = createResource(async () => startSessionWithCode(code));

  const [shop] = createResource(
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
    return startSession.state === "ready" && shop.state === "ready";
  }

  return <DefaultBoundary loaded={loaded} signIn noLogo />;
}
