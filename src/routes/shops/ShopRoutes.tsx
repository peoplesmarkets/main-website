import { Route } from "@solidjs/router";
import { lazy } from "solid-js";

import { isCustomDomain } from "../../lib";
import { buildSignInCallbackPath } from "../main/main-routing";
import { ShopData } from "./ShopData";
import {
  INVENTORY_PATH,
  ROOT_PATH,
  SHOP_PATH,
  SUBSCRIPTION_PATH,
} from "./shop-routing";

const ShopLayout = lazy(() => import("../../layouts/ShopLayout"));

const ShopDetailPage = lazy(() => import("../../pages/shop-page/Page"));

const InventoryPage = lazy(() => import("../../pages/inventory/Page"));

const SubscriptionDetailPage = lazy(
  () => import("../../pages/inventory/subscription-detail/Page")
);

const SignInCallbackPage = lazy(() => import("../SignInCallback"));

export function ShopRoutes() {
  const rootPath = isCustomDomain() ? "" : ROOT_PATH;
  const shopPath = isCustomDomain() ? "" : SHOP_PATH;

  return (
    <>
      <Route path={rootPath}>
        <Route path={shopPath} data={ShopData} component={ShopLayout}>
          <Route path="" component={ShopDetailPage} />

          <Route path={INVENTORY_PATH} component={InventoryPage} />

          <Route path={SUBSCRIPTION_PATH} component={SubscriptionDetailPage} />

          <Route
            path={buildSignInCallbackPath()}
            component={SignInCallbackPage}
          />
        </Route>
      </Route>
    </>
  );
}
