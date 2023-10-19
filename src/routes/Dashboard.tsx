import { grpc } from "@improbable-eng/grpc-web";
import { Trans } from "@mbarzda/solid-i18next";
import { useNavigate } from "@solidjs/router";
import _ from "lodash";
import {
  Match,
  Show,
  Switch,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";

import { ContentError, isResolved } from "../components/content";
import { CreateShopDialog, ShopList } from "../components/dashboard";
import { ActionButton } from "../components/form";
import { Section, Slot } from "../components/layout";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { TKEYS } from "../locales";
import { ShopService } from "../services";
import styles from "./Dashboard.module.scss";
import MainRoutesWrapper from "./MainRoutesWrapper";
import { buildUserSettingsPath } from "./user/UserRoutes";

export default function Dashboard() {
  const navigate = useNavigate();

  const { accessToken, currentSession } = useAccessTokensContext();

  const [initiallyShowCreateShop, setInitiallyShowCreateShop] =
    createSignal(true);
  const [showCreateShop, setShowCreateShop] = createSignal(false);

  const shopService = new ShopService(accessToken);

  const [shops, { refetch }] = createResource(
    () => currentSession().userId || undefined,
    fetchShops
  );

  createEffect(() => {
    if (
      isResolved(shops.state) &&
      _.isEmpty(shops()) &&
      initiallyShowCreateShop()
    ) {
      setShowCreateShop(true);
    }
  });

  async function fetchShops(userId: string) {
    try {
      const response = await shopService.listDefault({
        userId,
        extended: true,
      });
      return response.shops;
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.NotFound) {
        navigate(buildUserSettingsPath(), { replace: true });
      } else {
        throw err;
      }
    }
  }

  async function handleShopUpdate() {
    refetch();
  }

  function handleOpenCreateShop() {
    setShowCreateShop(true);
  }

  function handleCloseCreateShop() {
    setInitiallyShowCreateShop(false);
    setShowCreateShop(false);
  }

  return (
    <MainRoutesWrapper>
      <Slot name="content">
        <Section>
          <div class={styles.TitleSection}>
            <span class={styles.Title}>
              <Trans key={TKEYS.dashboard["shop"]["my-shops"]} />:
            </span>
            <ActionButton actionType="neutral" onClick={handleOpenCreateShop}>
              <Trans key={TKEYS.form.action["Create-new"]} />
            </ActionButton>
          </div>

          <Switch>
            <Match when={shops.state === "errored"}>
              <ContentError />
            </Match>
            <Match when={isResolved(shops.state) && !_.isEmpty(shops())}>
              <ShopList shops={() => shops()!} />
            </Match>
            <Match when={isResolved(shops.state) && _.isEmpty(shops())}>
              <Trans key={TKEYS.dashboard["shop"]["no-shop-yet"]} />
            </Match>
          </Switch>
        </Section>

        <Show when={showCreateShop()}>
          <CreateShopDialog
            onClose={handleCloseCreateShop}
            onUpdate={handleShopUpdate}
          />
        </Show>
      </Slot>
    </MainRoutesWrapper>
  );
}
