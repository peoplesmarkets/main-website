import { JSX } from "solid-js";
import styles from "./ActionButton.module.scss";

type Props = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  actionType: "active" | "danger" | "neutral";
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

  return (
    <button class={`${styles.ActionButton} ${actionClass}`} {...props}>
      {props.children}
    </button>
  );
}
