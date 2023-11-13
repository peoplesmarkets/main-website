import { Trans } from "@mbarzda/solid-i18next";

import { Slot } from "../../components/layout";
import { TKEYS } from "../../locales";
import MainRoutesWrapper from "../MainRoutesWrapper";
import styles from "./Settings.module.scss";

export default function Settings() {
  return (
    <MainRoutesWrapper>
      <Slot name="content">
        <span class={styles.Headline}>
          <Trans key={TKEYS.user.settings.title} />
        </span>
      </Slot>
    </MainRoutesWrapper>
  );
}
