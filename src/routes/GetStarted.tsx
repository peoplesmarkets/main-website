import { onMount } from "solid-js";

import {
  ActionButton,
  buildAuthorizationRequest,
} from "@peoplesmarkets/frontend-lib";

import { DASHBOARD_PATH } from "../App";
import styles from "./GetStarted.module.scss";
import { authGuardRedirect } from "../lib/auth";
import { Trans } from "@mbarzda/solid-i18next";
import { TKEYS } from "../locales/dev";

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
        <div class={styles.VPandCTA}>
          <h1 class={styles.VPTitle}>
            <Trans
              key={TKEYS["landing-page"]["establish-your-online-appearance"]}
            />
          </h1>

          <ul class={styles.VPSubTitle}>
            <li class={styles.VPSubTitleItem}>
              <Trans
                key={
                  TKEYS["landing-page"][
                    "create-your-online-market-booth-and-build-your-brand"
                  ]
                }
              />
            </li>
            <li class={styles.VPSubTitleItem}>
              <Trans
                key={TKEYS["landing-page"]["offer-your-goods-to-the-people"]}
              />
            </li>
            <li class={styles.VPSubTitleItem}>
              <Trans key={TKEYS["landing-page"]["no-costs-until-you-sell"]} />
            </li>
            <li class={styles.VPSubTitleItem}>
              <Trans key={TKEYS["landing-page"]["no-strings-attached"]} />
            </li>
          </ul>

          <ActionButton
            actionType="active"
            extraClass={styles.CTAButton}
            onClick={getStarted}
          >
            <Trans key={TKEYS["landing-page"]["GET-STARTED"]} />
          </ActionButton>
        </div>

        <div class={styles.HeroImage} />
      </div>
    </div>
  );
}
