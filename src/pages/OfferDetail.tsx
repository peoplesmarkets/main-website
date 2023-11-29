import _ from "lodash";
import { Show } from "solid-js";
import { Font, Multiline } from "../components/content";
import { Section } from "../components/layout";
import { OfferBuy } from "../components/shops";
import { OfferResponse } from "../services/peoplesmarkets/commerce/v1/offer";
import styles from "./OfferDetail.module.scss";
import { OfferPrice } from "./OfferPrice";
import { OfferImages } from "./dashboard/offer-detail-configuration/OfferImages";

type Props = {
  readonly offer: OfferResponse | undefined;
};

export function OfferDetail(props: Props) {
  return (
    <>
      <div class={styles.OfferDetailView}>
        <Section class={styles.Images}>
          <Show when={!_.isEmpty(props.offer?.images)}>
            <OfferImages offer={() => props.offer} />
          </Show>
        </Section>

        <Section class={styles.Summary} padded>
          <div>
            <Font type="title">{props.offer?.name}</Font>

            <OfferPrice class={styles.Price} offer={props.offer} />

            <Show when={!_.isEmpty(props.offer?.description)}>
              <Font type="body">
                <Multiline text={props.offer?.description} />
              </Font>
            </Show>
          </div>

          <div>
            <OfferBuy offer={props.offer} />
          </div>
        </Section>
      </div>
    </>
  );
}
