import { Show, createResource } from "solid-js";

import { Section } from "../../../components/layout";
import { DefaultBoundary } from "../../../components/layout/DefaultBoundary";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { useSelectedShopContext } from "../../../contexts/ShopContext";
import { requireAuthentication } from "../../../guards/authentication";
import { requireShopOwner } from "../../../guards/shop";
import { isCustomDomain } from "../../../lib";
import { CriticalSettingsForm } from "./CriticalSettingsForm";
import { UpdateConfigurationForm } from "./UpdateConfigurationForm";
import { UpdateContactEmailAddressForm } from "./UpdateContactEmailAddressFrom";
import { UpdateDomainForm } from "./UpdateDomainForm";
import { UpdatePublicVisibilityForm } from "./UpdatePublicVisibilityForm";
import { UpdateSlugForm } from "./UpdateSlugForm";
import { UpdateStripeForm } from "./UpdateStripeForm";

export default function ShopSettingsPage() {
  const { shopService } = useServiceClientContext();
  const { selectedShopId } = useSelectedShopContext();

  const [authenticated] = createResource(
    () => location.pathname,
    requireAuthentication
  );

  const [shop, { refetch }] = createResource(
    selectedShopId,
    async (shopId: string) => {
      return shopService.get(shopId).then((res) => res.shop);
    }
  );

  function loaded() {
    return authenticated() && requireShopOwner(shop());
  }

  function handleUpdate() {
    refetch();
  }

  return (
    <>
      <DefaultBoundary loaded={loaded}>
        <Section bordered>
          <UpdateConfigurationForm shop={shop()} />
        </Section>

        <Section bordered>
          <UpdateStripeForm shop={shop()} onUpdate={handleUpdate} />
        </Section>

        <Section bordered>
          <UpdateContactEmailAddressForm
            shop={shop()}
            onUpdate={handleUpdate}
          />
        </Section>

        <Section bordered>
          <UpdateDomainForm shop={shop()} onUpdate={handleUpdate} />
        </Section>

        <Section bordered>
          <Show when={!isCustomDomain()}>
            <UpdateSlugForm shop={shop()} onUpdate={handleUpdate} />
          </Show>
        </Section>

        <Section danger={shop()?.isActive} bordered={!shop()?.isActive}>
          <UpdatePublicVisibilityForm shop={shop()} onUpdate={handleUpdate} />
        </Section>

        <Section danger>
          <CriticalSettingsForm />
        </Section>
      </DefaultBoundary>
    </>
  );
}
