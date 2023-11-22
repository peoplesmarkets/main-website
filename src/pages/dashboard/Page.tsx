import { Trans } from "@mbarzda/solid-i18next";
import { useLocation, useNavigate } from "@solidjs/router";
import _ from "lodash";
import { Show, createResource, createSignal, onMount } from "solid-js";

import { MdIcon } from "../../components/assets";
import { Font } from "../../components/content";
import { ActionButton } from "../../components/form";
import { Section } from "../../components/layout";
import { DefaultBoundary } from "../../components/layout/DefaultBoundary";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { useSelectedShopContext } from "../../contexts/ShopContext";
import { requireAuthentication } from "../../guards/authentication";
import { TKEYS } from "../../locales";
import { buildShopConfigurationPath } from "../../routes/main-routing";
import { ShopResponse } from "../../services/peoplesmarkets/commerce/v1/shop";
import { CreateShopDialog } from "./CreateShopDialog";
import { OfferList } from "./OfferList";
import styles from "./Page.module.scss";
import { PublishShopDialog } from "./PublishShopDialog";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const { shopService, offerService } = useServiceClientContext();
  const { selectedShopId, setSelectedShopId } = useSelectedShopContext();

  const [authenticated] = createResource(
    () => location.pathname,
    requireAuthentication
  );

  const [showCreateShop, setShowCreateShop] = createSignal(false);
  const [showPublishShop, setShowPublishShop] = createSignal(false);

  const [shop, { refetch }] = createResource(
    () => selectedShopId(),
    async (shopId: string) => {
      const response = await shopService.getMyShop({
        shopId,
        extended: true,
      });

      return response.shop;
    }
  );

  const [offers] = createResource(
    () => shop()?.shopId,
    async (shopId: string) => {
      const response = await offerService.list({
        shopId,
      });
      return response.offers;
    }
  );

  onMount(() => {
    if (_.isNil(selectedShopId())) {
      setShowCreateShop(true);
    }
  });

  function loaded() {
    return authenticated() && !_.isNil(shop());
  }

  function handleShopCreated(shop: ShopResponse | undefined) {
    if (!_.isNil(shop)) {
      setSelectedShopId(shop.shopId);
      navigate(buildShopConfigurationPath(shop.shopId));
    }
  }

  function handleOpenCreateShop() {
    setShowCreateShop(true);
  }

  function handleCloseCreateShop() {
    setShowCreateShop(false);
  }

  function handleOpenPublishShop() {
    setShowPublishShop(true);
  }

  function handleClosePublishShop() {
    setShowPublishShop(false);
  }

  function handleUpdate() {
    refetch();
  }

  return (
    <>
      <Show
        when={!_.isNil(selectedShopId())}
        fallback={
          <>
            <Section>
              <Font type="body" key={TKEYS.dashboard.shop["no-shop-yet"]} />
            </Section>
            <Section>
              <div class={styles.Actions}>
                <ActionButton
                  actionType="active-filled"
                  onClick={handleOpenCreateShop}
                >
                  <Trans key={TKEYS.dashboard.shop["create-new-shop"]} />
                  <MdIcon icon="add" />
                </ActionButton>
              </div>
            </Section>
          </>
        }
      >
        <DefaultBoundary loaded={loaded}>
          <Show when={!shop()?.isActive && !_.isEmpty(offers())}>
            <Section flat>
              <Font
                type="body"
                warn
                key={TKEYS.dashboard.shop.visibility["not-published-yet-info"]}
              />
              <ActionButton
                actionType="active-filled"
                round
                onClick={handleOpenPublishShop}
              >
                <Trans key={TKEYS.dashboard.shop.visibility.Title} />
              </ActionButton>
            </Section>
          </Show>

          <Section flat>
            <OfferList shop={shop()} offers={offers()} />
          </Section>
        </DefaultBoundary>
      </Show>

      <CreateShopDialog
        show={showCreateShop()}
        onClose={handleCloseCreateShop}
        onUpdate={handleShopCreated}
      />

      <PublishShopDialog
        show={showPublishShop()}
        shop={shop()}
        onUpdate={handleUpdate}
        onClose={handleClosePublishShop}
      />
    </>
  );
}
