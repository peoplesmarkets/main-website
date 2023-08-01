/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Details } from "../../object/v2alpha/object";
import { AuthorizationError, AuthRequest } from "./authorization";

export const protobufPackage = "zitadel.oidc.v2alpha";

export interface GetAuthRequestRequest {
  authRequestId: string;
}

export interface GetAuthRequestResponse {
  authRequest: AuthRequest | undefined;
}

export interface CreateCallbackRequest {
  authRequestId: string;
  session?: Session | undefined;
  error?: AuthorizationError | undefined;
}

export interface Session {
  sessionId: string;
  sessionToken: string;
}

export interface CreateCallbackResponse {
  details: Details | undefined;
  callbackUrl: string;
}

function createBaseGetAuthRequestRequest(): GetAuthRequestRequest {
  return { authRequestId: "" };
}

export const GetAuthRequestRequest = {
  encode(message: GetAuthRequestRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authRequestId !== "") {
      writer.uint32(10).string(message.authRequestId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAuthRequestRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAuthRequestRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authRequestId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetAuthRequestRequest {
    return { authRequestId: isSet(object.authRequestId) ? String(object.authRequestId) : "" };
  },

  toJSON(message: GetAuthRequestRequest): unknown {
    const obj: any = {};
    if (message.authRequestId !== "") {
      obj.authRequestId = message.authRequestId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAuthRequestRequest>, I>>(base?: I): GetAuthRequestRequest {
    return GetAuthRequestRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetAuthRequestRequest>, I>>(object: I): GetAuthRequestRequest {
    const message = createBaseGetAuthRequestRequest();
    message.authRequestId = object.authRequestId ?? "";
    return message;
  },
};

function createBaseGetAuthRequestResponse(): GetAuthRequestResponse {
  return { authRequest: undefined };
}

export const GetAuthRequestResponse = {
  encode(message: GetAuthRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authRequest !== undefined) {
      AuthRequest.encode(message.authRequest, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAuthRequestResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAuthRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authRequest = AuthRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetAuthRequestResponse {
    return { authRequest: isSet(object.authRequest) ? AuthRequest.fromJSON(object.authRequest) : undefined };
  },

  toJSON(message: GetAuthRequestResponse): unknown {
    const obj: any = {};
    if (message.authRequest !== undefined) {
      obj.authRequest = AuthRequest.toJSON(message.authRequest);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAuthRequestResponse>, I>>(base?: I): GetAuthRequestResponse {
    return GetAuthRequestResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetAuthRequestResponse>, I>>(object: I): GetAuthRequestResponse {
    const message = createBaseGetAuthRequestResponse();
    message.authRequest = (object.authRequest !== undefined && object.authRequest !== null)
      ? AuthRequest.fromPartial(object.authRequest)
      : undefined;
    return message;
  },
};

function createBaseCreateCallbackRequest(): CreateCallbackRequest {
  return { authRequestId: "", session: undefined, error: undefined };
}

export const CreateCallbackRequest = {
  encode(message: CreateCallbackRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authRequestId !== "") {
      writer.uint32(10).string(message.authRequestId);
    }
    if (message.session !== undefined) {
      Session.encode(message.session, writer.uint32(18).fork()).ldelim();
    }
    if (message.error !== undefined) {
      AuthorizationError.encode(message.error, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCallbackRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCallbackRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authRequestId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.session = Session.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.error = AuthorizationError.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateCallbackRequest {
    return {
      authRequestId: isSet(object.authRequestId) ? String(object.authRequestId) : "",
      session: isSet(object.session) ? Session.fromJSON(object.session) : undefined,
      error: isSet(object.error) ? AuthorizationError.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CreateCallbackRequest): unknown {
    const obj: any = {};
    if (message.authRequestId !== "") {
      obj.authRequestId = message.authRequestId;
    }
    if (message.session !== undefined) {
      obj.session = Session.toJSON(message.session);
    }
    if (message.error !== undefined) {
      obj.error = AuthorizationError.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCallbackRequest>, I>>(base?: I): CreateCallbackRequest {
    return CreateCallbackRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateCallbackRequest>, I>>(object: I): CreateCallbackRequest {
    const message = createBaseCreateCallbackRequest();
    message.authRequestId = object.authRequestId ?? "";
    message.session = (object.session !== undefined && object.session !== null)
      ? Session.fromPartial(object.session)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null)
      ? AuthorizationError.fromPartial(object.error)
      : undefined;
    return message;
  },
};

function createBaseSession(): Session {
  return { sessionId: "", sessionToken: "" };
}

export const Session = {
  encode(message: Session, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.sessionToken !== "") {
      writer.uint32(18).string(message.sessionToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Session {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSession();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sessionToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Session {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      sessionToken: isSet(object.sessionToken) ? String(object.sessionToken) : "",
    };
  },

  toJSON(message: Session): unknown {
    const obj: any = {};
    if (message.sessionId !== "") {
      obj.sessionId = message.sessionId;
    }
    if (message.sessionToken !== "") {
      obj.sessionToken = message.sessionToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Session>, I>>(base?: I): Session {
    return Session.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Session>, I>>(object: I): Session {
    const message = createBaseSession();
    message.sessionId = object.sessionId ?? "";
    message.sessionToken = object.sessionToken ?? "";
    return message;
  },
};

function createBaseCreateCallbackResponse(): CreateCallbackResponse {
  return { details: undefined, callbackUrl: "" };
}

export const CreateCallbackResponse = {
  encode(message: CreateCallbackResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.callbackUrl !== "") {
      writer.uint32(18).string(message.callbackUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCallbackResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCallbackResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = Details.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.callbackUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateCallbackResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      callbackUrl: isSet(object.callbackUrl) ? String(object.callbackUrl) : "",
    };
  },

  toJSON(message: CreateCallbackResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.callbackUrl !== "") {
      obj.callbackUrl = message.callbackUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCallbackResponse>, I>>(base?: I): CreateCallbackResponse {
    return CreateCallbackResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateCallbackResponse>, I>>(object: I): CreateCallbackResponse {
    const message = createBaseCreateCallbackResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.callbackUrl = object.callbackUrl ?? "";
    return message;
  },
};

export interface OIDCService {
  GetAuthRequest(
    request: DeepPartial<GetAuthRequestRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetAuthRequestResponse>;
  CreateCallback(
    request: DeepPartial<CreateCallbackRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CreateCallbackResponse>;
}

export class OIDCServiceClientImpl implements OIDCService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetAuthRequest = this.GetAuthRequest.bind(this);
    this.CreateCallback = this.CreateCallback.bind(this);
  }

  GetAuthRequest(
    request: DeepPartial<GetAuthRequestRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetAuthRequestResponse> {
    return this.rpc.unary(OIDCServiceGetAuthRequestDesc, GetAuthRequestRequest.fromPartial(request), metadata);
  }

  CreateCallback(
    request: DeepPartial<CreateCallbackRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CreateCallbackResponse> {
    return this.rpc.unary(OIDCServiceCreateCallbackDesc, CreateCallbackRequest.fromPartial(request), metadata);
  }
}

export const OIDCServiceDesc = { serviceName: "zitadel.oidc.v2alpha.OIDCService" };

export const OIDCServiceGetAuthRequestDesc: UnaryMethodDefinitionish = {
  methodName: "GetAuthRequest",
  service: OIDCServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetAuthRequestRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetAuthRequestResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OIDCServiceCreateCallbackDesc: UnaryMethodDefinitionish = {
  methodName: "CreateCallback",
  service: OIDCServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateCallbackRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CreateCallbackResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
      upStreamRetryCodes?: number[];
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata ?? this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata ?? {},
        ...(this.options.transport !== undefined ? { transport: this.options.transport } : {}),
        debug: this.options.debug ?? false,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message!.toObject());
          } else {
            const err = new GrpcWebError(response.statusMessage, response.status, response.trailers);
            reject(err);
          }
        },
      });
    });
  }
}

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends tsProtoGlobalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
