import { A } from "@solidjs/router";
import { Accessor } from "solid-js";

import {
  GitHubMark,
  MainLogoIcon,
  OpenInNew,
  Theme,
  MarkdownParagraph,
} from "@peoplesmarkets/frontend-lib";

import {
  IMPRINT_PATH,
  PRIVACY_POLICY_PATH,
  TERMS_OF_SERVICE_PATH,
} from "./App";
import styles from "./Footer.module.scss";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { TKEYS } from "./locales/dev";

type Props = {
  theme: Accessor<Theme>;
};

export default function Footer(props: Props) {
  const [trans] = useTransContext();

  return (
    <footer class={styles.Footer}>
      <div class={styles.FooterTitle}>
        <span class={styles.FooterTitleText}>
          <Trans key={TKEYS["Peoples-Markets"]} />
        </span>
      </div>
      <div class={styles.FooterContent}>
        <div class={styles.FooterContentText}>
          <MarkdownParagraph src={() => trans("footer.main-paragraph")} />
        </div>

        <ul class={styles.FooterContentLinks}>
          <li>
            <A href={import.meta.env.VITE_MAIN_WEBSITE_URL}>
              <Trans key={TKEYS["Peoples-Markets"]} />
            </A>
          </li>
          <li>
            <A
              href={import.meta.env.VITE_COMMUNITY_WEBSITE_URL}
              target="_blank"
            >
              <Trans key={TKEYS["Peoples-Markets-community"]} />{" "}
              <OpenInNew class={styles.OpenInNew} />
            </A>
          </li>
        </ul>
      </div>

      <div class={styles.FooterLogoAndPrivacy}>
        <MainLogoIcon class={styles.FooterLogoAndPrivacyIcon} />
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
