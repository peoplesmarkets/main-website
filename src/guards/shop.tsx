import _ from "lodash";

import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { ShopResponse } from "../services/peoplesmarkets/commerce/v1/shop";
import { useNavigate } from "@solidjs/router";
import { buildDashboardPath } from "../routes/main-routing";

export function requireShopOwner(shop: ShopResponse | undefined) {
  const { currentSession } = useAccessTokensContext();

  const userId = currentSession().userId;

  if (_.isNil(shop)) {
    return;
  }

  if (userId === shop.userId) {
    return true;
  }

  const navigate = useNavigate();
  navigate(buildDashboardPath(), { replace: true });
  return false;
}
