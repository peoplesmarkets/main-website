import { Trans } from "@mbarzda/solid-i18next";

import { ActionButton } from "../../../components/form";
import { TKEYS } from "../../../locales";
import { ShopResponse } from "../../../services/peoplesmarkets/commerce/v1/shop";
import commonStyles from "../Common.module.scss";
import { EditLogo } from "./EditLogo";

type Props = {
  shop: ShopResponse | undefined;
  prev: () => void;
  next: () => void;
  onUpdate: () => void;
};

export function EditAppearanceTab(props: Props) {
  function handleContinue() {
    props.next();
  }

  function handleUpdate() {
    location.reload();
  }

  return (
    <>
      <div class={commonStyles.Form}>
        <div class={commonStyles.Fields}>
          <div class={commonStyles.FieldSet}>
            <EditLogo shop={() => props.shop} onUpdate={handleUpdate} />
          </div>
        </div>

        <div class={commonStyles.Actions}>
          <div class={commonStyles.ActionsLeft}>
            <ActionButton actionType="neutral" onClick={props.prev}>
              <Trans key={TKEYS.form.action.Previous} />
            </ActionButton>
          </div>

          <div class={commonStyles.ActionsRight}>
            <ActionButton actionType="neutral" onClick={handleContinue}>
              <Trans key={TKEYS.form.action.Next} />
            </ActionButton>
          </div>
        </div>
      </div>
    </>
  );
}
