import { useLocation } from "@solidjs/router";
import { JSX, createEffect } from "solid-js";

import { BurgerArrowIcon, BurgerIcon } from "../../components/icons";
import { getSlots } from "../../components/layout/Slot";
import { clickOutside } from "../../directives";
import { EnvironmentBanner } from "../content/EnvironmentBanner";
import styles from "./Panel.module.scss";

false && clickOutside;

type Props = {
  children: JSX.Element;
  showSlider: () => boolean;
  setShowSlider: (_: boolean) => void;
  style?: string | JSX.CSSProperties | undefined;
};

export function Panel(props: Props) {
  const location = useLocation();

  /* eslint-disable-next-line */
  const slots = getSlots(props.children);

  createEffect(() => {
    if (props.showSlider()) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  });

  createEffect(() => {
    location.pathname && handleCloseSlider();
  });

  function handleToggleSlider() {
    props.setShowSlider(!props.showSlider());
  }

  function handleCloseSlider() {
    props.setShowSlider(false);
  }

  return (
    <>
      <div style={props.style}>
        <div class={styles.Panel}>
          <BurgerIcon class={styles.MenuIcon} onClick={handleToggleSlider} />

          <div class={styles.Main}>{slots.logo}</div>
        </div>

        <div
          class={styles.SliderBackground}
          classList={{
            [styles.SliderBackgroundIn]: props.showSlider(),
            [styles.SliderBackgroundOut]: !props.showSlider(),
          }}
        />
        <nav
          class={styles.Slider}
          classList={{
            [styles.SlideIn]: props.showSlider(),
            [styles.SlideOut]: !props.showSlider(),
          }}
          use:clickOutside={() => handleCloseSlider()}
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
      </div>

      <EnvironmentBanner />
    </>
  );
}
