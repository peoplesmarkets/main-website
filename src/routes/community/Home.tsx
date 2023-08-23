import _ from "lodash";
import { Show, createResource } from "solid-js";

import { Markdown } from "../../components/content/Markdown";
import { Page } from "../../components/layout/Page";
import styles from "./Home.module.scss";

export default function Home() {
  const [content] = createResource(fetchContent);

  async function fetchContent() {
    const res = await fetch("/content/posts/the-broad-idea.md");

    return res.text();
  }

  return (
    <>
      <Page>
        <Show when={!_.isEmpty(content())}>
          <Markdown src={() => content()!} class={styles.Content} />
        </Show>
      </Page>
    </>
  );
}
