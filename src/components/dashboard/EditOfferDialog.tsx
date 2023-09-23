import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales/dev";
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

type Props = {
  readonly offer: () => OfferResponse;
  readonly onClose: () => void;
  readonly onUpdate?: () => void;
};

export function EditOfferDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const [offer, setOffer] = createStore<UpdateOfferRequest>(
    UpdateOfferRequest.create()
  );

  const [errors, setErrors] = createStore({
    name: [] as string[],
    description: [] as string[],
  });

  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  createEffect(() => {
    if (_.isNil(offer.offerId) || _.isEmpty(offer.offerId)) {
      setOffer(_.clone(props.offer()));
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

  function visibilityOptions() {
    return [
      { name: trans(TKEYS.offer.visibility.visible), key: true },
      { name: trans(TKEYS.offer.visibility["not-visible"]), key: false },
    ];
  }

  function selectedVisibility() {
    return _.find(visibilityOptions(), {
      key: offer.isActive,
    });
  }

  function featuredOptions() {
    return [
      { name: trans(TKEYS.offer["is-featured"].featured), key: true },
      { name: trans(TKEYS.offer["is-featured"]["not-featured"]), key: false },
    ];
  }

  function selectedFeatured() {
    return _.find(featuredOptions(), { key: offer.isFeatured });
  }

  function resetErrors() {
    setErrors({ name: [], description: [] });
  }

  function dataWasChanged() {
    return !_.isEqual(props.offer(), offer);
  }

  function handleNameInput(value: string) {
    resetErrors();
    setOffer("name", value.trim());
  }

  function handleDescriptionInput(value: string) {
    resetErrors();
    setOffer("description", value.trim());
  }

  function handleOfferTypeChange(value: SelectKey) {
    if (_.isString(value)) {
      setOffer("type", offerTypeFromJSON(value));
    }
  }

  function handleVisibilityChange(value: SelectKey) {
    if (_.isBoolean(value)) {
      setOffer("isActive", value);
    }
  }

  function handleFeaturedChange(value: SelectKey) {
    if (_.isBoolean(value)) {
      setOffer("isFeatured", value);
    }
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
            <Select
              label={trans(TKEYS.price["price-type"].title)}
              value={selectedOfferType}
              options={offerTypeOptions}
              onValue={handleOfferTypeChange}
            />

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

            <Select
              label={trans(TKEYS.offer.visibility.title)}
              value={selectedVisibility}
              options={visibilityOptions}
              onValue={handleVisibilityChange}
            />

            <Select
              label={trans(TKEYS.offer["is-featured"].title)}
              value={selectedFeatured}
              options={featuredOptions}
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
