import { Match, Switch } from "solid-js";

import styles from "./IconDefault.module.scss";

type Props = {
  class?: string;
  classList?: {
    [k: string]: boolean | undefined;
  };
  direction: () => "up" | "right" | "down" | "left";
};

export default function Chevron(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      class={props.class || styles.IconDefault}
      classList={props.classList}
    >
      <Switch>
        <Match when={props.direction() === "up"}>
          <path d="m283-345-43-43 240-240 240 239-43 43-197-197-197 198Z" />
        </Match>
        <Match when={props.direction() === "right"}>
          <path d="m375-240-43-43 198-198-198-198 43-43 241 241-241 241Z" />
        </Match>
        <Match when={props.direction() === "down"}>
          <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z" />
        </Match>
        <Match when={props.direction() === "left"}>
          <path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z" />
        </Match>
      </Switch>
    </svg>
  );
}
