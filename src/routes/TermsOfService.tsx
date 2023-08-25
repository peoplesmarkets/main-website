import { Trans } from "@mbarzda/solid-i18next";

import { Page } from "../components/layout/Page";
import { TKEYS } from "../locales/dev";
import { Section } from "../components/layout/Section";

export default function TermsOfUse() {
  return (
    <>
      <Page>
        <Section>
          <h2>
            <Trans key={TKEYS.peoplesmarkets_com} /> -{" "}
            <Trans key={TKEYS["terms-of-service"].title} />
          </h2>
        </Section>
      </Page>
    </>
  );
}
