import styles from "./IconDefault.module.scss";

type Props = {
  class?: string;
  onClick?: (_event?: MouseEvent) => void;
};

export function InventoryIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      class={props.class || styles.IconDefault}
      onClick={(e) => props.onClick?.(e)}
    >
      <path d="M186.666-80q-27.5 0-47.083-19.583T120-146.666V-619q-17.333-7.667-28.667-23.759Q80-658.851 80-680v-133.334q0-27.5 19.583-47.083T146.666-880h666.668q27.5 0 47.083 19.583T880-813.334V-680q0 21.149-11.333 37.241Q857.333-626.667 840-619v472.334q0 27.5-19.583 47.083T773.334-80H186.666Zm0-533.334v466.668h586.668v-466.668H186.666Zm-40-66.666h666.668v-133.334H146.666V-680ZM360-413.334h240V-480H360v66.666ZM480-380Z" />
    </svg>
  );
}
