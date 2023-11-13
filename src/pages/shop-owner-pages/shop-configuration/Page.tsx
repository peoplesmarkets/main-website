import { Trans } from "@mbarzda/solid-i18next";
import { useLocation, useRouteData, useSearchParams } from "@solidjs/router";
import _ from "lodash";
import {
  For,
  Match,
  Switch,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";

import { ContentError } from "../../../components/content";
import { DefaultBoundary } from "../../../components/layout/DefaultBoundary";
import { requireAuthentication } from "../../../guards/authentication";
import { requireShopOwner } from "../../../guards/shop";
import { TKEYS } from "../../../locales";
import { MyShopData } from "../MyShopData";
import { EditAppearanceTab } from "./EditAppearanceTab";
import { EditDetailsTab } from "./EditDetailsTab";
import { EditPaymentTab } from "./EditPaymentTab";
import styles from "./Page.module.scss";

export type ActiveTab = "Details" | "Appearance" | "Payment";

const TABS: ActiveTab[] = ["Details", "Appearance", "Payment"];

export default function ShopConfiguration() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const shopData = useRouteData<typeof MyShopData>();

  const [authenticated] = createResource(
    () => location.pathname,
    requireAuthentication
  );

  const [activeTab, setActiveTab] = createSignal<ActiveTab>("Details");

  createEffect(() => {
    if (_.isNil(searchParams.tab)) {
      navigateToTab(TABS[0]);
    } else {
      setActiveTab(searchParams.tab as ActiveTab);
      scrollTo(0, 0);
    }
  });

  function loaded() {
    return requireShopOwner(shopData.shop()) && authenticated();
  }

  function navigateToTab(tab: ActiveTab) {
    setSearchParams({ tab });
  }

  function navigateToNextTab(currentTab: ActiveTab) {
    const nextTabIndex = _.indexOf(TABS, currentTab) + 1;
    if (_.inRange(nextTabIndex, 0, TABS.length)) {
      navigateToTab(TABS[nextTabIndex]);
    }
  }

  function navigateToPrevTab(currentTab: ActiveTab) {
    const prevTabIndex = _.indexOf(TABS, currentTab) - 1;
    if (_.inRange(prevTabIndex, 0, TABS.length)) {
      navigateToTab(TABS[prevTabIndex]);
    }
  }

  function handleTabChanged(event: any) {
    const activeTabIndex = _.findIndex(event?.target?.children, {
      active: true,
    });
    if (_.inRange(activeTabIndex, 0, TABS.length)) {
      navigateToTab(TABS[activeTabIndex]);
    }
  }

  function handleUpdate() {
    shopData.refetch();
  }

  return (
    <>
      <DefaultBoundary loaded={loaded}>
        <md-tabs class={styles.Tabs} onChange={handleTabChanged}>
          <For each={TABS}>
            {(tab) => (
              <md-secondary-tab active={activeTab() === tab}>
                <Trans key={TKEYS.shop.configuration[tab]} />
              </md-secondary-tab>
            )}
          </For>
        </md-tabs>
        <div class={styles.TabsContent}>
          <Switch fallback={<ContentError />}>
            <Match when={activeTab() === "Details"}>
              <EditDetailsTab
                shop={shopData.shop()}
                next={() => navigateToNextTab("Details")}
                onUpdate={handleUpdate}
              />
            </Match>
            <Match when={activeTab() === "Appearance"}>
              <EditAppearanceTab
                shop={shopData.shop()}
                prev={() => navigateToPrevTab("Appearance")}
                next={() => navigateToNextTab("Appearance")}
                onUpdate={handleUpdate}
              />
            </Match>
            <Match when={activeTab() === "Payment"}>
              <EditPaymentTab
                shop={shopData.shop()}
                prev={() => navigateToPrevTab("Payment")}
                onUpdate={handleUpdate}
              />
            </Match>
          </Switch>
        </div>
      </DefaultBoundary>
    </>
  );
}
