import { JSX } from "solid-js";
import styles from "./ActionButton.module.scss";

type Props = {
  actionType: "active" | "danger" | "neutral";
  children: JSX.Element;
  onClick: () => void;
  extraClass?: string;
  disabled?: boolean;
};

export default function ActionButton(props: Props) {
  let actionClass = "neutral";

  switch (props.actionType) {
    case "active":
      actionClass = styles.Active;
      break;
    case "danger":
      actionClass = styles.Danger;
      break;
    default:
      actionClass = styles.Neutral;
      break;
  }

  let disabledClass = "";
  if (props.disabled) {
    disabledClass = styles.Disabled;
  }

  return (
    <button
      class={`${styles.ActionButton} ${actionClass} ${disabledClass} ${props.extraClass}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
