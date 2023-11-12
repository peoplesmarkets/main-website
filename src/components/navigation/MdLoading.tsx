import "@material/web/progress/circular-progress";

import { ComponentProps, JSX as SolidJSX } from "solid-js";

import styles from "./MdLoading.module.scss";

type Props = {
  style?: string | SolidJSX.CSSProperties | undefined;
  size?: string | undefined;
};

export function MdLoading(props: Props) {
  return (
    <div
      class={styles.Loading}
      style={{
        "--md-circular-progress-size": props.size,
      }}
    >
      <md-circular-progress indeterminate />
    </div>
  );
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-circular-progress": ComponentProps<"progress"> & {
        indeterminate?: boolean | undefined;
      };
    }
  }
}
