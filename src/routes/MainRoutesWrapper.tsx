import { useTransContext } from "@mbarzda/solid-i18next";
import { A, useLocation } from "@solidjs/router";
import {
  JSX,
  Show,
  Suspense,
  createResource,
  createSignal,
  onMount,
} from "solid-js";

import { MainLogoLink, MaterialIcon } from "../components/assets";
import { EnvironmentBanner } from "../components/content/EnvironmentBanner";
import { MdIconButton } from "../components/form/MdIconButton";
import { getSlots } from "../components/layout";
import { NavbarItem, SettingsSlider } from "../components/main";
import { ReportDialog } from "../components/report";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import {
  buildAuthorizationRequest,
  setDocumentMetaDescription,
  setDocumentTitle,
  setFaviconHref,
} from "../lib";
import { MAIN_FAVICON } from "../lib/constants";
import { TKEYS } from "../locales";
import { EN } from "../locales/en";
import MainFooter from "./MainFooter";
import styles from "./MainRoutesWrapper.module.scss";
import { buildCommunityPath } from "./community/community-routing";
import {
  buildDashboardPath,
  buildGetStartedPath,
  buildIndexPath,
  buildOffersPath,
  buildShopsPath,
} from "./main-routing";

type Props = {
  children?: JSX.Element;
  display?: boolean;
};

export default function MainRoutesWrapper(props: Props) {
  const location = useLocation();

  const [trans] = useTransContext();
  const { isAuthenticated } = useAccessTokensContext();

  const [showSettingsSlider, setShowSettingsSlider] = createSignal(false);
  const [showReportDialog, setShowReportDialog] = createSignal(false);

  const [signInUrl] = createResource(() => !isAuthenticated(), buildSignInUrl);

  /* eslint-disable-next-line */
  const slots = getSlots(props.children);

  onMount(() => {
    setDocumentTitle(EN["Peoples-Markets"]);
    setDocumentMetaDescription(EN.footer["main-paragraph"]);
    setFaviconHref(MAIN_FAVICON);
  });

  async function buildSignInUrl() {
    const redirectPath =
      location.pathname === buildGetStartedPath()
        ? buildDashboardPath()
        : location.pathname;

    const signInUrl = await buildAuthorizationRequest(undefined, redirectPath);

    return signInUrl.toString();
  }

  function handleShowSettingsSlider() {
    setShowSettingsSlider(true);
  }

  function handleCloseSettingsSlider() {
    setShowSettingsSlider(false);
  }

  function handleShowReportDialog() {
    setShowReportDialog(true);
  }

  function handleCloseReportDialog() {
    setShowReportDialog(false);
  }

  return (
    <>
      <div
        class={styles.HeaderContainer}
        classList={{ [styles.Display]: Boolean(props.display) }}
      >
        <div class={styles.Header}>
          <MainLogoLink />

          <div class={styles.MainSearch}>{slots.search}</div>

          <div class={styles.HeaderActions}>
            <Show when={!isAuthenticated()}>
              <Suspense>
                <A class={styles.HeaderIconLink} href={signInUrl() || ""}>
                  <MaterialIcon class={styles.HeaderIcon} icon="login" />
                </A>
              </Suspense>
            </Show>

            <MaterialIcon
              class={styles.HeaderIcon}
              icon="settings"
              onClick={handleShowSettingsSlider}
            />
          </div>
        </div>
      </div>

      <div
        class={styles.Main}
        classList={{ [styles.Display]: Boolean(props.display) }}
      >
        <div class={styles.Content}>{slots.content}</div>

        <div class={styles.Footer}>
          <MainFooter />
        </div>
      </div>

      <div class={styles.Navbar}>
        <NavbarItem
          label={trans(TKEYS["main-navigation"].links.shops)}
          icon="storefront"
          path={buildShopsPath}
        />

        <NavbarItem
          label={trans(TKEYS["main-navigation"].links.offers)}
          icon="travel_explore"
          path={buildOffersPath}
        />

        <NavbarItem
          label={trans(TKEYS["main-navigation"].links.community)}
          icon="forum"
          path={buildCommunityPath}
        />

        <Show
          when={isAuthenticated()}
          fallback={
            <NavbarItem
              label={trans(TKEYS["main-navigation"].links["get-started"])}
              icon="rocket_launch"
              path={buildIndexPath}
            />
          }
        >
          <NavbarItem
            label={trans(TKEYS["main-navigation"].links.dashboard)}
            icon="dashboard"
            path={buildDashboardPath}
          />
        </Show>

        <div class={styles.ReportButton}>
          <MdIconButton icon="report" onClick={handleShowReportDialog} />
        </div>
      </div>

      <SettingsSlider
        show={showSettingsSlider()}
        onClose={handleCloseSettingsSlider}
      />

      <ReportDialog
        show={showReportDialog()}
        onClose={handleCloseReportDialog}
      />

      <EnvironmentBanner />
    </>
  );
}
