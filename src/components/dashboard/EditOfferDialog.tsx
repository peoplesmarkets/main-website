import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales/dev";
import { OfferService } from "../../services";
import {
  OfferResponse,
  UpdateOfferRequest,
} from "../../services/peoplesmarkets/commerce/v1/offer";
import {
  ActionButton,
  DiscardConfirmation,
  TextArea,
  TextField,
} from "../form";
import { Dialog } from "../layout/Dialog";
import styles from "./CreateEditDialg.module.scss";

type Props = {
  readonly offer: () => OfferResponse;
  readonly onClose: () => void;
  readonly onUpdate?: () => void;
};

export function EditOfferDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  /* eslint-disable-next-line solid/reactivity */
  const initialOffer = _.cloneDeep(props.offer());

  const [offer, setOffer] = createStore<UpdateOfferRequest>(
    _.cloneDeep(initialOffer)
  );

  const [errors, setErrors] = createStore({
    name: [] as string[],
    description: [] as string[],
  });

  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  function resetErrors() {
    setErrors({ name: [], description: [] });
  }

  function dataWasChanged() {
    return (
      offer.name !== initialOffer.name ||
      offer.description !== initialOffer.description
    );
  }

  function handleNameInput(value: string) {
    resetErrors();
    setOffer("name", value.trim());
  }

  function handleDescriptionInput(value: string) {
    resetErrors();
    setOffer("description", value.trim());
  }

  async function handleUpdateOffer(event: SubmitEvent) {
    event.preventDefault();

    if (!dataWasChanged()) {
      const notModified = trans(TKEYS.form.errors["not-modified"]);
      setErrors("name", [notModified]);
      setErrors("description", [notModified]);
      return;
    }

    try {
      await offerService.update(offer);

      props.onUpdate?.();
      props.onClose();
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.AlreadyExists) {
        setErrors("name", [trans(TKEYS.form.errors["already-exists"])]);
      } else {
        throw err;
      }
    }
  }

  function handleCloseDialog() {
    if (dataWasChanged()) {
      setDiscardConfirmation(true);
    } else {
      props.onClose();
    }
  }

  function handleContinueEditing() {
    resetErrors();
    setDiscardConfirmation(false);
  }

  function handleConfirmCloseDialog() {
    setDiscardConfirmation(false);
    props.onClose();
  }

  return (
    <>
      <Show when={!discardConfirmation()}>
        <Dialog
          title={trans(TKEYS.dashboard.offers["edit-offer"])}
          onClose={handleCloseDialog}
        >
          <form class={styles.Form} onSubmit={handleUpdateOffer}>
            <TextField
              name="name"
              label={trans(TKEYS.offer.labels.name)}
              required
              value={offer.name}
              onValue={handleNameInput}
              errors={errors.name}
            />

            <TextArea
              name="description"
              label={trans(TKEYS.offer.labels.description)}
              rows={8}
              value={offer.description}
              onValue={handleDescriptionInput}
              errors={errors.description}
            />

            <div class={styles.DialogFooter}>
              <ActionButton
                actionType="active-filled"
                submit
                onClick={handleUpdateOffer}
              >
                <Trans key={TKEYS.form.action.Save} />
              </ActionButton>
            </div>
          </form>
        </Dialog>
      </Show>

      <Show when={discardConfirmation()}>
        <DiscardConfirmation
          onCancel={handleContinueEditing}
          onDiscard={handleConfirmCloseDialog}
        />
      </Show>
    </>
  );
}
