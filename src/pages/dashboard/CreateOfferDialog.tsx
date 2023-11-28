import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { createStore } from "solid-js/store";

import { grpc } from "@improbable-eng/grpc-web";
import _ from "lodash";
import { Show, createEffect } from "solid-js";
import { Font } from "../../components/content";
import { MdButton, MdTextField } from "../../components/form";
import { MdDialog } from "../../components/layout/MdDialog";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { TKEYS } from "../../locales";
import {
  CreateOfferRequest,
  OfferType,
} from "../../services/peoplesmarkets/commerce/v1/offer";
import { ShopResponse } from "../../services/peoplesmarkets/commerce/v1/shop";
import { useNavigate } from "@solidjs/router";
import { buildOfferDetailConfigurationPath } from "../../routes/main/main-routing";

type Props = {
  readonly shop: ShopResponse | undefined;
  readonly show: boolean;
  readonly first?: boolean | undefined;
  readonly onUpdate: () => void;
  readonly onClose: () => void;
};

export function CreateOfferDialog(props: Props) {
  const navigate = useNavigate();

  const [trans] = useTransContext();

  const { offerService } = useServiceClientContext();

  const emptyRequest = {
    shopId: undefined as string | undefined,
    name: undefined as string | undefined,
    type: OfferType.OFFER_TYPE_PHYSICAL,
  } as CreateOfferRequest;

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [errors, setErrors] = createStore({
    name: [] as string[],
    description: [] as string[],
  });

  createEffect(() => {
    const shopId = props.shop?.shopId;
    if (_.isNil(request.shopId) && !_.isNil(shopId)) {
      setRequest("shopId", shopId);
    }
  });

  function resetErrors() {
    setErrors({ name: [], description: [] });
  }

  function handleNameInput(value: string) {
    resetErrors();
    setRequest("name", value);
  }

  async function handleCreateOffer(event: SubmitEvent) {
    event.preventDefault();

    if (_.isEmpty(request.name)) {
      setErrors("name", [trans(TKEYS.form.errors["required-field"])]);
      return;
    }

    try {
      const response = await offerService.create(request);
      handleClose();

      if (!_.isNil(props.shop) && !_.isNil(response.offer)) {
        navigate(
          buildOfferDetailConfigurationPath(
            props.shop.shopId,
            response.offer.offerId
          )
        );
      }
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.AlreadyExists) {
        setErrors("name", trans(TKEYS.form.errors["already-exists"]));
      } else {
        throw err;
      }
    }
  }

  function handleClose() {
    props.onClose();
    setRequest(_.clone(emptyRequest));
  }

  return (
    <>
      <MdDialog open={props.show} onClose={handleClose}>
        <div slot="headline">
          <Show
            when={props.first}
            fallback={
              <Font
                type="title"
                key={TKEYS.dashboard.offers["name-your-offer"]}
              />
            }
          >
            <Font
              type="title"
              key={TKEYS.dashboard.offers["create-your-first-offer"]}
            />
          </Show>
        </div>

        <div slot="content">
          <form onSubmit={handleCreateOffer}>
            <MdTextField
              type="text"
              value={request.name}
              required
              label={trans(TKEYS.shop.labels.name)}
              onValue={handleNameInput}
              error={!_.isEmpty(errors.name)}
              errorText={errors.name}
            />
          </form>
        </div>

        <div slot="actions">
          <MdButton onClick={handleClose} type="text">
            <Trans key={TKEYS.form.action.Close} />
          </MdButton>

          <MdButton submit onClick={handleCreateOffer}>
            <Trans key={TKEYS.form.action.Save} />
          </MdButton>
        </div>
      </MdDialog>
    </>
  );
}
