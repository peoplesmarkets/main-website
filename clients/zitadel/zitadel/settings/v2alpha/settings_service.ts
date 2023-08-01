/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Details, ListDetails, RequestContext } from "../../object/v2alpha/object";
import { BrandingSettings } from "./branding_settings";
import { DomainSettings } from "./domain_settings";
import { LegalAndSupportSettings } from "./legal_settings";
import { LockoutSettings } from "./lockout_settings";
import { IdentityProvider, LoginSettings } from "./login_settings";
import { PasswordComplexitySettings } from "./password_settings";

export const protobufPackage = "zitadel.settings.v2alpha";

export interface GetLoginSettingsRequest {
  ctx: RequestContext | undefined;
}

export interface GetLoginSettingsResponse {
  details: Details | undefined;
  settings: LoginSettings | undefined;
}

export interface GetPasswordComplexitySettingsRequest {
  ctx: RequestContext | undefined;
}

export interface GetPasswordComplexitySettingsResponse {
  details: Details | undefined;
  settings: PasswordComplexitySettings | undefined;
}

export interface GetBrandingSettingsRequest {
  ctx: RequestContext | undefined;
}

export interface GetBrandingSettingsResponse {
  details: Details | undefined;
  settings: BrandingSettings | undefined;
}

export interface GetDomainSettingsRequest {
  ctx: RequestContext | undefined;
}

export interface GetDomainSettingsResponse {
  details: Details | undefined;
  settings: DomainSettings | undefined;
}

export interface GetLegalAndSupportSettingsRequest {
  ctx: RequestContext | undefined;
}

export interface GetLegalAndSupportSettingsResponse {
  details: Details | undefined;
  settings: LegalAndSupportSettings | undefined;
}

export interface GetLockoutSettingsRequest {
  ctx: RequestContext | undefined;
}

export interface GetLockoutSettingsResponse {
  details: Details | undefined;
  settings: LockoutSettings | undefined;
}

export interface GetActiveIdentityProvidersRequest {
  ctx: RequestContext | undefined;
}

export interface GetActiveIdentityProvidersResponse {
  details: ListDetails | undefined;
  identityProviders: IdentityProvider[];
}

export interface GetGeneralSettingsRequest {
}

export interface GetGeneralSettingsResponse {
  defaultOrgId: string;
  defaultLanguage: string;
  supportedLanguages: string[];
}

function createBaseGetLoginSettingsRequest(): GetLoginSettingsRequest {
  return { ctx: undefined };
}

