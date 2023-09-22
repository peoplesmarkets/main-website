import { Outlet, Route } from "@solidjs/router";
import { lazy } from "solid-js";

import { Page } from "../../components/layout/Page";
import { Section } from "../../components/layout/Section";
import { buildPath } from "../../lib";
import MainRoutesWrapper from "../MainRoutesWrapper";
import styles from "./CommunityRoutes.module.scss";
import { PostsNav } from "./PostsNav";

const ROOT_PATH = "/community";
const DEVELOPMENT_POSTS_PATH = "/development-posts";
const DEVELOPMENT_POST_PATH = DEVELOPMENT_POSTS_PATH + "/:postSlug";

export function buildCommunityPath() {
  return buildPath(ROOT_PATH);
}

export function buildDevelopementPostPath(postSlug: string) {
  return buildPath(ROOT_PATH, DEVELOPMENT_POSTS_PATH, postSlug);
}

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
