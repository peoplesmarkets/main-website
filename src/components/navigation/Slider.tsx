import { JSX } from "solid-js/jsx-runtime";

import styles from "./Slider.module.scss";

type Props = {
  class?: string;
  children: JSX.Element;
  showSlider: () => boolean;
};

export function Slider(props: Props) {
  return (
    <div
      class={props.class}
      classList={{
        [styles.Slider]: true,
      }}
    >
      {props.children}
    </div>
  );
}
