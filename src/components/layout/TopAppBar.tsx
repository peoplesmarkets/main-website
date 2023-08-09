import { A, useMatch } from "@solidjs/router";
import { Show, onMount } from "solid-js";

import { HOME_PAGE_PATH, SIGN_IN_PATH } from "../../App";
import MainLogo from "../assets/MainLogo";
import ThemeIcon from "../assets/ThemeIcon";
import styles from "./TopAppBar.module.scss";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import Profile from "../auth/Profile";

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

  onMount(async () => {
    await ensureFreshTokens();
  });

  return (
    <header class={styles.TopAppBar}>
      <div class={styles.TopAppBarCorner} />

      <A class={styles.MainLink} href={HOME_PAGE_PATH}>
        <span style="display: none;">People's Markets</span>

        <MainLogo class={styles.MainLogo} />
      </A>

      <nav class={styles.TopAppBarNav}>
        <Show
          when={isAuthenticated()}
          fallback={
            <>
              {/* <TopAppBarNavItem href={SIGN_IN_PATH} name="Sign In" /> */}
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
