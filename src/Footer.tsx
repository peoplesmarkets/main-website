import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";

import styles from "./Footer.module.scss";
import { MainLogoText } from "./components/assets";
import { GitHubIcon, MainLogoIcon } from "./components/icons";
import { RocketLaunchIcon } from "./components/icons/RocketLaunchIcon";
import { useThemeContext } from "./contexts/ThemeContext";
import { TKEYS } from "./locales/dev";
import { buildMarketBoothsPath } from "./routes/MainRoutes";
import { buildCommunityPath } from "./routes/community/CommunityRoutes";
import {
  buildGetStartedPath,
  buildImprintPath,
  buildPrivacyPolicyPath,
  buildTermsOfServicePath,
} from "./routes/info/InfoRoutes";

export default function Footer() {
  const { theme } = useThemeContext();

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
              href={buildMarketBoothsPath()}
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
            <A href={buildGetStartedPath()} class={styles.LinkWithIcon}>
              <Trans key={TKEYS["landing-page"]["get-started"]} />
              <RocketLaunchIcon class={styles.LinkIcon} />
            </A>
            <A href={buildImprintPath()}>
              <Trans key={TKEYS.imprint.title} />
            </A>
            <A href={buildPrivacyPolicyPath()}>
              <Trans key={TKEYS["privacy-policy"].title} />
            </A>
            <A href={buildTermsOfServicePath()}>
              <Trans key={TKEYS["terms-of-service"].title} />
            </A>
          </div>

          <div class={styles.Content}>
            <p>
              <Trans key={TKEYS.footer["community-paragraph"]} />
            </p>
          </div>

          <div class={styles.SiteLinks}>
            <A href={buildCommunityPath()}>
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
            <GitHubIcon class={styles.SocialIcon} theme={() => theme()} />
          </A>
        </div>
      </div>
    </>
  );
}
