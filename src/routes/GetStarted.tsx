import { Trans } from "@mbarzda/solid-i18next";
import { onMount } from "solid-js";

import { buildAuthorizationRequest } from "@peoplesmarkets/frontend-lib";

import { DASHBOARD_PATH } from "../App";
import { authGuardRedirect } from "../lib/auth";
import { TKEYS } from "../locales/dev";
import styles from "./GetStarted.module.scss";

export default function GetStarted() {
  onMount(async () => {
    await authGuardRedirect(DASHBOARD_PATH, true);
  });

  async function getStarted() {
    window.location.href = (await buildAuthorizationRequest(true)).toString();
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
          <button class={styles.CallToActionButton} onClick={getStarted}>
            <Trans key={TKEYS["landing-page"]["GET-STARTED"]} />
          </button>
        </div>
      </div>
    </div>
  );
}
