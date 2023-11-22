import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";

import { Show } from "solid-js";
import { MainLogoText, MdIcon } from "../components/assets";
import { GitHubIcon, MainLogoIcon } from "../components/icons";
import { Section } from "../components/layout";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { TKEYS } from "../locales";
import styles from "./MainFooter.module.scss";
import { buildCommunityPathOrUrl } from "./community/community-routing";
import {
  buildImprintPath,
  buildPrivacyPolicyPath,
  buildTermsOfServicePath,
} from "./info/info-routing";
import { buildGetStartedPath } from "./main-routing";

export default function MainFooter() {
  const { isAuthenticated } = useAccessTokensContext();

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
        <Show when={!isAuthenticated()}>
          <A class={styles.LinkWithIcon} href={buildGetStartedPath()}>
            <MdIcon icon="rocket_launch" />
            <Trans key={TKEYS["main-navigation"].links["get-started"]} />
          </A>
        </Show>

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

      <Section>
        <span class={styles.Content}>
          <Trans key={TKEYS.footer["community-paragraph"]} />
        </span>
      </Section>

      <div class={styles.SiteLinks}>
        <A class={styles.LinkWithIcon} href={buildCommunityPathOrUrl()}>
          <MdIcon icon="forum" />
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
