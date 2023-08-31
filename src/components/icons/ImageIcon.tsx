import styles from "./IconDefault.module.scss";

type Props = {
  class?: string;
  onClick?: (_event?: MouseEvent) => void;
};

export function ImageIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      class={props.class || styles.IconDefault}
      onClick={(e) => props.onClick?.(e)}
    >
      <path d="M186.666-102.667q-33.724 0-58.862-25.137-25.137-25.138-25.137-58.862v-586.668q0-33.724 25.137-58.862 25.138-25.137 58.862-25.137h586.668q33.724 0 58.862 25.137 25.137 25.138 25.137 58.862v586.668q0 33.724-25.137 58.862-25.138 25.137-58.862 25.137H186.666Zm0-83.999h586.668v-586.668H186.666v586.668Zm38.667-80.667h510l-158.666-212-129.334 170-93.333-126-128.667 168Zm-38.667 80.667v-586.668 586.668Z" />
    </svg>
  );
}
