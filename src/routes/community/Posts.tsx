import { useParams } from "@solidjs/router";
import _ from "lodash";
import { Show, createResource } from "solid-js";

import { Markdown } from "../../components/content/Markdown";
import { buildPath } from "../../lib";
import styles from "./Home.module.scss";

export function Posts() {
  const [content] = createResource(() => useParams().postSlug, fetchContent);

  async function fetchContent(postSlug: string) {
    const res = await fetch(buildPath("/content/posts", postSlug + ".md"));

    return res.text();
  }

  return (
    <>
      <Show when={!_.isEmpty(content())}>
        <Markdown class={styles.Content} src={() => content()!} />
      </Show>
    </>
  );
}
