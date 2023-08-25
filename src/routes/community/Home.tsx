import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { Markdown } from "../../components/content/Markdown";
import { Page } from "../../components/layout/Page";
import { TKEYS } from "../../locales/dev";
import styles from "./Home.module.scss";
import { PostsNav } from "./PostsNav";
import { Section } from "../../components/layout/Section";

export default function Home() {
  const [trans] = useTransContext();

  return (
    <>
      <Page>
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
      </Page>
    </>
  );
}
