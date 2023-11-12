import "@material/web/icon/icon";

import { ComponentProps } from "solid-js";

type Props = {
  icon: string;
  slot?: string | undefined;
};

export function MdIcon(props: Props) {
  return <md-icon slot={props.slot}>{props.icon}</md-icon>;
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-icon": ComponentProps<"i"> & {};
    }
  }
}
