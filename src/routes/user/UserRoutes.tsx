import { Route } from "@solidjs/router";
import { lazy } from "solid-js";

import { buildPath } from "../../lib";
import { getOriginFromWindow } from "../../lib/env";

const ROOT_PATH = "/user";
const SETTINGS_PATH = "/settings";
const SIGN_IN_PATH = "/sign-in";
const SIGN_IN_CALLBACK_PATH = SIGN_IN_PATH + "/callback";

export function buildUserSettingsPath() {
  return buildPath(ROOT_PATH, SETTINGS_PATH);
}

export function buildSignInCallbackPath() {
  return buildPath(ROOT_PATH, SIGN_IN_CALLBACK_PATH);
}

export function buildSignInCallbackUrl() {
  return `${getOriginFromWindow()}${buildSignInCallbackPath()}`;
}

export function UserRoutes() {
  return (
    <Route path={ROOT_PATH}>
      <Route
        path={SETTINGS_PATH}
        component={lazy(() => import("./Settings"))}
      />

      <Route
        path={SIGN_IN_CALLBACK_PATH}
        component={lazy(() => import("./SignInCallback"))}
      />
    </Route>
  );
}
