import { Route } from "@solidjs/router";
import { lazy } from "solid-js";

import { isCustomDomain } from "../../lib";
import { buildSignInCallbackPath } from "../user/UserRoutes";
import { MyShopData } from "../../pages/shop-owner-pages/MyShopData";
import { ShopData } from "./ShopData";
import {
  CONFIGURATION_PATH,
  INVENTORY_PATH,
  OFFERS_CONFIGURATION_PATH,
  OFFER_PATH,
  ROOT_PATH,
  SETTINGS_CONFIGURATION_PATH,
  SHOP_PATH,
  SUBSCRIPTION_PATH,
} from "./shop-routing";

const ShopRoutesWrapper = lazy(() => import("./ShopRoutesWrapper"));
const MyShopRoutesWrapper = lazy(
  () => import("../../pages/shop-owner-pages/MyShopRoutesWrapper")
);

const ShopDetailPage = lazy(() => import("./ShopDetail"));
const OfferDetailPage = lazy(() => import("./OfferDetail"));

const InventoryPage = lazy(() => import("./inventory/Inventory"));
const SubscriptionDetailPage = lazy(
  () => import("./inventory/SubscriptionDetail")
);

const ShopConfigurationPage = lazy(
  () => import("../../pages/shop-owner-pages/shop-configuration/Page")
);
const OffersConfigurationPage = lazy(
  () => import("../../pages/shop-owner-pages/offers-configuration/Page")
);
const OfferDetailConfigurationPage = lazy(
  () => import("../../pages/shop-owner-pages/offer-detail-configuration/Page")
);
const ShopSettingsPage = lazy(
  () => import("../../pages/shop-owner-pages/shop-settings/Page")
);

const SignInCallbackPage = lazy(() => import("./SignInCallback"));

export function ShopRoutes() {
  const rootPath = isCustomDomain() ? "" : ROOT_PATH;
  const shopPath = isCustomDomain() ? "" : SHOP_PATH;

  return (
    <>
      <Route path={rootPath}>
        <Route path={shopPath} data={ShopData} component={ShopRoutesWrapper}>
          <Route path="" component={ShopDetailPage} />

          <Route path={OFFER_PATH} component={OfferDetailPage} />

          <Route path={INVENTORY_PATH}>
            <Route path="" component={InventoryPage} />

            <Route
              path={SUBSCRIPTION_PATH}
              component={SubscriptionDetailPage}
            />
          </Route>

          <Route path="old-settings">
            <Route
              path={SETTINGS_CONFIGURATION_PATH}
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
            component={SignInCallbackPage}
          />
        </Route>

        <Route
          path={shopPath}
          data={MyShopData}
          component={MyShopRoutesWrapper}
        >
          <Route path={CONFIGURATION_PATH}>
            <Route path="" component={ShopConfigurationPage} />

            <Route
              path={OFFERS_CONFIGURATION_PATH}
              component={OffersConfigurationPage}
            />

            <Route path={OFFER_PATH} component={OfferDetailConfigurationPage} />

            <Route
              path={SETTINGS_CONFIGURATION_PATH}
              component={ShopSettingsPage}
            />
          </Route>
        </Route>
      </Route>
    </>
  );
}
