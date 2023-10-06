import { Trans } from "@mbarzda/solid-i18next";

import { buildAuthorizationRequest } from "../../lib";
import { TKEYS } from "../../locales";
import { buildDashboardPath } from "../../routes/main-routing";
import styles from "./CallToAction.module.scss";

export function CallToAction() {
  async function handleGetStarted() {
    const registerUrl = await buildAuthorizationRequest(
      "create",
      buildDashboardPath()
    );
    window.location.href = registerUrl.toString();
  }

  return (
    <div class={styles.CallToAction}>
      <button class={styles.CallToActionButton} onClick={handleGetStarted}>
        <Trans key={TKEYS["landing-page"]["GET-STARTED"]} />
      </button>
    </div>
  );
}
