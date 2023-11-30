import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { For, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { Font } from "../../../components/content";
import {
  ActionButton,
  Form,
  MdTextField,
  SelectKey,
} from "../../../components/form";
import { DiscardConfirmationDialog } from "../../../components/form/DiscardConfirmationDialog";
import { MdSelect, Option } from "../../../components/form/MdSelect";
import { MdSelectOption } from "../../../components/form/MdSelectOption";
import { MdDialog } from "../../../components/layout/MdDialog";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { isDifferentOmittingNilWithFilter } from "../../../lib/object-compair";
import { TKEYS } from "../../../locales";
import { listOfferTypeCodes } from "../../../services";
import {
  OfferResponse,
  UpdateOfferRequest,
} from "../../../services/peoplesmarkets/commerce/v1/offer";

type Props = {
  readonly show: boolean;
  readonly offer: OfferResponse | undefined;
  readonly onClose: () => void;
  readonly onUpdate?: () => void;
};

export function EditOfferDetailsDialog(props: Props) {
  const [trans] = useTransContext();

  const { offerService } = useServiceClientContext();

  const emptyRequest = {
    offerId: undefined as string | undefined,
    name: undefined as string | undefined,
    description: undefined as string | undefined,
    type: undefined as string | undefined,
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
    if (props.show) {
      setRequest(_.clone(_.pick(props.offer, requestFields)));
      setDiscardConfirmation(false);
      resetErrors();
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
        key: request.type,
      });
    }
  }

  function isSelectedOfferType(option: Option): boolean {
    return selectedOfferType()?.key === option.key;
  }

  function resetErrors() {
    setErrors({ name: [], description: [] });
  }

  function dataWasChanged() {
    return isDifferentOmittingNilWithFilter(
      props.offer,
      request,
      requestFields
    );
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
    if (_.isNumber(value)) {
      setRequest("type", value);
    }
  }

  async function handleUpdateOffer(event: SubmitEvent) {
    event.preventDefault();

    if (!dataWasChanged()) {
      handleConfirmCloseDialog();
      return;
    }

    try {
      await offerService.update(request);

      handleConfirmCloseDialog();
      props.onUpdate?.();
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.AlreadyExists) {
        setErrors("name", [trans(TKEYS.form.errors["already-exists"])]);
      } else {
        throw err;
      }
    }
  }

  function handleCloseDialog() {
    if (props.show && dataWasChanged()) {
      setDiscardConfirmation(true);
    } else {
      handleConfirmCloseDialog();
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
      <MdDialog
        open={props.show && !discardConfirmation()}
        onClose={handleCloseDialog}
      >
        <div slot="headline">
          <Font type="title" key={TKEYS.dashboard.offers["edit-offer"]} />
        </div>

        <div slot="content">
          <Form onSubmit={handleUpdateOffer}>
            <MdSelect
              type="outlined"
              label={trans(TKEYS.price["price-type"].title)}
              onChange={handleOfferTypeChange}
            >
              <For each={offerTypeOptions()}>
                {(option) => (
                  <MdSelectOption
                    selected={isSelectedOfferType(option)}
                    value={option.key}
                  >
                    <div slot="headline">{option.name}</div>
                  </MdSelectOption>
                )}
              </For>
            </MdSelect>

            <MdTextField
              label={trans(TKEYS.offer.labels.name)}
              required
              value={request.name}
              onValue={handleNameInput}
              error={!_.isEmpty(errors.name)}
              errorText={errors.name}
            />

            <MdTextField
              type="textarea"
              rows={6}
              label={trans(TKEYS.offer.labels.description)}
              value={request.description}
              onValue={handleDescriptionInput}
              error={!_.isEmpty(errors.description)}
              errorText={errors.description}
            />
          </Form>
        </div>

        <div slot="actions">
          <ActionButton
            actionType="neutral-borderless"
            onClick={handleCloseDialog}
          >
            <Trans key={TKEYS.form.action.Close} />
          </ActionButton>

          <ActionButton
            actionType="active-filled"
            submit
            onClick={handleUpdateOffer}
          >
            <Trans key={TKEYS.form.action.Save} />
          </ActionButton>
        </div>
      </MdDialog>

      <DiscardConfirmationDialog
        show={discardConfirmation()}
        onCancel={handleContinueEditing}
        onDiscard={handleConfirmCloseDialog}
      />
    </>
  );
}
