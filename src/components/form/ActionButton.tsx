import { JSX } from "solid-js";
import styles from "./ActionButton.module.scss";

type Props = {
  actionType: "active" | "danger" | "neutral";
  children: JSX.Element;
  onClick: (event?: any) => void;
  extraClass?: string;
  disabled?: boolean;
  noBorder?: boolean;
};

export default function ActionButton(props: Props) {
  let actionClass = styles.ActionButton;
  actionClass += " ";

  switch (props.actionType) {
    case "active":
      actionClass += styles.Active;
      break;
    case "danger":
      actionClass += styles.Danger;
      break;
    default:
      actionClass += styles.Neutral;
      break;
  }

  if (!!props.noBorder) {
    actionClass += " ";
    actionClass += styles.NoBorder;
  }

  if (!!props.disabled) {
    actionClass += " ";
    actionClass += styles.Disabled;
  }

  return (
    <button
      class={`${actionClass} ${props.extraClass}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
