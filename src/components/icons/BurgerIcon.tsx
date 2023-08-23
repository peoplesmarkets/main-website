import styles from "./IconDefault.module.scss";

type Props = {
  class?: string;
  onClick?: (_event?: MouseEvent) => void;
};

export function BurgerIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      class={props.class || styles.IconDefault}
      onClick={(e) => props.onClick?.(e)}
    >
      <path d="M94.145-211.043v-96.811h772.087v96.811H94.145Zm0-220.841v-96.435h772.087v96.435H94.145Zm0-221.03v-96.811h772.087v96.811H94.145Z" />
    </svg>
  );
}
