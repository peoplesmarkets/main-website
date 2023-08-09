import _ from "lodash";
import { grpc } from "@improbable-eng/grpc-web";

import {
  AuthServiceClientImpl,
  GrpcWebImpl as ZitadelAuthServiceGrpcWebImpl,
} from "./zitadel/zitadel/auth";
import {
  ShopServiceClientImpl,
  GrpcWebImpl as ShopServiceGrpcWebImpl,
} from "./peoplesmarkets/commerce/v1/shop";

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

export class ShopServiceClient extends ServiceClient {
  private readonly rpc: ShopServiceGrpcWebImpl;
  public readonly client: ShopServiceClientImpl;

  constructor(accessToken?: AccessTokenGetter) {
    super(accessToken);

    this.rpc = new ShopServiceGrpcWebImpl(
      import.meta.env.VITE_SERIVCE_APIS_URL,
      {}
    );
    this.client = new ShopServiceClientImpl(this.rpc);
  }
}
