import { useNavigate, useParams } from "@solidjs/router";
import { useMarketBoothContext } from "../contexts/MarketBoothContext";
import { onMount } from "solid-js";
import _ from "lodash";
import { DASHBOARD_PATH, USER_SETTINGS_PATH } from "../App";
import { buildPath } from "../lib";

export function dashboardDataRoute() {
  const navigate = useNavigate();

  const {
    currentMarketBooth,
    setCurrentMarketBooth,
    refetchMarketBoothList,
    initializeMarketBoothList,
  } = useMarketBoothContext();

  onMount(async () => {
    const marketBoothId = useParams().marketBoothId;
    await initializeMarketBoothList();

    if (_.isNil(marketBoothId)) {
      // Dashboard path called without marketBoothId
      checkCurrentMarketBoothOrRedirect();
    } else if (setCurrentMarketBooth(marketBoothId)) {
      // Successfully set current market booth from market booth list
      navigate(buildPath(DASHBOARD_PATH, marketBoothId), { replace: true });
    } else {
      // Could not find current market booth in market booth list
      await refetchMarketBoothList();
      navigate(DASHBOARD_PATH, { replace: true });
    }
  });

  function checkCurrentMarketBoothOrRedirect() {
    if (_.isNil(currentMarketBooth())) {
      navigate(USER_SETTINGS_PATH, { replace: true });
    } else {
      navigate(buildPath(DASHBOARD_PATH, currentMarketBooth()!.marketBoothId), {
        replace: true,
      });
    }
  }
}