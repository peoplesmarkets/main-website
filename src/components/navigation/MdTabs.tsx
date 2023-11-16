import "@material/web/tabs/tabs";

import { ComponentProps, splitProps } from "solid-js";

type Props = ComponentProps<"div"> & {};

export function MdTabs(props: Props) {
  const [local, other] = splitProps(props, ["children"]);

  return <md-tabs {...other}>{local.children}</md-tabs>;
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-tabs": Props;
    }
  }
}
