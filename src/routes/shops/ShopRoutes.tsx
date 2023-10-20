import { Route } from "@solidjs/router";
import { lazy } from "solid-js";

import { isCustomDomain } from "../../lib";
import { buildSignInCallbackPath } from "../user/UserRoutes";
import { ShopData } from "./ShopData";
import {
  ROOT_PATH,
  INVENTORY_PATH,
  OFFER_PATH,
  SETTINGS_PATH,
  SHOP_PATH,
  SUBSCRIPTION_PATH,
} from "./shop-routing";

const ShopRoutesWrapper = lazy(() => import("./ShopRoutesWrapper"));

export function ShopRoutes() {
  const rootPath = isCustomDomain() ? "" : ROOT_PATH;
  const shopPath = isCustomDomain() ? "" : SHOP_PATH;

  return (
    <>
      <Route path={rootPath} data={ShopData} component={ShopRoutesWrapper}>
        <Route path={shopPath}>
          <Route path="" component={lazy(() => import("./ShopDetail"))} />

          <Route
            path={OFFER_PATH}
            component={lazy(() => import("./OfferDetail"))}
          />

          <Route path={INVENTORY_PATH}>
            <Route
              path=""
              component={lazy(() => import("./inventory/Inventory"))}
            />

            <Route
              path={SUBSCRIPTION_PATH}
              component={lazy(() => import("./inventory/SubscriptionDetail"))}
            />
          </Route>

          <Route path={SETTINGS_PATH}>
            <Route
              path=""
              component={lazy(() => import("./settings/ShopSettings"))}
            />

            <Route
              path={OFFER_PATH}
              component={lazy(() => import("./settings/OfferSettings"))}
            />

            <Route
              path={INVENTORY_PATH}
              component={lazy(() => import("./settings/MediaSettings"))}
            />
          </Route>

          <Route
            path={buildSignInCallbackPath()}
            component={lazy(() => import("./SignInCallback"))}
          />
        </Route>
      </Route>
    </>
  );
}
