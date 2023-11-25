import { Route } from "@solidjs/router";
import { lazy } from "solid-js";

import MainRoutesWrapper from "../../layouts/MainLayout";
import {
  DEVELOPMENT_POST_PATH_SEGMENT,
  buildCommunityPath,
  buildDevelopementPostPath,
} from "./community-routing";

const CommunityHomePage = lazy(() => import("./Home"));
const CommunityPostsPage = lazy(() => import("./Posts"));

export default function CommunityRoutes() {
  return (
    <Route path="" component={MainRoutesWrapper}>
      <Route path={buildCommunityPath()} component={CommunityHomePage} />

      <Route
        path={buildDevelopementPostPath(DEVELOPMENT_POST_PATH_SEGMENT)}
        component={CommunityPostsPage}
      />
    </Route>
  );
}
