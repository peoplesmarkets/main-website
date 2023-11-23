import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";

import { Font } from "../../../components/content";
import { ActionButton, MdTextField } from "../../../components/form";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { buildBaseUrl } from "../../../lib";
import { TKEYS } from "../../../locales";
import { buildShopDetailPath } from "../../../routes/shops/shop-routing";
import {
  ShopResponse,
  UpdateShopRequest,
} from "../../../services/peoplesmarkets/commerce/v1/shop";
import commonStyles from "../Common.module.scss";

type Props = {
  readonly shop: ShopResponse | undefined;
  readonly onUpdate: () => void;
};

export function UpdateSlugForm(props: Props) {
  const [trans] = useTransContext();

  const { shopService } = useServiceClientContext();

  const [updateSlugRequest, setUpdateSlugRequest] = createStore({
    shopId: undefined as string | undefined,
    slug: undefined as string | undefined,
  } as UpdateShopRequest);

  const [updateSlugErrors, setUpdateSlugErrors] = createStore({
    slug: [] as string[],
  });

  createEffect(() => {
    if (_.isNil(updateSlugRequest.shopId) && !_.isNil(props.shop)) {
      setUpdateSlugRequest(
        _.clone(_.pick(props.shop, Object.keys(updateSlugRequest)))
      );
    }
  });

  function slugDataWasChanged() {
    const fields = Object.keys(updateSlugRequest);
    return !_.isEqual(
      _.pick(props.shop, fields),
      _.pick(updateSlugRequest, fields)
    );
  }

  function resetUpdateSlugErrors() {
    setUpdateSlugErrors({ slug: [] });
  }

  function handleSlugInput(value: string) {
    resetUpdateSlugErrors();
    setUpdateSlugRequest("slug", value);
  }

  async function handleUpdateSlug(event: SubmitEvent) {
    event.preventDefault();

    if (_.isEmpty(updateSlugRequest.slug)) {
      setUpdateSlugErrors("slug", [trans(TKEYS.form.errors["required-field"])]);
      return;
    }

    if (!slugDataWasChanged()) {
      const notModified = trans(TKEYS.form.errors["not-modified"]);
      setUpdateSlugErrors("slug", [notModified]);
      return;
    }

    try {
      await shopService.update(updateSlugRequest);
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

  return (
    <form class={commonStyles.Form} onSubmit={handleUpdateSlug}>
      <Font
        type="headline"
        class={commonStyles.Headline}
        key={TKEYS.dashboard.shop.path["edit-path"]}
      />

      <div class={commonStyles.Fields}>
        <div class={commonStyles.FieldInfo}>
          <Font type="body" key={TKEYS.dashboard.shop.path["edit-path-info"]} />
        </div>

        <div class={commonStyles.Field}>
          <MdTextField
            type="text"
            value={updateSlugRequest.slug}
            label={trans(TKEYS.shop.labels.Path)}
            prefixText={buildBaseUrl(buildShopDetailPath("//"))}
            required
            onValue={handleSlugInput}
            error={!_.isEmpty(updateSlugErrors.slug)}
            errorText={updateSlugErrors.slug}
          />

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
        </div>
      </div>
    </form>
  );
}
