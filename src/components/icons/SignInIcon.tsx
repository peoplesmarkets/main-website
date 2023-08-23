import defaultStyles from "./IconDefault.module.scss";

type Props = {
  class?: string;
};

export function SignInIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      class={props.class || defaultStyles.IconDefault}
    >
      <path d="M479.072-96.754v-89.26h294.914v-587.972H479.072v-89.419h384.333v766.651H479.072Zm-87.115-169.66-64.173-64.362 105.022-105.021H96.754v-89.261h334.718L326.451-630.079l64.173-63.507 214.014 214.253-212.681 212.919Z" />
    </svg>
  );
}
