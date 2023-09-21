import { Route, useNavigate } from "@solidjs/router";
import { lazy } from "solid-js";
import { buildPath } from "../../lib";
import MainRoutesWrapper from "../MainRoutesWrapper";

const ROOT_PATH = "/info";
const GET_STARTED_PATH = "/get-started";
const IMPRINT_PATH = "/imprint";
const PRIVACY_POLICY_PATH = "/privacy-policy";
const TERMS_OF_SERVICE_PATH = "/terms-of-service";

export function buildGetStartedPath() {
  return buildPath(ROOT_PATH, GET_STARTED_PATH);
}

export function buildImprintPath() {
  return buildPath(ROOT_PATH, IMPRINT_PATH);
}

export function buildPrivacyPolicyPath() {
  return buildPath(ROOT_PATH, PRIVACY_POLICY_PATH);
}

export function buildTermsOfServicePath() {
  return buildPath(ROOT_PATH, TERMS_OF_SERVICE_PATH);
}

export default function InfoRoutes() {
  function InfoRedirect() {
    const navigate = useNavigate();
    navigate(buildPath(ROOT_PATH, GET_STARTED_PATH), { replace: true });
    return <></>;
  }

  return (
    <Route path={ROOT_PATH} element={<MainRoutesWrapper />}>
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
    </Route>
  );
}
