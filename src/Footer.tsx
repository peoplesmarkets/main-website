import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import { Accessor } from "solid-js";

import {
  COMMUNITY_PATH,
  GET_STARTED_PATH,
  IMPRINT_PATH,
  PRIVACY_POLICY_PATH,
  TERMS_OF_SERVICE_PATH,
} from "./App";
import styles from "./Footer.module.scss";
import { MainLogoText } from "./components/assets";
import { GitHubIcon, MainLogoIcon } from "./components/icons";
import { Theme } from "./contexts/ThemeStore";
import { TKEYS } from "./locales/dev";
import { RocketLaunchIcon } from "./components/icons/RocketLaunchIcon";

type Props = {
  theme: Accessor<Theme>;
};

export default function Footer(props: Props) {
  return (
    <>
      <footer class={styles.FooterContainer}>
        <div class={styles.Footer}>
          <div class={styles.Title}>
            <MainLogoIcon class={styles.MainLogoIcon} />
            <MainLogoText class={styles.MainLogoText} />
          </div>

          <div class={styles.Content}>
            <p>
              <Trans key={TKEYS.footer["main-paragraph"]} />
            </p>
          </div>

          <div class={styles.SiteLinks}>
            <A href={GET_STARTED_PATH} class={styles.LinkWithIcon}>
              <Trans key={TKEYS["landing-page"]["get-started"]} />
              <RocketLaunchIcon class={styles.LinkIcon} />
            </A>
            <A href={IMPRINT_PATH}>
              <Trans key={TKEYS.imprint.title} />
            </A>
            <A href={PRIVACY_POLICY_PATH}>
              <Trans key={TKEYS["privacy-policy"].title} />
            </A>
            <A href={TERMS_OF_SERVICE_PATH}>
              <Trans key={TKEYS["terms-of-service"].title} />
            </A>
          </div>

          <div class={styles.Content}>
            <p>
              <Trans key={TKEYS.footer["community-paragraph"]} />
            </p>
          </div>

          <div class={styles.SiteLinks}>
            <A href={COMMUNITY_PATH}>
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
            <GitHubIcon class={styles.SocialIcon} theme={props.theme} />
          </A>
        </div>
      </div>
    </>
  );
}
