import {
  CreateShopRequest,
  GrpcWebImpl,
  ListShopsRequest,
  ShopServiceClientImpl,
  ShopsOrderByField,
  UpdateShopRequest,
} from "../peoplesmarkets/commerce/v1/shop";

import { Direction } from "../peoplesmarkets/ordering/v1/ordering";
import { AccessTokenGetter, ServiceClient } from "../service-client";

export class ShopService extends ServiceClient {
  private readonly rpc: GrpcWebImpl;
  private readonly client: ShopServiceClientImpl;

  constructor(accessToken: AccessTokenGetter) {
    super(accessToken);

    this.rpc = new GrpcWebImpl(import.meta.env.VITE_SERIVCE_APIS_URL, {});
    this.client = new ShopServiceClientImpl(this.rpc);
  }

  public async create(request: CreateShopRequest) {
    return this.client.CreateShop(request, await this.withAuthHeader());
  }

  public async get(shopId: string) {
    return this.client.GetShop({ shopId }, await this.withAuthHeader());
  }

  public async getBySlug(slug: string) {
    return this.client.GetShopBySlug({ slug }, await this.withAuthHeader());
  }

  public async getByDomain(domain: string) {
    return this.client.GetShopByDomain({ domain }, await this.withAuthHeader());
  }

  public async list(request: ListShopsRequest) {
    return this.client.ListShops(request, await this.withAuthHeader());
  }

  public async listDefault(request: ListShopsRequest) {
    return this.client.ListShops(
      {
        orderBy: {
          field: ShopsOrderByField.SHOPS_ORDER_BY_FIELD_CREATED_AT,
          direction: Direction.DIRECTION_DESC,
        },
        ...request,
      },
      await this.withAuthHeader()
    );
  }

  public async update(request: UpdateShopRequest) {
    return this.client.UpdateShop(request, await this.withAuthHeader());
  }

  public async delete(shopId: string) {
    return this.client.DeleteShop({ shopId }, await this.withAuthHeader());
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
