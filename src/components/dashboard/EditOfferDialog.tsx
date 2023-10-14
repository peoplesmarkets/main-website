import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales";
import { OfferService, listOfferTypeCodes } from "../../services";
import {
  OfferResponse,
  UpdateOfferRequest,
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
import { CheckBox } from "../form/CheckBox";

type Props = {
  readonly offer: () => OfferResponse;
  readonly onClose: () => void;
  readonly onUpdate?: () => void;
};

export function EditOfferDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const emptyRequest = {
    offerId: undefined as string | undefined,
    name: undefined as string | undefined,
    description: undefined as string | undefined,
    type: undefined as string | undefined,
    isActive: undefined as boolean | undefined,
    isFeatured: undefined as boolean | undefined,
  } as UpdateOfferRequest;

  const requestFields = Object.keys(emptyRequest);

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [errors, setErrors] = createStore({
    name: [] as string[],
    description: [] as string[],
  });

  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  createEffect(() => {
    if (_.isNil(request.offerId) || _.isEmpty(request.offerId)) {
      setRequest(_.clone(_.pick(props.offer(), requestFields)));
    }
  });

  function offerTypeOptions() {
    return listOfferTypeCodes().map((c) => ({
      name: trans(TKEYS.offer.types[c]),
      key: c,
    }));
  }

  function selectedOfferType() {
    if (!_.isNil(request.type)) {
      return _.find(offerTypeOptions(), {
        key: offerTypeToJSON(request.type),
      });
    }
  }

  function resetErrors() {
    setErrors({ name: [], description: [] });
  }

  function dataWasChanged() {
    return !_.isEqual(_.pick(props.offer(), requestFields), request);
  }

  function handleNameInput(value: string) {
    resetErrors();
    setRequest("name", value.trim());
  }

  function handleDescriptionInput(value: string) {
    resetErrors();
    setRequest("description", value.trim());
  }

  function handleOfferTypeChange(value: SelectKey) {
    if (_.isString(value)) {
      setRequest("type", offerTypeFromJSON(value));
    }
  }

  function handleVisibilityChange(value: SelectKey) {
    if (_.isBoolean(value)) {
      setRequest("isActive", value);
    }
  }

  function handleFeaturedChange(value: SelectKey) {
    if (_.isBoolean(value)) {
      setRequest("isFeatured", value);
    }
  }

  async function handleUpdateOffer(event: SubmitEvent) {
    event.preventDefault();

    if (!dataWasChanged()) {
      props.onClose();
      return;
    }

    try {
      await offerService.update(request);

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
            <Select
              label={trans(TKEYS.price["price-type"].title)}
              value={selectedOfferType}
              options={offerTypeOptions}
              onValue={handleOfferTypeChange}
            />

            <TextField
              label={trans(TKEYS.offer.labels.name)}
              required
              value={request.name}
              onValue={handleNameInput}
              errors={errors.name}
            />

            <TextArea
              label={trans(TKEYS.offer.labels.description)}
              rows={8}
              value={request.description}
              onValue={handleDescriptionInput}
              errors={errors.description}
            />

            <CheckBox
              label={trans(TKEYS.offer.labels["is-publicly-visible"])}
              value={request.isActive}
              onValue={handleVisibilityChange}
            />

            <CheckBox
              label={trans(TKEYS.offer.labels["show-on-home-page"])}
              value={request.isFeatured}
              onValue={handleFeaturedChange}
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
