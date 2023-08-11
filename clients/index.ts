import { grpc } from "@improbable-eng/grpc-web";
import _ from "lodash";

import {
  AuthServiceClientImpl,
  GrpcWebImpl as ZitadelAuthServiceGrpcWebImpl,
} from "./zitadel/zitadel/auth";

export class AuthServiceClient {
  private readonly rpc: ZitadelAuthServiceGrpcWebImpl;
  public readonly client: AuthServiceClientImpl;

  constructor(token?: string | null) {
    let metadata: grpc.Metadata | undefined = undefined;

    if (!_.isEmpty(token)) {
      metadata = new grpc.Metadata();
      metadata.append("authorization", `Bearer ${token}`);
    }

    this.rpc = new ZitadelAuthServiceGrpcWebImpl(
      import.meta.env.VITE_AUTH_OAUTH_URL,
      { metadata }
    );
    this.client = new AuthServiceClientImpl(this.rpc);
  }
}
