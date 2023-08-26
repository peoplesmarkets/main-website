import { Trans } from "@mbarzda/solid-i18next";

import { Page } from "../../components/layout/Page";
import { Section } from "../../components/layout/Section";
import { TKEYS } from "../../locales/dev";
import styles from "./Imprint.module.scss";

export default function Imprint() {
  return (
    <>
      <Page>
        <Section>
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
        </Section>
      </Page>
    </>
  );
}