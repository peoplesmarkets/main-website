import { JSX } from "solid-js";

import styles from "./ActionButton.module.scss";

export type ActionType =
  | "active"
  | "active-borderless"
  | "active-filled"
  | "danger"
  | "danger-borderless"
  | "danger-filled"
  | "neutral"
  | "neutral-borderless"
  | "neutral-filled";

type Props = {
  actionType: ActionType;
  children: JSX.Element;
  onClick: (_event?: any) => void;
  submit?: boolean;
  disabled?: boolean;
  small?: boolean;
  tall?: boolean;
  wide?: boolean;
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
        [styles.NeutralBorderless]: props.actionType === "neutral-borderless",
        [styles.NeutralFilled]: props.actionType === "neutral-filled",
        [styles.Disabled]: Boolean(props.disabled),
        [styles.Small]: Boolean(props.small),
        [styles.Tall]: Boolean(props.tall),
        [styles.Wide]: Boolean(props.wide),
      }}
      disabled={Boolean(props.disabled)}
      type={props.submit ? "submit" : "button"}
      onClick={(e) => props.onClick(e)}
    >
      {props.children}
    </button>
  );
}
