import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { AccessTokenGetter, WithAuthHeader } from ".";

export enum SessionState {
  SESSION_STATE_UNSPECIFIED = 0,
  SESSION_STATE_ACTIVE = 1,
  SESSION_STATE_TERMINATED = 2,
  UNRECOGNIZED = -1,
}

export interface ObjectDetails {
  sequence: number;
  creationDate: Date | undefined;
  changeDate: Date | undefined;
  resourceOwner: string;
}

export interface ZitadelSession {
  sessionId: string;
  agentId: string;
  authState: SessionState;
  userId: string;
  userName: string;
  loginName: string;
  displayName: string;
  details: ObjectDetails | undefined;
  avatarUrl: string;
}

export interface ListMyUserSessionsResponse {
  result: ZitadelSession[];
}

export class AuthServiceClient implements WithAuthHeader {
  accessToken?: AccessTokenGetter;
  public readonly client: AxiosInstance;

  constructor(accessToken?: AccessTokenGetter) {
    this.accessToken = accessToken;

    this.client = axios.create({
      baseURL: import.meta.env.VITE_AUTH_OAUTH_URL,
    });
  }

  public async withAuthHeader(): Promise<AxiosRequestConfig | undefined> {
    if (this.accessToken) {
      return {
        headers: {
          authorization: `Bearer ${await this.accessToken()}`,
        },
      };
    }
  }

  public async listMyUserSessions(
    config?: AxiosRequestConfig
  ): Promise<ListMyUserSessionsResponse> {
    const res: AxiosResponse<ListMyUserSessionsResponse> =
      await this.client.post("/auth/v1/users/me/sessions/_search", {}, config);

    return res.data;
  }
}
