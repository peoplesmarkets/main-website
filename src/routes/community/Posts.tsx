import { useNavigate, useParams } from "@solidjs/router";
import _ from "lodash";
import { Show, createResource, onMount } from "solid-js";

import { COMMUNITY_DEVELOPMENT_POSTS_PATH, buildPath } from "../../App";
import { Markdown } from "../../components/content/Markdown";
import { Page } from "../../components/layout/Page";
import styles from "./Home.module.scss";

export function Posts() {
  const [content] = createResource(() => useParams().postSlug, fetchContent);

  async function fetchContent(postSlug: string) {
    const res = await fetch(buildPath("/content/posts", postSlug + ".md"));

    return res.text();
  }

  onMount(() => {
    if (_.isNil(useParams().postSlug)) {
      useNavigate()(
        buildPath(COMMUNITY_DEVELOPMENT_POSTS_PATH, "infrastructure"),
        {
          replace: true,
        }
      );
    }
  });

  return (
    <>
      <Page>
        <Show when={!_.isEmpty(content())}>
          <Markdown class={styles.Content} src={() => content()!} />
        </Show>
      </Page>
    </>
  );
}
