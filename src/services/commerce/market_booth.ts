import {
  CreateMarketBoothRequest,
  GrpcWebImpl,
  MarketBoothServiceClientImpl,
  MarketBoothsFilterField,
  UpdateMarketBoothRequest,
} from "../peoplesmarkets/commerce/v1/market_booth";

import { AccessTokenGetter, ServiceClient } from "..";

export class MarketBoothService extends ServiceClient {
  private readonly rpc: GrpcWebImpl;
  private readonly client: MarketBoothServiceClientImpl;

  constructor(accessToken?: AccessTokenGetter) {
    super(accessToken);

    this.rpc = new GrpcWebImpl(import.meta.env.VITE_SERIVCE_APIS_URL, {});
    this.client = new MarketBoothServiceClientImpl(this.rpc);
  }

  public async create(request: CreateMarketBoothRequest) {
    return this.client.CreateMarketBooth(request, await this.withAuthHeader());
  }

  public async get(marketBoothId: string) {
    return this.client.GetMarketBooth(
      { marketBoothId },
      await this.withAuthHeader()
    );
  }

  public async list(userId?: string | null) {
    return this.client.ListMarketBooths(
      { userId: userId || undefined },
      await this.withAuthHeader()
    );
  }

  public async search(query?: string) {
    return this.client.ListMarketBooths({
      filter: {
        field:
          MarketBoothsFilterField.MARKET_BOOTHS_FILTER_FIELD_NAME_AND_DESCRIPTION,
        query,
      },
    });
  }

  public async searchByName(query?: string) {
    return this.client.ListMarketBooths({
      filter: {
        field: MarketBoothsFilterField.MARKET_BOOTHS_FILTER_FIELD_NAME,
        query,
      },
    });
  }

  public async update(request: UpdateMarketBoothRequest) {
    return this.client.UpdateMarketBooth(request, await this.withAuthHeader());
  }

  public async delete(marketBoothId: string) {
    return this.client.DeleteMarketBooth(
      { marketBoothId },
      await this.withAuthHeader()
    );
  }
}
