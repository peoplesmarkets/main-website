import { JSX } from "solid-js";
import styles from "./Form.module.scss";

type Props = {
  readonly class?: string | undefined;
  readonly onSubmit?:
    | ((_event: SubmitEvent) => void)
    | ((_event: SubmitEvent) => Promise<void>)
    | undefined;
  readonly children?: JSX.Element;
};

export function Form(props: Props) {
  return (
    <form
      class={props.class || styles.Form}
      onSubmit={(event) => props.onSubmit?.(event)}
    >
      {props.children}
    </form>
  );
}
