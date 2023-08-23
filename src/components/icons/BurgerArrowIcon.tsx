import styles from "./IconDefault.module.scss";

type Props = {
  class?: string;
  onClick?: (_event?: MouseEvent) => void;
};

export function BurgerArrowIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      class={props.class || styles.IconDefault}
      onClick={(e) => props.onClick?.(e)}
    >
      <path d="M94.145-214.145v-95.536h542.216v95.536H94.145Zm705.753-51.044L589.334-480.667l209.898-214.811 67 67.754L723.58-480.667l143.318 147.478-67 68ZM94.145-434.217v-95.247h423.478v95.247H94.145Zm0-216.769v-95.246h542.216v95.246H94.145Z" />
    </svg>
  );
}
