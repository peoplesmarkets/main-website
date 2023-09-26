import { useNavigate, useRouteData, useSearchParams } from "@solidjs/router";
import _ from "lodash";
import { createEffect } from "solid-js";

import { Cover } from "../../components/layout/Cover";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { base64ToUtf8 } from "../../lib";
import { buildIndexPath } from "../MainRoutes";
import { buildDashboardPath } from "../dashboard/DashboardRoutes";
import { ShopData } from "./ShopData";

export default function SignInCallback() {
  const { startSessionWithCode } = useAccessTokensContext();
  const [{ code, state }] = useSearchParams();
  const navigate = useNavigate();

  const shopData = useRouteData<typeof ShopData>();

  createEffect(async () => {
    const clientId = shopData?.shopDomain?.data()?.clientId;

    if (_.isNil(clientId) || _.isEmpty(clientId)) {
      return;
    }

    try {
      await startSessionWithCode(code, clientId);

      if (!_.isNil(state) && !_.isEmpty(state)) {
        return navigate(base64ToUtf8(state), { replace: true });
      } else {
        return navigate(buildDashboardPath(), { replace: true, resolve: true });
      }
    } catch (err) {
      // TODO: add error notice
      navigate(buildIndexPath(), { replace: true });
    }
  });

  return <Cover pageLoad />;
}
