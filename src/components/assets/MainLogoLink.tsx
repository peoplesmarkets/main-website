import { A } from "@solidjs/router";
import styles from "./MainLogoLink.module.scss";
import { MainLogoIcon } from "../icons";
import { MainLogoText } from "./MainLogoText";
import { buildIndexPath } from "../../routes/main/main-routing";

type Props = {
  readonly showText?: boolean | undefined;
};

export function MainLogoLink(props: Props) {
  return (
    <A class={styles.Link} href={buildIndexPath()} aria-label="Go to home page">
      <MainLogoIcon class={styles.Icon} />
      <MainLogoText
        class={styles.Text}
        classList={{ [styles.ShowText]: Boolean(props.showText) }}
      />
    </A>
  );
}
