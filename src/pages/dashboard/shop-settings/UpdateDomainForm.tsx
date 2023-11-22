import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import {
  Match,
  Suspense,
  Switch,
  createEffect,
  createResource,
} from "solid-js";
import { createStore } from "solid-js/store";

import { ContentLoading, Font } from "../../../components/content";
import { ActionButton, MdTextField } from "../../../components/form";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { isValidHostname } from "../../../lib";
import { TKEYS } from "../../../locales";
import { ShopResponse } from "../../../services/peoplesmarkets/commerce/v1/shop";
import {
  AddDomainToShopRequest,
  DomainStatus,
} from "../../../services/peoplesmarkets/commerce/v1/shop_domain";
import commonStyles from "../Common.module.scss";

type Props = {
  readonly shop: ShopResponse | undefined;
  readonly onUpdate: () => void;
};

export function UpdateDomainForm(props: Props) {
  const [trans] = useTransContext();

  const { shopDomainService } = useServiceClientContext();

  const [updateDomainRequest, setUpdateDomainRequest] = createStore({
    shopId: undefined as string | undefined,
    domain: undefined as string | undefined,
  } as AddDomainToShopRequest);

  const [updateDomainErrors, setUpdateDomainErrors] = createStore({
    domain: [] as string[],
  });

  const [shopDomain, { refetch }] = createResource(
    () => props.shop?.shopId,
    async (shopId: string) =>
      shopDomainService.getDomainStatus(shopId).then((res) => res.domainStatus)
  );

  createEffect(() => {
    const shopId = props.shop?.shopId;
    if (_.isNil(updateDomainRequest.shopId) && !_.isNil(shopId)) {
      setUpdateDomainRequest("shopId", shopId);
    }
  });

  createEffect(() => {
    const domain = shopDomain()?.domain;
    if (_.isNil(updateDomainRequest.domain) && !_.isNil(domain)) {
      setUpdateDomainRequest("domain", domain);
    }
  });

  function resetUpdateDomainErrors() {
    setUpdateDomainErrors({ domain: [] });
  }

  function domainStatus(): "pending" | "active" | undefined {
    if (shopDomain()?.status === DomainStatus.DOMAIN_STATUS_PENDING) {
      return "pending";
    }
    if (shopDomain()?.status === DomainStatus.DOMAIN_STATUS_ACTIVE) {
      return "active";
    }
  }

  function domainDataWasChanged() {
    const fields = Object.keys(updateDomainRequest);
    return !_.isEqual(
      _.pick(shopDomain(), fields),
      _.pick(updateDomainRequest, fields)
    );
  }

  function domainIsUpdateable() {
    return (
      domainDataWasChanged() &&
      _.isEmpty(shopDomain()?.domain) &&
      !_.isEmpty(updateDomainRequest.domain)
    );
  }

  function handleDomainInput(value: string) {
    resetUpdateDomainErrors();
    if (isValidHostname(value)) {
      setUpdateDomainRequest("domain", value);
    } else {
      setUpdateDomainErrors("domain", trans(TKEYS.shop.errors["invalid-url"]));
    }
  }

  async function handleUpdateDomain(event: SubmitEvent) {
    event.preventDefault();

    if (!domainDataWasChanged()) {
      const notModified = trans(TKEYS.form.errors["not-modified"]);
      setUpdateDomainErrors("domain", [notModified]);
      return;
    }

    try {
      await shopDomainService.addDomain(updateDomainRequest);
      handleUpdate();
    } catch (err: any) {
      if (err.code) {
        if (err.code === grpc.Code.AlreadyExists) {
          setUpdateDomainErrors("domain", [
            trans(TKEYS.form.errors["already-exists"]),
          ]);
        } else {
          setUpdateDomainErrors("domain", [err.message]);
        }
      } else {
        throw err;
      }
    }
  }

  async function handleRemoveDomain() {
    try {
      const shopId = props.shop?.shopId;
      const domain = shopDomain()?.domain;
      if (!_.isNil(shopId) && !_.isNil(domain)) {
        await shopDomainService.removeDomain({
          shopId,
          domain,
        });
      }
      handleUpdate();
      setUpdateDomainRequest("domain", "");
    } catch (err: any) {
      if (err.code) {
        setUpdateDomainErrors("domain", [err.message]);
      }
    }
  }

  function handleUpdate() {
    refetch();
    props.onUpdate();
  }

  return (
    <Suspense fallback={<ContentLoading />}>
      <form class={commonStyles.Form} onSubmit={handleUpdateDomain}>
        <Font
          class={commonStyles.Headline}
          type="headline"
          key={TKEYS.dashboard.shop.domain["edit-domain"]}
        />

        <div class={commonStyles.Fields}>
          <div class={commonStyles.FieldInfo}>
            <Switch
              fallback={
                <Font
                  type="body"
                  key={TKEYS.dashboard.shop.domain["edit-domain-info"]}
                />
              }
            >
              <Match when={domainStatus() === "pending"}>
                <Font
                  type="label"
                  warn
                  key={TKEYS.dashboard.shop.domain.pending}
                />
                <Font
                  type="body"
                  key={TKEYS.dashboard["shop"].domain["pending-information"]}
                />
                <Font
                  type="body"
                  strong
                  key={
                    TKEYS.dashboard.shop.domain["pending-information-sample"]
                  }
                  options={{ item: updateDomainRequest.domain }}
                />
              </Match>

              <Match when={domainStatus() === "active"}>
                <Font
                  type="body"
                  active
                  key={TKEYS.dashboard["shop"].domain.active}
                />
              </Match>
            </Switch>
          </div>

          <div class={commonStyles.Field}>
            <MdTextField
              type="text"
              value={updateDomainRequest.domain}
              label={trans(TKEYS.shop.labels.Domain)}
              prefixText="https://"
              onValue={handleDomainInput}
              error={!_.isEmpty(updateDomainErrors.domain)}
              errorText={updateDomainErrors.domain}
            />

            <div class={commonStyles.Actions}>
              <div class={commonStyles.ActionsLeft} />

              <div class={commonStyles.ActionsRight}>
                <ActionButton
                  actionType="danger"
                  onClick={handleRemoveDomain}
                  disabled={_.isNil(shopDomain()?.domain)}
                >
                  <Trans key={TKEYS.form.action.Remove} />
                </ActionButton>
                <ActionButton
                  actionType="active-filled"
                  onClick={handleUpdateDomain}
                  disabled={!domainIsUpdateable()}
                >
                  <Trans key={TKEYS.form.action.Save} />
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Suspense>
  );
}
