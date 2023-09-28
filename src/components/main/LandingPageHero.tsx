import { Trans } from "@mbarzda/solid-i18next";

import { TKEYS } from "../../locales";
import styles from "./LandingPageHero.module.scss";
import { buildAuthorizationRequest } from "../../lib";
import { buildDashboardPath } from "../../routes/MainRoutes";

export function LandingPageHero() {
  async function handleGetStarted() {
    const registerUrl = await buildAuthorizationRequest(
      "create",
      buildDashboardPath()
    );
    window.location.href = registerUrl.toString();
  }

  return (
    <div class={styles.GetStarted}>
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

        <div class={styles.CallToAction}>
          <button class={styles.CallToActionButton} onClick={handleGetStarted}>
            <Trans key={TKEYS["landing-page"]["GET-STARTED"]} />
          </button>
        </div>
      </div>
    </div>
  );
}
