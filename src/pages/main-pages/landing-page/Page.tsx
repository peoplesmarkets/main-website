import { Trans } from "@mbarzda/solid-i18next";
import { createResource } from "solid-js";

import { Font } from "../../../components/content";
import { LinkButton } from "../../../components/form/LinkButton";
import { Section } from "../../../components/layout";
import { useAccessTokensContext } from "../../../contexts/AccessTokensContext";
import { buildAuthorizationRequest } from "../../../lib";
import { TKEYS } from "../../../locales";
import {
  buildDashboardPath,
  buildIndexPathOrUrl,
} from "../../../routes/main-routing";
import styles from "./Page.module.scss";

export default function LandingPage() {
  const { isAuthenticated } = useAccessTokensContext();

  const [registerUrl] = createResource(
    () => !isAuthenticated(),
    async () => {
      const registerUrl = await buildAuthorizationRequest(
        "create",
        buildDashboardPath()
      );
      return registerUrl.toString();
    }
  );

  const [signInUrl] = createResource(
    () => !isAuthenticated(),
    async () => {
      const signInUrl = await buildAuthorizationRequest(
        undefined,
        buildIndexPathOrUrl()
      );

      return signInUrl.toString();
    }
  );

  return (
    <>
      <Section flat narrow>
        <div class={styles.LandingPageHero}>
          <div class={styles.Hero}>
            <h1 class={styles.Title}>
              <Trans
                key={TKEYS["landing-page"]["establish-your-online-appearance"]}
              />
            </h1>

            <ul class={styles.List}>
              <li class={styles.ListItem}>
                <Trans
                  key={
                    TKEYS["landing-page"][
                      "create-your-online-shop-and-build-your-brand"
                    ]
                  }
                />
              </li>
              <li class={styles.ListItem}>
                <Trans
                  key={TKEYS["landing-page"]["offer-your-goods-to-the-people"]}
                />
              </li>
              <li class={styles.ListItem}>
                <Trans key={TKEYS["landing-page"]["no-costs-until-you-sell"]} />
              </li>
              <li class={styles.ListItem}>
                <Trans key={TKEYS["landing-page"]["no-strings-attached"]} />
              </li>
            </ul>

            <div class={styles.CallToAction}>
              <LinkButton
                actionType="active-filled"
                href={registerUrl() || "#"}
                style={{
                  height: "3rem",
                  padding: "24px 32px",
                  "background-color": "var(--orange)",
                  color: "#000",
                }}
              >
                <Font type="title" key={TKEYS["landing-page"].REGISTER} />
              </LinkButton>

              <Font type="body" key={TKEYS.common.or} />

              <LinkButton actionType="neutral" href={signInUrl() || "#"}>
                <Trans key={TKEYS["landing-page"]["Sign-In"]} />
              </LinkButton>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
