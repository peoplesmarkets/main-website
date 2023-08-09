type Props = {
  extraClass?: string;
  onClick?: (event: MouseEvent) => void;
};

export default function CloseIcon(props: Props) {
  return (
    <svg
      onClick={props.onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      class={props.extraClass}
      style={{
        fill: "var(--content-font-color)",
        stroke: "var(--content-font-color)",
      }}
    >
      <path d="m251.333-198.29-53.043-53.043L426.957-480 198.29-708.667l53.043-53.043L480-533.043 708.667-761.71l53.043 53.043L533.043-480 761.71-251.333l-53.043 53.043L480-426.957 251.333-198.29Z" />
    </svg>
  );
}
