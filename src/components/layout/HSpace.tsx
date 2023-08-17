import styles from "./HSpace.module.scss";

type Props = {
  readonly size?: "small" | "medium" | "high" | "highest";
};

export default function HSpace(props: Props) {
  let classes = styles.HSpace;
  classes += " ";

  switch (props.size) {
    case "small":
      classes += styles.Small;
      break;
    case "medium":
      classes += styles.Medium;
      break;
    case "high":
      classes += styles.High;
      break;
    case "highest":
      classes += styles.Highest;
      break;
    default:
      classes += styles.Medium;
      break;
  }

  return <div class={classes}></div>;
}
