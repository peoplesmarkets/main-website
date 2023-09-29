import { buildOfferUrl } from "../../routes/shops/ShopRoutes";
import {
  GrpcWebImpl,
  StripeServiceClientImpl,
} from "../peoplesmarkets/payment/v1/stripe";
import { AccessTokenGetter, ServiceClient } from "../service-client";

export class StripeService extends ServiceClient {
  private readonly rpc: GrpcWebImpl;
  private readonly client: StripeServiceClientImpl;

  constructor(accessToken: AccessTokenGetter) {
    super(accessToken);

    this.rpc = new GrpcWebImpl(import.meta.env.VITE_SERIVCE_APIS_URL, {});
    this.client = new StripeServiceClientImpl(this.rpc);
  }

  public async createAccount(shopId: string) {
    return this.client.CreateAccount(
      {
        shopId,
      },
      await this.withAuthHeader()
    );
  }

  public async createAccountLink(shopId: string, redirectUrl: string) {
    return this.client.CreateAccountLink(
      {
        shopId,
        refreshUrl: redirectUrl,
        returnUrl: redirectUrl,
      },
      await this.withAuthHeader()
    );
  }

  public async getAccount(shopId: string) {
    return this.client.GetAccount({ shopId });
  }

  public async getAccountDetails(shopId: string) {
    return this.client.GetAccountDetails(
      { shopId },
      await this.withAuthHeader()
    );
  }

  public async createCheckoutSession(shopSlug: string, offerId: string) {
    const offerUrl = buildOfferUrl(shopSlug, offerId);

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
