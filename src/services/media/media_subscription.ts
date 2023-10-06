import {
  CancelMediaSubscriptionRequest,
  GetMediaSubscriptionRequest,
  GrpcWebImpl,
  ListMediaSubscriptionsRequest,
  MediaSubscriptionServiceClientImpl,
  ResumeMediaSubscriptionRequest,
} from "../peoplesmarkets/media/v1/media_subscription";
import { AccessTokenGetter, ServiceClient } from "../service-client";

export class MediaSubscriptionService extends ServiceClient {
  private readonly rpc: GrpcWebImpl;
  private readonly client: MediaSubscriptionServiceClientImpl;

  constructor(accessToken: AccessTokenGetter) {
    super(accessToken);

    this.rpc = new GrpcWebImpl(import.meta.env.VITE_SERIVCE_APIS_URL, {});
    this.client = new MediaSubscriptionServiceClientImpl(this.rpc);
  }

  public async get(request: GetMediaSubscriptionRequest) {
    return this.client.GetMediaSubscription(
      request,
      await this.withAuthHeader()
    );
  }

  public async list(request: ListMediaSubscriptionsRequest) {
    return this.client.ListMediaSubscriptions(
      request,
      await this.withAuthHeader()
    );
  }

  public async cancel(request: CancelMediaSubscriptionRequest) {
    return this.client.CancelMediaSubscription(
      request,
      await this.withAuthHeader()
    );
  }

  public async resume(request: ResumeMediaSubscriptionRequest) {
    return this.client.ResumeMediaSubscription(
      request,
      await this.withAuthHeader()
    );
  }
}
