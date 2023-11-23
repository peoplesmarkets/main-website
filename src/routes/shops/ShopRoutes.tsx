import { Route } from "@solidjs/router";
import { lazy } from "solid-js";

import { isCustomDomain } from "../../lib";
import { buildSignInCallbackPath } from "../main-routing";
import { ShopData } from "./ShopData";
import {
  INVENTORY_PATH,
  OFFER_PATH,
  ROOT_PATH,
  SHOP_PATH,
  SUBSCRIPTION_PATH,
} from "./shop-routing";

const ShopRoutesWrapper = lazy(() => import("./ShopRoutesWrapper"));

const ShopDetailPage = lazy(() => import("./ShopDetail"));
const OfferDetailPage = lazy(() => import("./OfferDetail"));

const InventoryPage = lazy(() => import("./inventory/Inventory"));
const SubscriptionDetailPage = lazy(
  () => import("./inventory/SubscriptionDetail")
);

const SignInCallbackPage = lazy(() => import("../SignInCallback"));

export function ShopRoutes() {
  const rootPath = isCustomDomain() ? "" : ROOT_PATH;
  const shopPath = isCustomDomain() ? "" : SHOP_PATH;

  return (
    <>
      <Route path={rootPath}>
        <Route path={shopPath} data={ShopData} component={ShopRoutesWrapper}>
          <Route path="" component={ShopDetailPage} />

          <Route path={OFFER_PATH} component={OfferDetailPage} />

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
