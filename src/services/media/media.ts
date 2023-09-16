import {
  AddMediaToOfferRequest,
  CompleteMultipartUploadRequest,
  CreateMediaRequest,
  GrpcWebImpl,
  InitiateMultipartUploadRequest,
  ListMediaRequest,
  MediaServiceClientImpl,
  PutMultipartChunkRequest,
  RemoveMediaFromOfferRequest,
  UpdateMediaRequest,
} from "../peoplesmarkets/media/v1/media";

import { AccessTokenGetter, ServiceClient } from "../service-client";

export class MediaService extends ServiceClient {
  private readonly rpc: GrpcWebImpl;
  private readonly client: MediaServiceClientImpl;

  constructor(accessToken?: AccessTokenGetter) {
    super(accessToken);

    this.rpc = new GrpcWebImpl(import.meta.env.VITE_SERIVCE_APIS_URL, {});
    this.client = new MediaServiceClientImpl(this.rpc);
  }

  public async create(request: CreateMediaRequest) {
    return this.client.CreateMedia(request, await this.withAuthHeader());
  }

  public async get(mediaId: string) {
    return this.client.GetMedia({ mediaId }, await this.withAuthHeader());
  }

  public async list(request: ListMediaRequest) {
    return this.client.ListMedia(request, await this.withAuthHeader());
  }

  public async update(request: UpdateMediaRequest) {
    return this.client.UpdateMedia(request, await this.withAuthHeader());
  }

  public async delete(mediaId: string) {
    return this.client.DeleteMedia({ mediaId }, await this.withAuthHeader());
  }

  public async initiateMultipartUpload(
    request: InitiateMultipartUploadRequest
  ) {
    return this.client.InitiateMultipartUpload(
      request,
      await this.withAuthHeader()
    );
  }

  public async putMultipartChunk(request: PutMultipartChunkRequest) {
    return this.client.PutMultipartChunk(request, await this.withAuthHeader());
  }

  public async completeMultipartUpload(
    request: CompleteMultipartUploadRequest
  ) {
    return this.client.CompleteMultipartUpload(
      request,
      await this.withAuthHeader()
    );
  }

  public async addMediaToOffer(request: AddMediaToOfferRequest) {
    return this.client.AddMediaToOffer(request, await this.withAuthHeader());
  }

  public async removeMediaFromOffer(request: RemoveMediaFromOfferRequest) {
    return this.client.RemoveMediaFromOffer(
      request,
      await this.withAuthHeader()
    );
  }
}
