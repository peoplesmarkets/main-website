import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import { Show, createSignal } from "solid-js";

import { TKEYS } from "../../locales";
import { CloseIcon } from "../icons";
import styles from "./EnvironmentBanner.module.scss";

export function EnvironmentBanner() {
  const [trans] = useTransContext();

  const [showEnvironmentBanner, setShowEnvironmentBanner] = createSignal(true);

  function handleCloseBanner() {
    setShowEnvironmentBanner(false);
  }

  return (
    <Show
      when={
        !import.meta.env.VITE_ENVIRONMENT?.startsWith("prod") &&
        showEnvironmentBanner()
      }
    >
      <div class={styles.EnvironmentBanner}>
        <CloseIcon onClick={handleCloseBanner} />

        <p>
          <Trans key={TKEYS["environment-banner"].title} />
        </p>
        <span>
          <Trans key={TKEYS["environment-banner"].description} />
          <A href={trans(TKEYS.peoplesmarkets_main_link)}>
            <Trans key={TKEYS.peoplesmarkets_main_link} />
          </A>
        </span>
      </div>
    </Show>
  );
}
