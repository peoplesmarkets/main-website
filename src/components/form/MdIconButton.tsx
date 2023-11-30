import "@material/web/iconbutton/filled-icon-button";
import "@material/web/iconbutton/filled-tonal-icon-button";
import "@material/web/iconbutton/icon-button";
import "@material/web/iconbutton/outlined-icon-button";

import { ComponentProps, Match, Switch, splitProps } from "solid-js";

import { MdIcon } from "../assets/MdIcon";
import styles from "./MdIconButton.module.scss";

type Props = ComponentProps<"button"> & {
  readonly icon: string;
  readonly buttonType?: "filled" | "filled-tonal" | "outlined";
  readonly danger?: boolean | undefined;
};

export function MdIconButton(props: Props) {
  const [local, other] = splitProps(props, ["icon", "buttonType", "danger"]);

  return (
    <>
      <Switch
        fallback={
          <md-icon-button
          class={styles.MdIconButton}
          classList={{ [styles.Danger]: Boolean(local.danger) }}
          {...other}
          >
            <MdIcon icon={local.icon} />
          </md-icon-button>
        }
      >
        <Match when={local.buttonType === "filled"}>
          <md-filled-icon-button
            class={styles.MdIconButton}
            classList={{ [styles.Danger]: Boolean(local.danger) }}
            {...other}
          >
            <MdIcon icon={local.icon} />
          </md-filled-icon-button>
        </Match>
        <Match when={local.buttonType === "filled-tonal"}>
          <md-filled-tonal-button
            class={styles.MdIconButton}
            classList={{ [styles.Danger]: Boolean(local.danger) }}
            {...other}
          >
            <MdIcon icon={local.icon} />
          </md-filled-tonal-button>
        </Match>
        <Match when={local.buttonType === "outlined"}>
          <md-outlined-icon-button
            class={styles.MdIconButton}
            classList={{ [styles.Danger]: Boolean(local.danger) }}
            {...other}
          >
            <MdIcon icon={local.icon} />
          </md-outlined-icon-button>
        </Match>
      </Switch>
    </>
  );
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-icon-button": Omit<Props, "buttonType" | "icon">;
      "md-filled-icon-button": Omit<Props, "buttonType" | "icon">;
      "md-filled-tonal-icon-button": Omit<Props, "buttonType" | "icon">;
      "md-outlined-icon-button": Omit<Props, "buttonType" | "icon">;
    }
  }
}
