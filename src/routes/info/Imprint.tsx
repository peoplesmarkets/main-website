import { Trans } from "@mbarzda/solid-i18next";

import { Slot } from "../../components/layout";
import { Section } from "../../components/layout/Section";
import { TKEYS } from "../../locales";
import MainRoutesWrapper from "../MainRoutesWrapper";
import styles from "./Imprint.module.scss";

export default function Imprint() {
  return (
    <MainRoutesWrapper>
      <Slot name="content">
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

          <h2 class={styles.SubHeading}>
            <Trans key={TKEYS.imprint.Support} />
          </h2>
          <address class={styles.Address}>
            <a href={`mailto:${import.meta.env.VITE_SUPPORT_EMAIL_ADDRESS}`}>
              {import.meta.env.VITE_SUPPORT_EMAIL_ADDRESS}
            </a>
          </address>
        </Section>
      </Slot>
    </MainRoutesWrapper>
  );
}
