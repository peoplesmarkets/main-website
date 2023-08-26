import {
  CreateOfferRequest,
  GrpcWebImpl,
  OfferServiceClientImpl,
  OffersFilterField,
  UpdateOfferRequest,
} from "../peoplesmarkets/commerce/v1/offer";

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

  public async list(userId?: string | null, marketBoothId?: string | null) {
    return this.client.ListOffers(
      {
        userId: userId || undefined,
        marketBoothId: marketBoothId || undefined,
      },
      await this.withAuthHeader()
    );
  }

  public async search(query?: string) {
    return this.client.ListOffers({
      filter: {
        field: OffersFilterField.OFFERS_FILTER_FIELD_NAME_AND_DESCRIPTION,
        query,
      },
    });
  }

  public async update(request: UpdateOfferRequest) {
    return this.client.UpdateOffer(request, await this.withAuthHeader());
  }

  public async delete(offerId: string) {
    return this.client.DeleteOffer({ offerId }, await this.withAuthHeader());
  }
}
