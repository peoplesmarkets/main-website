import _ from "lodash";

import {
  AddImageToOfferRequest,
  CreateOfferRequest,
  GrpcWebImpl,
  ListOffersRequest,
  OfferServiceClientImpl,
  OfferType,
  PutPriceToOfferRequest,
  RemovePriceFromOfferRequest,
  UpdateOfferRequest,
  offerTypeToJSON,
} from "../peoplesmarkets/commerce/v1/offer";
import {
  Currency,
  PriceType,
  RecurringInterval,
  currencyToJSON,
  priceTypeToJSON,
  recurringIntervalToJSON,
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

  public async putPrice(request: PutPriceToOfferRequest) {
    return this.client.PutPriceToOffer(request, await this.withAuthHeader());
  }

  public async removePrice(request: RemovePriceFromOfferRequest) {
    return this.client.RemovePriceFromOffer(
      request,
      await this.withAuthHeader()
    );
  }
}

export function listOfferTypeCodes(): string[] {
  return Object.values(OfferType)
    .filter((t) => _.isNumber(t) && t > 0)
    .map((t) => offerTypeToJSON(t as OfferType));
}

export function listCurrencyCodes(): string[] {
  return Object.values(Currency)
    .filter((c) => _.isNumber(c) && c > 0)
    .map((c) => currencyToJSON(c as Currency));
}

export function listPriceTypeCodes(): string[] {
  return Object.values(PriceType)
    .filter((t) => _.isNumber(t) && t > 0)
    .map((t) => priceTypeToJSON(t as PriceType));
}

export function listRecurringIntervalCodes(): string[] {
  return Object.values(RecurringInterval)
    .filter((i) => _.isNumber(i) && i > 0)
    .map((i) => recurringIntervalToJSON(i as RecurringInterval));
}
