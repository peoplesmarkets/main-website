import { A, Outlet, useRouteData } from "@solidjs/router";
import { useTransContext } from "@mbarzda/solid-i18next";
import { Show } from "solid-js";

import { isResolved } from "../../components/content";
import { StoreFrontIcon } from "../../components/icons";
import { Page, Slot } from "../../components/layout";
import { Panel } from "../../components/navigation/Panel";
import { PanelItem } from "../../components/navigation/PanelItem";
import { TKEYS } from "../../locales";
import { ShopData } from "./ShopData";
import { buildShopDetailPath } from "./ShopRoutes";
import styles from "./ShopRoutesWrapper.module.scss";

export default function ShopRoutesWrapper() {
  const [trans] = useTransContext();

  const shopData = useRouteData<typeof ShopData>();

  return (
    <>
      <Show when={isResolved(shopData.shop.data.state)}>
        <Panel>
          <Slot name="logo">
            <A
              class={styles.MainLink}
              href={buildShopDetailPath(shopData.shop.data()!.slug)}
            >
              {shopData.shop.data()?.name}
            </A>
          </Slot>

          <Slot name="items">
            <PanelItem
              Icon={StoreFrontIcon}
              path={() =>
                buildShopDetailPath(shopData.shop.data()!.slug)
              }
              label={() => trans(TKEYS["main-navigation"].links.home)}
            />
          </Slot>
        </Panel>
      </Show>

      <Page>
        <Outlet />
      </Page>
    </>
  );
}
