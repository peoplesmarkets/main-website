import { A } from "@solidjs/router";
import { Accessor } from "solid-js";

import { Theme } from "@peoplesmarkets/frontend-lib/theme";
import {
  GitHubMark,
  MainLogoIcon,
  OpenInNew,
} from "@peoplesmarkets/frontend-lib/components";

import {
  IMPRINT_PATH,
  PRIVACY_POLICY_PATH,
  TERMS_OF_SERVICE_PATH,
} from "./App";
import styles from "./Footer.module.scss";

type Props = {
  theme: Accessor<Theme>;
};

export default function Footer(props: Props) {
  return (
    <footer class={styles.Footer}>
      <div class={styles.FooterTitle}>
        <span class={styles.FooterTitleText}>People's Markets</span>
      </div>
      <div class={styles.FooterContent}>
        <div class={styles.FooterContentText}>
          <p>
            People's Markets is an online platform where businesses and people
            can offer items while building their brand and market appearance.
          </p>
        </div>
        <ul class={styles.FooterContentLinks}>
          <li>
            <A href={import.meta.env.VITE_MAIN_WEBSITE_URL}>People's Markets</A>
          </li>
          <li>
            <A
              href={import.meta.env.VITE_COMMUNITY_WEBSITE_URL}
              target="_blank"
            >
              People's Markets - community{" "}
              <OpenInNew class={styles.OpenInNew} />
            </A>
          </li>
        </ul>
      </div>

      <div class={styles.FooterLogoAndPrivacy}>
        <MainLogoIcon class={styles.FooterLogoAndPrivacyIcon} />
        <A href={IMPRINT_PATH}>Imprint</A>
        <A href={PRIVACY_POLICY_PATH}>Privacy Policy</A>
        <A href={TERMS_OF_SERVICE_PATH}>Terms of service</A>
      </div>

      <div class={styles.FooterSign}>
        <A
          href={import.meta.env.VITE_OPEN_SOURCE_REPOSITORIES_URL}
          target="_blank"
        >
          <GitHubMark class={styles.SocialIcon} theme={props.theme} />
        </A>
      </div>
    </footer>
  );
}
