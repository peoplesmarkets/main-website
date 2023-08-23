import { Trans } from "@mbarzda/solid-i18next";

import { Page } from "../components/layout/Page";
import { TKEYS } from "../locales/dev";

export default function PrivacyPolicy() {
  return (
    <>
      <Page>
        <h2>
          <Trans key={TKEYS.peoplesmarkets_com} /> -{" "}
          <Trans key={TKEYS["privacy-policy"].title} />
        </h2>
      </Page>
    </>
  );
}
