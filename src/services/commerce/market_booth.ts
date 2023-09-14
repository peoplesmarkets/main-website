import {
  CreateMarketBoothRequest,
  GrpcWebImpl,
  ListMarketBoothsRequest,
  MarketBoothServiceClientImpl,
  MarketBoothsOrderByField,
  UpdateImageOfMarketBoothRequest,
  UpdateMarketBoothRequest,
} from "../peoplesmarkets/commerce/v1/market_booth";

import { AccessTokenGetter, ServiceClient } from "../service-client";
import { Direction } from "../peoplesmarkets/ordering/v1/ordering";

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

  public async list(request: ListMarketBoothsRequest) {
    return this.client.ListMarketBooths(request, await this.withAuthHeader());
  }

  public async listDefault(request: ListMarketBoothsRequest) {
    return this.client.ListMarketBooths({
      orderBy: {
        field: MarketBoothsOrderByField.MARKET_BOOTHS_ORDER_BY_FIELD_CREATED_AT,
        direction: Direction.DIRECTION_DESC,
      },
      ...request,
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

  public async updateImage(request: UpdateImageOfMarketBoothRequest) {
    return this.client.UpdateImageOfMarketBooth(
      request,
      await this.withAuthHeader()
    );
  }

  public async removeImage(marketBoothId: string) {
    return this.client.RemoveImageFromMarketBooth(
      { marketBoothId },
      await this.withAuthHeader()
    );
  }
}
