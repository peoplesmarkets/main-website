import "@material/web/checkbox/checkbox";

import { ComponentProps, JSX as SolidJSX, splitProps } from "solid-js";

import { Font } from "../content";
import styles from "./MdCheckbox.module.scss";

type Props = ComponentProps<"input"> & {
  readonly label?: string | undefined;
  readonly onValue?: (_value: boolean) => void;
  readonly children?: SolidJSX.Element | undefined;
};

export function MdCheckbox(props: Props) {
  const [local, other] = splitProps(props, ["label", "onValue", "children"]);

  return (
    <>
      <label class={other.class || styles.MdCheckBox}>
        <Font type="label" inline>
          {local.label}
        </Font>

        <md-checkbox
          {...other}
          aria-label={local.label}
          touch-target="wrapper"
          onChange={({ target }) => local.onValue?.(target.checked)}
        ></md-checkbox>
      </label>
    </>
  );
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-checkbox": Props;
    }
  }
}
