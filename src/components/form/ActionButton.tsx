import { JSX } from "solid-js";

import styles from "./ActionButton.module.scss";

type Props = {
  actionType:
    | "active"
    | "active-borderless"
    | "active-filled"
    | "danger"
    | "danger-borderless"
    | "danger-filled"
    | "neutral"
    | "neutral-borderless";
  children: JSX.Element;
  onClick: (_event?: any) => void;
  submit?: boolean;
  disabled?: boolean;
  small?: boolean;
};

export function ActionButton(props: Props) {
  return (
    <button
      classList={{
        [styles.ActionButton]: true,
        [styles.Active]: props.actionType === "active",
        [styles.ActiveBorderless]: props.actionType === "active-borderless",
        [styles.ActiveFilled]: props.actionType === "active-filled",
        [styles.Danger]: props.actionType === "danger",
        [styles.DangerBorderless]: props.actionType === "danger-borderless",
        [styles.DangerFilled]: props.actionType === "danger-filled",
        [styles.Neutral]: props.actionType === "neutral",
        [styles.NetrealBorderless]: props.actionType === "neutral-borderless",
        [styles.Disabled]: Boolean(props.disabled),
        [styles.Small]: Boolean(props.small),
      }}
      disabled={Boolean(props.disabled)}
      type={props.submit ? "submit" : "button"}
      onClick={(e) => props.onClick(e)}
    >
      {props.children}
    </button>
  );
}
