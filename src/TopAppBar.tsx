import { A } from "@solidjs/router";
import { Accessor, Setter, Show, createSignal, onMount } from "solid-js";

import {
  MainLogo,
  Profile,
  SelectLanguage,
  Theme,
  ThemeIcon,
  buildAuthorizationRequest,
} from "@peoplesmarkets/frontend-lib";

import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { INDEX_PATH } from "./App";
import styles from "./TopAppBar.module.scss";
import { useAccessTokensContext } from "./contexts/AccessTokensContext";
import { TKEYS } from "./locales/dev";

type Props = {
  theme: Accessor<Theme>;
  setTheme: Setter<Theme>;
};

export default function TopAppBar(props: Props) {
  const { ensureFreshTokens, isAuthenticated, currentSession, endSession } =
    useAccessTokensContext();

  const [, { changeLanguage, getI18next }] = useTransContext();

  const [signingIn, setSigningIn] = createSignal(false);

  onMount(async () => {
    await ensureFreshTokens();
  });

  async function signIn() {
    setSigningIn(true);
    window.location.href = (await buildAuthorizationRequest()).toString();
  }

  return (
    <header class={styles.TopAppBar}>
      <div class={styles.Corner} />

      <A class={styles.MainLink} href={INDEX_PATH}>
        <span style={{ display: "none" }}>
          <Trans key={TKEYS["Peoples-Markets"]} />
        </span>

        <MainLogo class={styles.MainLogo} />
      </A>

      <nav class={styles.Nav}>
        <Show when={!isAuthenticated()}>
          <button
            class={styles.NavItem}
            classList={{ [styles.NavItemActive]: signingIn() }}
            onClick={signIn}
          >
            <Trans key={TKEYS["sign-in"]} />
          </button>
        </Show>

        <ThemeIcon theme={props.theme} setTheme={props.setTheme} />

        <SelectLanguage
          changeLanguage={changeLanguage}
          getI18next={getI18next}
        />

        <Show when={isAuthenticated()}>
          <Profile
            class={styles.Profile}
            theme={props.theme}
            setTheme={props.setTheme}
            currentSession={currentSession}
            onEndSession={endSession}
          />
        </Show>
      </nav>
    </header>
  );
}
