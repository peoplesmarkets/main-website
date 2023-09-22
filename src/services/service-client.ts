import { AxiosRequestConfig } from "axios";
import { grpc } from "@improbable-eng/grpc-web";
import _ from "lodash";

export type AccessTokenGetter = () => Promise<string | null>;

export interface WithAuthHeader {
  accessToken?: AccessTokenGetter;

  withAuthHeader(): Promise<grpc.Metadata | AxiosRequestConfig | undefined>;
}

export class ServiceClient implements WithAuthHeader {
  accessToken?: AccessTokenGetter;

  constructor(accessToken: AccessTokenGetter) {
    this.accessToken = accessToken;
  }

  public async withAuthHeader(): Promise<grpc.Metadata | undefined> {
    const token = await this.accessToken?.();
    if (!_.isNil(token)) {
      return new grpc.Metadata({
        authorization: `Bearer ${token}`,
      });
    }
  }
}
