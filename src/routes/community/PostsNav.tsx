import { Trans } from "@mbarzda/solid-i18next";
import { A, useParams } from "@solidjs/router";
import { For, JSX } from "solid-js";

import { TKEYS } from "../../locales";
import { buildDevelopementPostPath } from "./community-routing";
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
  {
    title: "Infrastructure - Nomad",
    path: "infrastructure-nomad",
  },
  {
    title: "Infrastructure - CockroachDB",
    path: "infrastructure-cockroachdb",
  },
];

function PostLink(props: { path: string; children: JSX.Element }) {
  function active(): boolean {
    return useParams().postSlug === props.path;
  }

  return (
    <li classList={{ [styles.Active]: active() }}>
      <A href={buildDevelopementPostPath(props.path)}>{props.children}</A>
    </li>
  );
}

export function PostsNav() {
  return (
    <>
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
    </>
  );
}
