import { OFFERS_PATH } from "../../App";
import { buildPath } from "../../lib";
import {
  GrpcWebImpl,
  StripeServiceClientImpl,
} from "../peoplesmarkets/payment/v1/stripe";
import { AccessTokenGetter, ServiceClient } from "../service-client";

export class StripeService extends ServiceClient {
  private readonly rpc: GrpcWebImpl;
  private readonly client: StripeServiceClientImpl;

  constructor(accessToken?: AccessTokenGetter) {
    super(accessToken);

    this.rpc = new GrpcWebImpl(import.meta.env.VITE_SERIVCE_APIS_URL, {});
    this.client = new StripeServiceClientImpl(this.rpc);
  }

  public async createAccount(marketBoothId: string) {
    return this.client.CreateAccount(
      {
        marketBoothId,
      },
      await this.withAuthHeader()
    );
  }

  public async createAccountLink(marketBoothId: string, redirectUrl: string) {
    return this.client.CreateAccountLink(
      {
        marketBoothId,
        refreshUrl: redirectUrl,
        returnUrl: redirectUrl,
      },
      await this.withAuthHeader()
    );
  }

  public async getAccount(marketBoothId: string) {
    return this.client.GetAccount({ marketBoothId });
  }

  public async getAccountDetails(marketBoothId: string) {
    return this.client.GetAccountDetails(
      { marketBoothId },
      await this.withAuthHeader()
    );
  }

  public async createCheckoutSession(offerId: string) {
    const offerUrl = `${import.meta.env.VITE_BASE_URL}${buildPath(
      OFFERS_PATH,
      offerId
    )}`;

    return this.client.CreateCheckoutSession(
      {
        offerId,
        successUrl: offerUrl,
        cancelUrl: offerUrl,
      },
      await this.withAuthHeader()
    );
  }
}
