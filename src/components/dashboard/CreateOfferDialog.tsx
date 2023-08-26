import { grpc } from "@improbable-eng/grpc-web";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales/dev";
import { OfferService } from "../../services";
import {
  ActionButton,
  DiscardConfirmation,
  TextArea,
  TextField,
} from "../form";
import { Dialog } from "../layout/Dialog";
import styles from "./CreateEditDialg.module.scss";

type Props = {
  marketBoothId: string;
  onClose: () => void;
  onUpdate?: () => void;
};

export function CreateOfferDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const [offer, setOffer] = createStore({
    /* eslint-disable-next-line solid/reactivity */
    marketBoothId: props.marketBoothId,
    name: "",
    description: "",
  });

  const [errors, setErrors] = createStore({
    name: [] as string[],
    description: [] as string[],
  });

  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  function onNameInput(value: string) {
    setErrors("name", []);
    setOffer("name", value);
  }

  function onDescriptionInput(value: string) {
    setErrors("description", []);
    setOffer("description", value);
  }

  async function createOffer(event: SubmitEvent) {
    event.preventDefault();

    if (_.isEmpty(offer.name)) {
      setErrors("name", [trans(TKEYS.form.errors["required-field"])]);
      return;
    }

    try {
      await offerService.create(offer);

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

  function closeDialog() {
    if (!_.isEmpty(offer.name) || !_.isEmpty(offer.description)) {
      setDiscardConfirmation(true);
    } else {
      props.onClose();
    }
  }

  function confirmCloseDialog() {
    setDiscardConfirmation(false);
    props.onClose();
  }

  function continueEditing() {
    setErrors("name", []);
    setErrors("description", []);
    setDiscardConfirmation(false);
  }

  return (
    <>
      <Show when={!discardConfirmation()}>
        <Dialog
          title={trans(TKEYS.dashboard.offers["create-new-offer"])}
          onClose={closeDialog}
        >
          <form class={styles.Form} onSubmit={(e) => createOffer(e)}>
            <TextField
              name="name"
              label={trans(TKEYS.offer.labels.name)}
              required={true}
              value={offer.name}
              onValue={onNameInput}
              errors={errors.name}
            />

            <TextArea
              name="description"
              label={trans(TKEYS.offer.labels.description)}
              rows={8}
              required={false}
              value={offer.description}
              onValue={onDescriptionInput}
              errors={errors.description}
            />
          </form>

          <div class={styles.DialogFooter}>
            <ActionButton
              actionType="active-filled"
              onClick={(e) => createOffer(e)}
            >
              <Trans key={TKEYS.form.action.Save} />
            </ActionButton>
          </div>
        </Dialog>
      </Show>

      <DiscardConfirmation
        showSignal={discardConfirmation()}
        onCancel={continueEditing}
        onDiscard={confirmCloseDialog}
      />
    </>
  );
}
