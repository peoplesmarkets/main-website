import { Trans } from "@mbarzda/solid-i18next";

import { Page } from "../components/layout/Page";
import { TKEYS } from "../locales/dev";

export default function TermsOfUse() {
  return (
    <>
      <Page>
        <h2>
          <Trans key={TKEYS.peoplesmarkets_com} /> -{" "}
          <Trans key={TKEYS["terms-of-service"].title} />
        </h2>
      </Page>
    </>
  );
}
