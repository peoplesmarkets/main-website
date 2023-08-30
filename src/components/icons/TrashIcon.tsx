import styles from "./IconDefault.module.scss";

type Props = {
  class?: string;
  onClick?: (_event?: MouseEvent) => void;
};

export function TrashIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      class={props.class || styles.IconDefault}
      onClick={(e) => props.onClick?.(e)}
    >
      <path d="M265.181-113.304q-31.559 0-53.736-22.13-22.177-22.13-22.177-53.624v-548.79h-45.21v-75.754h203.398v-38.036h264.769v38.036h203.717v75.754h-45.21v548.79q0 30.994-22.427 53.374-22.427 22.38-53.486 22.38H265.181Zm429.638-624.544H265.181v548.79h429.638v-548.79ZM361.16-270.906h71.209v-386H361.16v386Zm166.471 0H599v-386h-71.369v386Zm-262.45-466.942v548.79-548.79Z" />
    </svg>
  );
}
