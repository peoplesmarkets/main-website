import {
  CreateMarketBoothRequest,
  GrpcWebImpl,
  ListMarketBoothsRequest,
  MarketBoothServiceClientImpl,
  MarketBoothsOrderByField,
  UpdateImageOfMarketBoothRequest,
  UpdateMarketBoothRequest,
} from "../peoplesmarkets/commerce/v1/market_booth";

import { Direction } from "../peoplesmarkets/ordering/v1/ordering";
import { AccessTokenGetter, ServiceClient } from "../service-client";

export class MarketBoothService extends ServiceClient {
  private readonly rpc: GrpcWebImpl;
  private readonly client: MarketBoothServiceClientImpl;

  constructor(accessToken: AccessTokenGetter) {
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

  public async getBySlug(slug: string) {
    return await this.client.GetShopBySlug(
      {
        slug,
      },
      await this.withAuthHeader()
    );
  }

  public async list(request: ListMarketBoothsRequest) {
    return this.client.ListMarketBooths(request, await this.withAuthHeader());
  }

  public async listDefault(request: ListMarketBoothsRequest) {
    return this.client.ListMarketBooths(
      {
        orderBy: {
          field:
            MarketBoothsOrderByField.MARKET_BOOTHS_ORDER_BY_FIELD_CREATED_AT,
          direction: Direction.DIRECTION_DESC,
        },
        ...request,
      },
      await this.withAuthHeader()
    );
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

export const SLUG_CHARS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "\\\\-",
  "\\\\+",
  "_",
  "\\\\.",
  "!",
];

export const SLUG_CHARS_REGEX = new RegExp(`[^${SLUG_CHARS.join("")}]`, "g");
