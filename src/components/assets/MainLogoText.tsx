type Props = {
  readonly class?: string | undefined;
  readonly classList?:
    | {
        [k: string]: boolean | undefined;
      }
    | undefined;
};

/* eslint-disable i18next/no-literal-string */
export function MainLogoText(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 105 54"
      class={props.class}
      classList={props.classList}
    >
      <text
        font-family="Roboto"
        font-size="32"
        font-weight="500"
        letter-spacing="0em"
      >
        <tspan x="0" y="40">
          sited.io
        </tspan>
      </text>
    </svg>
  );
}
