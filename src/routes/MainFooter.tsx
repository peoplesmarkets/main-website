import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";

import { MainLogoText } from "../components/assets";
import { GitHubIcon, MainLogoIcon } from "../components/icons";
import { Section } from "../components/layout";
import { TKEYS } from "../locales";
import styles from "./MainFooter.module.scss";
import { buildCommunityPathOrUrl } from "./community/community-routing";
import {
  buildImprintPathOrUrl,
  buildPrivacyPolicyPathOrUrl,
  buildTermsOfServicePathOrUrl,
} from "./info/info-routing";

export default function MainFooter() {
  return (
    <footer class={styles.Footer}>
      <Section>
        <div class={styles.MainLogo}>
          <MainLogoIcon class={styles.MainLogoIcon} />
          <MainLogoText class={styles.MainLogoText} />
        </div>

        <span class={styles.Content}>
          <Trans key={TKEYS.footer["main-paragraph"]} />
        </span>
      </Section>

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

      <Section>
        <span class={styles.Content}>
          <Trans key={TKEYS.footer["community-paragraph"]} />
        </span>
      </Section>

      <div class={styles.SiteLinks}>
        <A href={buildCommunityPathOrUrl()}>
          <Trans key={TKEYS["main-navigation"].links.community} />{" "}
        </A>
      </div>

      <div class={styles.Social}>
        <A
          href={import.meta.env.VITE_OPEN_SOURCE_REPOSITORIES_URL}
          target="_blank"
          aria-label="Go to our GitHub page"
        >
          <GitHubIcon class={styles.SocialIcon} />
        </A>
      </div>
    </footer>
  );
}
