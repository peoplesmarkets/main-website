import { Trans } from "@mbarzda/solid-i18next";
import { A, Outlet, useParams } from "@solidjs/router";
import { For, JSX } from "solid-js";

import { buildPath, COMMUNITY_DEVELOPMENT_POSTS_PATH } from "../../App";
import { Page } from "../../components/layout/Page";
import { TKEYS } from "../../locales/dev";
import styles from "./PostsNav.module.scss";

const POSTS = [
  {
    title: "The broad idea of this project",
    path: "the-broad-idea",
  },
  {
    title: "Infrastructure",
    path: "infrastructure",
  },
  {
    title: "Infrastructure - Vault",
    path: "infrastructure-vault",
  },
  {
    title: "Infrastructure - Vault <3 Consul",
    path: "infrastructure-vault-consul",
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

export function PostsNav() {
  return (
    <>
      <Page>
        <nav class={styles.PostsNav}>
          <p class={styles.Subtitle}>
            <Trans key={TKEYS["community-page"].posts.title} />:
          </p>

          <ol>
            <For each={POSTS}>
              {({ title, path }) => <PostLink path={path}>{title}</PostLink>}
            </For>
          </ol>
        </nav>
        <Outlet />
      </Page>
    </>
  );
}
