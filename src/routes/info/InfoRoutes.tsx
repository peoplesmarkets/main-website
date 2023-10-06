import { Route, useNavigate } from "@solidjs/router";
import { lazy } from "solid-js";

import { ROOT_PATH } from "../main-routing";
import {
  IMPRINT_PATH,
  PRIVACY_POLICY_PATH,
  TERMS_OF_SERVICE_PATH,
  buildImprintPath,
} from "./info-routing";
import MainRoutesWrapper from "../MainRoutesWrapper";

export default function InfoRoutes() {
  function InfoRedirect() {
    const navigate = useNavigate();
    navigate(buildImprintPath(), { replace: true });
    return <></>;
  }

  return (
    <Route path={ROOT_PATH} component={MainRoutesWrapper}>
      <Route path="" element={<InfoRedirect />} />
      <Route path={IMPRINT_PATH} component={lazy(() => import("./Imprint"))} />
      <Route
        path={PRIVACY_POLICY_PATH}
        component={lazy(() => import("./PrivacyPolicy"))}
      />
      <Route
        path={TERMS_OF_SERVICE_PATH}
        component={lazy(() => import("./TermsOfService"))}
      />
    </Route>
  );
}
