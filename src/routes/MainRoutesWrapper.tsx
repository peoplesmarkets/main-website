import { A, Outlet } from "@solidjs/router";

import { useTransContext } from "@mbarzda/solid-i18next";
import { Show } from "solid-js";
import { MainLogoText } from "../components/assets";
import {
  DashboardIcon,
  MainLogoIcon,
  SearchGlobalIcon,
  StoreFrontIcon,
  UserSettingsIcon,
} from "../components/icons";
import CommunityIcon from "../components/icons/CommunityIcon";
import { Page } from "../components/layout";
import { Slot } from "../components/layout/Slot";
import { Panel } from "../components/navigation/Panel";
import { PanelItem } from "../components/navigation/PanelItem";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { TKEYS } from "../locales";
import { buildMarketBoothsPath, buildOffersPath } from "./MainRoutes";
import styles from "./MainRoutesWrapper.module.scss";
import { buildCommunityPath } from "./community/CommunityRoutes";
import { buildDashboardPath } from "./dashboard/DashboardRoutes";
import { buildUserSettingsPath } from "./user/UserRoutes";

export default function MainRoutesWrapper() {
  const [trans] = useTransContext();

  const { isAuthenticated } = useAccessTokensContext();

  return (
    <>
      <Panel>
        <Slot name="logo">
          <A
            class={styles.MainLink}
            href={buildMarketBoothsPath()}
            aria-label="Go to home page"
          >
            <MainLogoIcon class={styles.MainLogoIcon} />
            <MainLogoText class={styles.MainLogo} />
          </A>
        </Slot>

        <Slot name="items">
          <PanelItem
            Icon={StoreFrontIcon}
            path={buildMarketBoothsPath}
            label={() => trans(TKEYS["main-navigation"].links["market-booths"])}
          />

          <PanelItem
            Icon={SearchGlobalIcon}
            path={buildOffersPath}
            label={() => trans(TKEYS["main-navigation"].links.offers)}
          />

          <Show when={isAuthenticated()}>
            <PanelItem
              Icon={DashboardIcon}
              path={buildDashboardPath}
              label={() => trans(TKEYS["main-navigation"].links.dashboard)}
            />

            <PanelItem
              Icon={UserSettingsIcon}
              path={buildUserSettingsPath}
              label={() =>
                trans(TKEYS["main-navigation"].links["user-settings"])
              }
            />
          </Show>

          <PanelItem
            Icon={CommunityIcon}
            path={buildCommunityPath}
            label={() => trans(TKEYS["main-navigation"].links.community)}
          />
        </Slot>
      </Panel>

      <Page>
        <Outlet />
      </Page>
    </>
  );
}
