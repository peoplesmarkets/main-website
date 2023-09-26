import {
  AddDomainToShopRequest,
  GrpcWebImpl,
  RemoveDomainFromShopRequest,
  ShopDomainServiceClientImpl,
} from "../peoplesmarkets/commerce/v1/shop_domain";
import { AccessTokenGetter, ServiceClient } from "../service-client";

export class ShopDomainService extends ServiceClient {
  private readonly rpc: GrpcWebImpl;
  private readonly client: ShopDomainServiceClientImpl;

  constructor(accessToken: AccessTokenGetter) {
    super(accessToken);

    this.rpc = new GrpcWebImpl(import.meta.env.VITE_SERIVCE_APIS_URL, {});
    this.client = new ShopDomainServiceClientImpl(this.rpc);
  }

  public async addDomain(request: AddDomainToShopRequest) {
    return this.client.AddDomainToShop(request, await this.withAuthHeader());
  }

  public async getDomainStatus(shopId: string) {
    return this.client.GetDomainStatus({ shopId }, await this.withAuthHeader());
  }

  public async removeDomain(request: RemoveDomainFromShopRequest) {
    return this.client.RemoveDomainFromShop(
      request,
      await this.withAuthHeader()
    );
  }
}
