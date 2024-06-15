import { Trans } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";

import { Font } from "../../../components/content";
import { ActionButton } from "../../../components/form";
import { TKEYS } from "../../../locales";
import { ShopResponse } from "../../../services/sited_io/commerce/v1/shop";
import commonStyles from "../Common.module.scss";
import { PublishShopDialog } from "../PublishShopDialog";
import { UnpublishShopDialog } from "../UnpublishShopDialog";

type Dialog = "none" | "make-visible" | "make-not-visible";

type Props = {
  readonly shop: ShopResponse | undefined;
  readonly onUpdate: () => void;
};

export function UpdatePublicVisibilityForm(props: Props) {
  const [showDialog, setShowDialog] = createSignal<Dialog>("none");

  function handleOpenDialog(dialog: Dialog) {
    setShowDialog(dialog);
  }

  function handleCloseDialog() {
    setShowDialog("none");
  }

  function handleUpdate() {
    handleCloseDialog();
    props.onUpdate();
  }

  return (
    <>
      <form class={commonStyles.Form}>
        <Font
          type="headline"
          class={commonStyles.Headline}
          key={TKEYS.dashboard.shop.visibility.Title}
        />
        <div class={commonStyles.Fields}>
          <div class={commonStyles.FieldInfo}>
            <Font type="body" key={TKEYS.dashboard.shop.visibility.Info} />
          </div>

          <Show when={!_.isNil(props.shop?.isActive) && !props.shop?.isActive}>
            <ActionButton
              actionType="active-filled"
              tall
              wide
              onClick={() => handleOpenDialog("make-visible")}
            >
              <Trans key={TKEYS.dashboard.shop.visibility["publish-shop"]} />
            </ActionButton>
          </Show>

          <Show when={!_.isNil(props.shop?.isActive) && props.shop?.isActive}>
            <ActionButton
              actionType="danger"
              onClick={() => handleOpenDialog("make-not-visible")}
            >
              <Trans key={TKEYS.dashboard.shop.visibility["hide-this-shop"]} />
            </ActionButton>
          </Show>
        </div>
      </form>

      <PublishShopDialog
        shop={props.shop}
        show={showDialog() === "make-visible"}
        onClose={handleCloseDialog}
        onUpdate={handleUpdate}
      />

      <UnpublishShopDialog
        shop={props.shop}
        show={showDialog() === "make-not-visible"}
        onClose={handleCloseDialog}
        onUpdate={handleUpdate}
      />
    </>
  );
}
