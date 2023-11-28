import { For, Show } from "solid-js";
import { Border } from "../../components/layout";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import { OfferDetail } from "../OfferDetail";
// import styles from "./ShopLayoutFead.module.scss";

type Props = {
  readonly offers: OfferResponse[] | undefined;
};

export function ShopLayoutFead(props: Props) {
  function isLastItem(index: number) {
    return index + 1 === props.offers?.length;
  }

  return (
    <>
      <For each={props.offers}>
        {(offer, index) => (
          <div data-index={index()}>
            <OfferDetail offer={offer} />

            <Show when={!isLastItem(index())}>
              <Border />
            </Show>
          </div>
        )}
      </For>
    </>
  );
}
