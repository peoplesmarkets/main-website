import { Trans } from "@mbarzda/solid-i18next";

import { Slot } from "../../components/layout";
import { Section } from "../../components/layout/Section";
import { TKEYS } from "../../locales";
import MainRoutesWrapper from "../MainRoutesWrapper";

export default function PrivacyPolicy() {
  return (
    <MainRoutesWrapper>
      <Slot name="content">
        <Section>
          <h2>
            <Trans key={TKEYS.peoplesmarkets_com} /> -{" "}
            <Trans key={TKEYS["privacy-policy"].title} />
          </h2>
        </Section>
      </Slot>
    </MainRoutesWrapper>
  );
}
