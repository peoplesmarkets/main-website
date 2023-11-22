import { Trans } from "@mbarzda/solid-i18next";

import { Section } from "../../components/layout/Section";
import { TKEYS } from "../../locales";
import MainRoutesWrapper from "../MainRoutesWrapper";

export default function TermsOfService() {
  return (
    <MainRoutesWrapper>
      <Section>
        <h2>
          <Trans key={TKEYS.peoplesmarkets_com} /> -{" "}
          <Trans key={TKEYS["terms-of-service"].title} />
        </h2>
      </Section>
    </MainRoutesWrapper>
  );
}
