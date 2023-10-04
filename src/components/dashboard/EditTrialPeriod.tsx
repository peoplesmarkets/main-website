import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales";
import { OfferService } from "../../services";
import {
  OfferResponse,
  PutPriceToOfferRequest,
} from "../../services/peoplesmarkets/commerce/v1/offer";
import {
  Price,
  Recurring,
} from "../../services/peoplesmarkets/commerce/v1/price";
import { ActionButton } from "../form";
import { NumberField } from "../form/NumberField";
import { Dialog } from "../layout";
import styles from "./CreateEditDialg.module.scss";

type Props = {
  readonly offer: () => OfferResponse;
  readonly onClose: () => void;
  readonly onUpdate?: () => void;
};

export function EditTrialPeriodDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const emptyRequest = {
    offerId: undefined as string | undefined,
    price: undefined as Price | undefined,
  } as PutPriceToOfferRequest;

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [errors] = createStore({
    trialPeriod: [] as string[],
  });

  const [showDiscardConfirmation, setShowDiscardConfirmation] =
    createSignal(false);

  createEffect(() => {
    if (_.isNil(request.offerId) || _.isEmpty(request.offerId)) {
      setRequest(_.clone(props.offer()));
    }
  });

  async function handleUpdateOfferPrice(event: SubmitEvent) {
    event.preventDefault();

    await offerService.putPrice(request);
    props.onUpdate?.();
    props.onClose();
  }

  function handleTrialPeriodInput(value: number) {
    setRequest("price", {
      ...request.price,
      recurring: {
        ...request.price?.recurring,
        trialPeriodDays: value,
      } as Recurring,
    });
  }

  function handleCloseDialog() {
    if (!_.isEqual(props.offer().price, request.price)) {
      setShowDiscardConfirmation(true);
    } else {
      props.onClose();
    }
  }

  return (
    <>
      <Show when={!showDiscardConfirmation()}>
        <Dialog
          title={trans(TKEYS.price["trial-period"])}
          onClose={handleCloseDialog}
        >
          <form class={styles.Form} onSubmit={handleUpdateOfferPrice}>
            <div class={styles.FieldSetSmall}>
              <NumberField
                label={trans(TKEYS.price["trial-period"])}
                value={request.price?.recurring?.trialPeriodDays}
                onValue={handleTrialPeriodInput}
                errors={errors.trialPeriod}
                integer
                small
              />
              <Trans
                key={TKEYS.price["days-free"]}
                options={{ periodDays: 2 }}
              />
            </div>

            <div class={styles.DialogFooter}>
              <ActionButton
                actionType="active-filled"
                submit
                onClick={handleUpdateOfferPrice}
              >
                <Trans key={TKEYS.form.action.Save} />
              </ActionButton>
            </div>
          </form>
        </Dialog>
      </Show>
    </>
  );
}
