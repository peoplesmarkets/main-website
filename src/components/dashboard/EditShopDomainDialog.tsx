import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales";
import { ShopData } from "../../routes/shops/ShopData";
import { ShopDomainService } from "../../services";
import {
  AddDomainToShopRequest,
  DomainStatus,
} from "../../services/peoplesmarkets/commerce/v1/shop_domain";
import { Anotation } from "../content";
import { ActionButton, DiscardConfirmation, TextField } from "../form";
import { Dialog } from "../layout";
import styles from "./CreateEditDialg.module.scss";
import { isValidHostname } from "../../lib";

type Props = {
  onClose: () => void;
};

export function EditShopDomainDialog(props: Props) {
  const [trans] = useTransContext();
  const shopData = useRouteData<typeof ShopData>();
  const { accessToken } = useAccessTokensContext();

  const shopDomainService = new ShopDomainService(accessToken);

  const emptyUpdateRequest = AddDomainToShopRequest.create();
  const updateFields = ["shopId", "domain"];
  const [shopDomain, setShopDomain] =
    createStore<AddDomainToShopRequest>(emptyUpdateRequest);

  const [errors, setErrors] = createStore({ domain: [] as string[] });

  const [showDiscardConfirmation, setShowDiscardConfirmation] =
    createSignal(false);

  createEffect(() => {
    if (_.isNil(shopDomain.shopId) || _.isEmpty(shopDomain.shopId)) {
      setShopDomain({
        shopId: shopData.shop()?.shopId,
        domain: shopData.shopDomain()?.domain,
      });
    }
  });

  function resetErrors() {
    setErrors({ domain: [] });
  }

  function handleDomainInput(value: string) {
    resetErrors();
    if (isValidHostname(value)) {
      setShopDomain("domain", value);
    } else {
      setErrors("domain", trans(TKEYS.shop.errors["invalid-url"]));
    }
  }

  async function handleAddDomain(event: SubmitEvent) {
    event.preventDefault();

    if (!dataWasChanged()) {
      const notModified = trans(TKEYS.form.errors["not-modified"]);
      setErrors("domain", [notModified]);
      return;
    }

    try {
      await shopDomainService.addDomain(shopDomain);
      props.onClose();
    } catch (err: any) {
      if (err.code) {
        if (err.code === grpc.Code.AlreadyExists) {
          setErrors("domain", [trans(TKEYS.form.errors["already-exists"])]);
        } else {
          setErrors("domain", [err.message]);
        }
      } else {
        throw err;
      }
    }
  }

  async function handleRemoveDomain() {
    try {
      const shopId = shopData?.shop()?.shopId;
      const domain = shopData?.shopDomain()?.domain;
      if (!_.isNil(shopId) && !_.isNil(domain)) {
        await shopDomainService.removeDomain({
          shopId,
          domain,
        });
      }
      setShopDomain("domain", "");
      shopData.refetch();
    } catch (err: any) {
      if (err.code) {
        setErrors("domain", [err.message]);
      }
    }
  }

  function dataWasChanged() {
    return !_.isEqual(
      _.pick(shopData.shop(), updateFields),
      _.pick(shopDomain, updateFields)
    );
  }

  function confirmCloseDialog() {
    setShowDiscardConfirmation(false);
    props.onClose();
  }

  function continueEditing() {
    resetErrors();
    setShowDiscardConfirmation(false);
  }

  return (
    <>
      <Show when={!showDiscardConfirmation()}>
        <Dialog
          title={trans(TKEYS.dashboard["shop"]["edit-domain"])}
          onClose={props.onClose}
        >
          <form class={styles.Form} onSubmit={handleAddDomain}>
            <TextField
              label={trans(TKEYS["shop"].labels.domain)}
              required
              small
              value={shopDomain.domain}
              onValue={handleDomainInput}
              errors={errors.domain}
            />

            <Show
              when={
                shopData?.shopDomain()?.status ===
                DomainStatus.DOMAIN_STATUS_PENDING
              }
            >
              <Anotation>
                <Trans
                  key={TKEYS.dashboard["shop"].domain["pending-information"]}
                />
              </Anotation>
              <Anotation warn center>
                <Trans
                  key={
                    TKEYS.dashboard.shop.domain["pending-information-sample"]
                  }
                  options={{ item: shopDomain.domain }}
                />
              </Anotation>
            </Show>
            <Show
              when={
                shopData?.shopDomain()?.status ===
                DomainStatus.DOMAIN_STATUS_ACTIVE
              }
            >
              <Anotation active>
                <Trans key={TKEYS.dashboard["shop"].domain.active} />
              </Anotation>
            </Show>

            <div class={styles.DialogFooter}>
              <ActionButton
                actionType="danger"
                disabled={_.isEmpty(shopData?.shopDomain()?.domain)}
                onClick={handleRemoveDomain}
              >
                <Trans key={TKEYS.form.action.Delete} />
              </ActionButton>
              <ActionButton
                actionType="active-filled"
                submit
                disabled={!_.isEmpty(shopData?.shopDomain()?.domain)}
                onClick={handleAddDomain}
              >
                <Trans key={TKEYS.form.action.Save} />
              </ActionButton>
            </div>
          </form>
        </Dialog>
      </Show>

      <Show when={showDiscardConfirmation()}>
        <DiscardConfirmation
          onCancel={continueEditing}
          onDiscard={confirmCloseDialog}
        />
      </Show>
    </>
  );
}
