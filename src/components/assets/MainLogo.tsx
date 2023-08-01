type Props = {
  class: string;
};

export default function MainLogoLeft(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 305 64"
      fill="none"
      stroke="none"
      class={props.class}
    >
      <text
        fill="var(--content-font-color)"
        style="white-space: pre"
        font-family="Roboto"
        font-size="32"
        font-weight="500"
        letter-spacing="0em"
      >
        <tspan x="59" y="42.9375">
          People's Markets
        </tspan>
      </text>

      <path
        fill="var(--primary-font-color)"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.77723 52H1.90453V12H0.834136C0.47486 12.2077 0.182395 12.5304 0 12.9219V50.8239C0.324797 51.521 0.998633 52 1.77723 52ZM39.0915 12H38.0955V52H38.1484C38.9925 52 39.7134 51.4371 40 50.6436V13.1022C39.8293 12.6296 39.5046 12.2388 39.0915 12ZM36.191 52V12H30.4774V52H36.191ZM28.5728 52V12H20.9547V52H28.5728ZM17.1407 52V12H9.52263V52H17.1407ZM5.71358 52V12H3.80905V52H5.71358Z"
      />
    </svg>
  );
}
