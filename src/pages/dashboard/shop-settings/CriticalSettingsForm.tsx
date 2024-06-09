import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useNavigate } from "@solidjs/router";
import _ from "lodash";
import { Show, createSignal } from "solid-js";

import { Font } from "../../../components/content";
import { ActionButton } from "../../../components/form";
import { DeleteConfirmationDialog } from "../../../components/form/DeleteConfirmationDialog";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { useSelectedShopContext } from "../../../contexts/ShopContext";
import { TKEYS } from "../../../locales";
import { buildDashboardPath } from "../../../routes/main/main-routing";
import commonStyles from "../Common.module.scss";

export function CriticalSettingsForm() {
  const navigate = useNavigate();

  const [trans] = useTransContext();
  const { shopService } = useServiceClientContext();

  const { selectedShopId, setSelectedShopId } = useSelectedShopContext();

  const [showDeleteDialog, setShowDeleteDialog] = createSignal(false);
  const [deleteShopErrors, setDeleteShopErrors] = createSignal([] as string[]);

  async function handleDeleteShop() {
    const shopId = selectedShopId();

    if (_.isNil(shopId)) {
      setDeleteShopErrors([trans(TKEYS.fetching["content-error"])]);
      return;
    }

    try {
      await shopService.delete(shopId);
      setSelectedShopId();
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.FailedPrecondition) {
        setDeleteShopErrors([trans(TKEYS.shop.errors["conflict-on-delete"])]);
        return;
      }

      throw err;
    }

    navigate(buildDashboardPath(), { replace: true });
  }

  function handleOpenDeleteDialog() {
    setShowDeleteDialog(true);
  }

  function handleCloseDeleteDialog() {
    setShowDeleteDialog(false);
  }

  return (
    <>
      <form class={commonStyles.Form}>
        <Font
          type="headline"
          class={commonStyles.Headline}
          key={TKEYS.form["critical-settings"]}
        />

        <div class={commonStyles.Fields}>
          <div class={commonStyles.FieldRow}>
            <Font type="label" key={TKEYS.dashboard.shop["delete-this-shop"]} />

            <ActionButton actionType="danger" onClick={handleOpenDeleteDialog}>
              <Trans key={TKEYS.form.action.Delete} />
            </ActionButton>
          </div>
        </div>
      </form>

      <DeleteConfirmationDialog
        show={showDeleteDialog()}
        onCancel={handleCloseDeleteDialog}
        onConfirmation={handleDeleteShop}
      >
        <Font type="body" key={TKEYS.dashboard.shop["delete-shop-info"]} />

        <Show when={!_.isEmpty(deleteShopErrors())}>
          <Font type="label" warn>
            {deleteShopErrors()}
          </Font>
        </Show>
      </DeleteConfirmationDialog>
    </>
  );
}
