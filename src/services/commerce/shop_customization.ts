import {
  GrpcWebImpl,
  PutBannerImageToShopRequest,
  PutLogoImageToShopRequest,
  PutShopCustomizationRequest,
  ShopCustomizationServiceClientImpl,
} from "../peoplesmarkets/commerce/v1/shop_customization";
import { AccessTokenGetter, ServiceClient } from "../service-client";

export class ShopCustomizationService extends ServiceClient {
  private readonly rpc: GrpcWebImpl;
  private readonly client: ShopCustomizationServiceClientImpl;

  constructor(accessToken: AccessTokenGetter) {
    super(accessToken);

    this.rpc = new GrpcWebImpl(import.meta.env.VITE_SERIVCE_APIS_URL, {});
    this.client = new ShopCustomizationServiceClientImpl(this.rpc);
  }

  public async put(request: PutShopCustomizationRequest) {
    return this.client.PutShopCustomization(
      request,
      await this.withAuthHeader()
    );
  }

  public async get(shopId: string) {
    return this.client.GetShopCustomization(
      {
        shopId,
      },
      await this.withAuthHeader()
    );
  }

  public async delete(shopId: string) {
    return this.client.DeleteShopCustomization(
      {
        shopId,
      },
      await this.withAuthHeader()
    );
  }

  public async putBannerImage(request: PutBannerImageToShopRequest) {
    return this.client.PutBannerImageToShop(
      request,
      await this.withAuthHeader()
    );
  }

  public async removeBannerImage(shopId: string) {
    return this.client.RemoveBannerImageFromShop(
      { shopId },
      await this.withAuthHeader()
    );
  }

  public async putLogoImage(request: PutLogoImageToShopRequest) {
    return this.client.PutLogoImageToShop(request, await this.withAuthHeader());
  }

  public async removeLogoImage(shopId: string) {
    return this.client.RemoveLogoImageFromShop(
      { shopId },
      await this.withAuthHeader()
    );
  }
}
