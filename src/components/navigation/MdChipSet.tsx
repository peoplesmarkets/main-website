import "@material/web/chips/chip-set";

import { ComponentProps, splitProps } from "solid-js";

type Props = ComponentProps<"div"> & {};

export function MdChipSet(props: Props) {
  const [local, other] = splitProps(props, ["children"]);

  return <md-chip-set {...other}>{local.children}</md-chip-set>;
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-chip-set": Props;
    }
  }
}
