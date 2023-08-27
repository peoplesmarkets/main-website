import { useNavigate } from "@solidjs/router";
import _ from "lodash";
import { onMount } from "solid-js";

import { DASHBOARD_PATH, USER_SETTINGS_PATH } from "../App";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { useMarketBoothContext } from "../contexts/MarketBoothContext";
import { buildPath } from "../lib";
import { MarketBoothService } from "../services";

export function dashboardDataRoute() {
  const navigate = useNavigate();

  const { accessToken } = useAccessTokensContext();
  const { currentMarketBooth, setCurrentMarketBooth } = useMarketBoothContext();

  const marketBoothService = new MarketBoothService(accessToken);

  onMount(async () => {
    if (!_.isNil(currentMarketBooth())) {
      navigate(buildPath(DASHBOARD_PATH, currentMarketBooth()!.marketBoothId), {
        replace: true,
      });
    } else {
      const response = await marketBoothService.list();
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
