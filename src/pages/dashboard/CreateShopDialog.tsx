import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { Font } from "../../components/content";
import { Form, MdButton, MdTextField } from "../../components/form";
import { DiscardConfirmationDialog } from "../../components/form/DiscardConfirmationDialog";
import { MdDialog } from "../../components/layout/MdDialog";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { TKEYS } from "../../locales";
import {
  CreateShopRequest,
  ShopResponse,
} from "../../services/sited_io/commerce/v1/shop";

type Props = {
  show: boolean;
  onClose: () => void;
  onUpdate: (_shop: ShopResponse | undefined) => void;
};

export function CreateShopDialog(props: Props) {
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
  }

  async function handleCreateShop(event: SubmitEvent) {
    event.preventDefault();

    try {
      const response = await shopService.create(request);

      props.onUpdate(response.shop);
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
          <Form onSubmit={handleCreateShop}>
            <MdTextField
              type="text"
              value={request.name}
              required
              label={trans(TKEYS.shop.labels.name)}
              onValue={handleNameInput}
            />
          </Form>
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
