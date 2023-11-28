import { useParams } from "@solidjs/router";
import { OfferDetail } from "../OfferDetail";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { createResource } from "solid-js";
import { DefaultBoundary } from "../../components/layout/DefaultBoundary";
import _ from "lodash";

export default function OfferDetailPage() {
  const urlParams = useParams();

  const { offerService } = useServiceClientContext();

  const [offer] = createResource(
    () => urlParams.offerId,
    async (offerId: string) => {
      const response = await offerService.get(offerId);
      return response.offer;
    }
  );

  function loaded() {
    return !_.isNil(offer());
  }

  return (
    <>
      <DefaultBoundary loaded={loaded}>
        <OfferDetail offer={offer()} />
      </DefaultBoundary>
    </>
  );
}
