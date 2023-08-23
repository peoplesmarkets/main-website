import { A, Outlet, Route, useParams } from "@solidjs/router";
import { For, JSX } from "solid-js";

import {
  COMMUNITY_DEVELOPMENT_POSTS_PATH,
  DEVELOPMENT_POSTS_SUBPATH,
  buildPath,
} from "../../App";
import styles from "./CommunityRoutes.module.scss";
import Home from "./Home";
import { Posts } from "./Posts";

const POSTS = [
  {
    title: "Infrastructure",
    path: "infrastructure",
  },
  {
    title: "Infrastructure - Vault",
    path: "infrastructure-vault",
  },
];

function PostLink(props: { path: string; children: JSX.Element }) {
  function active(): boolean {
    return useParams().postSlug === props.path;
  }

  return (
    <li classList={{ [styles.Active]: active() }}>
      <A href={buildPath(COMMUNITY_DEVELOPMENT_POSTS_PATH, props.path)}>
        {props.children}
      </A>
    </li>
  );
}

function PostsHeader() {
  return (
    <>
      <nav class={styles.PostsHeader}>
        <ol>
          <For each={POSTS}>
            {({ title, path }) => <PostLink path={path}>{title}</PostLink>}
          </For>
        </ol>
      </nav>
      <Outlet />
    </>
  );
}

export default function CommunityRoutes() {
  return (
    <>
      <Route path="/" element={<PostsHeader />}>
        <Route path="" component={Home} />
        <Route
          path={buildPath(DEVELOPMENT_POSTS_SUBPATH, ":postSlug")}
          component={Posts}
        />
      </Route>
    </>
  );
}
