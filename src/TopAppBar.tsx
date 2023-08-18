import { A, useMatch } from "@solidjs/router";
import { Accessor, Setter, Show, createSignal, onMount } from "solid-js";

import { MainLogo } from "@peoplesmarkets/frontend-lib/components/assets/MainLogo";
import { ThemeIcon } from "@peoplesmarkets/frontend-lib/components/assets/ThemeIcon";
import { Theme } from "@peoplesmarkets/frontend-lib/theme";

import { INDEX_PATH } from "./App";
import styles from "./TopAppBar.module.scss";
import Profile from "./components/auth/Profile";
import { useAccessTokensContext } from "./contexts/AccessTokensContext";
import { buildAuthorizationRequest } from "./lib/auth";

type Props = {
  theme: Accessor<Theme>;
  setTheme: Setter<Theme>;
};

function NavItem({ href, name }: { href: string; name: string }) {
  const match = useMatch(() => href);

  return (
    <A
      href={href}
      class={styles.NavItem}
      classList={{ [styles.NavItemActive]: Boolean(match()) }}
    >
      {name}
    </A>
  );
}

export default function TopAppBar(props: Props) {
  const { ensureFreshTokens, isAuthenticated } = useAccessTokensContext();
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
        <span style="display: none;">People's Markets</span>

        <MainLogo class={styles.MainLogo} />
      </A>

      <nav class={styles.Nav}>
        <Show
          when={!isAuthenticated()}
          fallback={<Profile theme={props.theme} setTheme={props.setTheme} />}
        >
          <button
            class={styles.NavItem}
            classList={{ [styles.NavItemActive]: signingIn() }}
            onClick={signIn}
          >
            Sign In
          </button>

          <ThemeIcon theme={props.theme} setTheme={props.setTheme} />
        </Show>
      </nav>
    </header>
  );
}
