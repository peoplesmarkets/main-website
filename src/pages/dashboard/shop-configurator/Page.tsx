import { Trans } from "@mbarzda/solid-i18next";
import { useLocation, useNavigate } from "@solidjs/router";
import _ from "lodash";
import { For, Match, Switch, createResource, createSignal } from "solid-js";

import { ContentError } from "../../../components/content";
import { DefaultBoundary } from "../../../components/layout/DefaultBoundary";
import { MdTab } from "../../../components/navigation/MdTab";
import { MdTabs } from "../../../components/navigation/MdTabs";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { useSelectedShopContext } from "../../../contexts/ShopContext";
import { requireAuthentication } from "../../../guards/authentication";
import { TKEYS } from "../../../locales";
import { buildShopDashboardPath } from "../../../routes/main-routing";
import { PublishShopDialog } from "../PublishShopDialog";
import { EditAppearanceTab } from "./EditAppearanceTab";
import { EditDetailsTab } from "./EditDetailsTab";
import styles from "./Page.module.scss";
import { Section } from "../../../components/layout";

export type ActiveTab = "Details" | "Appearance";

const TABS: ActiveTab[] = ["Details", "Appearance"];

export default function ShopConfiguration() {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedShopId } = useSelectedShopContext();
  const { shopService } = useServiceClientContext();

  const [showPublishDialog, setShowPublishDialog] = createSignal(false);

  const [authenticated] = createResource(
    () => location.pathname,
    requireAuthentication
  );

  const [activeTab, setActiveTab] = createSignal<ActiveTab>("Details");

  const [selectedShop, { refetch }] = createResource(
    selectedShopId,
    async (shopId: string) => {
      return shopService
        .get(shopId)
        .then((res) => res.shop)
        .catch((_err) => undefined);
    }
  );

  function loaded() {
    return authenticated();
  }

  function navigateToTab(tab: ActiveTab) {
    setActiveTab(tab);
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

  function handleDone() {
    if (!selectedShop()?.isActive) {
      return setShowPublishDialog(true);
    }
    const shopId = selectedShopId();
    if (!_.isNil(shopId)) {
      navigate(buildShopDashboardPath(shopId));
    }
  }

  function handleClosePublishDialog() {
    setShowPublishDialog(false);
  }

  function handleUpdate() {
    refetch();
  }

  return (
    <>
      <DefaultBoundary loaded={loaded}>
        <MdTabs class={styles.Tabs} onChange={handleTabChanged}>
          <For each={TABS}>
            {(tab) => (
              <MdTab type="secondary" active={activeTab() === tab}>
                <Trans key={TKEYS.shop.configuration[tab]} />
              </MdTab>
            )}
          </For>
        </MdTabs>

        <div class={styles.TabsContent}>
          <Switch fallback={<ContentError />}>
            <Match when={activeTab() === "Details"}>
              <Section>
                <EditDetailsTab
                  shop={selectedShop()}
                  next={() => navigateToNextTab("Details")}
                  onUpdate={handleUpdate}
                />
              </Section>
            </Match>

            <Match when={activeTab() === "Appearance"}>
              <Section>
                <EditAppearanceTab
                  shop={selectedShop()}
                  prev={() => navigateToPrevTab("Appearance")}
                  onUpdate={handleUpdate}
                  onDone={handleDone}
                />
              </Section>
            </Match>
          </Switch>
        </div>
      </DefaultBoundary>

      <PublishShopDialog
        shop={selectedShop()}
        show={showPublishDialog()}
        onClose={handleClosePublishDialog}
        onUpdate={handleUpdate}
      />
    </>
  );
}
