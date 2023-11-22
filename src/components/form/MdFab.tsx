import "@material/web/fab/branded-fab";
import "@material/web/fab/fab";

import { ComponentProps } from "solid-js";

import { MdIcon } from "../assets/MdIcon";

type Props = ComponentProps<"button"> & {
  readonly icon: string;
  readonly label?: string | undefined;
  readonly size?: string | undefined;
  readonly variant?: "primary" | "secondary" | "tertiary" | undefined;
  readonly onClick?: (_event: any) => void;
};

export function MdFab(props: Props) {
  return (
    <md-fab
      aria-label={props.label}
      label={props.label}
      size={props.size}
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
      "md-fab": Omit<Props, "icon">;
    }
  }
}
