import { Outlet, Route } from "@solidjs/router";

import { DEVELOPMENT_POSTS_SUBPATH, buildPath } from "../../App";
import Home from "./Home";
import { Posts } from "./Posts";
import { PostsNav } from "./PostsNav";
import styles from "./CommunityRoutes.module.scss";
import { Section } from "../../components/layout/Section";
import { Page } from "../../components/layout/Page";

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
      <Route path="" component={Home} />
      <Route path="/" element={<PostsHeader />}>
        <Route
          path={buildPath(DEVELOPMENT_POSTS_SUBPATH, ":postSlug")}
          component={Posts}
        />
      </Route>
    </>
  );
}
