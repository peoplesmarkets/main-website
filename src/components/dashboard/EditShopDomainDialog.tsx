import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import {
  ErrorBoundary,
  Show,
  Suspense,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { createStore } from "solid-js/store";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { isValidHostname, resourceIsReady } from "../../lib";
import { TKEYS } from "../../locales";
import { ShopData } from "../../routes/shops/ShopData";
import {
  AddDomainToShopRequest,
  DomainStatus,
} from "../../services/peoplesmarkets/commerce/v1/shop_domain";
import { Anotation, ContentError } from "../content";
import { ActionButton, DiscardConfirmation, TextField } from "../form";
import { Dialog } from "../layout";
import styles from "./CreateEditDialg.module.scss";

type Props = {
  onClose: () => void;
};

export function EditShopDomainDialog(props: Props) {
  const [trans] = useTransContext();

  const { shopDomainService } = useServiceClientContext();

  const shopData = useRouteData<typeof ShopData>();

  const [shopDomain] = createResource(shopData?.shopId, async (shopId) =>
    shopDomainService.getDomainStatus(shopId).then((res) => res.domainStatus)
  );

  const emptyUpdateRequest = AddDomainToShopRequest.create();
  const updateFields = Object.keys(emptyUpdateRequest);

  const [request, setRequest] =
    createStore<AddDomainToShopRequest>(emptyUpdateRequest);

  const [errors, setErrors] = createStore({ domain: [] as string[] });

  const [showDiscardConfirmation, setShowDiscardConfirmation] =
    createSignal(false);

  createEffect(() => {
    if (!resourceIsReady(shopDomain)) {
      return;
    }

    if (_.isNil(request.shopId) || _.isEmpty(request.shopId)) {
      setRequest({
        shopId: shopData.shopId(),
        domain: shopDomain()?.domain,
      });
    }
  });

  function resetErrors() {
    setErrors({ domain: [] });
  }

  function handleDomainInput(value: string) {
    resetErrors();
    if (isValidHostname(value)) {
      setRequest("domain", value);
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
      await shopDomainService.addDomain(request);
      shopData.refetch();
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
      const shopId = shopData.shopId();
      const domain = shopDomain()?.domain;
      if (!_.isNil(shopId) && !_.isNil(domain)) {
        await shopDomainService.removeDomain({
          shopId,
          domain,
        });
      }
      shopData.refetch();
      setRequest("domain", "");
    } catch (err: any) {
      if (err.code) {
        setErrors("domain", [err.message]);
      }
    }
  }

  function dataWasChanged() {
    return !_.isEqual(
      _.pick(shopData.shop(), updateFields),
      _.pick(request, updateFields)
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
      <Dialog
        title={trans(TKEYS.dashboard["shop"]["edit-domain"])}
        onClose={props.onClose}
      >
        <ErrorBoundary fallback={<ContentError />}>
          <Suspense>
            <form class={styles.Form} onSubmit={handleAddDomain}>
              <TextField
                label={trans(TKEYS["shop"].labels.domain)}
                required
                small
                value={request.domain}
                onValue={handleDomainInput}
                errors={errors.domain}
              />

              <Show
                when={
                  shopDomain()?.status === DomainStatus.DOMAIN_STATUS_PENDING
                }
              >
                <Anotation warn>
                  <Trans key={TKEYS.dashboard.shop.domain.pending} />
                </Anotation>
                <Anotation>
                  <Trans
                    key={TKEYS.dashboard["shop"].domain["pending-information"]}
                  />
                </Anotation>
                <Anotation>
                  <span class={styles.Strong}>
                    <Trans
                      key={
                        TKEYS.dashboard.shop.domain[
                          "pending-information-sample"
                        ]
                      }
                      options={{ item: request.domain }}
                    />
                  </span>
                </Anotation>
              </Show>
              <Show
                when={
                  shopDomain()?.status === DomainStatus.DOMAIN_STATUS_ACTIVE
                }
              >
                <Anotation active>
                  <Trans key={TKEYS.dashboard["shop"].domain.active} />
                </Anotation>
              </Show>

              <div class={styles.DialogFooter}>
                <ActionButton
                  actionType="danger"
                  disabled={_.isEmpty(shopDomain()?.domain)}
                  onClick={handleRemoveDomain}
                >
                  <Trans key={TKEYS.form.action.Delete} />
                </ActionButton>
                <ActionButton
                  actionType="active-filled"
                  submit
                  disabled={!_.isEmpty(shopDomain()?.domain)}
                  onClick={handleAddDomain}
                >
                  <Trans key={TKEYS.form.action.Save} />
                </ActionButton>
              </div>
            </form>
          </Suspense>
        </ErrorBoundary>
      </Dialog>

      <Show when={showDiscardConfirmation()}>
        <DiscardConfirmation
          onCancel={continueEditing}
          onDiscard={confirmCloseDialog}
        />
      </Show>
    </>
  );
}
