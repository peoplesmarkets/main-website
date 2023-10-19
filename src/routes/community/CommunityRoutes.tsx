import { Outlet, Route } from "@solidjs/router";
import { lazy } from "solid-js";

import { Slot } from "../../components/layout";
import { Section } from "../../components/layout/Section";
import MainRoutesWrapper from "../MainRoutesWrapper";
import styles from "./CommunityRoutes.module.scss";
import { PostsNav } from "./PostsNav";
import { DEVELOPMENT_POST_PATH, ROOT_PATH } from "./community-routing";

function PostsHeader() {
  return (
    <MainRoutesWrapper>
      <Slot name="content">
        <div class={styles.PostsHeader}>
          <PostsNav />
        </div>

        <Section>
          <Outlet />
        </Section>
      </Slot>
    </MainRoutesWrapper>
  );
}

export default function CommunityRoutes() {
  return (
    <Route path={ROOT_PATH}>
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
