import "@material/web/tabs/primary-tab";
import "@material/web/tabs/secondary-tab";

import { ComponentProps, Show, splitProps } from "solid-js";

type Props = ComponentProps<"div"> & {
  readonly type: "primary" | "secondary";
  readonly active?: boolean | undefined;
};

export function MdTab(props: Props) {
  const [local, other] = splitProps(props, ["type", "children"]);

  return (
    <>
      <Show
        when={local.type === "secondary"}
        fallback={<md-primary-tab {...other}>{local.children}</md-primary-tab>}
      >
        <md-secondary-tab {...other}>{local.children}</md-secondary-tab>
      </Show>
    </>
  );
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-primary-tab": Omit<Props, "type">;
      "md-secondary-tab": Omit<Props, "type">;
    }
  }
}
