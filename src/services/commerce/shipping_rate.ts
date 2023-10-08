import _ from "lodash";
import {
  PutShippingRateRequest,
  GrpcWebImpl,
  ShippingCountry,
  ShippingRateServiceClientImpl,
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

  public async putShippingRate(request: PutShippingRateRequest) {
    return this.client.PutShippingRate(request, await this.withAuthHeader());
  }

  public async getShippingRate(offerId: string) {
    return this.client.GetShippingRate(
      { offerId },
      await this.withAuthHeader()
    );
  }

  public async deleteShippingRate(shippingRateId: string) {
    return this.client.DeleteShippingRate(
      {
        shippingRateId,
      },
      await this.withAuthHeader()
    );
  }
}

export function listCountryCodes(): number[] {
  return Object.values(ShippingCountry).filter(
    (c) => _.isNumber(c) && c > 0
  ) as number[];
}
