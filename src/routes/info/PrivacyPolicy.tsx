import { Trans } from "@mbarzda/solid-i18next";

import { Section } from "../../components/layout/Section";
import { TKEYS } from "../../locales";

export default function PrivacyPolicy() {
  return (
    <Section>
      <h2>
        <Trans key={TKEYS.peoplesmarkets_com} /> -{" "}
        <Trans key={TKEYS["privacy-policy"].title} />
      </h2>
    </Section>
  );
}
