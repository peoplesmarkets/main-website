import { onMount } from "solid-js";

import { ActionButton } from "@peoplesmarkets/frontend-lib/components";

import { DASHBOARD_PATH } from "../App";
import { authGuardRedirect, buildAuthorizationRequest } from "../lib/auth";
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
        <div class={styles.VPandCTA}>
          <h1 class={styles.VPTitle}>Establish Your Online Appearance</h1>

          <ul class={styles.VPSubTitle}>
            <li class={styles.VPSubTitleItem}>
              Create your Online Market Booth and build your brand
            </li>
            <li class={styles.VPSubTitleItem}>
              Offer your items to the people
            </li>
            <li class={styles.VPSubTitleItem}>No costs until you sell</li>
            <li class={styles.VPSubTitleItem}>No strings attached</li>
          </ul>

          <ActionButton
            actionType="active"
            extraClass={styles.CTAButton}
            onClick={getStarted}
          >
            GET STARTED
          </ActionButton>
        </div>

        <div class={styles.HeroImage}></div>
      </div>
    </div>
  );
}
