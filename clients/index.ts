import {
  MarketBoothServiceClientImpl,
  GrpcWebImpl as MarketBoothServiceGrpcWebImpl,
} from "./peoplesmarkets/commerce/v1/market_booth";

import {
  AccessTokenGetter,
  ServiceClient,
} from "@peoplesmarkets/frontend-lib";

export class MarketBoothServiceClient extends ServiceClient {
  private readonly rpc: MarketBoothServiceGrpcWebImpl;
  public readonly client: MarketBoothServiceClientImpl;

  constructor(accessToken?: AccessTokenGetter) {
    super(accessToken);

    this.rpc = new MarketBoothServiceGrpcWebImpl(
      import.meta.env.VITE_SERIVCE_APIS_URL,
      {}
    );
    this.client = new MarketBoothServiceClientImpl(this.rpc);
  }
}
