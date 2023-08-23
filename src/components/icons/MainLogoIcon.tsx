import styles from "./IconDefault.module.scss";

type Props = {
  class?: string;
};

export function MainLogoIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      class={props.class || styles.IconDefault}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.77723 40H1.90453V0H0.834136C0.47486 0.207702 0.182395 0.530386 0 0.92185V38.8239C0.324797 39.521 0.998633 40 1.77723 40ZM39.0915 0H38.0955V40H38.1484C38.9925 40 39.7134 39.4371 40 38.6436V1.10221C39.8293 0.629619 39.5046 0.238809 39.0915 0ZM36.191 40V0H30.4774V40H36.191ZM28.5728 40V0H20.9547V40H28.5728ZM17.1407 40V0H9.52263V40H17.1407ZM5.71358 40V0H3.80905V40H5.71358Z"
      />
    </svg>
  );
}
