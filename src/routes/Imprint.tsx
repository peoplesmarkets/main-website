import { Trans } from "@mbarzda/solid-i18next";

import { Page } from "@peoplesmarkets/frontend-lib";

import styles from "./Imprint.module.scss";
import { TKEYS } from "../locales/dev";

export default function Imprint() {
  return (
    <>
      <Page wide>
        <h1>
          <Trans key={TKEYS.peoplesmarkets_com} /> -{" "}
          <Trans key={TKEYS.imprint.title} />
        </h1>

        <h2 class={styles.SubHeading}>
          <Trans key={TKEYS.imprint.responsible.title} />:
        </h2>

        <address class={styles.Address}>
          <Trans key={TKEYS.imprint.responsible.name} />
          <br />
          <Trans key={TKEYS.imprint.responsible.street} />
          <br />
          <Trans key={TKEYS.imprint.responsible.address_line_1} />
          <br />
          <Trans key={TKEYS.imprint.responsible.address_line_2} />
        </address>
      </Page>
    </>
  );
}
