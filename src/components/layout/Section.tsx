import { JSX } from "solid-js";

import styles from "./Section.module.scss";

type Props = JSX.HTMLAttributes<HTMLDivElement> & {
  wide?: boolean;
  danger?: boolean;
};

export default function Section(props: Props) {
  return (
    <div
      classList={{
        [styles.Section]: true,
        [styles.Danger]: Boolean(props.danger),
      }}
      {...props}
    >
      {props.children}
    </div>
  );
}
