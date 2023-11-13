import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useNavigate, useRouteData } from "@solidjs/router";
import _ from "lodash";
import {
  Match,
  Show,
  Suspense,
  Switch,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { createStore } from "solid-js/store";

import { ContentLoading, Font } from "../../../components/content";
import { ActionButton, MdTextField } from "../../../components/form";
import { DeleteConfirmationDialog } from "../../../components/form/DeleteConfirmationDialog";
import { Section } from "../../../components/layout";
import { DefaultBoundary } from "../../../components/layout/DefaultBoundary";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { requireAuthentication } from "../../../guards/authentication";
import { requireShopOwner } from "../../../guards/shop";
import { buildBaseUrl, isValidHostname } from "../../../lib";
import { TKEYS } from "../../../locales";
import { buildDashboardPathOrUrl } from "../../../routes/main-routing";
import { MyShopData } from "../MyShopData";
import {
  buildShopDetailPath,
  buildShopSettingsPath,
} from "../../../routes/shops/shop-routing";
import { UpdateShopRequest } from "../../../services/peoplesmarkets/commerce/v1/shop";
import {
  AddDomainToShopRequest,
  DomainStatus,
} from "../../../services/peoplesmarkets/commerce/v1/shop_domain";
import commonStyles from "../Common.module.scss";
import { PublishShopDialog } from "../PublishShopDialog";
import { UnpublishShopDialog } from "../UnpublishShopDialog";
import styles from "./Page.module.scss";

type Dialog = "none" | "make-visible" | "make-not-visible" | "delete";

export default function ShopSettingsPage() {
  const navigate = useNavigate();

  const [trans] = useTransContext();

  const { shopService, shopDomainService } = useServiceClientContext();

  const shopData = useRouteData<typeof MyShopData>();

  const [authenticated] = createResource(
    () => location.pathname,
    requireAuthentication
  );

  const [shopDomain, shopDomainActions] = createResource(
    () => shopData.shop()?.shopId,
    async (shopId: string) =>
      shopDomainService.getDomainStatus(shopId).then((res) => res.domainStatus)
  );

  const [showDialog, setShowDialog] = createSignal<Dialog>("none");

  const [updateDomainRequest, setUpdateDomainRequest] = createStore({
    shopId: undefined as string | undefined,
    domain: undefined as string | undefined,
  } as AddDomainToShopRequest);

  const [updateDomainErrors, setUpdateDomainErrors] = createStore({
    domain: [] as string[],
  });

  const [updateSlugRequest, setUpdateSlugRequest] = createStore({
    shopId: undefined as string | undefined,
    slug: undefined as string | undefined,
  } as UpdateShopRequest);

  const [updateSlugErrors, setUpdateSlugErrors] = createStore({
    slug: [] as string[],
  });

  const [deleteShopErrors, setDeleteShopErrors] = createSignal([] as string[]);

  createEffect(() => {
    const shopId = shopData.shop()?.shopId;
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

  createEffect(() => {
    const shop = shopData.shop();
    if (_.isNil(updateSlugRequest.shopId) && !_.isNil(shop)) {
      setUpdateSlugRequest(
        _.clone(_.pick(shop, Object.keys(updateSlugRequest)))
      );
    }
  });

  function loaded() {
    return authenticated() && requireShopOwner(shopData.shop());
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

  function slugDataWasChanged() {
    const fields = Object.keys(updateSlugRequest);
    return !_.isEqual(
      _.pick(shopData.shop(), fields),
      _.pick(updateSlugRequest, fields)
    );
  }

  function resetUpdateDomainErrors() {
    setUpdateDomainErrors({ domain: [] });
  }

  function resetUpdateSlugErrors() {
    setUpdateSlugErrors({ slug: [] });
  }

  function handleDomainInput(value: string) {
    resetUpdateDomainErrors();
    if (isValidHostname(value)) {
      setUpdateDomainRequest("domain", value);
    } else {
      setUpdateDomainErrors("domain", trans(TKEYS.shop.errors["invalid-url"]));
    }
  }

  function handleShopSlugInput(value: string) {
    resetUpdateSlugErrors();
    setUpdateSlugRequest("slug", value);
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
      shopData.refetch();
      shopDomainActions.refetch();
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
      const shopId = shopData.shop()?.shopId;
      const domain = shopDomain()?.domain;
      if (!_.isNil(shopId) && !_.isNil(domain)) {
        await shopDomainService.removeDomain({
          shopId,
          domain,
        });
      }
      shopData.refetch();
      shopDomainActions.refetch();
      setUpdateDomainRequest("domain", "");
    } catch (err: any) {
      if (err.code) {
        setUpdateDomainErrors("domain", [err.message]);
      }
    }
  }

  async function handleUpdateSlug(event: SubmitEvent) {
    event.preventDefault();

    if (!slugDataWasChanged()) {
      const notModified = trans(TKEYS.form.errors["not-modified"]);
      setUpdateSlugErrors("slug", [notModified]);
      return;
    }

    try {
      const response = await shopService.update(updateSlugRequest);

      if (!_.isNil(response.shop)) {
        navigate(buildShopSettingsPath(response.shop?.slug));
      }
    } catch (err: any) {
      if (err.code) {
        if (err.code === grpc.Code.AlreadyExists) {
          setUpdateSlugErrors("slug", [
            trans(TKEYS.form.errors["already-exists"]),
          ]);
        } else {
          setUpdateSlugErrors("slug", [err.message]);
        }
      } else {
        throw err;
      }
    }
  }

  async function handleDeleteShop() {
    const shopId = shopData.shop()?.shopId;

    if (_.isNil(shopId)) {
      setDeleteShopErrors(trans(TKEYS.fetching["content-error"]));
      return;
    }

    try {
      await shopService.delete(shopId);
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.FailedPrecondition) {
        setDeleteShopErrors(trans(TKEYS.shop.errors["ensure-offers-deleted"]));
        return;
      }

      throw err;
    }

    navigate(buildDashboardPathOrUrl(), { replace: true });
  }

  function handleOpenDialog(dialog: Dialog) {
    setShowDialog(dialog);
  }

  function handleCloseDialog() {
    setShowDialog("none");
  }

  function handleUpdate() {
    shopData.refetch();
    shopDomainActions.refetch();
    handleCloseDialog();
  }

  return (
    <>
      <DefaultBoundary loaded={loaded}>
        <div class={styles.ShopSettingsPage}>
          <Suspense fallback={<ContentLoading />}>
            <form class={commonStyles.FormSet} onSubmit={handleUpdateSlug}>
              <div class={commonStyles.FieldsSingle}>
                <div class={commonStyles.FieldInfo}>
                  <Font type="headline" class={commonStyles.Headline}>
                    <Trans key={TKEYS.dashboard.shop.domain["edit-domain"]} />
                  </Font>
                  <Switch
                    fallback={
                      <Font type="body">
                        <Trans
                          key={TKEYS.dashboard.shop.domain["edit-domain-info"]}
                        />
                      </Font>
                    }
                  >
                    <Match
                      when={
                        shopDomain()?.status ===
                        DomainStatus.DOMAIN_STATUS_PENDING
                      }
                    >
                      <Font type="label" warn>
                        <Trans key={TKEYS.dashboard.shop.domain.pending} />
                      </Font>
                      <Font type="body">
                        <Trans
                          key={
                            TKEYS.dashboard["shop"].domain[
                              "pending-information"
                            ]
                          }
                        />
                      </Font>
                      <Font type="body" strong>
                        <Trans
                          key={
                            TKEYS.dashboard.shop.domain[
                              "pending-information-sample"
                            ]
                          }
                          options={{ item: updateDomainRequest.domain }}
                        />
                      </Font>
                    </Match>

                    <Match
                      when={
                        shopDomain()?.status ===
                        DomainStatus.DOMAIN_STATUS_ACTIVE
                      }
                    >
                      <Font type="body" active>
                        <Trans key={TKEYS.dashboard["shop"].domain.active} />
                      </Font>
                    </Match>
                  </Switch>
                </div>

                <div class={commonStyles.Field}>
                  <MdTextField
                    type="text"
                    value={updateDomainRequest.domain}
                    label={trans(TKEYS.shop.labels.Domain)}
                    onValue={handleDomainInput}
                    error={!_.isEmpty(updateDomainErrors.domain)}
                    errorText={updateDomainErrors.domain}
                  />
                </div>
              </div>

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
            </form>
          </Suspense>

          <form class={commonStyles.FormSet} onSubmit={handleUpdateDomain}>
            <div class={commonStyles.FieldsSingle}>
              <div class={commonStyles.FieldInfo}>
                <Font type="headline" class={commonStyles.Headline}>
                  <Trans key={TKEYS.dashboard.shop.path["edit-path"]} />
                </Font>
                <Font type="body">
                  <Trans key={TKEYS.dashboard.shop.path["edit-path-info"]} />
                </Font>
              </div>

              <div class={commonStyles.Field}>
                <MdTextField
                  type="text"
                  value={updateSlugRequest.slug}
                  label={trans(TKEYS.shop.labels.Path)}
                  prefixText={buildBaseUrl(buildShopDetailPath("//"))}
                  onValue={handleShopSlugInput}
                  error={!_.isEmpty(updateSlugErrors.slug)}
                  errorText={updateSlugErrors.slug}
                />
              </div>
            </div>

            <div class={commonStyles.Actions}>
              <div class={commonStyles.ActionsLeft} />

              <div class={commonStyles.ActionsRight}>
                <ActionButton
                  actionType="active-filled"
                  onClick={handleUpdateSlug}
                  disabled={!slugDataWasChanged()}
                >
                  <Trans key={TKEYS.form.action.Save} />
                </ActionButton>
              </div>
            </div>
          </form>

          <form class={commonStyles.FormSet}>
            <div class={commonStyles.FieldsSingle}>
              <div class={commonStyles.FieldInfo}>
                <Font type="headline" class={commonStyles.Headline}>
                  <Trans key={TKEYS.dashboard.shop.visibility.Title} />
                </Font>
                <Font type="body">
                  <Trans key={TKEYS.dashboard.shop.visibility.Info} />
                </Font>
              </div>
            </div>

            <div class={commonStyles.Actions}>
              <div class={commonStyles.ActionsLeft} />

              <div class={commonStyles.ActionsRight}>
                <Show
                  when={
                    !_.isNil(shopData.shop()?.isActive) &&
                    !shopData.shop()?.isActive
                  }
                >
                  <div class={styles.EditSection}>
                    <ActionButton
                      actionType="active-filled"
                      wide
                      onClick={() => handleOpenDialog("make-visible")}
                    >
                      <Trans key={TKEYS.form.action.Publish} />
                    </ActionButton>
                  </div>
                </Show>

                <Show
                  when={
                    !_.isNil(shopData.shop()?.isActive) &&
                    shopData.shop()?.isActive
                  }
                >
                  <div class={styles.EditSection}>
                    <ActionButton
                      actionType="danger"
                      onClick={() => handleOpenDialog("make-not-visible")}
                    >
                      <Trans key={TKEYS.form.action.Hide} />
                    </ActionButton>
                  </div>
                </Show>
              </div>
            </div>
          </form>

          <Section danger>
            <Font type="title">
              <Trans key={TKEYS.form["critical-settings"]} />
            </Font>

            <div class={commonStyles.FormSet}>
              <div class={commonStyles.FieldRow}>
                <Font type="body">
                  <Trans key={TKEYS.dashboard.shop["delete-this-shop"]} />
                </Font>

                <ActionButton
                  actionType="danger"
                  onClick={() => handleOpenDialog("delete")}
                >
                  <Trans key={TKEYS.form.action.Delete} />
                </ActionButton>
              </div>
            </div>
          </Section>
        </div>
      </DefaultBoundary>

      <PublishShopDialog
        shop={shopData.shop()}
        show={showDialog() === "make-visible"}
        onClose={handleCloseDialog}
        onUpdate={handleUpdate}
      />

      <UnpublishShopDialog
        shop={shopData.shop()}
        show={showDialog() === "make-not-visible"}
        onClose={handleCloseDialog}
        onUpdate={handleUpdate}
      />

      <DeleteConfirmationDialog
        show={showDialog() === "delete"}
        onCancel={handleCloseDialog}
        onConfirmation={handleDeleteShop}
      >
        <Font type="body">
          <Trans key={TKEYS.dashboard.shop["delete-shop-info"]} />
        </Font>
        <Show when={!_.isEmpty(deleteShopErrors())}>
          <Font type="label" warn>
            {deleteShopErrors()}
          </Font>
        </Show>
      </DeleteConfirmationDialog>
    </>
  );
}
