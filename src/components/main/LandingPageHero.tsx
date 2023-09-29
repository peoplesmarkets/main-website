import { Trans } from "@mbarzda/solid-i18next";

import { TKEYS } from "../../locales";
import styles from "./LandingPageHero.module.scss";
import { CallToAction } from "./CallToAction";

export function LandingPageHero() {
  return (
    <div class={styles.LandingPageHero}>
      <div class={styles.Hero}>
        <h1 class={styles.Title}>
          <Trans
            key={TKEYS["landing-page"]["establish-your-online-appearance"]}
          />
        </h1>

        <ul class={styles.List}>
          <li class={styles.ListItem}>
            <Trans
              key={
                TKEYS["landing-page"][
                  "create-your-online-market-booth-and-build-your-brand"
                ]
              }
            />
          </li>
          <li class={styles.ListItem}>
            <Trans
              key={TKEYS["landing-page"]["offer-your-goods-to-the-people"]}
            />
          </li>
          <li class={styles.ListItem}>
            <Trans key={TKEYS["landing-page"]["no-costs-until-you-sell"]} />
          </li>
          <li class={styles.ListItem}>
            <Trans key={TKEYS["landing-page"]["no-strings-attached"]} />
          </li>
        </ul>

        <CallToAction />
      </div>
    </div>
  );
}
