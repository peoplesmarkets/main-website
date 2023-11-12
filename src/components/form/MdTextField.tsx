import "@material/web/textfield/outlined-text-field";

import { ComponentProps, JSX as SolidJSX, splitProps } from "solid-js";

import styles from "./MdTextField.module.scss";

type Props = {
  class?: string | undefined;
  type?: string | undefined;
  value?: string | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  label?: string | undefined;
  rows?: number | undefined;
  cols?: number | undefined;
  prefixText?: string | undefined;
  onValue?: (value: string) => void;
  error?: boolean | undefined;
  errorText?: string | string[] | undefined;
  supportingText?: string | string[] | undefined;
  children?: SolidJSX.Element | undefined;
};

export function MdTextField(props: Props) {
  const [local, others] = splitProps(props, [
    "class",
    "value",
    "onValue",
    "prefixText",
    "errorText",
    "supportingText",
  ]);

  return (
    <md-outlined-text-field
      {...others}
      value={local.value || ""}
      class={local.class || styles.MdTextField}
      onInput={({ currentTarget }) => local.onValue?.(currentTarget.value)}
      prefix-text={local.prefixText}
      error-text={local.errorText}
      supporting-text={local.supportingText}
    />
  );
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-outlined-text-field": ComponentProps<"input">;
    }
  }
}
