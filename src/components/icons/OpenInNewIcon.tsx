import { JSX } from "solid-js";
import styles from "./IconDefault.module.scss";

type Props = {
  class?: string;
  style?: string | JSX.CSSProperties | undefined;
};

export function OpenInNewIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      class={props.class || styles.IconDefault}
      style={props.style}
    >
      <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h279v60H180v600h600v-279h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60v-218L382-339Z" />
    </svg>
  );
}
