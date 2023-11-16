import "@material/web/dialog/dialog";

import { ComponentProps, splitProps } from "solid-js";

import styles from "./MdDialog.module.scss";

type Props = ComponentProps<"div"> & {
  open?: boolean | undefined;
  onOpen?: () => void;
  onOpened?: () => void;
  onClose?: () => void;
  onClosed?: () => void;
};

export function MdDialog(props: Props) {
  const [local, other] = splitProps(props, ["class", "children"]);

  return (
    <md-dialog {...other} class={local.class ? local.class : styles.MdDialog}>
      {local.children}
    </md-dialog>
  );
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-dialog": Props;
    }
  }
}
