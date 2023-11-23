import { Trans } from "@mbarzda/solid-i18next";

import { ActionButton } from "../../../components/form";
import { TKEYS } from "../../../locales";
import { ShopResponse } from "../../../services/peoplesmarkets/commerce/v1/shop";
import commonStyles from "../Common.module.scss";
import { EditLogo } from "./EditLogo";
import { Show } from "solid-js";

type Props = {
  shop: ShopResponse | undefined;
  prev: () => void;
  onUpdate: () => void;
  onDone: () => void;
};

export function EditAppearanceTab(props: Props) {
  function handleUpdate() {
    props.onUpdate();
  }

  function handleDone() {
    props.onDone();
  }

  return (
    <>
      <div class={commonStyles.Form}>
        <div class={commonStyles.Fields}>
          <div class={commonStyles.FieldSet}>
            <EditLogo shop={props.shop} onUpdate={handleUpdate} />
          </div>
        </div>

        <div class={commonStyles.Actions}>
          <div class={commonStyles.ActionsLeft}>
            <ActionButton actionType="neutral" onClick={props.prev}>
              <Trans key={TKEYS.form.action.Previous} />
            </ActionButton>
          </div>

          <div class={commonStyles.ActionsRight}>
            <ActionButton actionType="active-filled" onClick={handleDone}>
              <Show
                when={!props.shop?.isActive}
                fallback={<Trans key={TKEYS.form.action.Done} />}
              >
                <Trans key={TKEYS.dashboard.shop.visibility["publish-shop"]} />
              </Show>
            </ActionButton>
          </div>
        </div>
      </div>
    </>
  );
}
