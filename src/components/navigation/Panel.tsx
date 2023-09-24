import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A, useLocation } from "@solidjs/router";
import { JSX, Show, createEffect, createSignal } from "solid-js";

import { BurgerArrowIcon, BurgerIcon, CloseIcon } from "../../components/icons";
import { getSlots } from "../../components/layout/Slot";
import { clickOutside } from "../../directives";
import { TKEYS } from "../../locales/dev";
import styles from "./Panel.module.scss";

false && clickOutside;

type Props = {
  children: JSX.Element;
  close?: () => boolean;
  style?: string | JSX.CSSProperties | undefined;
};

export function Panel(props: Props) {
  const [trans] = useTransContext();

  const location = useLocation();

  /* eslint-disable-next-line */
  const slots = getSlots(props.children);

  const [showSlider, setShowSlider] = createSignal(false);
  const [showEnvironmentBanner, setShowEnvironmentBanner] = createSignal(true);

  createEffect(() => {
    if (showSlider()) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  });

  createEffect(() => {
    if (props.close?.()) {
      handleCloseSlider();
    }
  });

  createEffect(() => {
    location.pathname && handleCloseSlider();
  });

  function handleToggleSlider() {
    setShowSlider(!showSlider());
  }

  function handleCloseSlider() {
    setShowSlider(false);
  }

  function handleCloseBanner() {
    setShowEnvironmentBanner(false);
  }

  return (
    <div style={props.style}>
      <div class={styles.Panel}>
        <BurgerIcon class={styles.MenuIcon} onClick={handleToggleSlider} />

        <div class={styles.Main}>{slots.logo}</div>
      </div>

      <div
        class={styles.SliderBackground}
        classList={{
          [styles.SliderBackgroundIn]: showSlider(),
          [styles.SliderBackgroundOut]: !showSlider(),
        }}
      />
      <nav
        class={styles.Slider}
        classList={{
          [styles.SlideIn]: showSlider(),
          [styles.SlideOut]: !showSlider(),
        }}
        use:clickOutside={handleCloseSlider}
      >
        <div class={styles.Menu}>
          <BurgerArrowIcon
            class={styles.MenuIcon}
            onClick={handleCloseSlider}
          />
        </div>

        <div class={styles.MainNavigation}>{slots.items}</div>

        <div class={styles.Settings}>{slots.settings}</div>
      </nav>

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
    </div>
  );
}
