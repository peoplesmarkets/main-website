import { onMount } from "solid-js";
import { Page, Section } from "../components/layout";
import { LandingPageHero } from "../components/main";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { useNavigate } from "@solidjs/router";
import { buildDashboardPath } from "./MainRoutes";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAccessTokensContext();

  onMount(() => {
    if (isAuthenticated()) {
      navigate(buildDashboardPath());
    }
  });

  return (
    <Page display>
      <Section flat narrow>
        <LandingPageHero />
      </Section>
    </Page>
  );
}
