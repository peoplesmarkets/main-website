import { grpc } from "@improbable-eng/grpc-web";
import { Trans } from "@mbarzda/solid-i18next";
import { useNavigate } from "@solidjs/router";
import _ from "lodash";
import {
  ErrorBoundary,
  Show,
  Suspense,
  createResource,
  createSignal,
} from "solid-js";

import { ContentError, ContentLoading } from "../../components/content";
import { MdButton } from "../../components/form";
import { AddIcon } from "../../components/icons";
import { Section, Slot } from "../../components/layout";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { TKEYS } from "../../locales";
import MainRoutesWrapper from "../MainRoutesWrapper";
import { buildUserSettingsPath } from "../user/UserRoutes";
import { CreateShopDialog } from "./CreateShopDialog";
import styles from "./Dashboard.module.scss";
import { ShopList } from "./ShopList";

export default function Dashboard() {
  const navigate = useNavigate();

  const { currentSession } = useAccessTokensContext();
  const { shopService } = useServiceClientContext();

  const [showCreateShop, setShowCreateShop] = createSignal(false);

  const [shops, { refetch }] = createResource(
    () => currentSession().userId || undefined,
    fetchShops
  );

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

  async function handleShopCreated() {
    refetch();
  }

  function handleOpenCreateShop() {
    setShowCreateShop(true);
  }

  function handleCloseCreateShop() {
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
          </div>

          <ErrorBoundary fallback={<ContentError />}>
            <Suspense fallback={<ContentLoading page />}>
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

          <div class={styles.Actions}>
            <MdButton type="filled" onClick={handleOpenCreateShop}>
              <span slot="icon">
                <AddIcon />
              </span>
              <Trans key={TKEYS.dashboard.shop["create-new-shop"]} />
            </MdButton>
          </div>
        </Section>

        <CreateShopDialog
          show={showCreateShop()}
          onClose={handleCloseCreateShop}
          onUpdate={handleShopCreated}
        />
      </Slot>
    </MainRoutesWrapper>
  );
}
