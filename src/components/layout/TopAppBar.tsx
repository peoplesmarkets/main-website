import { A, useMatch } from "@solidjs/router";
import { Show, createSignal, onMount } from "solid-js";

import { INDEX_PATH } from "../../App";
import MainLogo from "../assets/MainLogo";
import ThemeIcon from "../assets/ThemeIcon";
import styles from "./TopAppBar.module.scss";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import Profile from "../auth/Profile";
import { buildAuthorizationRequest } from "../../lib/auth";

function TopAppBarNavItem({ href, name }: { href: string; name: string }) {
  const match = useMatch(() => href);

  return (
    <A
      href={href}
      class={styles.TopAppBarNavItem}
      classList={{ [styles.TopAppBarNavItemActive]: Boolean(match()) }}
    >
      {name}
    </A>
  );
}

export default function TopAppBar() {
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
      <div class={styles.TopAppBarCorner} />

      <A class={styles.MainLink} href={INDEX_PATH}>
        <span style="display: none;">People's Markets</span>

        <MainLogo class={styles.MainLogo} />
      </A>

      <nav class={styles.TopAppBarNav}>
        <Show
          when={isAuthenticated()}
          fallback={
            <>
              {/* <button
                class={styles.NavItem}
                classList={{ [styles.NavItemActive]: signingIn() }}
                onClick={signIn}
              >
                Sign In
              </button> */}

              <ThemeIcon />
            </>
          }
        >
          <Profile />
        </Show>
      </nav>
    </header>
  );
}
