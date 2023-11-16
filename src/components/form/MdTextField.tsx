import "@material/web/textfield/outlined-text-field";
import "@material/web/textfield/filled-text-field";

import { ComponentProps, Show, JSX as SolidJSX, splitProps } from "solid-js";

import styles from "./MdTextField.module.scss";

type Props = ComponentProps<"input"> & {
  readonly label?: string | undefined;
  readonly filled?: boolean | undefined;
  readonly prefixText?: string | undefined;
  readonly rows?: number | undefined;
  readonly cols?: number | undefined;
  readonly onValue: (value: any) => void;
  readonly error?: boolean | undefined;
  readonly errorText?: string | string[] | undefined;
  readonly supportingText?: string | string[] | undefined;
  readonly children?: SolidJSX.Element | undefined;
};

export function MdTextField(props: Props) {
  const [local, others] = splitProps(props, [
    "class",
    "value",
    "onValue",
    "prefixText",
    "errorText",
    "supportingText",
    "onFocusOut",
  ]);

  return (
    <Show
      when={Boolean(props.filled)}
      fallback={
        <md-outlined-text-field
          {...others}
          value={local.value || ""}
          class={local.class || styles.MdTextField}
          oninput={(event) => local.onValue(event.target.value)}
          prefix-text={local.prefixText}
          error-text={local.errorText}
          supporting-text={local.supportingText}
          onfocusout={local.onFocusOut}
        />
      }
    >
      <md-filled-text-field
        {...others}
        value={local.value || ""}
        class={local.class || styles.MdTextField}
        oninput={(event) => local.onValue(event.target.value)}
        prefix-text={local.prefixText}
        error-text={local.errorText}
        supporting-text={local.supportingText}
        onfocusout={local.onFocusOut}
      />
    </Show>
  );
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-outlined-text-field": ComponentProps<"input">;
      "md-filled-text-field": ComponentProps<"input">;
    }
  }
}
