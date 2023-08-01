import { A } from "@solidjs/router";

import styles from "./Footer.module.scss";
import MainLogoIcon from "../assets/MainLogoIcon";

export default function Footer() {
  return (
    <footer class={styles.Footer}>
      <h1 class={styles.FooterTitle}>People's Markets</h1>
      <div class={styles.FooterContent}>
        <div class={styles.FooterContentText}>
          <p>
            People's Markets is an online platform where businesses and private
            persons can sell goods while building up their brand and market
            appearance.
          </p>
        </div>
        <ul class={styles.FooterContentLinks}>
          <li>
            <A href={import.meta.env.VITE_MAIN_WEBSITE_URL} target="_blank">
              People's Markets
            </A>
          </li>
          <li>
            <A
              href={import.meta.env.VITE_COMMUNITY_WEBSITE_URL}
              target="_blank"
            >
              People's Markets - community
            </A>
          </li>
        </ul>
      </div>

      <div class={styles.FooterLogoAndPrivacy}>
        <MainLogoIcon class={styles.FooterLogoAndPrivacyIcon} />
        <A href="/imprint">Imprint</A>
        <A href="/privacy-policy">Privacy Policy</A>
        <A href="/terms-of-service">Terms of service</A>
      </div>

      <div class={styles.FooterSign}>
        <strong>People's Markets</strong> by{" "}
        <A
          href={import.meta.env.VITE_RESPONSIBLE_DEVELOPER_URL}
          target="_blank"
        >
          Maxi Teme
        </A>
      </div>
    </footer>
  );
}
