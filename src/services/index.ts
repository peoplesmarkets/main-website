import { AxiosRequestConfig } from "axios";
import { grpc } from "@improbable-eng/grpc-web";

import {
  CreateMarketBoothRequest,
  MarketBoothServiceClientImpl,
  GrpcWebImpl as MarketBoothServiceGrpcWebImpl,
  UpdateMarketBoothRequest,
} from "./peoplesmarkets/commerce/v1/market_booth";

export type AccessTokenGetter = () => Promise<string | null>;

export interface WithAuthHeader {
  accessToken?: AccessTokenGetter;

  withAuthHeader(): Promise<grpc.Metadata | AxiosRequestConfig | undefined>;
}

export class ServiceClient implements WithAuthHeader {
  accessToken?: AccessTokenGetter;

  constructor(accessToken?: AccessTokenGetter) {
    this.accessToken = accessToken;
  }

  public async withAuthHeader(): Promise<grpc.Metadata | undefined> {
    if (this.accessToken) {
      return new grpc.Metadata({
        authorization: `Bearer ${await this.accessToken()}`,
      });
    }
  }
}

export class MarketBoothService extends ServiceClient {
  private readonly rpc: MarketBoothServiceGrpcWebImpl;
  private readonly client: MarketBoothServiceClientImpl;

  constructor(accessToken?: AccessTokenGetter) {
    super(accessToken);

    this.rpc = new MarketBoothServiceGrpcWebImpl(
      import.meta.env.VITE_SERIVCE_APIS_URL,
      {}
    );
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
