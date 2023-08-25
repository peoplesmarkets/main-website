import { Trans } from "@mbarzda/solid-i18next";

import { Page } from "../../components/layout/Page";
import { Section } from "../../components/layout/Section";
import { TKEYS } from "../../locales/dev";

export default function TermsOfService() {
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
