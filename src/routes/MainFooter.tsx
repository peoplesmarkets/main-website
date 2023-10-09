import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";

import { MainLogoText } from "../components/assets";
import { GitHubIcon, MainLogoIcon } from "../components/icons";
import { TKEYS } from "../locales";
import styles from "./MainFooter.module.scss";
import { buildCommunityPathOrUrl } from "./community/community-routing";
import {
  buildImprintPathOrUrl,
  buildPrivacyPolicyPathOrUrl,
  buildTermsOfServicePathOrUrl,
} from "./info/info-routing";
import { buildIndexPathOrUrl } from "./main-routing";

export default function MainFooter() {
  return (
    <>
      <footer class={styles.FooterContainer}>
        <div class={styles.Footer}>
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

          <div class={styles.Content}>
            <p>
              <Trans key={TKEYS.footer["main-paragraph"]} />
            </p>
          </div>

          <div class={styles.SiteLinks}>
            <A href={buildImprintPathOrUrl()}>
              <Trans key={TKEYS.imprint.title} />
            </A>
            <A href={buildPrivacyPolicyPathOrUrl()}>
              <Trans key={TKEYS["privacy-policy"].title} />
            </A>
            <A href={buildTermsOfServicePathOrUrl()}>
              <Trans key={TKEYS["terms-of-service"].title} />
            </A>
          </div>

          <div class={styles.Content}>
            <p>
              <Trans key={TKEYS.footer["community-paragraph"]} />
            </p>
          </div>

          <div class={styles.SiteLinks}>
            <A href={buildCommunityPathOrUrl()}>
              <Trans key={TKEYS["main-navigation"].links.community} />{" "}
            </A>
          </div>
        </div>
      </footer>
      <div class={styles.SocialContainer}>
        <div class={styles.Social}>
          <A
            href={import.meta.env.VITE_OPEN_SOURCE_REPOSITORIES_URL}
            target="_blank"
            aria-label="Go to our GitHub page"
          >
            <GitHubIcon class={styles.SocialIcon} />
          </A>
        </div>
      </div>
    </>
  );
}
