import _ from "lodash";
import { Context, ParentProps, createContext, useContext } from "solid-js";
import { useAccessTokensContext } from "./AccessTokensContext";
import {
  MediaService,
  MediaSubscriptionService,
  OfferService,
  ShippingRateService,
  ShopCustomizationService,
  ShopDomainService,
  ShopService,
  StripeService,
} from "../services";
import { ReportService } from "../services/report/report";

type ServiceClientContextType = ReturnType<typeof initialize>;

const ServiceClientContext: Context<ServiceClientContextType> = createContext(
  initialize()
);

export function ServiceClientProvider(props: ParentProps) {
  return (
    <ServiceClientContext.Provider value={useContext(ServiceClientContext)}>
      {props.children}
    </ServiceClientContext.Provider>
  );
}

export function useServiceClientContext() {
  if (_.isNil(ServiceClientContext)) {
    throw new Error("Must be wrapped in <ServiceClientContext>");
  }

  return useContext(ServiceClientContext);
}

function initialize() {
  const { accessToken } = useAccessTokensContext();

  return {
    shopService: new ShopService(accessToken),
    shopCustomizationService: new ShopCustomizationService(accessToken),
    shopDomainService: new ShopDomainService(accessToken),
    offerService: new OfferService(accessToken),
    shippingRateService: new ShippingRateService(accessToken),
    mediaService: new MediaService(accessToken),
    mediaSubscriptionService: new MediaSubscriptionService(accessToken),
    stripeService: new StripeService(accessToken),
    reportService: new ReportService(accessToken),
  };
}
