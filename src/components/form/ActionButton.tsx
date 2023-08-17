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
  onClick: (event?: any) => void;
  submit?: boolean;
  extraClass?: string;
  disabled?: boolean;
};

export default function ActionButton(props: Props) {
  return (
    <button
      class={props.extraClass}
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
        [styles.Disabled]: !!props.disabled,
      }}
      disabled={!!props.disabled}
      type={props.submit ? "submit" : "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
