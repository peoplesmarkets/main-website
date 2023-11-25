import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import { Show } from "solid-js";

import { buildBaseUrl } from "../../lib";
import { TKEYS } from "../../locales";
import { MainLogo } from "../assets/MainLogo";
import { MdLoading } from "./MdLoading";
import styles from "./Redirect.module.scss";

type Props = {
  singIn?: boolean | undefined;
  noLogo?: boolean | undefined;
};

export function Redirect(props: Props) {
  return (
    <div class={styles.Redirect}>
      <div class={styles.Container}>
        <div class={styles.Header}>
          <Show when={!props.noLogo}>
            <A href={buildBaseUrl()}>
              <MainLogo class={styles.Logo} />
            </A>
          </Show>
        </div>

        <div class={styles.Loading}>
          <MdLoading />
        </div>

        <div class={styles.Footer}>
          <span class={styles.Headline}>
            <Show
              when={Boolean(props.singIn)}
              fallback={<Trans key={TKEYS.navigation.redirecting} />}
            >
              <Trans key={TKEYS.user.authenticating} />
            </Show>{" "}
            ...
          </span>
        </div>
      </div>
    </div>
  );
}
