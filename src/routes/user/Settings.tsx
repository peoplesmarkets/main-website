import { Trans } from "@mbarzda/solid-i18next";

import { Page } from "../../components/layout";
import { TKEYS } from "../../locales/dev";
import styles from "./Settings.module.scss";

export default function Settings() {
  return (
    <Page>
      <span class={styles.Headline}>
        <Trans key={TKEYS["user-settings-page"].title} />
      </span>
    </Page>
  );
}
