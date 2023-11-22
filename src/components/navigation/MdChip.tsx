import "@material/web/chips/assist-chip";
import "@material/web/chips/filter-chip";
import "@material/web/chips/input-chip";
import "@material/web/chips/suggestion-chip";

import { ComponentProps, Match, Switch, splitProps } from "solid-js";

type Props = ComponentProps<"div"> & {
  readonly type: "assist" | "filter" | "input" | "suggestion";
  readonly label?: string | undefined;
  readonly selected?: boolean | undefined;
};

export function MdChip(props: Props) {
  const [local, other] = splitProps(props, ["type", "children"]);

  return (
    <Switch>
      <Match when={local.type === "assist"}>
        <md-assist-chip {...other}>{local.children}</md-assist-chip>
      </Match>

      <Match when={local.type === "filter"}>
        <md-filter-chip {...other}>{local.children}</md-filter-chip>
      </Match>

      <Match when={local.type === "input"}>
        <md-input-chip {...other}>{local.children}</md-input-chip>
      </Match>

      <Match when={local.type === "suggestion"}>
        <md-suggestion-chip {...other}>{local.children}</md-suggestion-chip>
      </Match>
    </Switch>
  );
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-assist-chip": Omit<Props, "type">;
      "md-filter-chip": Omit<Props, "type">;
      "md-input-chip": Omit<Props, "type">;
      "md-suggestion-chip": Omit<Props, "type">;
    }
  }
}
