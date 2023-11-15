import "@material/web/select/_filled-select.scss";
import "@material/web/select/_outlined-select.scss";
import "@material/web/select/filled-select";
import "@material/web/select/outlined-select";

import {
  ComponentProps,
  Match,
  JSX as SolidJSX,
  Switch,
  splitProps,
} from "solid-js";

export type SelectKey = string | number | boolean;

export type Option = {
  key: SelectKey;
  name: string;
  [key: string]: SelectKey;
};

type Props = Omit<ComponentProps<"select">, "onChange"> & {
  readonly type: "outlined" | "filled";
  readonly label?: string | undefined;
  readonly menuPositioning?: "absolute" | "fixed" | undefined;
  readonly children?: SolidJSX.Element;
  readonly onChange?: (_value: SelectKey) => void;
};

export function MdSelect(props: Props) {
  const [local, other] = splitProps(props, [
    "type",
    "children",
    "menuPositioning",
    "onChange",
  ]);

  return (
    <>
      <Switch>
        <Match when={local.type === "outlined"}>
          <md-outlined-select
            {...other}
            menu-positioning={local.menuPositioning}
            onChange={(event) =>
              local.onChange?.(event.target.value as SelectKey)
            }
          >
            {local.children}
          </md-outlined-select>
        </Match>
        <Match when={local.type === "filled"}>
          <md-filled-select
            {...other}
            menu-positioning={local.menuPositioning}
            onChange={(event) =>
              local.onChange?.(event.target.value as SelectKey)
            }
          >
            {local.children}
          </md-filled-select>
        </Match>
      </Switch>
    </>
  );
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-outlined-select": ComponentProps<"select"> & {};
      "md-filled-select": ComponentProps<"select"> & {};
    }
  }
}
