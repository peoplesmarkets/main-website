import { A } from "@solidjs/router";
import styles from "./MainLogoLink.module.scss";
import { buildIndexPathOrUrl } from "../../routes/main-routing";
import { MainLogoIcon } from "../icons";
import { MainLogoText } from "./MainLogoText";

export function MainLogoLink() {
  return (
    <A
      class={styles.Link}
      href={buildIndexPathOrUrl()}
      aria-label="Go to home page"
    >
      <MainLogoIcon class={styles.Icon} />
      <MainLogoText class={styles.Text} />
    </A>
  );
}