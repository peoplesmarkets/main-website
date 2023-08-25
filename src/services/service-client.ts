import { AxiosRequestConfig } from "axios";
import { grpc } from "@improbable-eng/grpc-web";

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
