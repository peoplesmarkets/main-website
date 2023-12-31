import styles from "./IconDefault.module.scss";

type Props = {
  class?: string;
  classList?: {
    [k: string]: boolean | undefined;
  };
  onClick?: (_event?: MouseEvent) => void;
};

export function RefreshIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      class={props.class || styles.IconDefault}
      classList={props.classList}
      onClick={(e) => props.onClick?.(e)}
    >
      <path d="M479.203-153.304q-135.964 0-231.33-95.366-95.366-95.366-95.366-231.291 0-135.924 95.366-231.409 95.366-95.485 231.33-95.485 81.341 0 146.386 33.093 65.045 33.094 112.209 92.204v-125.297h69.854v272.47H534.943V-604h166.884q-36.16-57.551-92.997-92.247-56.837-34.695-129.627-34.695-105.004 0-177.973 72.961-72.97 72.961-72.97 177.953t72.971 177.981q72.971 72.989 177.976 72.989 79.721 0 145.71-45.695 65.989-45.696 92.562-120.58h78.659q-28.906 108.043-116.86 175.036-87.954 66.993-200.075 66.993Z" />
    </svg>
  );
}
