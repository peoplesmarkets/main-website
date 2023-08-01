import { Match, Switch } from "solid-js";

type Props = {
  class?: string;
  direction: "top" | "right" | "bottom" | "left";
};

export default function Chevron(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 -960 960 960"
      width="48"
      fill="var(--content-font-color)"
      stroke="var(--content-font-color)"
      class={props.class}
    >
      <Switch>
        <Match when={props.direction === "top"}>
          <path d="m283-345-43-43 240-240 240 239-43 43-197-197-197 198Z" />
        </Match>
        <Match when={props.direction === "right"}>
          <path d="m375-240-43-43 198-198-198-198 43-43 241 241-241 241Z" />
        </Match>
        <Match when={props.direction === "bottom"}>
          <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z" />
        </Match>
        <Match when={props.direction === "left"}>
          <path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z" />
        </Match>
      </Switch>
    </svg>
  );
}
