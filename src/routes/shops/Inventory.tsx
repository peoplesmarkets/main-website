import { Trans } from "@mbarzda/solid-i18next";
import { useRouteData } from "@solidjs/router";
import { Show, createResource } from "solid-js";

import { MediaList } from "../../components/commerce";
import { isResolved } from "../../components/content";
import { Section } from "../../components/layout";
import { ShopBanner } from "../../components/shops";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales";
import { MediaService } from "../../services";
import styles from "./Inventory.module.scss";
import { ShopData } from "./ShopData";

export default function Inventory() {
  const { accessToken } = useAccessTokensContext();

  const shopData = useRouteData<typeof ShopData>();

  const mediaService = new MediaService(accessToken);

  const [medias] = createResource(fetchMedias);

  async function fetchMedias() {
    const response = await mediaService.listAccessible({});
    return response.medias;
  }

  return (
    <>
      <ShopBanner
        shopCustomization={() => shopData.shopCustomization.data()!}
      />

      <Section>
        <Show when={isResolved(shopData.shop.data.state)}>
          <span class={styles.Title}>
            <Trans key={TKEYS.media["Title-plural"]} />
          </span>

          <Show when={isResolved(medias.state)}>
            <MediaList medias={() => medias()!} />
          </Show>
        </Show>
      </Section>
    </>
  );
}
