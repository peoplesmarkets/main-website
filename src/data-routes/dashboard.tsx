import { useNavigate } from "@solidjs/router";
import _ from "lodash";
import { onMount } from "solid-js";

import { DASHBOARD_PATH, SIGN_IN_PATH, USER_SETTINGS_PATH } from "../App";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { useMarketBoothContext } from "../contexts/MarketBoothContext";
import { authGuardRedirect, buildPath } from "../lib";
import { MarketBoothService } from "../services";

export function dashboardDataRoute() {
  const navigate = useNavigate();

  const { accessToken, currentSession } = useAccessTokensContext();
  const { currentMarketBooth, setCurrentMarketBooth } = useMarketBoothContext();

  const marketBoothService = new MarketBoothService(accessToken);

  onMount(async () => {
    await authGuardRedirect(SIGN_IN_PATH);

    if (!_.isNil(currentMarketBooth())) {
      navigate(buildPath(DASHBOARD_PATH, currentMarketBooth()!.marketBoothId), {
        replace: true,
      });
    } else {
      const response = await marketBoothService.listDefault({
        userId: currentSession().userId!,
      });
      const firstMarketBooth = _.first(response.marketBooths);
      if (!_.isNil(firstMarketBooth)) {
        setCurrentMarketBooth(firstMarketBooth);
        navigate(buildPath(DASHBOARD_PATH, firstMarketBooth.marketBoothId), {
          replace: true,
        });
      } else {
        navigate(USER_SETTINGS_PATH, { replace: true });
      }
    }
  });
}
