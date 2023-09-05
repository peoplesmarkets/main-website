import { USER_STRIPE_REFRESH_PATH, USER_STRIPE_RETURN_PATH } from "../../App";
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

  public async createAccount() {
    return this.client.CreateAccount({}, await this.withAuthHeader());
  }

  public async createAccountLink() {
    return this.client.CreateAccountLink(
      {
        refreshUrl: `${
          import.meta.env.VITE_BASE_URL
        }${USER_STRIPE_REFRESH_PATH}`,
        returnUrl: `${import.meta.env.VITE_BASE_URL}${USER_STRIPE_RETURN_PATH}`,
      },
      await this.withAuthHeader()
    );
  }

  public async getAccount() {
    return this.client.GetAccount({}, await this.withAuthHeader());
  }
}