export const GetLoginSettingsRequest = {
  encode(message: GetLoginSettingsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ctx !== undefined) {
      RequestContext.encode(message.ctx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLoginSettingsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLoginSettingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ctx = RequestContext.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLoginSettingsRequest {
    return { ctx: isSet(object.ctx) ? RequestContext.fromJSON(object.ctx) : undefined };
  },

  toJSON(message: GetLoginSettingsRequest): unknown {
    const obj: any = {};
    if (message.ctx !== undefined) {
      obj.ctx = RequestContext.toJSON(message.ctx);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetLoginSettingsRequest>, I>>(base?: I): GetLoginSettingsRequest {
    return GetLoginSettingsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetLoginSettingsRequest>, I>>(object: I): GetLoginSettingsRequest {
    const message = createBaseGetLoginSettingsRequest();
    message.ctx = (object.ctx !== undefined && object.ctx !== null)
      ? RequestContext.fromPartial(object.ctx)
      : undefined;
    return message;
  },
};

function createBaseGetLoginSettingsResponse(): GetLoginSettingsResponse {
  return { details: undefined, settings: undefined };
}

export const GetLoginSettingsResponse = {
  encode(message: GetLoginSettingsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.settings !== undefined) {
      LoginSettings.encode(message.settings, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLoginSettingsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLoginSettingsResponse();
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

          message.settings = LoginSettings.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLoginSettingsResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      settings: isSet(object.settings) ? LoginSettings.fromJSON(object.settings) : undefined,
    };
  },

  toJSON(message: GetLoginSettingsResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.settings !== undefined) {
      obj.settings = LoginSettings.toJSON(message.settings);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetLoginSettingsResponse>, I>>(base?: I): GetLoginSettingsResponse {
    return GetLoginSettingsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetLoginSettingsResponse>, I>>(object: I): GetLoginSettingsResponse {
    const message = createBaseGetLoginSettingsResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? LoginSettings.fromPartial(object.settings)
      : undefined;
    return message;
  },
};

function createBaseGetPasswordComplexitySettingsRequest(): GetPasswordComplexitySettingsRequest {
  return { ctx: undefined };
}

export const GetPasswordComplexitySettingsRequest = {
  encode(message: GetPasswordComplexitySettingsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ctx !== undefined) {
      RequestContext.encode(message.ctx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPasswordComplexitySettingsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPasswordComplexitySettingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ctx = RequestContext.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetPasswordComplexitySettingsRequest {
    return { ctx: isSet(object.ctx) ? RequestContext.fromJSON(object.ctx) : undefined };
  },

  toJSON(message: GetPasswordComplexitySettingsRequest): unknown {
    const obj: any = {};
    if (message.ctx !== undefined) {
      obj.ctx = RequestContext.toJSON(message.ctx);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPasswordComplexitySettingsRequest>, I>>(
    base?: I,
  ): GetPasswordComplexitySettingsRequest {
    return GetPasswordComplexitySettingsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetPasswordComplexitySettingsRequest>, I>>(
    object: I,
  ): GetPasswordComplexitySettingsRequest {
    const message = createBaseGetPasswordComplexitySettingsRequest();
    message.ctx = (object.ctx !== undefined && object.ctx !== null)
      ? RequestContext.fromPartial(object.ctx)
      : undefined;
    return message;
  },
};

function createBaseGetPasswordComplexitySettingsResponse(): GetPasswordComplexitySettingsResponse {
  return { details: undefined, settings: undefined };
}

export const GetPasswordComplexitySettingsResponse = {
  encode(message: GetPasswordComplexitySettingsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.settings !== undefined) {
      PasswordComplexitySettings.encode(message.settings, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPasswordComplexitySettingsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPasswordComplexitySettingsResponse();
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

          message.settings = PasswordComplexitySettings.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetPasswordComplexitySettingsResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      settings: isSet(object.settings) ? PasswordComplexitySettings.fromJSON(object.settings) : undefined,
    };
  },

  toJSON(message: GetPasswordComplexitySettingsResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.settings !== undefined) {
      obj.settings = PasswordComplexitySettings.toJSON(message.settings);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPasswordComplexitySettingsResponse>, I>>(
    base?: I,
  ): GetPasswordComplexitySettingsResponse {
    return GetPasswordComplexitySettingsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetPasswordComplexitySettingsResponse>, I>>(
    object: I,
  ): GetPasswordComplexitySettingsResponse {
    const message = createBaseGetPasswordComplexitySettingsResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? PasswordComplexitySettings.fromPartial(object.settings)
      : undefined;
    return message;
  },
};

function createBaseGetBrandingSettingsRequest(): GetBrandingSettingsRequest {
  return { ctx: undefined };
}

export const GetBrandingSettingsRequest = {
  encode(message: GetBrandingSettingsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ctx !== undefined) {
      RequestContext.encode(message.ctx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBrandingSettingsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBrandingSettingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ctx = RequestContext.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBrandingSettingsRequest {
    return { ctx: isSet(object.ctx) ? RequestContext.fromJSON(object.ctx) : undefined };
  },

  toJSON(message: GetBrandingSettingsRequest): unknown {
    const obj: any = {};
    if (message.ctx !== undefined) {
      obj.ctx = RequestContext.toJSON(message.ctx);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBrandingSettingsRequest>, I>>(base?: I): GetBrandingSettingsRequest {
    return GetBrandingSettingsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetBrandingSettingsRequest>, I>>(object: I): GetBrandingSettingsRequest {
    const message = createBaseGetBrandingSettingsRequest();
    message.ctx = (object.ctx !== undefined && object.ctx !== null)
      ? RequestContext.fromPartial(object.ctx)
      : undefined;
    return message;
  },
};

function createBaseGetBrandingSettingsResponse(): GetBrandingSettingsResponse {
  return { details: undefined, settings: undefined };
}

export const GetBrandingSettingsResponse = {
  encode(message: GetBrandingSettingsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.settings !== undefined) {
      BrandingSettings.encode(message.settings, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBrandingSettingsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBrandingSettingsResponse();
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

          message.settings = BrandingSettings.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBrandingSettingsResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      settings: isSet(object.settings) ? BrandingSettings.fromJSON(object.settings) : undefined,
    };
  },

  toJSON(message: GetBrandingSettingsResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.settings !== undefined) {
      obj.settings = BrandingSettings.toJSON(message.settings);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBrandingSettingsResponse>, I>>(base?: I): GetBrandingSettingsResponse {
    return GetBrandingSettingsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetBrandingSettingsResponse>, I>>(object: I): GetBrandingSettingsResponse {
    const message = createBaseGetBrandingSettingsResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? BrandingSettings.fromPartial(object.settings)
      : undefined;
    return message;
  },
};

function createBaseGetDomainSettingsRequest(): GetDomainSettingsRequest {
  return { ctx: undefined };
}

export const GetDomainSettingsRequest = {
  encode(message: GetDomainSettingsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ctx !== undefined) {
      RequestContext.encode(message.ctx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDomainSettingsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDomainSettingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ctx = RequestContext.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetDomainSettingsRequest {
    return { ctx: isSet(object.ctx) ? RequestContext.fromJSON(object.ctx) : undefined };
  },

  toJSON(message: GetDomainSettingsRequest): unknown {
    const obj: any = {};
    if (message.ctx !== undefined) {
      obj.ctx = RequestContext.toJSON(message.ctx);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetDomainSettingsRequest>, I>>(base?: I): GetDomainSettingsRequest {
    return GetDomainSettingsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetDomainSettingsRequest>, I>>(object: I): GetDomainSettingsRequest {
    const message = createBaseGetDomainSettingsRequest();
    message.ctx = (object.ctx !== undefined && object.ctx !== null)
      ? RequestContext.fromPartial(object.ctx)
      : undefined;
    return message;
  },
};

function createBaseGetDomainSettingsResponse(): GetDomainSettingsResponse {
  return { details: undefined, settings: undefined };
}

export const GetDomainSettingsResponse = {
  encode(message: GetDomainSettingsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.settings !== undefined) {
      DomainSettings.encode(message.settings, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDomainSettingsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDomainSettingsResponse();
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

          message.settings = DomainSettings.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetDomainSettingsResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      settings: isSet(object.settings) ? DomainSettings.fromJSON(object.settings) : undefined,
    };
  },

  toJSON(message: GetDomainSettingsResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.settings !== undefined) {
      obj.settings = DomainSettings.toJSON(message.settings);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetDomainSettingsResponse>, I>>(base?: I): GetDomainSettingsResponse {
    return GetDomainSettingsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetDomainSettingsResponse>, I>>(object: I): GetDomainSettingsResponse {
    const message = createBaseGetDomainSettingsResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? DomainSettings.fromPartial(object.settings)
      : undefined;
    return message;
  },
};

function createBaseGetLegalAndSupportSettingsRequest(): GetLegalAndSupportSettingsRequest {
  return { ctx: undefined };
}

export const GetLegalAndSupportSettingsRequest = {
  encode(message: GetLegalAndSupportSettingsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ctx !== undefined) {
      RequestContext.encode(message.ctx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLegalAndSupportSettingsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLegalAndSupportSettingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ctx = RequestContext.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLegalAndSupportSettingsRequest {
    return { ctx: isSet(object.ctx) ? RequestContext.fromJSON(object.ctx) : undefined };
  },

  toJSON(message: GetLegalAndSupportSettingsRequest): unknown {
    const obj: any = {};
    if (message.ctx !== undefined) {
      obj.ctx = RequestContext.toJSON(message.ctx);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetLegalAndSupportSettingsRequest>, I>>(
    base?: I,
  ): GetLegalAndSupportSettingsRequest {
    return GetLegalAndSupportSettingsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetLegalAndSupportSettingsRequest>, I>>(
    object: I,
  ): GetLegalAndSupportSettingsRequest {
    const message = createBaseGetLegalAndSupportSettingsRequest();
    message.ctx = (object.ctx !== undefined && object.ctx !== null)
      ? RequestContext.fromPartial(object.ctx)
      : undefined;
    return message;
  },
};

function createBaseGetLegalAndSupportSettingsResponse(): GetLegalAndSupportSettingsResponse {
  return { details: undefined, settings: undefined };
}

export const GetLegalAndSupportSettingsResponse = {
  encode(message: GetLegalAndSupportSettingsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.settings !== undefined) {
      LegalAndSupportSettings.encode(message.settings, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLegalAndSupportSettingsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLegalAndSupportSettingsResponse();
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

          message.settings = LegalAndSupportSettings.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLegalAndSupportSettingsResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      settings: isSet(object.settings) ? LegalAndSupportSettings.fromJSON(object.settings) : undefined,
    };
  },

  toJSON(message: GetLegalAndSupportSettingsResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.settings !== undefined) {
      obj.settings = LegalAndSupportSettings.toJSON(message.settings);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetLegalAndSupportSettingsResponse>, I>>(
    base?: I,
  ): GetLegalAndSupportSettingsResponse {
    return GetLegalAndSupportSettingsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetLegalAndSupportSettingsResponse>, I>>(
    object: I,
  ): GetLegalAndSupportSettingsResponse {
    const message = createBaseGetLegalAndSupportSettingsResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? LegalAndSupportSettings.fromPartial(object.settings)
      : undefined;
    return message;
  },
};

function createBaseGetLockoutSettingsRequest(): GetLockoutSettingsRequest {
  return { ctx: undefined };
}

export const GetLockoutSettingsRequest = {
  encode(message: GetLockoutSettingsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ctx !== undefined) {
      RequestContext.encode(message.ctx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLockoutSettingsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLockoutSettingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ctx = RequestContext.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLockoutSettingsRequest {
    return { ctx: isSet(object.ctx) ? RequestContext.fromJSON(object.ctx) : undefined };
  },

  toJSON(message: GetLockoutSettingsRequest): unknown {
    const obj: any = {};
    if (message.ctx !== undefined) {
      obj.ctx = RequestContext.toJSON(message.ctx);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetLockoutSettingsRequest>, I>>(base?: I): GetLockoutSettingsRequest {
    return GetLockoutSettingsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetLockoutSettingsRequest>, I>>(object: I): GetLockoutSettingsRequest {
    const message = createBaseGetLockoutSettingsRequest();
    message.ctx = (object.ctx !== undefined && object.ctx !== null)
      ? RequestContext.fromPartial(object.ctx)
      : undefined;
    return message;
  },
};

function createBaseGetLockoutSettingsResponse(): GetLockoutSettingsResponse {
  return { details: undefined, settings: undefined };
}

export const GetLockoutSettingsResponse = {
  encode(message: GetLockoutSettingsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.settings !== undefined) {
      LockoutSettings.encode(message.settings, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLockoutSettingsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLockoutSettingsResponse();
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

          message.settings = LockoutSettings.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLockoutSettingsResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      settings: isSet(object.settings) ? LockoutSettings.fromJSON(object.settings) : undefined,
    };
  },

  toJSON(message: GetLockoutSettingsResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.settings !== undefined) {
      obj.settings = LockoutSettings.toJSON(message.settings);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetLockoutSettingsResponse>, I>>(base?: I): GetLockoutSettingsResponse {
    return GetLockoutSettingsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetLockoutSettingsResponse>, I>>(object: I): GetLockoutSettingsResponse {
    const message = createBaseGetLockoutSettingsResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? LockoutSettings.fromPartial(object.settings)
      : undefined;
    return message;
  },
};

function createBaseGetActiveIdentityProvidersRequest(): GetActiveIdentityProvidersRequest {
  return { ctx: undefined };
}

export const GetActiveIdentityProvidersRequest = {
  encode(message: GetActiveIdentityProvidersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ctx !== undefined) {
      RequestContext.encode(message.ctx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetActiveIdentityProvidersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetActiveIdentityProvidersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ctx = RequestContext.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetActiveIdentityProvidersRequest {
    return { ctx: isSet(object.ctx) ? RequestContext.fromJSON(object.ctx) : undefined };
  },

  toJSON(message: GetActiveIdentityProvidersRequest): unknown {
    const obj: any = {};
    if (message.ctx !== undefined) {
      obj.ctx = RequestContext.toJSON(message.ctx);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetActiveIdentityProvidersRequest>, I>>(
    base?: I,
  ): GetActiveIdentityProvidersRequest {
    return GetActiveIdentityProvidersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetActiveIdentityProvidersRequest>, I>>(
    object: I,
  ): GetActiveIdentityProvidersRequest {
    const message = createBaseGetActiveIdentityProvidersRequest();
    message.ctx = (object.ctx !== undefined && object.ctx !== null)
      ? RequestContext.fromPartial(object.ctx)
      : undefined;
    return message;
  },
};

function createBaseGetActiveIdentityProvidersResponse(): GetActiveIdentityProvidersResponse {
  return { details: undefined, identityProviders: [] };
}

export const GetActiveIdentityProvidersResponse = {
  encode(message: GetActiveIdentityProvidersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ListDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.identityProviders) {
      IdentityProvider.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetActiveIdentityProvidersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetActiveIdentityProvidersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ListDetails.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.identityProviders.push(IdentityProvider.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetActiveIdentityProvidersResponse {
    return {
      details: isSet(object.details) ? ListDetails.fromJSON(object.details) : undefined,
      identityProviders: Array.isArray(object?.identityProviders)
        ? object.identityProviders.map((e: any) => IdentityProvider.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetActiveIdentityProvidersResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ListDetails.toJSON(message.details);
    }
    if (message.identityProviders?.length) {
      obj.identityProviders = message.identityProviders.map((e) => IdentityProvider.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetActiveIdentityProvidersResponse>, I>>(
    base?: I,
  ): GetActiveIdentityProvidersResponse {
    return GetActiveIdentityProvidersResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetActiveIdentityProvidersResponse>, I>>(
    object: I,
  ): GetActiveIdentityProvidersResponse {
    const message = createBaseGetActiveIdentityProvidersResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ListDetails.fromPartial(object.details)
      : undefined;
    message.identityProviders = object.identityProviders?.map((e) => IdentityProvider.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetGeneralSettingsRequest(): GetGeneralSettingsRequest {
  return {};
}

export const GetGeneralSettingsRequest = {
  encode(_: GetGeneralSettingsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetGeneralSettingsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGeneralSettingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): GetGeneralSettingsRequest {
    return {};
  },

  toJSON(_: GetGeneralSettingsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetGeneralSettingsRequest>, I>>(base?: I): GetGeneralSettingsRequest {
    return GetGeneralSettingsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetGeneralSettingsRequest>, I>>(_: I): GetGeneralSettingsRequest {
    const message = createBaseGetGeneralSettingsRequest();
    return message;
  },
};

function createBaseGetGeneralSettingsResponse(): GetGeneralSettingsResponse {
  return { defaultOrgId: "", defaultLanguage: "", supportedLanguages: [] };
}

export const GetGeneralSettingsResponse = {
  encode(message: GetGeneralSettingsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.defaultOrgId !== "") {
      writer.uint32(10).string(message.defaultOrgId);
    }
    if (message.defaultLanguage !== "") {
      writer.uint32(18).string(message.defaultLanguage);
    }
    for (const v of message.supportedLanguages) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetGeneralSettingsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGeneralSettingsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.defaultOrgId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.defaultLanguage = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.supportedLanguages.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetGeneralSettingsResponse {
    return {
      defaultOrgId: isSet(object.defaultOrgId) ? String(object.defaultOrgId) : "",
      defaultLanguage: isSet(object.defaultLanguage) ? String(object.defaultLanguage) : "",
      supportedLanguages: Array.isArray(object?.supportedLanguages)
        ? object.supportedLanguages.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: GetGeneralSettingsResponse): unknown {
    const obj: any = {};
    if (message.defaultOrgId !== "") {
      obj.defaultOrgId = message.defaultOrgId;
    }
    if (message.defaultLanguage !== "") {
      obj.defaultLanguage = message.defaultLanguage;
    }
    if (message.supportedLanguages?.length) {
      obj.supportedLanguages = message.supportedLanguages;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetGeneralSettingsResponse>, I>>(base?: I): GetGeneralSettingsResponse {
    return GetGeneralSettingsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetGeneralSettingsResponse>, I>>(object: I): GetGeneralSettingsResponse {
    const message = createBaseGetGeneralSettingsResponse();
    message.defaultOrgId = object.defaultOrgId ?? "";
    message.defaultLanguage = object.defaultLanguage ?? "";
    message.supportedLanguages = object.supportedLanguages?.map((e) => e) || [];
    return message;
  },
};

export interface SettingsService {
  /** Get basic information over the instance */
  GetGeneralSettings(
    request: DeepPartial<GetGeneralSettingsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetGeneralSettingsResponse>;
  /** Get the login settings */
  GetLoginSettings(
    request: DeepPartial<GetLoginSettingsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetLoginSettingsResponse>;
  /** Get the current active identity providers */
  GetActiveIdentityProviders(
    request: DeepPartial<GetActiveIdentityProvidersRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetActiveIdentityProvidersResponse>;
  /** Get the password complexity settings */
  GetPasswordComplexitySettings(
    request: DeepPartial<GetPasswordComplexitySettingsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetPasswordComplexitySettingsResponse>;
  /** Get the current active branding settings */
  GetBrandingSettings(
    request: DeepPartial<GetBrandingSettingsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetBrandingSettingsResponse>;
  /** Get the domain settings */
  GetDomainSettings(
    request: DeepPartial<GetDomainSettingsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetDomainSettingsResponse>;
  /** Get the legal and support settings */
  GetLegalAndSupportSettings(
    request: DeepPartial<GetLegalAndSupportSettingsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetLegalAndSupportSettingsResponse>;
  /** Get the lockout settings */
  GetLockoutSettings(
    request: DeepPartial<GetLockoutSettingsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetLockoutSettingsResponse>;
}

export class SettingsServiceClientImpl implements SettingsService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetGeneralSettings = this.GetGeneralSettings.bind(this);
    this.GetLoginSettings = this.GetLoginSettings.bind(this);
    this.GetActiveIdentityProviders = this.GetActiveIdentityProviders.bind(this);
    this.GetPasswordComplexitySettings = this.GetPasswordComplexitySettings.bind(this);
    this.GetBrandingSettings = this.GetBrandingSettings.bind(this);
    this.GetDomainSettings = this.GetDomainSettings.bind(this);
    this.GetLegalAndSupportSettings = this.GetLegalAndSupportSettings.bind(this);
    this.GetLockoutSettings = this.GetLockoutSettings.bind(this);
  }

  GetGeneralSettings(
    request: DeepPartial<GetGeneralSettingsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetGeneralSettingsResponse> {
    return this.rpc.unary(
      SettingsServiceGetGeneralSettingsDesc,
      GetGeneralSettingsRequest.fromPartial(request),
      metadata,
    );
  }

  GetLoginSettings(
    request: DeepPartial<GetLoginSettingsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetLoginSettingsResponse> {
    return this.rpc.unary(SettingsServiceGetLoginSettingsDesc, GetLoginSettingsRequest.fromPartial(request), metadata);
  }

  GetActiveIdentityProviders(
    request: DeepPartial<GetActiveIdentityProvidersRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetActiveIdentityProvidersResponse> {
    return this.rpc.unary(
      SettingsServiceGetActiveIdentityProvidersDesc,
      GetActiveIdentityProvidersRequest.fromPartial(request),
      metadata,
    );
  }

  GetPasswordComplexitySettings(
    request: DeepPartial<GetPasswordComplexitySettingsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetPasswordComplexitySettingsResponse> {
    return this.rpc.unary(
      SettingsServiceGetPasswordComplexitySettingsDesc,
      GetPasswordComplexitySettingsRequest.fromPartial(request),
      metadata,
    );
  }

  GetBrandingSettings(
    request: DeepPartial<GetBrandingSettingsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetBrandingSettingsResponse> {
    return this.rpc.unary(
      SettingsServiceGetBrandingSettingsDesc,
      GetBrandingSettingsRequest.fromPartial(request),
      metadata,
    );
  }

  GetDomainSettings(
    request: DeepPartial<GetDomainSettingsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetDomainSettingsResponse> {
    return this.rpc.unary(
      SettingsServiceGetDomainSettingsDesc,
      GetDomainSettingsRequest.fromPartial(request),
      metadata,
    );
  }

  GetLegalAndSupportSettings(
    request: DeepPartial<GetLegalAndSupportSettingsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetLegalAndSupportSettingsResponse> {
    return this.rpc.unary(
      SettingsServiceGetLegalAndSupportSettingsDesc,
      GetLegalAndSupportSettingsRequest.fromPartial(request),
      metadata,
    );
  }

  GetLockoutSettings(
    request: DeepPartial<GetLockoutSettingsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetLockoutSettingsResponse> {
    return this.rpc.unary(
      SettingsServiceGetLockoutSettingsDesc,
      GetLockoutSettingsRequest.fromPartial(request),
      metadata,
    );
  }
}

export const SettingsServiceDesc = { serviceName: "zitadel.settings.v2alpha.SettingsService" };

export const SettingsServiceGetGeneralSettingsDesc: UnaryMethodDefinitionish = {
  methodName: "GetGeneralSettings",
  service: SettingsServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetGeneralSettingsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetGeneralSettingsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SettingsServiceGetLoginSettingsDesc: UnaryMethodDefinitionish = {
  methodName: "GetLoginSettings",
  service: SettingsServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetLoginSettingsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetLoginSettingsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SettingsServiceGetActiveIdentityProvidersDesc: UnaryMethodDefinitionish = {
  methodName: "GetActiveIdentityProviders",
  service: SettingsServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetActiveIdentityProvidersRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetActiveIdentityProvidersResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SettingsServiceGetPasswordComplexitySettingsDesc: UnaryMethodDefinitionish = {
  methodName: "GetPasswordComplexitySettings",
  service: SettingsServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetPasswordComplexitySettingsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetPasswordComplexitySettingsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SettingsServiceGetBrandingSettingsDesc: UnaryMethodDefinitionish = {
  methodName: "GetBrandingSettings",
  service: SettingsServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetBrandingSettingsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetBrandingSettingsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SettingsServiceGetDomainSettingsDesc: UnaryMethodDefinitionish = {
  methodName: "GetDomainSettings",
  service: SettingsServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetDomainSettingsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetDomainSettingsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SettingsServiceGetLegalAndSupportSettingsDesc: UnaryMethodDefinitionish = {
  methodName: "GetLegalAndSupportSettings",
  service: SettingsServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetLegalAndSupportSettingsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetLegalAndSupportSettingsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SettingsServiceGetLockoutSettingsDesc: UnaryMethodDefinitionish = {
  methodName: "GetLockoutSettings",
  service: SettingsServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetLockoutSettingsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetLockoutSettingsResponse.decode(data);
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
