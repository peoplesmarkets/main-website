import { Route } from "@solidjs/router";
import { lazy } from "solid-js";
import {
  DASHBOARD_PATH,
  OFFERS_PATH,
  ROOT_PATH,
  SHOPS_PATH,
} from "./main-routing";

export default function MainRoutes() {
  return (
    <>
      <Route path={ROOT_PATH}>
        <Route path="" component={lazy(() => import("./LandingPage"))} />

        <Route path={SHOPS_PATH} component={lazy(() => import("./Shops"))} />

        <Route path={OFFERS_PATH} component={lazy(() => import("./Offers"))} />

        <Route
          path={DASHBOARD_PATH}
          component={lazy(() => import("./Dashboard"))}
        />
      </Route>
    </>
  );
}
