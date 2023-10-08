import _ from "lodash";
import {
  AddShippingRateToOfferRequest,
  GrpcWebImpl,
  ListShippingRatesRequest,
  RemoveShippingRateFromOfferRequest,
  ShippingCountry,
  ShippingRateServiceClientImpl
} from "../peoplesmarkets/commerce/v1/shipping_rate";
import { AccessTokenGetter, ServiceClient } from "../service-client";

export class ShippingRateService extends ServiceClient {
  private readonly rpc: GrpcWebImpl;
  private readonly client: ShippingRateServiceClientImpl;

  constructor(accessToken: AccessTokenGetter) {
    super(accessToken);
    this.rpc = new GrpcWebImpl(import.meta.env.VITE_SERIVCE_APIS_URL, {});
    this.client = new ShippingRateServiceClientImpl(this.rpc);
  }

  public async addShippingRateToOffer(request: AddShippingRateToOfferRequest) {
    return this.client.AddShippingRateToOffer(
      request,
      await this.withAuthHeader()
    );
  }

  public async listShippingRates(request: ListShippingRatesRequest) {
    return this.client.ListShippingRates(request, await this.withAuthHeader());
  }

  public async removeShippingRateFromOffer(
    request: RemoveShippingRateFromOfferRequest
  ) {
    return this.client.RemoveShippingRateFromOffer(
      request,
      await this.withAuthHeader()
    );
  }
}

export function listCountryCodes(): number[] {
  return Object.values(ShippingCountry).filter(
    (c) => _.isNumber(c) && c > 0
  ) as number[];
}
