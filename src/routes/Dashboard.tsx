import { grpc } from "@improbable-eng/grpc-web";
import { Trans } from "@mbarzda/solid-i18next";
import { useNavigate } from "@solidjs/router";
import _ from "lodash";
import {
  ErrorBoundary,
  Show,
  Suspense,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";

import { ContentError } from "../components/content";
import { CreateShopDialog, ShopList } from "../components/dashboard";
import { ActionButton } from "../components/form";
import { Section, Slot } from "../components/layout";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { useServiceClientContext } from "../contexts/ServiceClientContext";
import { resourceIsReady } from "../lib";
import { TKEYS } from "../locales";
import styles from "./Dashboard.module.scss";
import MainRoutesWrapper from "./MainRoutesWrapper";
import { buildUserSettingsPath } from "./user/UserRoutes";

export default function Dashboard() {
  const navigate = useNavigate();

  const { currentSession } = useAccessTokensContext();

  const [initiallyShowCreateShop, setInitiallyShowCreateShop] =
    createSignal(true);
  const [showCreateShop, setShowCreateShop] = createSignal(false);

  const { shopService } = useServiceClientContext();

  const [shops, { refetch }] = createResource(
    () => currentSession().userId || undefined,
    fetchShops
  );

  createEffect(() => {
    if (
      resourceIsReady(shops) &&
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

          <ErrorBoundary fallback={<ContentError />}>
            <Suspense>
              <Show
                when={!_.isEmpty(shops())}
                fallback={
                  <Trans key={TKEYS.dashboard["shop"]["no-shop-yet"]} />
                }
              >
                <ShopList shops={() => shops()!} />
              </Show>
            </Suspense>
          </ErrorBoundary>
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
