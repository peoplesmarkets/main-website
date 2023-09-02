import { Outlet, Route } from "@solidjs/router";

import { DEVELOPMENT_POSTS_SUBPATH } from "../../App";
import { Page } from "../../components/layout/Page";
import { Section } from "../../components/layout/Section";
import { buildPath } from "../../lib";
import styles from "./CommunityRoutes.module.scss";
import { PostsNav } from "./PostsNav";
import { lazy } from "solid-js";

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
    <>
      <Route path="" component={lazy(() => import("./Home"))} />
      <Route path="/" element={<PostsHeader />}>
        <Route
          path={buildPath(DEVELOPMENT_POSTS_SUBPATH, ":postSlug")}
          component={lazy(() => import("./Posts"))}
        />
      </Route>
    </>
  );
}
