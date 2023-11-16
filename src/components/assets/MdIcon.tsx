import "@material/web/icon/icon";

import _ from "lodash";
import { ComponentProps, Show } from "solid-js";

type Props = {
  readonly icon: string;
  readonly slot?: string | undefined;
};

export function MdIcon(props: Props) {
  return (
    <Show
      when={!_.isEmpty(props.slot)}
      fallback={<md-icon>{props.icon}</md-icon>}
    >
      <md-icon slot={props.slot}>{props.icon}</md-icon>;
    </Show>
  );
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-icon": ComponentProps<"i"> & {};
    }
  }
}
