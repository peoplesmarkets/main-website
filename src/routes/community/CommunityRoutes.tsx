import { Outlet, Route } from "@solidjs/router";
import { lazy } from "solid-js";

import { Page } from "../../components/layout/Page";
import { Section } from "../../components/layout/Section";
import MainRoutesWrapper from "../MainRoutesWrapper";
import { ROOT_PATH } from "../main-routing";
import styles from "./CommunityRoutes.module.scss";
import { PostsNav } from "./PostsNav";
import { DEVELOPMENT_POST_PATH } from "./community-routing";

function PostsHeader() {
  return (
    <Page>
      <div class={styles.PostsHeader}>
        <PostsNav />
      </div>

      <Section>
        <Outlet />
      </Section>
    </Page>
  );
}

export default function CommunityRoutes() {
  return (
    <Route path={ROOT_PATH} element={<MainRoutesWrapper />}>
      <Route path="" component={lazy(() => import("./Home"))} />
      <Route path="/" element={<PostsHeader />}>
        <Route
          path={DEVELOPMENT_POST_PATH}
          component={lazy(() => import("./Posts"))}
        />
      </Route>
    </Route>
  );
}
