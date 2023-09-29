import { Page, Section } from "../components/layout";
import { LandingPageHero } from "../components/main";

export default function LandingPage() {
  return (
    <Page display>
      <Section flat narrow>
        <LandingPageHero />
      </Section>
    </Page>
  );
}
