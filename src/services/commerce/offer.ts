import _ from "lodash";
import {
  AddImageToOfferRequest,
  CreateOfferRequest,
  GrpcWebImpl,
  ListOffersRequest,
  OfferServiceClientImpl,
  OffersFilterField,
  UpdateOfferRequest,
} from "../peoplesmarkets/commerce/v1/offer";
import {
  Currency,
  currencyFromJSON,
  currencyToJSON,
} from "../peoplesmarkets/commerce/v1/price";

import { AccessTokenGetter, ServiceClient } from "../service-client";

export class OfferService extends ServiceClient {
  private readonly rpc: GrpcWebImpl;
  private readonly client: OfferServiceClientImpl;

  constructor(accessToken?: AccessTokenGetter) {
    super(accessToken);

    this.rpc = new GrpcWebImpl(import.meta.env.VITE_SERIVCE_APIS_URL, {});
    this.client = new OfferServiceClientImpl(this.rpc);
  }

  public async create(request: CreateOfferRequest) {
    return this.client.CreateOffer(request, await this.withAuthHeader());
  }

  public async get(offerId: string) {
    return this.client.GetOffer({ offerId }, await this.withAuthHeader());
  }

  public async list(request: ListOffersRequest) {
    return this.client.ListOffers(request, await this.withAuthHeader());
  }

  public async update(request: UpdateOfferRequest) {
    return this.client.UpdateOffer(request, await this.withAuthHeader());
  }

  public async delete(offerId: string) {
    return this.client.DeleteOffer({ offerId }, await this.withAuthHeader());
  }

  public async addImage(request: AddImageToOfferRequest) {
    return this.client.AddImageToOffer(request, await this.withAuthHeader());
  }

  public async removeImage(offerImageId: string) {
    return this.client.RemoveImageFromOffer(
      { offerImageId },
      await this.withAuthHeader()
    );
  }
}

export function listCurrencyCodes(): string[] {
  return Object.values(Currency)
    .filter((c) => _.isNumber(c) && c > 0)
    .map((c) => getCurrencyCode(c as Currency));
}

export function getCurrencyCode(currency: Currency): string {
  if (currency < 1) {
    return "";
  }

  return currencyToJSON(currency).replace("CURRENCY_", "");
}

export function getCurrencyFromCode(code: string): Currency {
  return currencyFromJSON("CURRENCY_" + code);
}
