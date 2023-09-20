import { Route, useNavigate } from "@solidjs/router";
import { lazy } from "solid-js";
import {
  GET_STARTED_PATH,
  IMPRINT_PATH,
  INFO_PATH,
  PRIVACY_POLICY_PATH,
  TERMS_OF_SERVICE_PATH,
} from "../../App";
import { buildPath } from "../../lib";

export function InfoRedirect() {
  const navigate = useNavigate();
  navigate(buildPath(INFO_PATH, GET_STARTED_PATH), { replace: true });
  return <></>;
}

export default function InfoRoutes() {
  return (
    <>
      <Route path="" element={<InfoRedirect />} />
      <Route
        path={GET_STARTED_PATH}
        component={lazy(() => import("./GetStarted"))}
      />
      <Route path={IMPRINT_PATH} component={lazy(() => import("./Imprint"))} />
      <Route
        path={PRIVACY_POLICY_PATH}
        component={lazy(() => import("./PrivacyPolicy"))}
      />
      <Route
        path={TERMS_OF_SERVICE_PATH}
        component={lazy(() => import("./TermsOfService"))}
      />
    </>
  );
}
