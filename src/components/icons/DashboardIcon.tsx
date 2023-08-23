import defaultStyles from "./IconDefault.module.scss";

type Props = {
  class?: string;
};

export function DashboardIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      class={props.class || defaultStyles.IconDefault}
    >
      <path d="M512.833-585.912v-282.595h355.674v282.595H512.833ZM92.348-429.153v-439.354H459.58v439.354H92.348ZM512.833-92.906v-439.753h355.674v439.753H512.833Zm-420.485 0V-375.66H459.58v282.754H92.348Zm89.42-425.507h188.551v-260.834H181.768v260.834Zm420.485 336.087h176.994v-260.913H602.253v260.913Zm0-492.847h176.994v-104.074H602.253v104.074ZM181.768-182.326h188.551V-286.24H181.768v103.914Zm188.551-336.087Zm231.934-156.76Zm0 231.934ZM370.319-286.24Z" />
    </svg>
  );
}
