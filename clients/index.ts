import _ from "lodash";
import { grpc } from "@improbable-eng/grpc-web";

import {
  AuthServiceClientImpl,
  GrpcWebImpl as ZitadelAuthServiceGrpcWebImpl,
} from "./zitadel/zitadel/auth";
import {
  MarketBoothServiceClientImpl,
  GrpcWebImpl as MarketBoothServiceGrpcWebImpl,
} from "./peoplesmarkets/commerce/v1/market_booth";

type AccessTokenGetter = () => Promise<string | null>;

class ServiceClient {
  private accessToken?: AccessTokenGetter;
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

export class AuthServiceClient extends ServiceClient {
  private readonly rpc: ZitadelAuthServiceGrpcWebImpl;
  public readonly client: AuthServiceClientImpl;

  constructor(accessToken?: AccessTokenGetter) {
    super(accessToken);

    this.rpc = new ZitadelAuthServiceGrpcWebImpl(
      import.meta.env.VITE_AUTH_OAUTH_URL,
      {}
    );
    this.client = new AuthServiceClientImpl(this.rpc);
  }
}

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
