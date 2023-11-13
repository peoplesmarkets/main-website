import { grpc } from "@improbable-eng/grpc-web";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { TKEYS } from "../../locales";
import { listOfferTypeCodes } from "../../services";
import {
  CreateOfferRequest,
  OfferType,
  offerTypeFromJSON,
  offerTypeToJSON,
} from "../../services/peoplesmarkets/commerce/v1/offer";
import {
  ActionButton,
  DiscardConfirmation,
  Select,
  SelectKey,
  TextArea,
  TextField,
} from "../form";
import { Dialog } from "../layout/Dialog";
import styles from "./CreateEditDialg.module.scss";

type Props = {
  shopId: string | undefined;
  onClose: () => void;
  onUpdate?: () => void;
};

export function CreateOfferDialog(props: Props) {
  const [trans] = useTransContext();

  const { offerService } = useServiceClientContext();

  const [offer, setOffer] = createStore<CreateOfferRequest>({
    shopId: "",
    name: "",
    description: "",
    type: OfferType.OFFER_TYPE_PHYSICAL,
    isFeatured: false,
  });

  const [errors, setErrors] = createStore({
    name: [] as string[],
    description: [] as string[],
  });

  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  createEffect(() => {
    if (_.isEmpty(offer.shopId) && !_.isNil(props.shopId)) {
      setOffer("shopId", props.shopId);
    }
  });

  function offerTypeOptions() {
    return listOfferTypeCodes().map((c) => ({
      name: trans(TKEYS.offer.types[c]),
      key: c,
    }));
  }

  function selectedOfferType() {
    if (!_.isNil(offer.type)) {
      return _.find(offerTypeOptions(), {
        key: offerTypeToJSON(offer.type),
      });
    }
  }

  function resetErrors() {
    setErrors({ name: [], description: [] });
  }

  function handleNameInput(value: string) {
    resetErrors();
    setOffer("name", value);
  }

  function handleDescriptionInput(value: string) {
    resetErrors();
    setOffer("description", value);
  }

  function handleOfferTypeChange(value: SelectKey) {
    if (_.isString(value)) {
      setOffer("type", offerTypeFromJSON(value));
    }
  }

  async function handleCreateOffer(event: SubmitEvent) {
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

  function handleCloseDialog() {
    if (!_.isEmpty(offer.name) || !_.isEmpty(offer.description)) {
      setDiscardConfirmation(true);
    } else {
      props.onClose();
    }
  }

  function handleConfirmCloseDialog() {
    setDiscardConfirmation(false);
    props.onClose();
  }

  function handleContinueEditing() {
    resetErrors();
    setDiscardConfirmation(false);
  }

  return (
    <>
      <Show when={!discardConfirmation()}>
        <Dialog
          title={trans(TKEYS.dashboard.offers["create-new-offer"])}
          onClose={handleCloseDialog}
        >
          <form class={styles.Form} onSubmit={handleCreateOffer}>
            <Select
              label={trans(TKEYS.price["price-type"].title)}
              value={selectedOfferType}
              options={offerTypeOptions}
              onValue={handleOfferTypeChange}
            />

            <TextField
              label={trans(TKEYS.offer.labels.name)}
              required={true}
              value={offer.name}
              onValue={handleNameInput}
              errors={errors.name}
            />

            <TextArea
              label={trans(TKEYS.offer.labels.description)}
              rows={8}
              required={false}
              value={offer.description}
              onValue={handleDescriptionInput}
              errors={errors.description}
            />

            <div class={styles.DialogFooter}>
              <ActionButton
                actionType="active-filled"
                submit
                onClick={(e) => handleCreateOffer(e)}
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
