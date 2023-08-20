import { Trans } from "@mbarzda/solid-i18next";

import { Page } from "@peoplesmarkets/frontend-lib";
import { TKEYS } from "../locales/dev";

export default function PrivacyPolicy() {
  return (
    <>
      <Page wide>
        <h2>
          <Trans key={TKEYS.peoplesmarkets_com} /> -{" "}
          <Trans key={TKEYS["privacy-policy"].title} />
        </h2>
      </Page>
    </>
  );
}
