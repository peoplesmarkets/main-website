import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

import { Section, Slot } from "../components/layout";
import { LandingPageHero } from "../components/main";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { buildDashboardPath } from "./main-routing";
import MainRoutesWrapper from "./MainRoutesWrapper";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAccessTokensContext();

  onMount(() => {
    if (isAuthenticated()) {
      navigate(buildDashboardPath(), { replace: true });
    }
  });

  return (
    <MainRoutesWrapper display>
      <Slot name="content">
        <Section flat narrow>
          <LandingPageHero />
        </Section>
      </Slot>
    </MainRoutesWrapper>
  );
}
