import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";

import styles from "./Footer.module.scss";
import { MainLogoText } from "./components/assets";
import { GitHubIcon, MainLogoIcon, RocketLaunchIcon } from "./components/icons";
import { TKEYS } from "./locales/dev";
import { buildIndexPathOrUrl } from "./routes/MainRoutes";
import { buildCommunityPathOrUrl } from "./routes/community/CommunityRoutes";
import {
  buildImprintPathOrUrl,
  buildPrivacyPolicyPathOrUrl,
  buildTermsOfServicePathOrUrl,
} from "./routes/info/InfoRoutes";

export default function Footer() {
  return (
    <>
      <footer class={styles.FooterContainer}>
        <div class={styles.Footer}>
          <div class={styles.Title}>
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
