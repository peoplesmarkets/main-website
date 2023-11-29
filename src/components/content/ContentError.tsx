import { TKEYS } from "../../locales";
import { MdIcon } from "../assets/MdIcon";
import { MdButton } from "../form";
import { Section } from "../layout";
import { Font } from "./Font";

export function ContentError() {
  return (
    <Section danger>
      <Font type="label" danger key={TKEYS.fetching["content-error"]} />

      <MdButton type="filled" onClick={() => location.reload()}>
        <Font type="label" key={TKEYS.common.reload} />
        <MdIcon slot="icon" icon="refresh" />
      </MdButton>
    </Section>
  );
}
