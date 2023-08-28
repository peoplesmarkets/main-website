import styles from "./IconDefault.module.scss";

type Props = {
  class?: string;
  onClick?: (_event?: MouseEvent) => void;
};

export function EditIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      class={props.class || styles.IconDefault}
      onClick={(e) => props.onClick?.(e)}
    >
      <path d="M180.985-178.152h54.181L640.48-584.531l-54.181-54.18-405.314 406.378v54.181Zm624.124-454.139L633.965-803.703l40.993-40.565q26.101-26.847 62.872-26.586 36.772.26 62.62 26.202l50.434 51.434q24.731 24.413 23.88 58.268-.851 33.855-24.786 57.789l-44.869 44.87Zm-46.333 46.333L268.941-95.03H97.624v-171.904l490.008-489.769 171.144 170.745Zm-144.695-25.21-27.782-27.543 54.181 54.18-26.399-26.637Z" />
    </svg>
  );
}
