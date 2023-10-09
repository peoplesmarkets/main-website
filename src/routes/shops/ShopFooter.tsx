import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";

import { MainLogoText } from "../../components/assets";
import { MainLogoIcon } from "../../components/icons";
import { TKEYS } from "../../locales";
import { buildIndexPathOrUrl } from "../main-routing";
import styles from "./ShopFooter.module.scss";

export function ShopFooter() {
  return (
    <footer class={styles.Footer}>
      <div class={styles.Label}>
        <Trans key={TKEYS.footer["powered-by"]} />:
      </div>
      <div class={styles.Logo}>
        <A
          class={styles.LogoLink}
          href={buildIndexPathOrUrl()}
          aria-label="Go to home page"
        >
          <MainLogoIcon class={styles.MainLogoIcon} />
          <MainLogoText class={styles.MainLogoText} />
        </A>
      </div>
    </footer>
  );
}