import "@material/web/fab/branded-fab";
import "@material/web/fab/fab";

import { ComponentProps } from "solid-js";

import { MdIcon } from "../assets/MdIcon";

type Props = {
  icon: string;
  label?: string;
  variant?: "primary" | "secondary" | "tertiary" | undefined;
  onClick?: (_event: any) => void;
};

export function MdFab(props: Props) {
  return (
    <md-fab
      aria-label={props.label}
      label={props.label}
      variant={props.variant}
      onClick={(event) => props.onClick?.(event)}
    >
      <MdIcon slot="icon" icon={props.icon} />
    </md-fab>
  );
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-fab": ComponentProps<"button"> & {
        label?: string | undefined;
        variant?: "primary" | "secondary" | "tertiary" | undefined;
      };
    }
  }
}
