import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useNavigate } from "@solidjs/router";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { Font } from "../../components/content";
import { MdButton, MdTextField } from "../../components/form";
import { DiscardConfirmationDialog } from "../../components/form/DiscardConfirmationDialog";
import { MdDialog } from "../../components/layout/MdDialog";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { buildBaseUrl, slugify } from "../../lib";
import { TKEYS } from "../../locales";
import { buildShopConfigurationPath } from "../../routes/shops/shop-routing";
import { CreateShopRequest } from "../../services/peoplesmarkets/commerce/v1/shop";
import { buildShopsPath } from "../main-routing";

type Props = {
  show: boolean;
  onClose: () => void;
  onUpdate?: () => void;
};

export function CreateShopDialog(props: Props) {
  const navigate = useNavigate();
  const [trans] = useTransContext();

  const { shopService } = useServiceClientContext();

  const [request, setRequest] = createStore<CreateShopRequest>({
    name: "",
    slug: "",
    description: "",
  });

  const [errors, setErrors] = createStore({
    name: [] as string[],
    slug: [] as string[],
  });

  const [showPathField, setShowPathField] = createSignal(false);
  const [showDiscardConfirmation, setShowDiscardConfirmation] =
    createSignal(false);

  function clearForm() {
    setRequest({ name: "", slug: "" });
  }
  function resetErrors() {
    setErrors({ name: [], slug: [] });
  }

  function handleNameInput(value: string) {
    resetErrors();
    setRequest("name", value);
    setRequest("slug", slugify(value));
  }

  function handleSlugInput(value: string) {
    resetErrors();
    setRequest("slug", value);
  }

  async function handleCreateShop(event: SubmitEvent) {
    event.preventDefault();

    try {
      const response = await shopService.create(request);

      const newSlug = response.shop?.slug;
      if (!_.isNil(newSlug)) {
        navigate(buildShopConfigurationPath(newSlug));
      }
      props.onUpdate?.();
      props.onClose();
    } catch (err: any) {
      resetErrors();
      if (err.code && err.code === grpc.Code.AlreadyExists) {
        setShowPathField(true);
        setErrors("slug", [
          trans(TKEYS.dashboard.shop["duplicate-slug-error"]),
        ]);
      } else {
        throw err;
      }
    }
  }

  function handleCloseDialog() {
    if (!_.isEmpty(request.name) || !_.isEmpty(request.description)) {
      setShowDiscardConfirmation(true);
    } else {
      props.onClose();
    }
  }

  function handleConfirmCloseDialog() {
    clearForm();
    setShowDiscardConfirmation(false);
    props.onClose();
  }

  function handleContinueEditing() {
    resetErrors();
    setShowDiscardConfirmation(false);
  }

  return (
    <>
      <MdDialog
        open={props.show && !showDiscardConfirmation()}
        onClose={handleCloseDialog}
      >
        <div slot="headline">
          <Font type="title" key={TKEYS.dashboard.shop["name-your-shop"]} />
        </div>

        <div slot="content">
          <form onSubmit={handleCreateShop}>
            <MdTextField
              type="text"
              value={request.name}
              required
              label={trans(TKEYS.shop.labels.name)}
              onValue={handleNameInput}
            />

            <Show when={showPathField()}>
              <MdTextField
                label={trans(TKEYS.shop.labels.slug)}
                required
                prefixText={buildBaseUrl(buildShopsPath()) + "/"}
                value={request.slug}
                onValue={handleSlugInput}
                error={!_.isEmpty(errors.slug)}
                errorText={errors.slug}
              />
            </Show>
          </form>
        </div>

        <div slot="actions">
          <MdButton type="outlined" onClick={handleCloseDialog}>
            <Trans key={TKEYS.form.action.Cancel} />
          </MdButton>
          <MdButton submit onClick={handleCreateShop}>
            <Trans key={TKEYS.form.action.Save} />
          </MdButton>
        </div>
      </MdDialog>

      <DiscardConfirmationDialog
        show={props.show && showDiscardConfirmation()}
        onCancel={handleContinueEditing}
        onDiscard={handleConfirmCloseDialog}
      />
    </>
  );
}
