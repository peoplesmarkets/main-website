import { Trans, useTransContext } from "@mbarzda/solid-i18next";

import { Markdown } from "../../components/content/Markdown";
import { Section } from "../../components/layout/Section";
import { TKEYS } from "../../locales";
import styles from "./Home.module.scss";
import { PostsNav } from "./PostsNav";

export default function Home() {
  const [trans] = useTransContext();

  return (
    <>
      <div class={styles.Home}>
        <Section>
          <h1>
            <Trans key={TKEYS["community-page"].headline} />
          </h1>
          <Markdown src={() => trans(TKEYS["community-page"].description)} />
        </Section>
      </div>

      <div class={styles.Nav}>
        <Section>
          <PostsNav />
        </Section>
      </div>
    </>
  );
}
