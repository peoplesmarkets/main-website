import "@material/web/button/elevated-button";
import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/button/outlined-button";
import "@material/web/button/text-button";

import { ComponentProps, Match, JSX as SolidJSX, Switch } from "solid-js";

import styles from "./MdButton.module.scss";

type Props = {
  type?: "elevated" | "filled" | "filled-tonal" | "outlined" | "text";
  href?: string | undefined;
  submit?: boolean | undefined;
  disabled?: boolean | undefined;
  danger?: boolean | undefined;
  square?: boolean | undefined;
  wide?: boolean | undefined;
  trailingIcon?: boolean | undefined;
  onClick?: (_event: any) => void;
  children: SolidJSX.Element;
};

export function MdButton(props: Props) {
  return (
    <Switch
      fallback={
        <md-filled-button
          classList={{
            [styles.Danger]: Boolean(props.danger),
            [styles.Square]: Boolean(props.square),
            [styles.Wide]: Boolean(props.wide),
          }}
          type={props.submit ? "submit" : "button"}
          disabled={Boolean(props.disabled)}
          trailing-icon={props.trailingIcon}
          href={props.href}
          onClick={props.onClick}
        >
          {props.children}
        </md-filled-button>
      }
    >
      <Match when={props.type === "elevated"}>
        <md-elevated-button
          classList={{
            [styles.Danger]: Boolean(props.danger),
            [styles.Square]: Boolean(props.square),
            [styles.Wide]: Boolean(props.wide),
          }}
          type={props.submit ? "submit" : "button"}
          disabled={Boolean(props.disabled)}
          trailing-icon={props.trailingIcon}
          href={props.href}
          onClick={(event) => props.onClick?.(event)}
        >
          {props.children}
        </md-elevated-button>
      </Match>
      <Match when={props.type === "filled"}>
        <md-filled-button
          classList={{
            [styles.Danger]: Boolean(props.danger),
            [styles.Square]: Boolean(props.square),
            [styles.Wide]: Boolean(props.wide),
          }}
          type={props.submit ? "submit" : "button"}
          disabled={Boolean(props.disabled)}
          trailing-icon={props.trailingIcon}
          href={props.href}
          onClick={(event) => props.onClick?.(event)}
        >
          {props.children}
        </md-filled-button>
      </Match>
      <Match when={props.type === "filled-tonal"}>
        <md-filled-tonal-button
          classList={{
            [styles.Danger]: Boolean(props.danger),
            [styles.Square]: Boolean(props.square),
            [styles.Wide]: Boolean(props.wide),
          }}
          type={props.submit ? "submit" : "button"}
          disabled={Boolean(props.disabled)}
          trailing-icon={props.trailingIcon}
          href={props.href}
          onClick={(event) => props.onClick?.(event)}
        >
          {props.children}
        </md-filled-tonal-button>
      </Match>
      <Match when={props.type === "outlined"}>
        <md-outlined-button
          classList={{
            [styles.Danger]: Boolean(props.danger),
            [styles.Square]: Boolean(props.square),
            [styles.Wide]: Boolean(props.wide),
          }}
          type={props.submit ? "submit" : "button"}
          disabled={Boolean(props.disabled)}
          trailing-icon={props.trailingIcon}
          href={props.href}
          onClick={(event) => props.onClick?.(event)}
        >
          {props.children}
        </md-outlined-button>
      </Match>
      <Match when={props.type === "text"}>
        <md-text-button
          classList={{
            [styles.Danger]: Boolean(props.danger),
            [styles.Square]: Boolean(props.square),
            [styles.Wide]: Boolean(props.wide),
          }}
          type={props.submit ? "submit" : "button"}
          disabled={Boolean(props.disabled)}
          trailing-icon={props.trailingIcon}
          href={props.href}
          onClick={(event) => props.onClick?.(event)}
        >
          {props.children}
        </md-text-button>
      </Match>
    </Switch>
  );
}

type MdButtonProps = {
  href?: string | undefined;
  submit?: string | undefined;
};

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-elevated-button": ComponentProps<"button"> & MdButtonProps & {};
      "md-filled-button": ComponentProps<"button"> & MdButtonProps & {};
      "md-filled-tonal-button": ComponentProps<"button"> & MdButtonProps & {};
      "md-outlined-button": ComponentProps<"button"> & MdButtonProps & {};
      "md-text-button": ComponentProps<"button"> & MdButtonProps & {};
    }
  }
}
