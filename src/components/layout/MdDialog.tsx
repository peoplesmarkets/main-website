import "@material/web/dialog/dialog";

import { ComponentProps, JSX as SolidJSX } from "solid-js";

import styles from "./MdDialog.module.scss";

type Props = {
  class?: string | undefined;
  open?: boolean | undefined;
  onOpen?: () => void;
  onOpened?: () => void;
  onClose?: () => void;
  onClosed?: () => void;
  children: SolidJSX.Element;
};

export function MdDialog(props: Props) {
  return (
    <md-dialog
      class={props.class ? props.class : styles.MdDialog}
      open={props.open}
      onOpen={() => props.onOpen?.()}
      onClose={() => props.onClose?.()}
      onOpened={() => props.onOpened?.()}
      onClosed={() => props.onClosed?.()}
    >
      {props.children}
    </md-dialog>
  );
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-dialog": ComponentProps<"div"> & {
        open?: boolean | undefined;
        onOpen?: () => void;
        onOpened?: () => void;
        onClose?: () => void;
        onClosed?: () => void;
      };
    }
  }
}
