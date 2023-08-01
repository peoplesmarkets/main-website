/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Duration } from "../google/protobuf/duration";
import { Timestamp } from "../google/protobuf/timestamp";
import { Change, ChangeQuery } from "./change";
import { IDPUserLink } from "./idp";
import { Metadata, MetadataQuery } from "./metadata";
import { ListDetails, ListQuery, ObjectDetails } from "./object";
import { Org, OrgQuery } from "./org";
import { LabelPolicy, LoginPolicy, PasswordComplexityPolicy, PrivacyPolicy } from "./policy";
import {
  AuthFactor,
  Email,
  Gender,
  genderFromJSON,
  genderToJSON,
  Membership,
  MembershipQuery,
  Phone,
  Profile,
  RefreshToken,
  Session,
  Type,
  typeFromJSON,
  typeToJSON,
  User,
  WebAuthNKey,
  WebAuthNToken,
  WebAuthNVerification,
} from "./user";

export const protobufPackage = "zitadel.auth.v1";

/** This is an empty request */
export interface HealthzRequest {
}

/** This is an empty response */
export interface HealthzResponse {
}

/** This is an empty request */
export interface GetSupportedLanguagesRequest {
}

/** This is an empty response */
export interface GetSupportedLanguagesResponse {
  languages: string[];
}

/**
 * This is an empty request
 * the request parameters are read from the token-header
 */
export interface GetMyUserRequest {
}

export interface GetMyUserResponse {
  user: User | undefined;
  lastLogin: Date | undefined;
}

/**
 * This is an empty request
 * the request parameters are read from the token-header
 */
export interface RemoveMyUserRequest {
}

export interface RemoveMyUserResponse {
  details: ObjectDetails | undefined;
}

export interface ListMyUserChangesRequest {
  query: ChangeQuery | undefined;
}

export interface ListMyUserChangesResponse {
  /** zitadel.v1.ListDetails details = 1; was always returned empty (as we cannot get the necessary info) */
  result: Change[];
}

/** This is an empty request */
export interface ListMyUserSessionsRequest {
}

export interface ListMyUserSessionsResponse {
  result: Session[];
}

export interface ListMyMetadataRequest {
  query: ListQuery | undefined;
  queries: MetadataQuery[];
}

export interface ListMyMetadataResponse {
  details: ListDetails | undefined;
  result: Metadata[];
}

export interface GetMyMetadataRequest {
  key: string;
}

export interface GetMyMetadataResponse {
  metadata: Metadata | undefined;
}

export interface SetMyMetadataRequest {
  key: string;
  value: Uint8Array;
}

export interface SetMyMetadataResponse {
  details: ObjectDetails | undefined;
}

export interface BulkSetMyMetadataRequest {
  metadata: BulkSetMyMetadataRequest_Metadata[];
}

export interface BulkSetMyMetadataRequest_Metadata {
  key: string;
  value: Uint8Array;
}

export interface BulkSetMyMetadataResponse {
  details: ObjectDetails | undefined;
}

export interface RemoveMyMetadataRequest {
  key: string;
}

export interface RemoveMyMetadataResponse {
  details: ObjectDetails | undefined;
}

export interface BulkRemoveMyMetadataRequest {
  keys: string[];
}

export interface BulkRemoveMyMetadataResponse {
  details: ObjectDetails | undefined;
}

/** This is an empty request */
export interface ListMyRefreshTokensRequest {
}

export interface ListMyRefreshTokensResponse {
  details: ListDetails | undefined;
  result: RefreshToken[];
}

export interface RevokeMyRefreshTokenRequest {
  id: string;
}

export interface RevokeMyRefreshTokenResponse {
  details: ObjectDetails | undefined;
}

/** This is an empty request */
export interface RevokeAllMyRefreshTokensRequest {
}

/** This is an empty response */
export interface RevokeAllMyRefreshTokensResponse {
}

export interface UpdateMyUserNameRequest {
  userName: string;
}

export interface UpdateMyUserNameResponse {
  details: ObjectDetails | undefined;
}

/** This is an empty request */
export interface GetMyPasswordComplexityPolicyRequest {
}

export interface GetMyPasswordComplexityPolicyResponse {
  policy: PasswordComplexityPolicy | undefined;
}

export interface UpdateMyPasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateMyPasswordResponse {
  details: ObjectDetails | undefined;
}

/** This is an empty request */
export interface GetMyProfileRequest {
}

export interface GetMyProfileResponse {
  details: ObjectDetails | undefined;
  profile: Profile | undefined;
}

export interface UpdateMyProfileRequest {
  firstName: string;
  lastName: string;
  nickName: string;
  displayName: string;
  preferredLanguage: string;
  gender: Gender;
}

export interface UpdateMyProfileResponse {
  details: ObjectDetails | undefined;
}

/** This is an empty request */
export interface GetMyEmailRequest {
}

export interface GetMyEmailResponse {
  details: ObjectDetails | undefined;
  email: Email | undefined;
}

export interface SetMyEmailRequest {
  email: string;
}

export interface SetMyEmailResponse {
  details: ObjectDetails | undefined;
}

export interface VerifyMyEmailRequest {
  code: string;
}

export interface VerifyMyEmailResponse {
  details: ObjectDetails | undefined;
}

/** This is an empty request */
export interface ResendMyEmailVerificationRequest {
}

export interface ResendMyEmailVerificationResponse {
  details: ObjectDetails | undefined;
}

/** This is an empty request */
export interface GetMyPhoneRequest {
}

export interface GetMyPhoneResponse {
  details: ObjectDetails | undefined;
  phone: Phone | undefined;
}

export interface SetMyPhoneRequest {
  phone: string;
}

export interface SetMyPhoneResponse {
  details: ObjectDetails | undefined;
}

export interface VerifyMyPhoneRequest {
  code: string;
}

export interface VerifyMyPhoneResponse {
  details: ObjectDetails | undefined;
}

/** This is an empty request */
export interface ResendMyPhoneVerificationRequest {
}

export interface ResendMyPhoneVerificationResponse {
  details: ObjectDetails | undefined;
}

/** This is an empty request */
export interface RemoveMyPhoneRequest {
}

export interface RemoveMyPhoneResponse {
  details: ObjectDetails | undefined;
}

/** This is an empty request */
export interface RemoveMyAvatarRequest {
}

export interface RemoveMyAvatarResponse {
  details: ObjectDetails | undefined;
}

export interface ListMyLinkedIDPsRequest {
  /** list limitations and ordering */
  query: ListQuery | undefined;
}

export interface ListMyLinkedIDPsResponse {
  details: ListDetails | undefined;
  result: IDPUserLink[];
}

export interface RemoveMyLinkedIDPRequest {
  idpId: string;
  linkedUserId: string;
}

export interface RemoveMyLinkedIDPResponse {
  details: ObjectDetails | undefined;
}

/** This is an empty request */
export interface ListMyAuthFactorsRequest {
}

export interface ListMyAuthFactorsResponse {
  result: AuthFactor[];
}

/** This is an empty request */
export interface AddMyAuthFactorU2FRequest {
}

export interface AddMyAuthFactorU2FResponse {
  key: WebAuthNKey | undefined;
  details: ObjectDetails | undefined;
}

/** This is an empty request */
export interface AddMyAuthFactorOTPRequest {
}

export interface AddMyAuthFactorOTPResponse {
  url: string;
  secret: string;
  details: ObjectDetails | undefined;
}

export interface VerifyMyAuthFactorOTPRequest {
  code: string;
}

export interface VerifyMyAuthFactorOTPResponse {
  details: ObjectDetails | undefined;
}

export interface VerifyMyAuthFactorU2FRequest {
  verification: WebAuthNVerification | undefined;
}

export interface VerifyMyAuthFactorU2FResponse {
  details: ObjectDetails | undefined;
}

/** This is an empty request */
export interface RemoveMyAuthFactorOTPRequest {
}

export interface RemoveMyAuthFactorOTPResponse {
  details: ObjectDetails | undefined;
}

export interface RemoveMyAuthFactorU2FRequest {
  tokenId: string;
}

export interface RemoveMyAuthFactorU2FResponse {
  details: ObjectDetails | undefined;
}

/** This is an empty request */
export interface ListMyPasswordlessRequest {
}

export interface ListMyPasswordlessResponse {
  result: WebAuthNToken[];
}

/** This is an empty request */
export interface AddMyPasswordlessRequest {
}

export interface AddMyPasswordlessResponse {
  key: WebAuthNKey | undefined;
  details: ObjectDetails | undefined;
}

/** This is an empty request */
export interface AddMyPasswordlessLinkRequest {
}

export interface AddMyPasswordlessLinkResponse {
  details: ObjectDetails | undefined;
  link: string;
  expiration: Duration | undefined;
}

/** This is an empty request */
export interface SendMyPasswordlessLinkRequest {
}

export interface SendMyPasswordlessLinkResponse {
  details: ObjectDetails | undefined;
}

export interface VerifyMyPasswordlessRequest {
  verification: WebAuthNVerification | undefined;
}

export interface VerifyMyPasswordlessResponse {
  details: ObjectDetails | undefined;
}

export interface RemoveMyPasswordlessRequest {
  tokenId: string;
}

export interface RemoveMyPasswordlessResponse {
  details: ObjectDetails | undefined;
}

export interface ListMyUserGrantsRequest {
  /** list limitations and ordering */
  query: ListQuery | undefined;
}

export interface ListMyUserGrantsResponse {
  details: ListDetails | undefined;
  result: UserGrant[];
}

export interface UserGrant {
  orgId: string;
  projectId: string;
  userId: string;
  /** Deprecated: user role_keys */
  roles: string[];
  orgName: string;
  grantId: string;
  details: ObjectDetails | undefined;
  orgDomain: string;
  projectName: string;
  projectGrantId: string;
  roleKeys: string[];
  userType: Type;
}

export interface ListMyProjectOrgsRequest {
  /** list limitations and ordering */
  query:
    | ListQuery
    | undefined;
  /** criteria the client is looking for */
  queries: OrgQuery[];
}

export interface ListMyProjectOrgsResponse {
  details: ListDetails | undefined;
  result: Org[];
}

/** This is an empty request */
export interface ListMyZitadelPermissionsRequest {
}

export interface ListMyZitadelPermissionsResponse {
  result: string[];
}

/** This is an empty request */
export interface ListMyProjectPermissionsRequest {
}

export interface ListMyProjectPermissionsResponse {
  result: string[];
}

export interface ListMyMembershipsRequest {
  /** the field the result is sorted */
  query:
    | ListQuery
    | undefined;
  /** criteria the client is looking for */
  queries: MembershipQuery[];
}

export interface ListMyMembershipsResponse {
  details: ListDetails | undefined;
  result: Membership[];
}

/** This is an empty request */
export interface GetMyLabelPolicyRequest {
}

export interface GetMyLabelPolicyResponse {
  policy: LabelPolicy | undefined;
}

/** This is an empty request */
export interface GetMyPrivacyPolicyRequest {
}

export interface GetMyPrivacyPolicyResponse {
  policy: PrivacyPolicy | undefined;
}

/** This is an empty request */
export interface GetMyLoginPolicyRequest {
}

export interface GetMyLoginPolicyResponse {
  policy: LoginPolicy | undefined;
}

function createBaseHealthzRequest(): HealthzRequest {
  return {};
}

export const HealthzRequest = {
  encode(_: HealthzRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HealthzRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHealthzRequest();
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

  fromJSON(_: any): HealthzRequest {
    return {};
  },

  toJSON(_: HealthzRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<HealthzRequest>, I>>(base?: I): HealthzRequest {
    return HealthzRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HealthzRequest>, I>>(_: I): HealthzRequest {
    const message = createBaseHealthzRequest();
    return message;
  },
};

function createBaseHealthzResponse(): HealthzResponse {
  return {};
}

export const HealthzResponse = {
  encode(_: HealthzResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HealthzResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHealthzResponse();
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

  fromJSON(_: any): HealthzResponse {
    return {};
  },

  toJSON(_: HealthzResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<HealthzResponse>, I>>(base?: I): HealthzResponse {
    return HealthzResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HealthzResponse>, I>>(_: I): HealthzResponse {
    const message = createBaseHealthzResponse();
    return message;
  },
};

function createBaseGetSupportedLanguagesRequest(): GetSupportedLanguagesRequest {
  return {};
}

export const GetSupportedLanguagesRequest = {
  encode(_: GetSupportedLanguagesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSupportedLanguagesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSupportedLanguagesRequest();
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

  fromJSON(_: any): GetSupportedLanguagesRequest {
    return {};
  },

  toJSON(_: GetSupportedLanguagesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSupportedLanguagesRequest>, I>>(base?: I): GetSupportedLanguagesRequest {
    return GetSupportedLanguagesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSupportedLanguagesRequest>, I>>(_: I): GetSupportedLanguagesRequest {
    const message = createBaseGetSupportedLanguagesRequest();
    return message;
  },
};

function createBaseGetSupportedLanguagesResponse(): GetSupportedLanguagesResponse {
  return { languages: [] };
}

export const GetSupportedLanguagesResponse = {
  encode(message: GetSupportedLanguagesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.languages) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSupportedLanguagesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSupportedLanguagesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.languages.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSupportedLanguagesResponse {
    return { languages: Array.isArray(object?.languages) ? object.languages.map((e: any) => String(e)) : [] };
  },

  toJSON(message: GetSupportedLanguagesResponse): unknown {
    const obj: any = {};
    if (message.languages?.length) {
      obj.languages = message.languages;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSupportedLanguagesResponse>, I>>(base?: I): GetSupportedLanguagesResponse {
    return GetSupportedLanguagesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSupportedLanguagesResponse>, I>>(
    object: I,
  ): GetSupportedLanguagesResponse {
    const message = createBaseGetSupportedLanguagesResponse();
    message.languages = object.languages?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetMyUserRequest(): GetMyUserRequest {
  return {};
}

export const GetMyUserRequest = {
  encode(_: GetMyUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyUserRequest();
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

  fromJSON(_: any): GetMyUserRequest {
    return {};
  },

  toJSON(_: GetMyUserRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyUserRequest>, I>>(base?: I): GetMyUserRequest {
    return GetMyUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyUserRequest>, I>>(_: I): GetMyUserRequest {
    const message = createBaseGetMyUserRequest();
    return message;
  },
};

function createBaseGetMyUserResponse(): GetMyUserResponse {
  return { user: undefined, lastLogin: undefined };
}

export const GetMyUserResponse = {
  encode(message: GetMyUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    if (message.lastLogin !== undefined) {
      Timestamp.encode(toTimestamp(message.lastLogin), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.lastLogin = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetMyUserResponse {
    return {
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      lastLogin: isSet(object.lastLogin) ? fromJsonTimestamp(object.lastLogin) : undefined,
    };
  },

  toJSON(message: GetMyUserResponse): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    if (message.lastLogin !== undefined) {
      obj.lastLogin = message.lastLogin.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyUserResponse>, I>>(base?: I): GetMyUserResponse {
    return GetMyUserResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyUserResponse>, I>>(object: I): GetMyUserResponse {
    const message = createBaseGetMyUserResponse();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.lastLogin = object.lastLogin ?? undefined;
    return message;
  },
};

function createBaseRemoveMyUserRequest(): RemoveMyUserRequest {
  return {};
}

export const RemoveMyUserRequest = {
  encode(_: RemoveMyUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMyUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMyUserRequest();
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

  fromJSON(_: any): RemoveMyUserRequest {
    return {};
  },

  toJSON(_: RemoveMyUserRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveMyUserRequest>, I>>(base?: I): RemoveMyUserRequest {
    return RemoveMyUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveMyUserRequest>, I>>(_: I): RemoveMyUserRequest {
    const message = createBaseRemoveMyUserRequest();
    return message;
  },
};

function createBaseRemoveMyUserResponse(): RemoveMyUserResponse {
  return { details: undefined };
}

export const RemoveMyUserResponse = {
  encode(message: RemoveMyUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMyUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMyUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveMyUserResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: RemoveMyUserResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveMyUserResponse>, I>>(base?: I): RemoveMyUserResponse {
    return RemoveMyUserResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveMyUserResponse>, I>>(object: I): RemoveMyUserResponse {
    const message = createBaseRemoveMyUserResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseListMyUserChangesRequest(): ListMyUserChangesRequest {
  return { query: undefined };
}

export const ListMyUserChangesRequest = {
  encode(message: ListMyUserChangesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== undefined) {
      ChangeQuery.encode(message.query, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyUserChangesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyUserChangesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.query = ChangeQuery.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyUserChangesRequest {
    return { query: isSet(object.query) ? ChangeQuery.fromJSON(object.query) : undefined };
  },

  toJSON(message: ListMyUserChangesRequest): unknown {
    const obj: any = {};
    if (message.query !== undefined) {
      obj.query = ChangeQuery.toJSON(message.query);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyUserChangesRequest>, I>>(base?: I): ListMyUserChangesRequest {
    return ListMyUserChangesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyUserChangesRequest>, I>>(object: I): ListMyUserChangesRequest {
    const message = createBaseListMyUserChangesRequest();
    message.query = (object.query !== undefined && object.query !== null)
      ? ChangeQuery.fromPartial(object.query)
      : undefined;
    return message;
  },
};

function createBaseListMyUserChangesResponse(): ListMyUserChangesResponse {
  return { result: [] };
}

export const ListMyUserChangesResponse = {
  encode(message: ListMyUserChangesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.result) {
      Change.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyUserChangesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyUserChangesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result.push(Change.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyUserChangesResponse {
    return { result: Array.isArray(object?.result) ? object.result.map((e: any) => Change.fromJSON(e)) : [] };
  },

  toJSON(message: ListMyUserChangesResponse): unknown {
    const obj: any = {};
    if (message.result?.length) {
      obj.result = message.result.map((e) => Change.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyUserChangesResponse>, I>>(base?: I): ListMyUserChangesResponse {
    return ListMyUserChangesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyUserChangesResponse>, I>>(object: I): ListMyUserChangesResponse {
    const message = createBaseListMyUserChangesResponse();
    message.result = object.result?.map((e) => Change.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListMyUserSessionsRequest(): ListMyUserSessionsRequest {
  return {};
}

export const ListMyUserSessionsRequest = {
  encode(_: ListMyUserSessionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyUserSessionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyUserSessionsRequest();
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

  fromJSON(_: any): ListMyUserSessionsRequest {
    return {};
  },

  toJSON(_: ListMyUserSessionsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyUserSessionsRequest>, I>>(base?: I): ListMyUserSessionsRequest {
    return ListMyUserSessionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyUserSessionsRequest>, I>>(_: I): ListMyUserSessionsRequest {
    const message = createBaseListMyUserSessionsRequest();
    return message;
  },
};

function createBaseListMyUserSessionsResponse(): ListMyUserSessionsResponse {
  return { result: [] };
}

export const ListMyUserSessionsResponse = {
  encode(message: ListMyUserSessionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.result) {
      Session.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyUserSessionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyUserSessionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.result.push(Session.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyUserSessionsResponse {
    return { result: Array.isArray(object?.result) ? object.result.map((e: any) => Session.fromJSON(e)) : [] };
  },

  toJSON(message: ListMyUserSessionsResponse): unknown {
    const obj: any = {};
    if (message.result?.length) {
      obj.result = message.result.map((e) => Session.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyUserSessionsResponse>, I>>(base?: I): ListMyUserSessionsResponse {
    return ListMyUserSessionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyUserSessionsResponse>, I>>(object: I): ListMyUserSessionsResponse {
    const message = createBaseListMyUserSessionsResponse();
    message.result = object.result?.map((e) => Session.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListMyMetadataRequest(): ListMyMetadataRequest {
  return { query: undefined, queries: [] };
}

export const ListMyMetadataRequest = {
  encode(message: ListMyMetadataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== undefined) {
      ListQuery.encode(message.query, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.queries) {
      MetadataQuery.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.query = ListQuery.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.queries.push(MetadataQuery.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyMetadataRequest {
    return {
      query: isSet(object.query) ? ListQuery.fromJSON(object.query) : undefined,
      queries: Array.isArray(object?.queries) ? object.queries.map((e: any) => MetadataQuery.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListMyMetadataRequest): unknown {
    const obj: any = {};
    if (message.query !== undefined) {
      obj.query = ListQuery.toJSON(message.query);
    }
    if (message.queries?.length) {
      obj.queries = message.queries.map((e) => MetadataQuery.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyMetadataRequest>, I>>(base?: I): ListMyMetadataRequest {
    return ListMyMetadataRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyMetadataRequest>, I>>(object: I): ListMyMetadataRequest {
    const message = createBaseListMyMetadataRequest();
    message.query = (object.query !== undefined && object.query !== null)
      ? ListQuery.fromPartial(object.query)
      : undefined;
    message.queries = object.queries?.map((e) => MetadataQuery.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListMyMetadataResponse(): ListMyMetadataResponse {
  return { details: undefined, result: [] };
}

export const ListMyMetadataResponse = {
  encode(message: ListMyMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ListDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.result) {
      Metadata.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyMetadataResponse();
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

          message.result.push(Metadata.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyMetadataResponse {
    return {
      details: isSet(object.details) ? ListDetails.fromJSON(object.details) : undefined,
      result: Array.isArray(object?.result) ? object.result.map((e: any) => Metadata.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListMyMetadataResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ListDetails.toJSON(message.details);
    }
    if (message.result?.length) {
      obj.result = message.result.map((e) => Metadata.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyMetadataResponse>, I>>(base?: I): ListMyMetadataResponse {
    return ListMyMetadataResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyMetadataResponse>, I>>(object: I): ListMyMetadataResponse {
    const message = createBaseListMyMetadataResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ListDetails.fromPartial(object.details)
      : undefined;
    message.result = object.result?.map((e) => Metadata.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetMyMetadataRequest(): GetMyMetadataRequest {
  return { key: "" };
}

export const GetMyMetadataRequest = {
  encode(message: GetMyMetadataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetMyMetadataRequest {
    return { key: isSet(object.key) ? String(object.key) : "" };
  },

  toJSON(message: GetMyMetadataRequest): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyMetadataRequest>, I>>(base?: I): GetMyMetadataRequest {
    return GetMyMetadataRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyMetadataRequest>, I>>(object: I): GetMyMetadataRequest {
    const message = createBaseGetMyMetadataRequest();
    message.key = object.key ?? "";
    return message;
  },
};

function createBaseGetMyMetadataResponse(): GetMyMetadataResponse {
  return { metadata: undefined };
}

export const GetMyMetadataResponse = {
  encode(message: GetMyMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.metadata = Metadata.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetMyMetadataResponse {
    return { metadata: isSet(object.metadata) ? Metadata.fromJSON(object.metadata) : undefined };
  },

  toJSON(message: GetMyMetadataResponse): unknown {
    const obj: any = {};
    if (message.metadata !== undefined) {
      obj.metadata = Metadata.toJSON(message.metadata);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyMetadataResponse>, I>>(base?: I): GetMyMetadataResponse {
    return GetMyMetadataResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyMetadataResponse>, I>>(object: I): GetMyMetadataResponse {
    const message = createBaseGetMyMetadataResponse();
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? Metadata.fromPartial(object.metadata)
      : undefined;
    return message;
  },
};

function createBaseSetMyMetadataRequest(): SetMyMetadataRequest {
  return { key: "", value: new Uint8Array(0) };
}

export const SetMyMetadataRequest = {
  encode(message: SetMyMetadataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetMyMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetMyMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetMyMetadataRequest {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
    };
  },

  toJSON(message: SetMyMetadataRequest): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetMyMetadataRequest>, I>>(base?: I): SetMyMetadataRequest {
    return SetMyMetadataRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetMyMetadataRequest>, I>>(object: I): SetMyMetadataRequest {
    const message = createBaseSetMyMetadataRequest();
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseSetMyMetadataResponse(): SetMyMetadataResponse {
  return { details: undefined };
}

export const SetMyMetadataResponse = {
  encode(message: SetMyMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetMyMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetMyMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetMyMetadataResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: SetMyMetadataResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetMyMetadataResponse>, I>>(base?: I): SetMyMetadataResponse {
    return SetMyMetadataResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetMyMetadataResponse>, I>>(object: I): SetMyMetadataResponse {
    const message = createBaseSetMyMetadataResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseBulkSetMyMetadataRequest(): BulkSetMyMetadataRequest {
  return { metadata: [] };
}

export const BulkSetMyMetadataRequest = {
  encode(message: BulkSetMyMetadataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.metadata) {
      BulkSetMyMetadataRequest_Metadata.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BulkSetMyMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBulkSetMyMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.metadata.push(BulkSetMyMetadataRequest_Metadata.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BulkSetMyMetadataRequest {
    return {
      metadata: Array.isArray(object?.metadata)
        ? object.metadata.map((e: any) => BulkSetMyMetadataRequest_Metadata.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BulkSetMyMetadataRequest): unknown {
    const obj: any = {};
    if (message.metadata?.length) {
      obj.metadata = message.metadata.map((e) => BulkSetMyMetadataRequest_Metadata.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BulkSetMyMetadataRequest>, I>>(base?: I): BulkSetMyMetadataRequest {
    return BulkSetMyMetadataRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BulkSetMyMetadataRequest>, I>>(object: I): BulkSetMyMetadataRequest {
    const message = createBaseBulkSetMyMetadataRequest();
    message.metadata = object.metadata?.map((e) => BulkSetMyMetadataRequest_Metadata.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBulkSetMyMetadataRequest_Metadata(): BulkSetMyMetadataRequest_Metadata {
  return { key: "", value: new Uint8Array(0) };
}

export const BulkSetMyMetadataRequest_Metadata = {
  encode(message: BulkSetMyMetadataRequest_Metadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BulkSetMyMetadataRequest_Metadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBulkSetMyMetadataRequest_Metadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BulkSetMyMetadataRequest_Metadata {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
    };
  },

  toJSON(message: BulkSetMyMetadataRequest_Metadata): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BulkSetMyMetadataRequest_Metadata>, I>>(
    base?: I,
  ): BulkSetMyMetadataRequest_Metadata {
    return BulkSetMyMetadataRequest_Metadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BulkSetMyMetadataRequest_Metadata>, I>>(
    object: I,
  ): BulkSetMyMetadataRequest_Metadata {
    const message = createBaseBulkSetMyMetadataRequest_Metadata();
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseBulkSetMyMetadataResponse(): BulkSetMyMetadataResponse {
  return { details: undefined };
}

export const BulkSetMyMetadataResponse = {
  encode(message: BulkSetMyMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BulkSetMyMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBulkSetMyMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BulkSetMyMetadataResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: BulkSetMyMetadataResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BulkSetMyMetadataResponse>, I>>(base?: I): BulkSetMyMetadataResponse {
    return BulkSetMyMetadataResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BulkSetMyMetadataResponse>, I>>(object: I): BulkSetMyMetadataResponse {
    const message = createBaseBulkSetMyMetadataResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseRemoveMyMetadataRequest(): RemoveMyMetadataRequest {
  return { key: "" };
}

export const RemoveMyMetadataRequest = {
  encode(message: RemoveMyMetadataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMyMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMyMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveMyMetadataRequest {
    return { key: isSet(object.key) ? String(object.key) : "" };
  },

  toJSON(message: RemoveMyMetadataRequest): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveMyMetadataRequest>, I>>(base?: I): RemoveMyMetadataRequest {
    return RemoveMyMetadataRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveMyMetadataRequest>, I>>(object: I): RemoveMyMetadataRequest {
    const message = createBaseRemoveMyMetadataRequest();
    message.key = object.key ?? "";
    return message;
  },
};

function createBaseRemoveMyMetadataResponse(): RemoveMyMetadataResponse {
  return { details: undefined };
}

export const RemoveMyMetadataResponse = {
  encode(message: RemoveMyMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMyMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMyMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveMyMetadataResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: RemoveMyMetadataResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveMyMetadataResponse>, I>>(base?: I): RemoveMyMetadataResponse {
    return RemoveMyMetadataResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveMyMetadataResponse>, I>>(object: I): RemoveMyMetadataResponse {
    const message = createBaseRemoveMyMetadataResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseBulkRemoveMyMetadataRequest(): BulkRemoveMyMetadataRequest {
  return { keys: [] };
}

export const BulkRemoveMyMetadataRequest = {
  encode(message: BulkRemoveMyMetadataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.keys) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BulkRemoveMyMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBulkRemoveMyMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.keys.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BulkRemoveMyMetadataRequest {
    return { keys: Array.isArray(object?.keys) ? object.keys.map((e: any) => String(e)) : [] };
  },

  toJSON(message: BulkRemoveMyMetadataRequest): unknown {
    const obj: any = {};
    if (message.keys?.length) {
      obj.keys = message.keys;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BulkRemoveMyMetadataRequest>, I>>(base?: I): BulkRemoveMyMetadataRequest {
    return BulkRemoveMyMetadataRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BulkRemoveMyMetadataRequest>, I>>(object: I): BulkRemoveMyMetadataRequest {
    const message = createBaseBulkRemoveMyMetadataRequest();
    message.keys = object.keys?.map((e) => e) || [];
    return message;
  },
};

function createBaseBulkRemoveMyMetadataResponse(): BulkRemoveMyMetadataResponse {
  return { details: undefined };
}

export const BulkRemoveMyMetadataResponse = {
  encode(message: BulkRemoveMyMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BulkRemoveMyMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBulkRemoveMyMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BulkRemoveMyMetadataResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: BulkRemoveMyMetadataResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BulkRemoveMyMetadataResponse>, I>>(base?: I): BulkRemoveMyMetadataResponse {
    return BulkRemoveMyMetadataResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BulkRemoveMyMetadataResponse>, I>>(object: I): BulkRemoveMyMetadataResponse {
    const message = createBaseBulkRemoveMyMetadataResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseListMyRefreshTokensRequest(): ListMyRefreshTokensRequest {
  return {};
}

export const ListMyRefreshTokensRequest = {
  encode(_: ListMyRefreshTokensRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyRefreshTokensRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyRefreshTokensRequest();
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

  fromJSON(_: any): ListMyRefreshTokensRequest {
    return {};
  },

  toJSON(_: ListMyRefreshTokensRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyRefreshTokensRequest>, I>>(base?: I): ListMyRefreshTokensRequest {
    return ListMyRefreshTokensRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyRefreshTokensRequest>, I>>(_: I): ListMyRefreshTokensRequest {
    const message = createBaseListMyRefreshTokensRequest();
    return message;
  },
};

function createBaseListMyRefreshTokensResponse(): ListMyRefreshTokensResponse {
  return { details: undefined, result: [] };
}

export const ListMyRefreshTokensResponse = {
  encode(message: ListMyRefreshTokensResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ListDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.result) {
      RefreshToken.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyRefreshTokensResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyRefreshTokensResponse();
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

          message.result.push(RefreshToken.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyRefreshTokensResponse {
    return {
      details: isSet(object.details) ? ListDetails.fromJSON(object.details) : undefined,
      result: Array.isArray(object?.result) ? object.result.map((e: any) => RefreshToken.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListMyRefreshTokensResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ListDetails.toJSON(message.details);
    }
    if (message.result?.length) {
      obj.result = message.result.map((e) => RefreshToken.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyRefreshTokensResponse>, I>>(base?: I): ListMyRefreshTokensResponse {
    return ListMyRefreshTokensResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyRefreshTokensResponse>, I>>(object: I): ListMyRefreshTokensResponse {
    const message = createBaseListMyRefreshTokensResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ListDetails.fromPartial(object.details)
      : undefined;
    message.result = object.result?.map((e) => RefreshToken.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRevokeMyRefreshTokenRequest(): RevokeMyRefreshTokenRequest {
  return { id: "" };
}

export const RevokeMyRefreshTokenRequest = {
  encode(message: RevokeMyRefreshTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeMyRefreshTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeMyRefreshTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RevokeMyRefreshTokenRequest {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: RevokeMyRefreshTokenRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RevokeMyRefreshTokenRequest>, I>>(base?: I): RevokeMyRefreshTokenRequest {
    return RevokeMyRefreshTokenRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RevokeMyRefreshTokenRequest>, I>>(object: I): RevokeMyRefreshTokenRequest {
    const message = createBaseRevokeMyRefreshTokenRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseRevokeMyRefreshTokenResponse(): RevokeMyRefreshTokenResponse {
  return { details: undefined };
}

export const RevokeMyRefreshTokenResponse = {
  encode(message: RevokeMyRefreshTokenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeMyRefreshTokenResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeMyRefreshTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RevokeMyRefreshTokenResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: RevokeMyRefreshTokenResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RevokeMyRefreshTokenResponse>, I>>(base?: I): RevokeMyRefreshTokenResponse {
    return RevokeMyRefreshTokenResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RevokeMyRefreshTokenResponse>, I>>(object: I): RevokeMyRefreshTokenResponse {
    const message = createBaseRevokeMyRefreshTokenResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseRevokeAllMyRefreshTokensRequest(): RevokeAllMyRefreshTokensRequest {
  return {};
}

export const RevokeAllMyRefreshTokensRequest = {
  encode(_: RevokeAllMyRefreshTokensRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeAllMyRefreshTokensRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeAllMyRefreshTokensRequest();
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

  fromJSON(_: any): RevokeAllMyRefreshTokensRequest {
    return {};
  },

  toJSON(_: RevokeAllMyRefreshTokensRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RevokeAllMyRefreshTokensRequest>, I>>(base?: I): RevokeAllMyRefreshTokensRequest {
    return RevokeAllMyRefreshTokensRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RevokeAllMyRefreshTokensRequest>, I>>(_: I): RevokeAllMyRefreshTokensRequest {
    const message = createBaseRevokeAllMyRefreshTokensRequest();
    return message;
  },
};

function createBaseRevokeAllMyRefreshTokensResponse(): RevokeAllMyRefreshTokensResponse {
  return {};
}

export const RevokeAllMyRefreshTokensResponse = {
  encode(_: RevokeAllMyRefreshTokensResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeAllMyRefreshTokensResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeAllMyRefreshTokensResponse();
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

  fromJSON(_: any): RevokeAllMyRefreshTokensResponse {
    return {};
  },

  toJSON(_: RevokeAllMyRefreshTokensResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RevokeAllMyRefreshTokensResponse>, I>>(
    base?: I,
  ): RevokeAllMyRefreshTokensResponse {
    return RevokeAllMyRefreshTokensResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RevokeAllMyRefreshTokensResponse>, I>>(
    _: I,
  ): RevokeAllMyRefreshTokensResponse {
    const message = createBaseRevokeAllMyRefreshTokensResponse();
    return message;
  },
};

function createBaseUpdateMyUserNameRequest(): UpdateMyUserNameRequest {
  return { userName: "" };
}

export const UpdateMyUserNameRequest = {
  encode(message: UpdateMyUserNameRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userName !== "") {
      writer.uint32(10).string(message.userName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateMyUserNameRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateMyUserNameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateMyUserNameRequest {
    return { userName: isSet(object.userName) ? String(object.userName) : "" };
  },

  toJSON(message: UpdateMyUserNameRequest): unknown {
    const obj: any = {};
    if (message.userName !== "") {
      obj.userName = message.userName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateMyUserNameRequest>, I>>(base?: I): UpdateMyUserNameRequest {
    return UpdateMyUserNameRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateMyUserNameRequest>, I>>(object: I): UpdateMyUserNameRequest {
    const message = createBaseUpdateMyUserNameRequest();
    message.userName = object.userName ?? "";
    return message;
  },
};

function createBaseUpdateMyUserNameResponse(): UpdateMyUserNameResponse {
  return { details: undefined };
}

export const UpdateMyUserNameResponse = {
  encode(message: UpdateMyUserNameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateMyUserNameResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateMyUserNameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateMyUserNameResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: UpdateMyUserNameResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateMyUserNameResponse>, I>>(base?: I): UpdateMyUserNameResponse {
    return UpdateMyUserNameResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateMyUserNameResponse>, I>>(object: I): UpdateMyUserNameResponse {
    const message = createBaseUpdateMyUserNameResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseGetMyPasswordComplexityPolicyRequest(): GetMyPasswordComplexityPolicyRequest {
  return {};
}

export const GetMyPasswordComplexityPolicyRequest = {
  encode(_: GetMyPasswordComplexityPolicyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyPasswordComplexityPolicyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyPasswordComplexityPolicyRequest();
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

  fromJSON(_: any): GetMyPasswordComplexityPolicyRequest {
    return {};
  },

  toJSON(_: GetMyPasswordComplexityPolicyRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyPasswordComplexityPolicyRequest>, I>>(
    base?: I,
  ): GetMyPasswordComplexityPolicyRequest {
    return GetMyPasswordComplexityPolicyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyPasswordComplexityPolicyRequest>, I>>(
    _: I,
  ): GetMyPasswordComplexityPolicyRequest {
    const message = createBaseGetMyPasswordComplexityPolicyRequest();
    return message;
  },
};

function createBaseGetMyPasswordComplexityPolicyResponse(): GetMyPasswordComplexityPolicyResponse {
  return { policy: undefined };
}

export const GetMyPasswordComplexityPolicyResponse = {
  encode(message: GetMyPasswordComplexityPolicyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.policy !== undefined) {
      PasswordComplexityPolicy.encode(message.policy, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyPasswordComplexityPolicyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyPasswordComplexityPolicyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.policy = PasswordComplexityPolicy.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetMyPasswordComplexityPolicyResponse {
    return { policy: isSet(object.policy) ? PasswordComplexityPolicy.fromJSON(object.policy) : undefined };
  },

  toJSON(message: GetMyPasswordComplexityPolicyResponse): unknown {
    const obj: any = {};
    if (message.policy !== undefined) {
      obj.policy = PasswordComplexityPolicy.toJSON(message.policy);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyPasswordComplexityPolicyResponse>, I>>(
    base?: I,
  ): GetMyPasswordComplexityPolicyResponse {
    return GetMyPasswordComplexityPolicyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyPasswordComplexityPolicyResponse>, I>>(
    object: I,
  ): GetMyPasswordComplexityPolicyResponse {
    const message = createBaseGetMyPasswordComplexityPolicyResponse();
    message.policy = (object.policy !== undefined && object.policy !== null)
      ? PasswordComplexityPolicy.fromPartial(object.policy)
      : undefined;
    return message;
  },
};

function createBaseUpdateMyPasswordRequest(): UpdateMyPasswordRequest {
  return { oldPassword: "", newPassword: "" };
}

export const UpdateMyPasswordRequest = {
  encode(message: UpdateMyPasswordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oldPassword !== "") {
      writer.uint32(10).string(message.oldPassword);
    }
    if (message.newPassword !== "") {
      writer.uint32(18).string(message.newPassword);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateMyPasswordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateMyPasswordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.oldPassword = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.newPassword = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateMyPasswordRequest {
    return {
      oldPassword: isSet(object.oldPassword) ? String(object.oldPassword) : "",
      newPassword: isSet(object.newPassword) ? String(object.newPassword) : "",
    };
  },

  toJSON(message: UpdateMyPasswordRequest): unknown {
    const obj: any = {};
    if (message.oldPassword !== "") {
      obj.oldPassword = message.oldPassword;
    }
    if (message.newPassword !== "") {
      obj.newPassword = message.newPassword;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateMyPasswordRequest>, I>>(base?: I): UpdateMyPasswordRequest {
    return UpdateMyPasswordRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateMyPasswordRequest>, I>>(object: I): UpdateMyPasswordRequest {
    const message = createBaseUpdateMyPasswordRequest();
    message.oldPassword = object.oldPassword ?? "";
    message.newPassword = object.newPassword ?? "";
    return message;
  },
};

function createBaseUpdateMyPasswordResponse(): UpdateMyPasswordResponse {
  return { details: undefined };
}

export const UpdateMyPasswordResponse = {
  encode(message: UpdateMyPasswordResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateMyPasswordResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateMyPasswordResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateMyPasswordResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: UpdateMyPasswordResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateMyPasswordResponse>, I>>(base?: I): UpdateMyPasswordResponse {
    return UpdateMyPasswordResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateMyPasswordResponse>, I>>(object: I): UpdateMyPasswordResponse {
    const message = createBaseUpdateMyPasswordResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseGetMyProfileRequest(): GetMyProfileRequest {
  return {};
}

export const GetMyProfileRequest = {
  encode(_: GetMyProfileRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyProfileRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyProfileRequest();
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

  fromJSON(_: any): GetMyProfileRequest {
    return {};
  },

  toJSON(_: GetMyProfileRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyProfileRequest>, I>>(base?: I): GetMyProfileRequest {
    return GetMyProfileRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyProfileRequest>, I>>(_: I): GetMyProfileRequest {
    const message = createBaseGetMyProfileRequest();
    return message;
  },
};

function createBaseGetMyProfileResponse(): GetMyProfileResponse {
  return { details: undefined, profile: undefined };
}

export const GetMyProfileResponse = {
  encode(message: GetMyProfileResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.profile !== undefined) {
      Profile.encode(message.profile, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyProfileResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyProfileResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.profile = Profile.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetMyProfileResponse {
    return {
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      profile: isSet(object.profile) ? Profile.fromJSON(object.profile) : undefined,
    };
  },

  toJSON(message: GetMyProfileResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.profile !== undefined) {
      obj.profile = Profile.toJSON(message.profile);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyProfileResponse>, I>>(base?: I): GetMyProfileResponse {
    return GetMyProfileResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyProfileResponse>, I>>(object: I): GetMyProfileResponse {
    const message = createBaseGetMyProfileResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.profile = (object.profile !== undefined && object.profile !== null)
      ? Profile.fromPartial(object.profile)
      : undefined;
    return message;
  },
};

function createBaseUpdateMyProfileRequest(): UpdateMyProfileRequest {
  return { firstName: "", lastName: "", nickName: "", displayName: "", preferredLanguage: "", gender: 0 };
}

export const UpdateMyProfileRequest = {
  encode(message: UpdateMyProfileRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.firstName !== "") {
      writer.uint32(10).string(message.firstName);
    }
    if (message.lastName !== "") {
      writer.uint32(18).string(message.lastName);
    }
    if (message.nickName !== "") {
      writer.uint32(26).string(message.nickName);
    }
    if (message.displayName !== "") {
      writer.uint32(34).string(message.displayName);
    }
    if (message.preferredLanguage !== "") {
      writer.uint32(42).string(message.preferredLanguage);
    }
    if (message.gender !== 0) {
      writer.uint32(48).int32(message.gender);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateMyProfileRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateMyProfileRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.firstName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nickName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.preferredLanguage = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.gender = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateMyProfileRequest {
    return {
      firstName: isSet(object.firstName) ? String(object.firstName) : "",
      lastName: isSet(object.lastName) ? String(object.lastName) : "",
      nickName: isSet(object.nickName) ? String(object.nickName) : "",
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      preferredLanguage: isSet(object.preferredLanguage) ? String(object.preferredLanguage) : "",
      gender: isSet(object.gender) ? genderFromJSON(object.gender) : 0,
    };
  },

  toJSON(message: UpdateMyProfileRequest): unknown {
    const obj: any = {};
    if (message.firstName !== "") {
      obj.firstName = message.firstName;
    }
    if (message.lastName !== "") {
      obj.lastName = message.lastName;
    }
    if (message.nickName !== "") {
      obj.nickName = message.nickName;
    }
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.preferredLanguage !== "") {
      obj.preferredLanguage = message.preferredLanguage;
    }
    if (message.gender !== 0) {
      obj.gender = genderToJSON(message.gender);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateMyProfileRequest>, I>>(base?: I): UpdateMyProfileRequest {
    return UpdateMyProfileRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateMyProfileRequest>, I>>(object: I): UpdateMyProfileRequest {
    const message = createBaseUpdateMyProfileRequest();
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.nickName = object.nickName ?? "";
    message.displayName = object.displayName ?? "";
    message.preferredLanguage = object.preferredLanguage ?? "";
    message.gender = object.gender ?? 0;
    return message;
  },
};

function createBaseUpdateMyProfileResponse(): UpdateMyProfileResponse {
  return { details: undefined };
}

export const UpdateMyProfileResponse = {
  encode(message: UpdateMyProfileResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateMyProfileResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateMyProfileResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateMyProfileResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: UpdateMyProfileResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateMyProfileResponse>, I>>(base?: I): UpdateMyProfileResponse {
    return UpdateMyProfileResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateMyProfileResponse>, I>>(object: I): UpdateMyProfileResponse {
    const message = createBaseUpdateMyProfileResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseGetMyEmailRequest(): GetMyEmailRequest {
  return {};
}

export const GetMyEmailRequest = {
  encode(_: GetMyEmailRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyEmailRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyEmailRequest();
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

  fromJSON(_: any): GetMyEmailRequest {
    return {};
  },

  toJSON(_: GetMyEmailRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyEmailRequest>, I>>(base?: I): GetMyEmailRequest {
    return GetMyEmailRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyEmailRequest>, I>>(_: I): GetMyEmailRequest {
    const message = createBaseGetMyEmailRequest();
    return message;
  },
};

function createBaseGetMyEmailResponse(): GetMyEmailResponse {
  return { details: undefined, email: undefined };
}

export const GetMyEmailResponse = {
  encode(message: GetMyEmailResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.email !== undefined) {
      Email.encode(message.email, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyEmailResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyEmailResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.email = Email.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetMyEmailResponse {
    return {
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      email: isSet(object.email) ? Email.fromJSON(object.email) : undefined,
    };
  },

  toJSON(message: GetMyEmailResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.email !== undefined) {
      obj.email = Email.toJSON(message.email);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyEmailResponse>, I>>(base?: I): GetMyEmailResponse {
    return GetMyEmailResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyEmailResponse>, I>>(object: I): GetMyEmailResponse {
    const message = createBaseGetMyEmailResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.email = (object.email !== undefined && object.email !== null) ? Email.fromPartial(object.email) : undefined;
    return message;
  },
};

function createBaseSetMyEmailRequest(): SetMyEmailRequest {
  return { email: "" };
}

export const SetMyEmailRequest = {
  encode(message: SetMyEmailRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetMyEmailRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetMyEmailRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetMyEmailRequest {
    return { email: isSet(object.email) ? String(object.email) : "" };
  },

  toJSON(message: SetMyEmailRequest): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetMyEmailRequest>, I>>(base?: I): SetMyEmailRequest {
    return SetMyEmailRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetMyEmailRequest>, I>>(object: I): SetMyEmailRequest {
    const message = createBaseSetMyEmailRequest();
    message.email = object.email ?? "";
    return message;
  },
};

function createBaseSetMyEmailResponse(): SetMyEmailResponse {
  return { details: undefined };
}

export const SetMyEmailResponse = {
  encode(message: SetMyEmailResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetMyEmailResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetMyEmailResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetMyEmailResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: SetMyEmailResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetMyEmailResponse>, I>>(base?: I): SetMyEmailResponse {
    return SetMyEmailResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetMyEmailResponse>, I>>(object: I): SetMyEmailResponse {
    const message = createBaseSetMyEmailResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseVerifyMyEmailRequest(): VerifyMyEmailRequest {
  return { code: "" };
}

export const VerifyMyEmailRequest = {
  encode(message: VerifyMyEmailRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyMyEmailRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyMyEmailRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.code = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyMyEmailRequest {
    return { code: isSet(object.code) ? String(object.code) : "" };
  },

  toJSON(message: VerifyMyEmailRequest): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyMyEmailRequest>, I>>(base?: I): VerifyMyEmailRequest {
    return VerifyMyEmailRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyMyEmailRequest>, I>>(object: I): VerifyMyEmailRequest {
    const message = createBaseVerifyMyEmailRequest();
    message.code = object.code ?? "";
    return message;
  },
};

function createBaseVerifyMyEmailResponse(): VerifyMyEmailResponse {
  return { details: undefined };
}

export const VerifyMyEmailResponse = {
  encode(message: VerifyMyEmailResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyMyEmailResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyMyEmailResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyMyEmailResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: VerifyMyEmailResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyMyEmailResponse>, I>>(base?: I): VerifyMyEmailResponse {
    return VerifyMyEmailResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyMyEmailResponse>, I>>(object: I): VerifyMyEmailResponse {
    const message = createBaseVerifyMyEmailResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseResendMyEmailVerificationRequest(): ResendMyEmailVerificationRequest {
  return {};
}

export const ResendMyEmailVerificationRequest = {
  encode(_: ResendMyEmailVerificationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResendMyEmailVerificationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResendMyEmailVerificationRequest();
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

  fromJSON(_: any): ResendMyEmailVerificationRequest {
    return {};
  },

  toJSON(_: ResendMyEmailVerificationRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ResendMyEmailVerificationRequest>, I>>(
    base?: I,
  ): ResendMyEmailVerificationRequest {
    return ResendMyEmailVerificationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResendMyEmailVerificationRequest>, I>>(
    _: I,
  ): ResendMyEmailVerificationRequest {
    const message = createBaseResendMyEmailVerificationRequest();
    return message;
  },
};

function createBaseResendMyEmailVerificationResponse(): ResendMyEmailVerificationResponse {
  return { details: undefined };
}

export const ResendMyEmailVerificationResponse = {
  encode(message: ResendMyEmailVerificationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResendMyEmailVerificationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResendMyEmailVerificationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResendMyEmailVerificationResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: ResendMyEmailVerificationResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResendMyEmailVerificationResponse>, I>>(
    base?: I,
  ): ResendMyEmailVerificationResponse {
    return ResendMyEmailVerificationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResendMyEmailVerificationResponse>, I>>(
    object: I,
  ): ResendMyEmailVerificationResponse {
    const message = createBaseResendMyEmailVerificationResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseGetMyPhoneRequest(): GetMyPhoneRequest {
  return {};
}

export const GetMyPhoneRequest = {
  encode(_: GetMyPhoneRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyPhoneRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyPhoneRequest();
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

  fromJSON(_: any): GetMyPhoneRequest {
    return {};
  },

  toJSON(_: GetMyPhoneRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyPhoneRequest>, I>>(base?: I): GetMyPhoneRequest {
    return GetMyPhoneRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyPhoneRequest>, I>>(_: I): GetMyPhoneRequest {
    const message = createBaseGetMyPhoneRequest();
    return message;
  },
};

function createBaseGetMyPhoneResponse(): GetMyPhoneResponse {
  return { details: undefined, phone: undefined };
}

export const GetMyPhoneResponse = {
  encode(message: GetMyPhoneResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.phone !== undefined) {
      Phone.encode(message.phone, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyPhoneResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyPhoneResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.phone = Phone.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetMyPhoneResponse {
    return {
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      phone: isSet(object.phone) ? Phone.fromJSON(object.phone) : undefined,
    };
  },

  toJSON(message: GetMyPhoneResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.phone !== undefined) {
      obj.phone = Phone.toJSON(message.phone);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyPhoneResponse>, I>>(base?: I): GetMyPhoneResponse {
    return GetMyPhoneResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyPhoneResponse>, I>>(object: I): GetMyPhoneResponse {
    const message = createBaseGetMyPhoneResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.phone = (object.phone !== undefined && object.phone !== null) ? Phone.fromPartial(object.phone) : undefined;
    return message;
  },
};

function createBaseSetMyPhoneRequest(): SetMyPhoneRequest {
  return { phone: "" };
}

export const SetMyPhoneRequest = {
  encode(message: SetMyPhoneRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.phone !== "") {
      writer.uint32(10).string(message.phone);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetMyPhoneRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetMyPhoneRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.phone = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetMyPhoneRequest {
    return { phone: isSet(object.phone) ? String(object.phone) : "" };
  },

  toJSON(message: SetMyPhoneRequest): unknown {
    const obj: any = {};
    if (message.phone !== "") {
      obj.phone = message.phone;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetMyPhoneRequest>, I>>(base?: I): SetMyPhoneRequest {
    return SetMyPhoneRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetMyPhoneRequest>, I>>(object: I): SetMyPhoneRequest {
    const message = createBaseSetMyPhoneRequest();
    message.phone = object.phone ?? "";
    return message;
  },
};

function createBaseSetMyPhoneResponse(): SetMyPhoneResponse {
  return { details: undefined };
}

export const SetMyPhoneResponse = {
  encode(message: SetMyPhoneResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetMyPhoneResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetMyPhoneResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetMyPhoneResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: SetMyPhoneResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetMyPhoneResponse>, I>>(base?: I): SetMyPhoneResponse {
    return SetMyPhoneResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetMyPhoneResponse>, I>>(object: I): SetMyPhoneResponse {
    const message = createBaseSetMyPhoneResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseVerifyMyPhoneRequest(): VerifyMyPhoneRequest {
  return { code: "" };
}

export const VerifyMyPhoneRequest = {
  encode(message: VerifyMyPhoneRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyMyPhoneRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyMyPhoneRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.code = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyMyPhoneRequest {
    return { code: isSet(object.code) ? String(object.code) : "" };
  },

  toJSON(message: VerifyMyPhoneRequest): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyMyPhoneRequest>, I>>(base?: I): VerifyMyPhoneRequest {
    return VerifyMyPhoneRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyMyPhoneRequest>, I>>(object: I): VerifyMyPhoneRequest {
    const message = createBaseVerifyMyPhoneRequest();
    message.code = object.code ?? "";
    return message;
  },
};

function createBaseVerifyMyPhoneResponse(): VerifyMyPhoneResponse {
  return { details: undefined };
}

export const VerifyMyPhoneResponse = {
  encode(message: VerifyMyPhoneResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyMyPhoneResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyMyPhoneResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyMyPhoneResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: VerifyMyPhoneResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyMyPhoneResponse>, I>>(base?: I): VerifyMyPhoneResponse {
    return VerifyMyPhoneResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyMyPhoneResponse>, I>>(object: I): VerifyMyPhoneResponse {
    const message = createBaseVerifyMyPhoneResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseResendMyPhoneVerificationRequest(): ResendMyPhoneVerificationRequest {
  return {};
}

export const ResendMyPhoneVerificationRequest = {
  encode(_: ResendMyPhoneVerificationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResendMyPhoneVerificationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResendMyPhoneVerificationRequest();
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

  fromJSON(_: any): ResendMyPhoneVerificationRequest {
    return {};
  },

  toJSON(_: ResendMyPhoneVerificationRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ResendMyPhoneVerificationRequest>, I>>(
    base?: I,
  ): ResendMyPhoneVerificationRequest {
    return ResendMyPhoneVerificationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResendMyPhoneVerificationRequest>, I>>(
    _: I,
  ): ResendMyPhoneVerificationRequest {
    const message = createBaseResendMyPhoneVerificationRequest();
    return message;
  },
};

function createBaseResendMyPhoneVerificationResponse(): ResendMyPhoneVerificationResponse {
  return { details: undefined };
}

export const ResendMyPhoneVerificationResponse = {
  encode(message: ResendMyPhoneVerificationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResendMyPhoneVerificationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResendMyPhoneVerificationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResendMyPhoneVerificationResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: ResendMyPhoneVerificationResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResendMyPhoneVerificationResponse>, I>>(
    base?: I,
  ): ResendMyPhoneVerificationResponse {
    return ResendMyPhoneVerificationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResendMyPhoneVerificationResponse>, I>>(
    object: I,
  ): ResendMyPhoneVerificationResponse {
    const message = createBaseResendMyPhoneVerificationResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseRemoveMyPhoneRequest(): RemoveMyPhoneRequest {
  return {};
}

export const RemoveMyPhoneRequest = {
  encode(_: RemoveMyPhoneRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMyPhoneRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMyPhoneRequest();
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

  fromJSON(_: any): RemoveMyPhoneRequest {
    return {};
  },

  toJSON(_: RemoveMyPhoneRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveMyPhoneRequest>, I>>(base?: I): RemoveMyPhoneRequest {
    return RemoveMyPhoneRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveMyPhoneRequest>, I>>(_: I): RemoveMyPhoneRequest {
    const message = createBaseRemoveMyPhoneRequest();
    return message;
  },
};

function createBaseRemoveMyPhoneResponse(): RemoveMyPhoneResponse {
  return { details: undefined };
}

export const RemoveMyPhoneResponse = {
  encode(message: RemoveMyPhoneResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMyPhoneResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMyPhoneResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveMyPhoneResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: RemoveMyPhoneResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveMyPhoneResponse>, I>>(base?: I): RemoveMyPhoneResponse {
    return RemoveMyPhoneResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveMyPhoneResponse>, I>>(object: I): RemoveMyPhoneResponse {
    const message = createBaseRemoveMyPhoneResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseRemoveMyAvatarRequest(): RemoveMyAvatarRequest {
  return {};
}

export const RemoveMyAvatarRequest = {
  encode(_: RemoveMyAvatarRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMyAvatarRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMyAvatarRequest();
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

  fromJSON(_: any): RemoveMyAvatarRequest {
    return {};
  },

  toJSON(_: RemoveMyAvatarRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveMyAvatarRequest>, I>>(base?: I): RemoveMyAvatarRequest {
    return RemoveMyAvatarRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveMyAvatarRequest>, I>>(_: I): RemoveMyAvatarRequest {
    const message = createBaseRemoveMyAvatarRequest();
    return message;
  },
};

function createBaseRemoveMyAvatarResponse(): RemoveMyAvatarResponse {
  return { details: undefined };
}

export const RemoveMyAvatarResponse = {
  encode(message: RemoveMyAvatarResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMyAvatarResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMyAvatarResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveMyAvatarResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: RemoveMyAvatarResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveMyAvatarResponse>, I>>(base?: I): RemoveMyAvatarResponse {
    return RemoveMyAvatarResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveMyAvatarResponse>, I>>(object: I): RemoveMyAvatarResponse {
    const message = createBaseRemoveMyAvatarResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseListMyLinkedIDPsRequest(): ListMyLinkedIDPsRequest {
  return { query: undefined };
}

export const ListMyLinkedIDPsRequest = {
  encode(message: ListMyLinkedIDPsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== undefined) {
      ListQuery.encode(message.query, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyLinkedIDPsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyLinkedIDPsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.query = ListQuery.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyLinkedIDPsRequest {
    return { query: isSet(object.query) ? ListQuery.fromJSON(object.query) : undefined };
  },

  toJSON(message: ListMyLinkedIDPsRequest): unknown {
    const obj: any = {};
    if (message.query !== undefined) {
      obj.query = ListQuery.toJSON(message.query);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyLinkedIDPsRequest>, I>>(base?: I): ListMyLinkedIDPsRequest {
    return ListMyLinkedIDPsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyLinkedIDPsRequest>, I>>(object: I): ListMyLinkedIDPsRequest {
    const message = createBaseListMyLinkedIDPsRequest();
    message.query = (object.query !== undefined && object.query !== null)
      ? ListQuery.fromPartial(object.query)
      : undefined;
    return message;
  },
};

function createBaseListMyLinkedIDPsResponse(): ListMyLinkedIDPsResponse {
  return { details: undefined, result: [] };
}

export const ListMyLinkedIDPsResponse = {
  encode(message: ListMyLinkedIDPsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ListDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.result) {
      IDPUserLink.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyLinkedIDPsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyLinkedIDPsResponse();
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

          message.result.push(IDPUserLink.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyLinkedIDPsResponse {
    return {
      details: isSet(object.details) ? ListDetails.fromJSON(object.details) : undefined,
      result: Array.isArray(object?.result) ? object.result.map((e: any) => IDPUserLink.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListMyLinkedIDPsResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ListDetails.toJSON(message.details);
    }
    if (message.result?.length) {
      obj.result = message.result.map((e) => IDPUserLink.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyLinkedIDPsResponse>, I>>(base?: I): ListMyLinkedIDPsResponse {
    return ListMyLinkedIDPsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyLinkedIDPsResponse>, I>>(object: I): ListMyLinkedIDPsResponse {
    const message = createBaseListMyLinkedIDPsResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ListDetails.fromPartial(object.details)
      : undefined;
    message.result = object.result?.map((e) => IDPUserLink.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRemoveMyLinkedIDPRequest(): RemoveMyLinkedIDPRequest {
  return { idpId: "", linkedUserId: "" };
}

export const RemoveMyLinkedIDPRequest = {
  encode(message: RemoveMyLinkedIDPRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.idpId !== "") {
      writer.uint32(10).string(message.idpId);
    }
    if (message.linkedUserId !== "") {
      writer.uint32(18).string(message.linkedUserId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMyLinkedIDPRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMyLinkedIDPRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.idpId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.linkedUserId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveMyLinkedIDPRequest {
    return {
      idpId: isSet(object.idpId) ? String(object.idpId) : "",
      linkedUserId: isSet(object.linkedUserId) ? String(object.linkedUserId) : "",
    };
  },

  toJSON(message: RemoveMyLinkedIDPRequest): unknown {
    const obj: any = {};
    if (message.idpId !== "") {
      obj.idpId = message.idpId;
    }
    if (message.linkedUserId !== "") {
      obj.linkedUserId = message.linkedUserId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveMyLinkedIDPRequest>, I>>(base?: I): RemoveMyLinkedIDPRequest {
    return RemoveMyLinkedIDPRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveMyLinkedIDPRequest>, I>>(object: I): RemoveMyLinkedIDPRequest {
    const message = createBaseRemoveMyLinkedIDPRequest();
    message.idpId = object.idpId ?? "";
    message.linkedUserId = object.linkedUserId ?? "";
    return message;
  },
};

function createBaseRemoveMyLinkedIDPResponse(): RemoveMyLinkedIDPResponse {
  return { details: undefined };
}

export const RemoveMyLinkedIDPResponse = {
  encode(message: RemoveMyLinkedIDPResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMyLinkedIDPResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMyLinkedIDPResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveMyLinkedIDPResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: RemoveMyLinkedIDPResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveMyLinkedIDPResponse>, I>>(base?: I): RemoveMyLinkedIDPResponse {
    return RemoveMyLinkedIDPResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveMyLinkedIDPResponse>, I>>(object: I): RemoveMyLinkedIDPResponse {
    const message = createBaseRemoveMyLinkedIDPResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseListMyAuthFactorsRequest(): ListMyAuthFactorsRequest {
  return {};
}

export const ListMyAuthFactorsRequest = {
  encode(_: ListMyAuthFactorsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyAuthFactorsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyAuthFactorsRequest();
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

  fromJSON(_: any): ListMyAuthFactorsRequest {
    return {};
  },

  toJSON(_: ListMyAuthFactorsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyAuthFactorsRequest>, I>>(base?: I): ListMyAuthFactorsRequest {
    return ListMyAuthFactorsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyAuthFactorsRequest>, I>>(_: I): ListMyAuthFactorsRequest {
    const message = createBaseListMyAuthFactorsRequest();
    return message;
  },
};

function createBaseListMyAuthFactorsResponse(): ListMyAuthFactorsResponse {
  return { result: [] };
}

export const ListMyAuthFactorsResponse = {
  encode(message: ListMyAuthFactorsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.result) {
      AuthFactor.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyAuthFactorsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyAuthFactorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.result.push(AuthFactor.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyAuthFactorsResponse {
    return { result: Array.isArray(object?.result) ? object.result.map((e: any) => AuthFactor.fromJSON(e)) : [] };
  },

  toJSON(message: ListMyAuthFactorsResponse): unknown {
    const obj: any = {};
    if (message.result?.length) {
      obj.result = message.result.map((e) => AuthFactor.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyAuthFactorsResponse>, I>>(base?: I): ListMyAuthFactorsResponse {
    return ListMyAuthFactorsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyAuthFactorsResponse>, I>>(object: I): ListMyAuthFactorsResponse {
    const message = createBaseListMyAuthFactorsResponse();
    message.result = object.result?.map((e) => AuthFactor.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAddMyAuthFactorU2FRequest(): AddMyAuthFactorU2FRequest {
  return {};
}

export const AddMyAuthFactorU2FRequest = {
  encode(_: AddMyAuthFactorU2FRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddMyAuthFactorU2FRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddMyAuthFactorU2FRequest();
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

  fromJSON(_: any): AddMyAuthFactorU2FRequest {
    return {};
  },

  toJSON(_: AddMyAuthFactorU2FRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<AddMyAuthFactorU2FRequest>, I>>(base?: I): AddMyAuthFactorU2FRequest {
    return AddMyAuthFactorU2FRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddMyAuthFactorU2FRequest>, I>>(_: I): AddMyAuthFactorU2FRequest {
    const message = createBaseAddMyAuthFactorU2FRequest();
    return message;
  },
};

function createBaseAddMyAuthFactorU2FResponse(): AddMyAuthFactorU2FResponse {
  return { key: undefined, details: undefined };
}

export const AddMyAuthFactorU2FResponse = {
  encode(message: AddMyAuthFactorU2FResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== undefined) {
      WebAuthNKey.encode(message.key, writer.uint32(10).fork()).ldelim();
    }
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddMyAuthFactorU2FResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddMyAuthFactorU2FResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = WebAuthNKey.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddMyAuthFactorU2FResponse {
    return {
      key: isSet(object.key) ? WebAuthNKey.fromJSON(object.key) : undefined,
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
    };
  },

  toJSON(message: AddMyAuthFactorU2FResponse): unknown {
    const obj: any = {};
    if (message.key !== undefined) {
      obj.key = WebAuthNKey.toJSON(message.key);
    }
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddMyAuthFactorU2FResponse>, I>>(base?: I): AddMyAuthFactorU2FResponse {
    return AddMyAuthFactorU2FResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddMyAuthFactorU2FResponse>, I>>(object: I): AddMyAuthFactorU2FResponse {
    const message = createBaseAddMyAuthFactorU2FResponse();
    message.key = (object.key !== undefined && object.key !== null) ? WebAuthNKey.fromPartial(object.key) : undefined;
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseAddMyAuthFactorOTPRequest(): AddMyAuthFactorOTPRequest {
  return {};
}

export const AddMyAuthFactorOTPRequest = {
  encode(_: AddMyAuthFactorOTPRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddMyAuthFactorOTPRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddMyAuthFactorOTPRequest();
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

  fromJSON(_: any): AddMyAuthFactorOTPRequest {
    return {};
  },

  toJSON(_: AddMyAuthFactorOTPRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<AddMyAuthFactorOTPRequest>, I>>(base?: I): AddMyAuthFactorOTPRequest {
    return AddMyAuthFactorOTPRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddMyAuthFactorOTPRequest>, I>>(_: I): AddMyAuthFactorOTPRequest {
    const message = createBaseAddMyAuthFactorOTPRequest();
    return message;
  },
};

function createBaseAddMyAuthFactorOTPResponse(): AddMyAuthFactorOTPResponse {
  return { url: "", secret: "", details: undefined };
}

export const AddMyAuthFactorOTPResponse = {
  encode(message: AddMyAuthFactorOTPResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    if (message.secret !== "") {
      writer.uint32(18).string(message.secret);
    }
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddMyAuthFactorOTPResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddMyAuthFactorOTPResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.url = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.secret = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddMyAuthFactorOTPResponse {
    return {
      url: isSet(object.url) ? String(object.url) : "",
      secret: isSet(object.secret) ? String(object.secret) : "",
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
    };
  },

  toJSON(message: AddMyAuthFactorOTPResponse): unknown {
    const obj: any = {};
    if (message.url !== "") {
      obj.url = message.url;
    }
    if (message.secret !== "") {
      obj.secret = message.secret;
    }
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddMyAuthFactorOTPResponse>, I>>(base?: I): AddMyAuthFactorOTPResponse {
    return AddMyAuthFactorOTPResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddMyAuthFactorOTPResponse>, I>>(object: I): AddMyAuthFactorOTPResponse {
    const message = createBaseAddMyAuthFactorOTPResponse();
    message.url = object.url ?? "";
    message.secret = object.secret ?? "";
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseVerifyMyAuthFactorOTPRequest(): VerifyMyAuthFactorOTPRequest {
  return { code: "" };
}

export const VerifyMyAuthFactorOTPRequest = {
  encode(message: VerifyMyAuthFactorOTPRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyMyAuthFactorOTPRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyMyAuthFactorOTPRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.code = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyMyAuthFactorOTPRequest {
    return { code: isSet(object.code) ? String(object.code) : "" };
  },

  toJSON(message: VerifyMyAuthFactorOTPRequest): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyMyAuthFactorOTPRequest>, I>>(base?: I): VerifyMyAuthFactorOTPRequest {
    return VerifyMyAuthFactorOTPRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyMyAuthFactorOTPRequest>, I>>(object: I): VerifyMyAuthFactorOTPRequest {
    const message = createBaseVerifyMyAuthFactorOTPRequest();
    message.code = object.code ?? "";
    return message;
  },
};

function createBaseVerifyMyAuthFactorOTPResponse(): VerifyMyAuthFactorOTPResponse {
  return { details: undefined };
}

export const VerifyMyAuthFactorOTPResponse = {
  encode(message: VerifyMyAuthFactorOTPResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyMyAuthFactorOTPResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyMyAuthFactorOTPResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyMyAuthFactorOTPResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: VerifyMyAuthFactorOTPResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyMyAuthFactorOTPResponse>, I>>(base?: I): VerifyMyAuthFactorOTPResponse {
    return VerifyMyAuthFactorOTPResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyMyAuthFactorOTPResponse>, I>>(
    object: I,
  ): VerifyMyAuthFactorOTPResponse {
    const message = createBaseVerifyMyAuthFactorOTPResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseVerifyMyAuthFactorU2FRequest(): VerifyMyAuthFactorU2FRequest {
  return { verification: undefined };
}

export const VerifyMyAuthFactorU2FRequest = {
  encode(message: VerifyMyAuthFactorU2FRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.verification !== undefined) {
      WebAuthNVerification.encode(message.verification, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyMyAuthFactorU2FRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyMyAuthFactorU2FRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.verification = WebAuthNVerification.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyMyAuthFactorU2FRequest {
    return {
      verification: isSet(object.verification) ? WebAuthNVerification.fromJSON(object.verification) : undefined,
    };
  },

  toJSON(message: VerifyMyAuthFactorU2FRequest): unknown {
    const obj: any = {};
    if (message.verification !== undefined) {
      obj.verification = WebAuthNVerification.toJSON(message.verification);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyMyAuthFactorU2FRequest>, I>>(base?: I): VerifyMyAuthFactorU2FRequest {
    return VerifyMyAuthFactorU2FRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyMyAuthFactorU2FRequest>, I>>(object: I): VerifyMyAuthFactorU2FRequest {
    const message = createBaseVerifyMyAuthFactorU2FRequest();
    message.verification = (object.verification !== undefined && object.verification !== null)
      ? WebAuthNVerification.fromPartial(object.verification)
      : undefined;
    return message;
  },
};

function createBaseVerifyMyAuthFactorU2FResponse(): VerifyMyAuthFactorU2FResponse {
  return { details: undefined };
}

export const VerifyMyAuthFactorU2FResponse = {
  encode(message: VerifyMyAuthFactorU2FResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyMyAuthFactorU2FResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyMyAuthFactorU2FResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyMyAuthFactorU2FResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: VerifyMyAuthFactorU2FResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyMyAuthFactorU2FResponse>, I>>(base?: I): VerifyMyAuthFactorU2FResponse {
    return VerifyMyAuthFactorU2FResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyMyAuthFactorU2FResponse>, I>>(
    object: I,
  ): VerifyMyAuthFactorU2FResponse {
    const message = createBaseVerifyMyAuthFactorU2FResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseRemoveMyAuthFactorOTPRequest(): RemoveMyAuthFactorOTPRequest {
  return {};
}

export const RemoveMyAuthFactorOTPRequest = {
  encode(_: RemoveMyAuthFactorOTPRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMyAuthFactorOTPRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMyAuthFactorOTPRequest();
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

  fromJSON(_: any): RemoveMyAuthFactorOTPRequest {
    return {};
  },

  toJSON(_: RemoveMyAuthFactorOTPRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveMyAuthFactorOTPRequest>, I>>(base?: I): RemoveMyAuthFactorOTPRequest {
    return RemoveMyAuthFactorOTPRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveMyAuthFactorOTPRequest>, I>>(_: I): RemoveMyAuthFactorOTPRequest {
    const message = createBaseRemoveMyAuthFactorOTPRequest();
    return message;
  },
};

function createBaseRemoveMyAuthFactorOTPResponse(): RemoveMyAuthFactorOTPResponse {
  return { details: undefined };
}

export const RemoveMyAuthFactorOTPResponse = {
  encode(message: RemoveMyAuthFactorOTPResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMyAuthFactorOTPResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMyAuthFactorOTPResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveMyAuthFactorOTPResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: RemoveMyAuthFactorOTPResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveMyAuthFactorOTPResponse>, I>>(base?: I): RemoveMyAuthFactorOTPResponse {
    return RemoveMyAuthFactorOTPResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveMyAuthFactorOTPResponse>, I>>(
    object: I,
  ): RemoveMyAuthFactorOTPResponse {
    const message = createBaseRemoveMyAuthFactorOTPResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseRemoveMyAuthFactorU2FRequest(): RemoveMyAuthFactorU2FRequest {
  return { tokenId: "" };
}

export const RemoveMyAuthFactorU2FRequest = {
  encode(message: RemoveMyAuthFactorU2FRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tokenId !== "") {
      writer.uint32(10).string(message.tokenId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMyAuthFactorU2FRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMyAuthFactorU2FRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tokenId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveMyAuthFactorU2FRequest {
    return { tokenId: isSet(object.tokenId) ? String(object.tokenId) : "" };
  },

  toJSON(message: RemoveMyAuthFactorU2FRequest): unknown {
    const obj: any = {};
    if (message.tokenId !== "") {
      obj.tokenId = message.tokenId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveMyAuthFactorU2FRequest>, I>>(base?: I): RemoveMyAuthFactorU2FRequest {
    return RemoveMyAuthFactorU2FRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveMyAuthFactorU2FRequest>, I>>(object: I): RemoveMyAuthFactorU2FRequest {
    const message = createBaseRemoveMyAuthFactorU2FRequest();
    message.tokenId = object.tokenId ?? "";
    return message;
  },
};

function createBaseRemoveMyAuthFactorU2FResponse(): RemoveMyAuthFactorU2FResponse {
  return { details: undefined };
}

export const RemoveMyAuthFactorU2FResponse = {
  encode(message: RemoveMyAuthFactorU2FResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMyAuthFactorU2FResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMyAuthFactorU2FResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveMyAuthFactorU2FResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: RemoveMyAuthFactorU2FResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveMyAuthFactorU2FResponse>, I>>(base?: I): RemoveMyAuthFactorU2FResponse {
    return RemoveMyAuthFactorU2FResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveMyAuthFactorU2FResponse>, I>>(
    object: I,
  ): RemoveMyAuthFactorU2FResponse {
    const message = createBaseRemoveMyAuthFactorU2FResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseListMyPasswordlessRequest(): ListMyPasswordlessRequest {
  return {};
}

export const ListMyPasswordlessRequest = {
  encode(_: ListMyPasswordlessRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyPasswordlessRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyPasswordlessRequest();
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

  fromJSON(_: any): ListMyPasswordlessRequest {
    return {};
  },

  toJSON(_: ListMyPasswordlessRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyPasswordlessRequest>, I>>(base?: I): ListMyPasswordlessRequest {
    return ListMyPasswordlessRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyPasswordlessRequest>, I>>(_: I): ListMyPasswordlessRequest {
    const message = createBaseListMyPasswordlessRequest();
    return message;
  },
};

function createBaseListMyPasswordlessResponse(): ListMyPasswordlessResponse {
  return { result: [] };
}

export const ListMyPasswordlessResponse = {
  encode(message: ListMyPasswordlessResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.result) {
      WebAuthNToken.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyPasswordlessResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyPasswordlessResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.result.push(WebAuthNToken.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyPasswordlessResponse {
    return { result: Array.isArray(object?.result) ? object.result.map((e: any) => WebAuthNToken.fromJSON(e)) : [] };
  },

  toJSON(message: ListMyPasswordlessResponse): unknown {
    const obj: any = {};
    if (message.result?.length) {
      obj.result = message.result.map((e) => WebAuthNToken.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyPasswordlessResponse>, I>>(base?: I): ListMyPasswordlessResponse {
    return ListMyPasswordlessResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyPasswordlessResponse>, I>>(object: I): ListMyPasswordlessResponse {
    const message = createBaseListMyPasswordlessResponse();
    message.result = object.result?.map((e) => WebAuthNToken.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAddMyPasswordlessRequest(): AddMyPasswordlessRequest {
  return {};
}

export const AddMyPasswordlessRequest = {
  encode(_: AddMyPasswordlessRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddMyPasswordlessRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddMyPasswordlessRequest();
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

  fromJSON(_: any): AddMyPasswordlessRequest {
    return {};
  },

  toJSON(_: AddMyPasswordlessRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<AddMyPasswordlessRequest>, I>>(base?: I): AddMyPasswordlessRequest {
    return AddMyPasswordlessRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddMyPasswordlessRequest>, I>>(_: I): AddMyPasswordlessRequest {
    const message = createBaseAddMyPasswordlessRequest();
    return message;
  },
};

function createBaseAddMyPasswordlessResponse(): AddMyPasswordlessResponse {
  return { key: undefined, details: undefined };
}

export const AddMyPasswordlessResponse = {
  encode(message: AddMyPasswordlessResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== undefined) {
      WebAuthNKey.encode(message.key, writer.uint32(10).fork()).ldelim();
    }
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddMyPasswordlessResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddMyPasswordlessResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = WebAuthNKey.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddMyPasswordlessResponse {
    return {
      key: isSet(object.key) ? WebAuthNKey.fromJSON(object.key) : undefined,
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
    };
  },

  toJSON(message: AddMyPasswordlessResponse): unknown {
    const obj: any = {};
    if (message.key !== undefined) {
      obj.key = WebAuthNKey.toJSON(message.key);
    }
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddMyPasswordlessResponse>, I>>(base?: I): AddMyPasswordlessResponse {
    return AddMyPasswordlessResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddMyPasswordlessResponse>, I>>(object: I): AddMyPasswordlessResponse {
    const message = createBaseAddMyPasswordlessResponse();
    message.key = (object.key !== undefined && object.key !== null) ? WebAuthNKey.fromPartial(object.key) : undefined;
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseAddMyPasswordlessLinkRequest(): AddMyPasswordlessLinkRequest {
  return {};
}

export const AddMyPasswordlessLinkRequest = {
  encode(_: AddMyPasswordlessLinkRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddMyPasswordlessLinkRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddMyPasswordlessLinkRequest();
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

  fromJSON(_: any): AddMyPasswordlessLinkRequest {
    return {};
  },

  toJSON(_: AddMyPasswordlessLinkRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<AddMyPasswordlessLinkRequest>, I>>(base?: I): AddMyPasswordlessLinkRequest {
    return AddMyPasswordlessLinkRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddMyPasswordlessLinkRequest>, I>>(_: I): AddMyPasswordlessLinkRequest {
    const message = createBaseAddMyPasswordlessLinkRequest();
    return message;
  },
};

function createBaseAddMyPasswordlessLinkResponse(): AddMyPasswordlessLinkResponse {
  return { details: undefined, link: "", expiration: undefined };
}

export const AddMyPasswordlessLinkResponse = {
  encode(message: AddMyPasswordlessLinkResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.link !== "") {
      writer.uint32(18).string(message.link);
    }
    if (message.expiration !== undefined) {
      Duration.encode(message.expiration, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddMyPasswordlessLinkResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddMyPasswordlessLinkResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.link = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.expiration = Duration.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddMyPasswordlessLinkResponse {
    return {
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      link: isSet(object.link) ? String(object.link) : "",
      expiration: isSet(object.expiration) ? Duration.fromJSON(object.expiration) : undefined,
    };
  },

  toJSON(message: AddMyPasswordlessLinkResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.link !== "") {
      obj.link = message.link;
    }
    if (message.expiration !== undefined) {
      obj.expiration = Duration.toJSON(message.expiration);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddMyPasswordlessLinkResponse>, I>>(base?: I): AddMyPasswordlessLinkResponse {
    return AddMyPasswordlessLinkResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddMyPasswordlessLinkResponse>, I>>(
    object: I,
  ): AddMyPasswordlessLinkResponse {
    const message = createBaseAddMyPasswordlessLinkResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.link = object.link ?? "";
    message.expiration = (object.expiration !== undefined && object.expiration !== null)
      ? Duration.fromPartial(object.expiration)
      : undefined;
    return message;
  },
};

function createBaseSendMyPasswordlessLinkRequest(): SendMyPasswordlessLinkRequest {
  return {};
}

export const SendMyPasswordlessLinkRequest = {
  encode(_: SendMyPasswordlessLinkRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendMyPasswordlessLinkRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendMyPasswordlessLinkRequest();
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

  fromJSON(_: any): SendMyPasswordlessLinkRequest {
    return {};
  },

  toJSON(_: SendMyPasswordlessLinkRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<SendMyPasswordlessLinkRequest>, I>>(base?: I): SendMyPasswordlessLinkRequest {
    return SendMyPasswordlessLinkRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendMyPasswordlessLinkRequest>, I>>(_: I): SendMyPasswordlessLinkRequest {
    const message = createBaseSendMyPasswordlessLinkRequest();
    return message;
  },
};

function createBaseSendMyPasswordlessLinkResponse(): SendMyPasswordlessLinkResponse {
  return { details: undefined };
}

export const SendMyPasswordlessLinkResponse = {
  encode(message: SendMyPasswordlessLinkResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendMyPasswordlessLinkResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendMyPasswordlessLinkResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendMyPasswordlessLinkResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: SendMyPasswordlessLinkResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendMyPasswordlessLinkResponse>, I>>(base?: I): SendMyPasswordlessLinkResponse {
    return SendMyPasswordlessLinkResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendMyPasswordlessLinkResponse>, I>>(
    object: I,
  ): SendMyPasswordlessLinkResponse {
    const message = createBaseSendMyPasswordlessLinkResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseVerifyMyPasswordlessRequest(): VerifyMyPasswordlessRequest {
  return { verification: undefined };
}

export const VerifyMyPasswordlessRequest = {
  encode(message: VerifyMyPasswordlessRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.verification !== undefined) {
      WebAuthNVerification.encode(message.verification, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyMyPasswordlessRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyMyPasswordlessRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.verification = WebAuthNVerification.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyMyPasswordlessRequest {
    return {
      verification: isSet(object.verification) ? WebAuthNVerification.fromJSON(object.verification) : undefined,
    };
  },

  toJSON(message: VerifyMyPasswordlessRequest): unknown {
    const obj: any = {};
    if (message.verification !== undefined) {
      obj.verification = WebAuthNVerification.toJSON(message.verification);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyMyPasswordlessRequest>, I>>(base?: I): VerifyMyPasswordlessRequest {
    return VerifyMyPasswordlessRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyMyPasswordlessRequest>, I>>(object: I): VerifyMyPasswordlessRequest {
    const message = createBaseVerifyMyPasswordlessRequest();
    message.verification = (object.verification !== undefined && object.verification !== null)
      ? WebAuthNVerification.fromPartial(object.verification)
      : undefined;
    return message;
  },
};

function createBaseVerifyMyPasswordlessResponse(): VerifyMyPasswordlessResponse {
  return { details: undefined };
}

export const VerifyMyPasswordlessResponse = {
  encode(message: VerifyMyPasswordlessResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyMyPasswordlessResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyMyPasswordlessResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyMyPasswordlessResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: VerifyMyPasswordlessResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyMyPasswordlessResponse>, I>>(base?: I): VerifyMyPasswordlessResponse {
    return VerifyMyPasswordlessResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyMyPasswordlessResponse>, I>>(object: I): VerifyMyPasswordlessResponse {
    const message = createBaseVerifyMyPasswordlessResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseRemoveMyPasswordlessRequest(): RemoveMyPasswordlessRequest {
  return { tokenId: "" };
}

export const RemoveMyPasswordlessRequest = {
  encode(message: RemoveMyPasswordlessRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tokenId !== "") {
      writer.uint32(10).string(message.tokenId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMyPasswordlessRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMyPasswordlessRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tokenId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveMyPasswordlessRequest {
    return { tokenId: isSet(object.tokenId) ? String(object.tokenId) : "" };
  },

  toJSON(message: RemoveMyPasswordlessRequest): unknown {
    const obj: any = {};
    if (message.tokenId !== "") {
      obj.tokenId = message.tokenId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveMyPasswordlessRequest>, I>>(base?: I): RemoveMyPasswordlessRequest {
    return RemoveMyPasswordlessRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveMyPasswordlessRequest>, I>>(object: I): RemoveMyPasswordlessRequest {
    const message = createBaseRemoveMyPasswordlessRequest();
    message.tokenId = object.tokenId ?? "";
    return message;
  },
};

function createBaseRemoveMyPasswordlessResponse(): RemoveMyPasswordlessResponse {
  return { details: undefined };
}

export const RemoveMyPasswordlessResponse = {
  encode(message: RemoveMyPasswordlessResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMyPasswordlessResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMyPasswordlessResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveMyPasswordlessResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: RemoveMyPasswordlessResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveMyPasswordlessResponse>, I>>(base?: I): RemoveMyPasswordlessResponse {
    return RemoveMyPasswordlessResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveMyPasswordlessResponse>, I>>(object: I): RemoveMyPasswordlessResponse {
    const message = createBaseRemoveMyPasswordlessResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseListMyUserGrantsRequest(): ListMyUserGrantsRequest {
  return { query: undefined };
}

export const ListMyUserGrantsRequest = {
  encode(message: ListMyUserGrantsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== undefined) {
      ListQuery.encode(message.query, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyUserGrantsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyUserGrantsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.query = ListQuery.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyUserGrantsRequest {
    return { query: isSet(object.query) ? ListQuery.fromJSON(object.query) : undefined };
  },

  toJSON(message: ListMyUserGrantsRequest): unknown {
    const obj: any = {};
    if (message.query !== undefined) {
      obj.query = ListQuery.toJSON(message.query);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyUserGrantsRequest>, I>>(base?: I): ListMyUserGrantsRequest {
    return ListMyUserGrantsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyUserGrantsRequest>, I>>(object: I): ListMyUserGrantsRequest {
    const message = createBaseListMyUserGrantsRequest();
    message.query = (object.query !== undefined && object.query !== null)
      ? ListQuery.fromPartial(object.query)
      : undefined;
    return message;
  },
};

function createBaseListMyUserGrantsResponse(): ListMyUserGrantsResponse {
  return { details: undefined, result: [] };
}

export const ListMyUserGrantsResponse = {
  encode(message: ListMyUserGrantsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ListDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.result) {
      UserGrant.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyUserGrantsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyUserGrantsResponse();
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

          message.result.push(UserGrant.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyUserGrantsResponse {
    return {
      details: isSet(object.details) ? ListDetails.fromJSON(object.details) : undefined,
      result: Array.isArray(object?.result) ? object.result.map((e: any) => UserGrant.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListMyUserGrantsResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ListDetails.toJSON(message.details);
    }
    if (message.result?.length) {
      obj.result = message.result.map((e) => UserGrant.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyUserGrantsResponse>, I>>(base?: I): ListMyUserGrantsResponse {
    return ListMyUserGrantsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyUserGrantsResponse>, I>>(object: I): ListMyUserGrantsResponse {
    const message = createBaseListMyUserGrantsResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ListDetails.fromPartial(object.details)
      : undefined;
    message.result = object.result?.map((e) => UserGrant.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUserGrant(): UserGrant {
  return {
    orgId: "",
    projectId: "",
    userId: "",
    roles: [],
    orgName: "",
    grantId: "",
    details: undefined,
    orgDomain: "",
    projectName: "",
    projectGrantId: "",
    roleKeys: [],
    userType: 0,
  };
}

export const UserGrant = {
  encode(message: UserGrant, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    if (message.projectId !== "") {
      writer.uint32(18).string(message.projectId);
    }
    if (message.userId !== "") {
      writer.uint32(26).string(message.userId);
    }
    for (const v of message.roles) {
      writer.uint32(34).string(v!);
    }
    if (message.orgName !== "") {
      writer.uint32(42).string(message.orgName);
    }
    if (message.grantId !== "") {
      writer.uint32(50).string(message.grantId);
    }
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(58).fork()).ldelim();
    }
    if (message.orgDomain !== "") {
      writer.uint32(66).string(message.orgDomain);
    }
    if (message.projectName !== "") {
      writer.uint32(74).string(message.projectName);
    }
    if (message.projectGrantId !== "") {
      writer.uint32(82).string(message.projectGrantId);
    }
    for (const v of message.roleKeys) {
      writer.uint32(90).string(v!);
    }
    if (message.userType !== 0) {
      writer.uint32(96).int32(message.userType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGrant {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGrant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.projectId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.roles.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.orgName = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.grantId = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.orgDomain = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.projectName = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.projectGrantId = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.roleKeys.push(reader.string());
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.userType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGrant {
    return {
      orgId: isSet(object.orgId) ? String(object.orgId) : "",
      projectId: isSet(object.projectId) ? String(object.projectId) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
      roles: Array.isArray(object?.roles) ? object.roles.map((e: any) => String(e)) : [],
      orgName: isSet(object.orgName) ? String(object.orgName) : "",
      grantId: isSet(object.grantId) ? String(object.grantId) : "",
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      orgDomain: isSet(object.orgDomain) ? String(object.orgDomain) : "",
      projectName: isSet(object.projectName) ? String(object.projectName) : "",
      projectGrantId: isSet(object.projectGrantId) ? String(object.projectGrantId) : "",
      roleKeys: Array.isArray(object?.roleKeys) ? object.roleKeys.map((e: any) => String(e)) : [],
      userType: isSet(object.userType) ? typeFromJSON(object.userType) : 0,
    };
  },

  toJSON(message: UserGrant): unknown {
    const obj: any = {};
    if (message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.projectId !== "") {
      obj.projectId = message.projectId;
    }
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.roles?.length) {
      obj.roles = message.roles;
    }
    if (message.orgName !== "") {
      obj.orgName = message.orgName;
    }
    if (message.grantId !== "") {
      obj.grantId = message.grantId;
    }
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.orgDomain !== "") {
      obj.orgDomain = message.orgDomain;
    }
    if (message.projectName !== "") {
      obj.projectName = message.projectName;
    }
    if (message.projectGrantId !== "") {
      obj.projectGrantId = message.projectGrantId;
    }
    if (message.roleKeys?.length) {
      obj.roleKeys = message.roleKeys;
    }
    if (message.userType !== 0) {
      obj.userType = typeToJSON(message.userType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGrant>, I>>(base?: I): UserGrant {
    return UserGrant.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGrant>, I>>(object: I): UserGrant {
    const message = createBaseUserGrant();
    message.orgId = object.orgId ?? "";
    message.projectId = object.projectId ?? "";
    message.userId = object.userId ?? "";
    message.roles = object.roles?.map((e) => e) || [];
    message.orgName = object.orgName ?? "";
    message.grantId = object.grantId ?? "";
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.orgDomain = object.orgDomain ?? "";
    message.projectName = object.projectName ?? "";
    message.projectGrantId = object.projectGrantId ?? "";
    message.roleKeys = object.roleKeys?.map((e) => e) || [];
    message.userType = object.userType ?? 0;
    return message;
  },
};

function createBaseListMyProjectOrgsRequest(): ListMyProjectOrgsRequest {
  return { query: undefined, queries: [] };
}

export const ListMyProjectOrgsRequest = {
  encode(message: ListMyProjectOrgsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== undefined) {
      ListQuery.encode(message.query, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.queries) {
      OrgQuery.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyProjectOrgsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyProjectOrgsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.query = ListQuery.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.queries.push(OrgQuery.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyProjectOrgsRequest {
    return {
      query: isSet(object.query) ? ListQuery.fromJSON(object.query) : undefined,
      queries: Array.isArray(object?.queries) ? object.queries.map((e: any) => OrgQuery.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListMyProjectOrgsRequest): unknown {
    const obj: any = {};
    if (message.query !== undefined) {
      obj.query = ListQuery.toJSON(message.query);
    }
    if (message.queries?.length) {
      obj.queries = message.queries.map((e) => OrgQuery.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyProjectOrgsRequest>, I>>(base?: I): ListMyProjectOrgsRequest {
    return ListMyProjectOrgsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyProjectOrgsRequest>, I>>(object: I): ListMyProjectOrgsRequest {
    const message = createBaseListMyProjectOrgsRequest();
    message.query = (object.query !== undefined && object.query !== null)
      ? ListQuery.fromPartial(object.query)
      : undefined;
    message.queries = object.queries?.map((e) => OrgQuery.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListMyProjectOrgsResponse(): ListMyProjectOrgsResponse {
  return { details: undefined, result: [] };
}

export const ListMyProjectOrgsResponse = {
  encode(message: ListMyProjectOrgsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ListDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.result) {
      Org.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyProjectOrgsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyProjectOrgsResponse();
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

          message.result.push(Org.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyProjectOrgsResponse {
    return {
      details: isSet(object.details) ? ListDetails.fromJSON(object.details) : undefined,
      result: Array.isArray(object?.result) ? object.result.map((e: any) => Org.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListMyProjectOrgsResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ListDetails.toJSON(message.details);
    }
    if (message.result?.length) {
      obj.result = message.result.map((e) => Org.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyProjectOrgsResponse>, I>>(base?: I): ListMyProjectOrgsResponse {
    return ListMyProjectOrgsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyProjectOrgsResponse>, I>>(object: I): ListMyProjectOrgsResponse {
    const message = createBaseListMyProjectOrgsResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ListDetails.fromPartial(object.details)
      : undefined;
    message.result = object.result?.map((e) => Org.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListMyZitadelPermissionsRequest(): ListMyZitadelPermissionsRequest {
  return {};
}

export const ListMyZitadelPermissionsRequest = {
  encode(_: ListMyZitadelPermissionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyZitadelPermissionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyZitadelPermissionsRequest();
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

  fromJSON(_: any): ListMyZitadelPermissionsRequest {
    return {};
  },

  toJSON(_: ListMyZitadelPermissionsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyZitadelPermissionsRequest>, I>>(base?: I): ListMyZitadelPermissionsRequest {
    return ListMyZitadelPermissionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyZitadelPermissionsRequest>, I>>(_: I): ListMyZitadelPermissionsRequest {
    const message = createBaseListMyZitadelPermissionsRequest();
    return message;
  },
};

function createBaseListMyZitadelPermissionsResponse(): ListMyZitadelPermissionsResponse {
  return { result: [] };
}

export const ListMyZitadelPermissionsResponse = {
  encode(message: ListMyZitadelPermissionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.result) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyZitadelPermissionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyZitadelPermissionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.result.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyZitadelPermissionsResponse {
    return { result: Array.isArray(object?.result) ? object.result.map((e: any) => String(e)) : [] };
  },

  toJSON(message: ListMyZitadelPermissionsResponse): unknown {
    const obj: any = {};
    if (message.result?.length) {
      obj.result = message.result;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyZitadelPermissionsResponse>, I>>(
    base?: I,
  ): ListMyZitadelPermissionsResponse {
    return ListMyZitadelPermissionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyZitadelPermissionsResponse>, I>>(
    object: I,
  ): ListMyZitadelPermissionsResponse {
    const message = createBaseListMyZitadelPermissionsResponse();
    message.result = object.result?.map((e) => e) || [];
    return message;
  },
};

function createBaseListMyProjectPermissionsRequest(): ListMyProjectPermissionsRequest {
  return {};
}

export const ListMyProjectPermissionsRequest = {
  encode(_: ListMyProjectPermissionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyProjectPermissionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyProjectPermissionsRequest();
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

  fromJSON(_: any): ListMyProjectPermissionsRequest {
    return {};
  },

  toJSON(_: ListMyProjectPermissionsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyProjectPermissionsRequest>, I>>(base?: I): ListMyProjectPermissionsRequest {
    return ListMyProjectPermissionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyProjectPermissionsRequest>, I>>(_: I): ListMyProjectPermissionsRequest {
    const message = createBaseListMyProjectPermissionsRequest();
    return message;
  },
};

function createBaseListMyProjectPermissionsResponse(): ListMyProjectPermissionsResponse {
  return { result: [] };
}

export const ListMyProjectPermissionsResponse = {
  encode(message: ListMyProjectPermissionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.result) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyProjectPermissionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyProjectPermissionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.result.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyProjectPermissionsResponse {
    return { result: Array.isArray(object?.result) ? object.result.map((e: any) => String(e)) : [] };
  },

  toJSON(message: ListMyProjectPermissionsResponse): unknown {
    const obj: any = {};
    if (message.result?.length) {
      obj.result = message.result;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyProjectPermissionsResponse>, I>>(
    base?: I,
  ): ListMyProjectPermissionsResponse {
    return ListMyProjectPermissionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyProjectPermissionsResponse>, I>>(
    object: I,
  ): ListMyProjectPermissionsResponse {
    const message = createBaseListMyProjectPermissionsResponse();
    message.result = object.result?.map((e) => e) || [];
    return message;
  },
};

function createBaseListMyMembershipsRequest(): ListMyMembershipsRequest {
  return { query: undefined, queries: [] };
}

export const ListMyMembershipsRequest = {
  encode(message: ListMyMembershipsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== undefined) {
      ListQuery.encode(message.query, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.queries) {
      MembershipQuery.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyMembershipsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyMembershipsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.query = ListQuery.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.queries.push(MembershipQuery.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyMembershipsRequest {
    return {
      query: isSet(object.query) ? ListQuery.fromJSON(object.query) : undefined,
      queries: Array.isArray(object?.queries) ? object.queries.map((e: any) => MembershipQuery.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListMyMembershipsRequest): unknown {
    const obj: any = {};
    if (message.query !== undefined) {
      obj.query = ListQuery.toJSON(message.query);
    }
    if (message.queries?.length) {
      obj.queries = message.queries.map((e) => MembershipQuery.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyMembershipsRequest>, I>>(base?: I): ListMyMembershipsRequest {
    return ListMyMembershipsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyMembershipsRequest>, I>>(object: I): ListMyMembershipsRequest {
    const message = createBaseListMyMembershipsRequest();
    message.query = (object.query !== undefined && object.query !== null)
      ? ListQuery.fromPartial(object.query)
      : undefined;
    message.queries = object.queries?.map((e) => MembershipQuery.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListMyMembershipsResponse(): ListMyMembershipsResponse {
  return { details: undefined, result: [] };
}

export const ListMyMembershipsResponse = {
  encode(message: ListMyMembershipsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ListDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.result) {
      Membership.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMyMembershipsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMyMembershipsResponse();
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

          message.result.push(Membership.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMyMembershipsResponse {
    return {
      details: isSet(object.details) ? ListDetails.fromJSON(object.details) : undefined,
      result: Array.isArray(object?.result) ? object.result.map((e: any) => Membership.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListMyMembershipsResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ListDetails.toJSON(message.details);
    }
    if (message.result?.length) {
      obj.result = message.result.map((e) => Membership.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMyMembershipsResponse>, I>>(base?: I): ListMyMembershipsResponse {
    return ListMyMembershipsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMyMembershipsResponse>, I>>(object: I): ListMyMembershipsResponse {
    const message = createBaseListMyMembershipsResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ListDetails.fromPartial(object.details)
      : undefined;
    message.result = object.result?.map((e) => Membership.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetMyLabelPolicyRequest(): GetMyLabelPolicyRequest {
  return {};
}

export const GetMyLabelPolicyRequest = {
  encode(_: GetMyLabelPolicyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyLabelPolicyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyLabelPolicyRequest();
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

  fromJSON(_: any): GetMyLabelPolicyRequest {
    return {};
  },

  toJSON(_: GetMyLabelPolicyRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyLabelPolicyRequest>, I>>(base?: I): GetMyLabelPolicyRequest {
    return GetMyLabelPolicyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyLabelPolicyRequest>, I>>(_: I): GetMyLabelPolicyRequest {
    const message = createBaseGetMyLabelPolicyRequest();
    return message;
  },
};

function createBaseGetMyLabelPolicyResponse(): GetMyLabelPolicyResponse {
  return { policy: undefined };
}

export const GetMyLabelPolicyResponse = {
  encode(message: GetMyLabelPolicyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.policy !== undefined) {
      LabelPolicy.encode(message.policy, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyLabelPolicyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyLabelPolicyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.policy = LabelPolicy.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetMyLabelPolicyResponse {
    return { policy: isSet(object.policy) ? LabelPolicy.fromJSON(object.policy) : undefined };
  },

  toJSON(message: GetMyLabelPolicyResponse): unknown {
    const obj: any = {};
    if (message.policy !== undefined) {
      obj.policy = LabelPolicy.toJSON(message.policy);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyLabelPolicyResponse>, I>>(base?: I): GetMyLabelPolicyResponse {
    return GetMyLabelPolicyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyLabelPolicyResponse>, I>>(object: I): GetMyLabelPolicyResponse {
    const message = createBaseGetMyLabelPolicyResponse();
    message.policy = (object.policy !== undefined && object.policy !== null)
      ? LabelPolicy.fromPartial(object.policy)
      : undefined;
    return message;
  },
};

function createBaseGetMyPrivacyPolicyRequest(): GetMyPrivacyPolicyRequest {
  return {};
}

export const GetMyPrivacyPolicyRequest = {
  encode(_: GetMyPrivacyPolicyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyPrivacyPolicyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyPrivacyPolicyRequest();
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

  fromJSON(_: any): GetMyPrivacyPolicyRequest {
    return {};
  },

  toJSON(_: GetMyPrivacyPolicyRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyPrivacyPolicyRequest>, I>>(base?: I): GetMyPrivacyPolicyRequest {
    return GetMyPrivacyPolicyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyPrivacyPolicyRequest>, I>>(_: I): GetMyPrivacyPolicyRequest {
    const message = createBaseGetMyPrivacyPolicyRequest();
    return message;
  },
};

function createBaseGetMyPrivacyPolicyResponse(): GetMyPrivacyPolicyResponse {
  return { policy: undefined };
}

export const GetMyPrivacyPolicyResponse = {
  encode(message: GetMyPrivacyPolicyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.policy !== undefined) {
      PrivacyPolicy.encode(message.policy, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyPrivacyPolicyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyPrivacyPolicyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.policy = PrivacyPolicy.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetMyPrivacyPolicyResponse {
    return { policy: isSet(object.policy) ? PrivacyPolicy.fromJSON(object.policy) : undefined };
  },

  toJSON(message: GetMyPrivacyPolicyResponse): unknown {
    const obj: any = {};
    if (message.policy !== undefined) {
      obj.policy = PrivacyPolicy.toJSON(message.policy);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyPrivacyPolicyResponse>, I>>(base?: I): GetMyPrivacyPolicyResponse {
    return GetMyPrivacyPolicyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyPrivacyPolicyResponse>, I>>(object: I): GetMyPrivacyPolicyResponse {
    const message = createBaseGetMyPrivacyPolicyResponse();
    message.policy = (object.policy !== undefined && object.policy !== null)
      ? PrivacyPolicy.fromPartial(object.policy)
      : undefined;
    return message;
  },
};

function createBaseGetMyLoginPolicyRequest(): GetMyLoginPolicyRequest {
  return {};
}

export const GetMyLoginPolicyRequest = {
  encode(_: GetMyLoginPolicyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyLoginPolicyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyLoginPolicyRequest();
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

  fromJSON(_: any): GetMyLoginPolicyRequest {
    return {};
  },

  toJSON(_: GetMyLoginPolicyRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyLoginPolicyRequest>, I>>(base?: I): GetMyLoginPolicyRequest {
    return GetMyLoginPolicyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyLoginPolicyRequest>, I>>(_: I): GetMyLoginPolicyRequest {
    const message = createBaseGetMyLoginPolicyRequest();
    return message;
  },
};

function createBaseGetMyLoginPolicyResponse(): GetMyLoginPolicyResponse {
  return { policy: undefined };
}

export const GetMyLoginPolicyResponse = {
  encode(message: GetMyLoginPolicyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.policy !== undefined) {
      LoginPolicy.encode(message.policy, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMyLoginPolicyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMyLoginPolicyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.policy = LoginPolicy.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetMyLoginPolicyResponse {
    return { policy: isSet(object.policy) ? LoginPolicy.fromJSON(object.policy) : undefined };
  },

  toJSON(message: GetMyLoginPolicyResponse): unknown {
    const obj: any = {};
    if (message.policy !== undefined) {
      obj.policy = LoginPolicy.toJSON(message.policy);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMyLoginPolicyResponse>, I>>(base?: I): GetMyLoginPolicyResponse {
    return GetMyLoginPolicyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMyLoginPolicyResponse>, I>>(object: I): GetMyLoginPolicyResponse {
    const message = createBaseGetMyLoginPolicyResponse();
    message.policy = (object.policy !== undefined && object.policy !== null)
      ? LoginPolicy.fromPartial(object.policy)
      : undefined;
    return message;
  },
};

export interface AuthService {
  Healthz(request: DeepPartial<HealthzRequest>, metadata?: grpc.Metadata): Promise<HealthzResponse>;
  GetSupportedLanguages(
    request: DeepPartial<GetSupportedLanguagesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetSupportedLanguagesResponse>;
  GetMyUser(request: DeepPartial<GetMyUserRequest>, metadata?: grpc.Metadata): Promise<GetMyUserResponse>;
  RemoveMyUser(request: DeepPartial<RemoveMyUserRequest>, metadata?: grpc.Metadata): Promise<RemoveMyUserResponse>;
  ListMyUserChanges(
    request: DeepPartial<ListMyUserChangesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyUserChangesResponse>;
  ListMyUserSessions(
    request: DeepPartial<ListMyUserSessionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyUserSessionsResponse>;
  ListMyMetadata(
    request: DeepPartial<ListMyMetadataRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyMetadataResponse>;
  GetMyMetadata(request: DeepPartial<GetMyMetadataRequest>, metadata?: grpc.Metadata): Promise<GetMyMetadataResponse>;
  ListMyRefreshTokens(
    request: DeepPartial<ListMyRefreshTokensRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyRefreshTokensResponse>;
  RevokeMyRefreshToken(
    request: DeepPartial<RevokeMyRefreshTokenRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RevokeMyRefreshTokenResponse>;
  RevokeAllMyRefreshTokens(
    request: DeepPartial<RevokeAllMyRefreshTokensRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RevokeAllMyRefreshTokensResponse>;
  UpdateMyUserName(
    request: DeepPartial<UpdateMyUserNameRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateMyUserNameResponse>;
  GetMyPasswordComplexityPolicy(
    request: DeepPartial<GetMyPasswordComplexityPolicyRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetMyPasswordComplexityPolicyResponse>;
  UpdateMyPassword(
    request: DeepPartial<UpdateMyPasswordRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateMyPasswordResponse>;
  GetMyProfile(request: DeepPartial<GetMyProfileRequest>, metadata?: grpc.Metadata): Promise<GetMyProfileResponse>;
  UpdateMyProfile(
    request: DeepPartial<UpdateMyProfileRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateMyProfileResponse>;
  GetMyEmail(request: DeepPartial<GetMyEmailRequest>, metadata?: grpc.Metadata): Promise<GetMyEmailResponse>;
  SetMyEmail(request: DeepPartial<SetMyEmailRequest>, metadata?: grpc.Metadata): Promise<SetMyEmailResponse>;
  VerifyMyEmail(request: DeepPartial<VerifyMyEmailRequest>, metadata?: grpc.Metadata): Promise<VerifyMyEmailResponse>;
  ResendMyEmailVerification(
    request: DeepPartial<ResendMyEmailVerificationRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ResendMyEmailVerificationResponse>;
  GetMyPhone(request: DeepPartial<GetMyPhoneRequest>, metadata?: grpc.Metadata): Promise<GetMyPhoneResponse>;
  SetMyPhone(request: DeepPartial<SetMyPhoneRequest>, metadata?: grpc.Metadata): Promise<SetMyPhoneResponse>;
  VerifyMyPhone(request: DeepPartial<VerifyMyPhoneRequest>, metadata?: grpc.Metadata): Promise<VerifyMyPhoneResponse>;
  /** Resends an sms to the last given phone number, to verify it */
  ResendMyPhoneVerification(
    request: DeepPartial<ResendMyPhoneVerificationRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ResendMyPhoneVerificationResponse>;
  RemoveMyPhone(request: DeepPartial<RemoveMyPhoneRequest>, metadata?: grpc.Metadata): Promise<RemoveMyPhoneResponse>;
  RemoveMyAvatar(
    request: DeepPartial<RemoveMyAvatarRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveMyAvatarResponse>;
  ListMyLinkedIDPs(
    request: DeepPartial<ListMyLinkedIDPsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyLinkedIDPsResponse>;
  RemoveMyLinkedIDP(
    request: DeepPartial<RemoveMyLinkedIDPRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveMyLinkedIDPResponse>;
  ListMyAuthFactors(
    request: DeepPartial<ListMyAuthFactorsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyAuthFactorsResponse>;
  AddMyAuthFactorOTP(
    request: DeepPartial<AddMyAuthFactorOTPRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AddMyAuthFactorOTPResponse>;
  VerifyMyAuthFactorOTP(
    request: DeepPartial<VerifyMyAuthFactorOTPRequest>,
    metadata?: grpc.Metadata,
  ): Promise<VerifyMyAuthFactorOTPResponse>;
  RemoveMyAuthFactorOTP(
    request: DeepPartial<RemoveMyAuthFactorOTPRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveMyAuthFactorOTPResponse>;
  AddMyAuthFactorU2F(
    request: DeepPartial<AddMyAuthFactorU2FRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AddMyAuthFactorU2FResponse>;
  VerifyMyAuthFactorU2F(
    request: DeepPartial<VerifyMyAuthFactorU2FRequest>,
    metadata?: grpc.Metadata,
  ): Promise<VerifyMyAuthFactorU2FResponse>;
  RemoveMyAuthFactorU2F(
    request: DeepPartial<RemoveMyAuthFactorU2FRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveMyAuthFactorU2FResponse>;
  ListMyPasswordless(
    request: DeepPartial<ListMyPasswordlessRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyPasswordlessResponse>;
  AddMyPasswordless(
    request: DeepPartial<AddMyPasswordlessRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AddMyPasswordlessResponse>;
  AddMyPasswordlessLink(
    request: DeepPartial<AddMyPasswordlessLinkRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AddMyPasswordlessLinkResponse>;
  SendMyPasswordlessLink(
    request: DeepPartial<SendMyPasswordlessLinkRequest>,
    metadata?: grpc.Metadata,
  ): Promise<SendMyPasswordlessLinkResponse>;
  VerifyMyPasswordless(
    request: DeepPartial<VerifyMyPasswordlessRequest>,
    metadata?: grpc.Metadata,
  ): Promise<VerifyMyPasswordlessResponse>;
  RemoveMyPasswordless(
    request: DeepPartial<RemoveMyPasswordlessRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveMyPasswordlessResponse>;
  ListMyUserGrants(
    request: DeepPartial<ListMyUserGrantsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyUserGrantsResponse>;
  ListMyProjectOrgs(
    request: DeepPartial<ListMyProjectOrgsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyProjectOrgsResponse>;
  ListMyZitadelPermissions(
    request: DeepPartial<ListMyZitadelPermissionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyZitadelPermissionsResponse>;
  ListMyProjectPermissions(
    request: DeepPartial<ListMyProjectPermissionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyProjectPermissionsResponse>;
  ListMyMemberships(
    request: DeepPartial<ListMyMembershipsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyMembershipsResponse>;
  GetMyLabelPolicy(
    request: DeepPartial<GetMyLabelPolicyRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetMyLabelPolicyResponse>;
  GetMyPrivacyPolicy(
    request: DeepPartial<GetMyPrivacyPolicyRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetMyPrivacyPolicyResponse>;
  GetMyLoginPolicy(
    request: DeepPartial<GetMyLoginPolicyRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetMyLoginPolicyResponse>;
}

export class AuthServiceClientImpl implements AuthService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Healthz = this.Healthz.bind(this);
    this.GetSupportedLanguages = this.GetSupportedLanguages.bind(this);
    this.GetMyUser = this.GetMyUser.bind(this);
    this.RemoveMyUser = this.RemoveMyUser.bind(this);
    this.ListMyUserChanges = this.ListMyUserChanges.bind(this);
    this.ListMyUserSessions = this.ListMyUserSessions.bind(this);
    this.ListMyMetadata = this.ListMyMetadata.bind(this);
    this.GetMyMetadata = this.GetMyMetadata.bind(this);
    this.ListMyRefreshTokens = this.ListMyRefreshTokens.bind(this);
    this.RevokeMyRefreshToken = this.RevokeMyRefreshToken.bind(this);
    this.RevokeAllMyRefreshTokens = this.RevokeAllMyRefreshTokens.bind(this);
    this.UpdateMyUserName = this.UpdateMyUserName.bind(this);
    this.GetMyPasswordComplexityPolicy = this.GetMyPasswordComplexityPolicy.bind(this);
    this.UpdateMyPassword = this.UpdateMyPassword.bind(this);
    this.GetMyProfile = this.GetMyProfile.bind(this);
    this.UpdateMyProfile = this.UpdateMyProfile.bind(this);
    this.GetMyEmail = this.GetMyEmail.bind(this);
    this.SetMyEmail = this.SetMyEmail.bind(this);
    this.VerifyMyEmail = this.VerifyMyEmail.bind(this);
    this.ResendMyEmailVerification = this.ResendMyEmailVerification.bind(this);
    this.GetMyPhone = this.GetMyPhone.bind(this);
    this.SetMyPhone = this.SetMyPhone.bind(this);
    this.VerifyMyPhone = this.VerifyMyPhone.bind(this);
    this.ResendMyPhoneVerification = this.ResendMyPhoneVerification.bind(this);
    this.RemoveMyPhone = this.RemoveMyPhone.bind(this);
    this.RemoveMyAvatar = this.RemoveMyAvatar.bind(this);
    this.ListMyLinkedIDPs = this.ListMyLinkedIDPs.bind(this);
    this.RemoveMyLinkedIDP = this.RemoveMyLinkedIDP.bind(this);
    this.ListMyAuthFactors = this.ListMyAuthFactors.bind(this);
    this.AddMyAuthFactorOTP = this.AddMyAuthFactorOTP.bind(this);
    this.VerifyMyAuthFactorOTP = this.VerifyMyAuthFactorOTP.bind(this);
    this.RemoveMyAuthFactorOTP = this.RemoveMyAuthFactorOTP.bind(this);
    this.AddMyAuthFactorU2F = this.AddMyAuthFactorU2F.bind(this);
    this.VerifyMyAuthFactorU2F = this.VerifyMyAuthFactorU2F.bind(this);
    this.RemoveMyAuthFactorU2F = this.RemoveMyAuthFactorU2F.bind(this);
    this.ListMyPasswordless = this.ListMyPasswordless.bind(this);
    this.AddMyPasswordless = this.AddMyPasswordless.bind(this);
    this.AddMyPasswordlessLink = this.AddMyPasswordlessLink.bind(this);
    this.SendMyPasswordlessLink = this.SendMyPasswordlessLink.bind(this);
    this.VerifyMyPasswordless = this.VerifyMyPasswordless.bind(this);
    this.RemoveMyPasswordless = this.RemoveMyPasswordless.bind(this);
    this.ListMyUserGrants = this.ListMyUserGrants.bind(this);
    this.ListMyProjectOrgs = this.ListMyProjectOrgs.bind(this);
    this.ListMyZitadelPermissions = this.ListMyZitadelPermissions.bind(this);
    this.ListMyProjectPermissions = this.ListMyProjectPermissions.bind(this);
    this.ListMyMemberships = this.ListMyMemberships.bind(this);
    this.GetMyLabelPolicy = this.GetMyLabelPolicy.bind(this);
    this.GetMyPrivacyPolicy = this.GetMyPrivacyPolicy.bind(this);
    this.GetMyLoginPolicy = this.GetMyLoginPolicy.bind(this);
  }

  Healthz(request: DeepPartial<HealthzRequest>, metadata?: grpc.Metadata): Promise<HealthzResponse> {
    return this.rpc.unary(AuthServiceHealthzDesc, HealthzRequest.fromPartial(request), metadata);
  }

  GetSupportedLanguages(
    request: DeepPartial<GetSupportedLanguagesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetSupportedLanguagesResponse> {
    return this.rpc.unary(
      AuthServiceGetSupportedLanguagesDesc,
      GetSupportedLanguagesRequest.fromPartial(request),
      metadata,
    );
  }

  GetMyUser(request: DeepPartial<GetMyUserRequest>, metadata?: grpc.Metadata): Promise<GetMyUserResponse> {
    return this.rpc.unary(AuthServiceGetMyUserDesc, GetMyUserRequest.fromPartial(request), metadata);
  }

  RemoveMyUser(request: DeepPartial<RemoveMyUserRequest>, metadata?: grpc.Metadata): Promise<RemoveMyUserResponse> {
    return this.rpc.unary(AuthServiceRemoveMyUserDesc, RemoveMyUserRequest.fromPartial(request), metadata);
  }

  ListMyUserChanges(
    request: DeepPartial<ListMyUserChangesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyUserChangesResponse> {
    return this.rpc.unary(AuthServiceListMyUserChangesDesc, ListMyUserChangesRequest.fromPartial(request), metadata);
  }

  ListMyUserSessions(
    request: DeepPartial<ListMyUserSessionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyUserSessionsResponse> {
    return this.rpc.unary(AuthServiceListMyUserSessionsDesc, ListMyUserSessionsRequest.fromPartial(request), metadata);
  }

  ListMyMetadata(
    request: DeepPartial<ListMyMetadataRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyMetadataResponse> {
    return this.rpc.unary(AuthServiceListMyMetadataDesc, ListMyMetadataRequest.fromPartial(request), metadata);
  }

  GetMyMetadata(request: DeepPartial<GetMyMetadataRequest>, metadata?: grpc.Metadata): Promise<GetMyMetadataResponse> {
    return this.rpc.unary(AuthServiceGetMyMetadataDesc, GetMyMetadataRequest.fromPartial(request), metadata);
  }

  ListMyRefreshTokens(
    request: DeepPartial<ListMyRefreshTokensRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyRefreshTokensResponse> {
    return this.rpc.unary(
      AuthServiceListMyRefreshTokensDesc,
      ListMyRefreshTokensRequest.fromPartial(request),
      metadata,
    );
  }

  RevokeMyRefreshToken(
    request: DeepPartial<RevokeMyRefreshTokenRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RevokeMyRefreshTokenResponse> {
    return this.rpc.unary(
      AuthServiceRevokeMyRefreshTokenDesc,
      RevokeMyRefreshTokenRequest.fromPartial(request),
      metadata,
    );
  }

  RevokeAllMyRefreshTokens(
    request: DeepPartial<RevokeAllMyRefreshTokensRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RevokeAllMyRefreshTokensResponse> {
    return this.rpc.unary(
      AuthServiceRevokeAllMyRefreshTokensDesc,
      RevokeAllMyRefreshTokensRequest.fromPartial(request),
      metadata,
    );
  }

  UpdateMyUserName(
    request: DeepPartial<UpdateMyUserNameRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateMyUserNameResponse> {
    return this.rpc.unary(AuthServiceUpdateMyUserNameDesc, UpdateMyUserNameRequest.fromPartial(request), metadata);
  }

  GetMyPasswordComplexityPolicy(
    request: DeepPartial<GetMyPasswordComplexityPolicyRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetMyPasswordComplexityPolicyResponse> {
    return this.rpc.unary(
      AuthServiceGetMyPasswordComplexityPolicyDesc,
      GetMyPasswordComplexityPolicyRequest.fromPartial(request),
      metadata,
    );
  }

  UpdateMyPassword(
    request: DeepPartial<UpdateMyPasswordRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateMyPasswordResponse> {
    return this.rpc.unary(AuthServiceUpdateMyPasswordDesc, UpdateMyPasswordRequest.fromPartial(request), metadata);
  }

  GetMyProfile(request: DeepPartial<GetMyProfileRequest>, metadata?: grpc.Metadata): Promise<GetMyProfileResponse> {
    return this.rpc.unary(AuthServiceGetMyProfileDesc, GetMyProfileRequest.fromPartial(request), metadata);
  }

  UpdateMyProfile(
    request: DeepPartial<UpdateMyProfileRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateMyProfileResponse> {
    return this.rpc.unary(AuthServiceUpdateMyProfileDesc, UpdateMyProfileRequest.fromPartial(request), metadata);
  }

  GetMyEmail(request: DeepPartial<GetMyEmailRequest>, metadata?: grpc.Metadata): Promise<GetMyEmailResponse> {
    return this.rpc.unary(AuthServiceGetMyEmailDesc, GetMyEmailRequest.fromPartial(request), metadata);
  }

  SetMyEmail(request: DeepPartial<SetMyEmailRequest>, metadata?: grpc.Metadata): Promise<SetMyEmailResponse> {
    return this.rpc.unary(AuthServiceSetMyEmailDesc, SetMyEmailRequest.fromPartial(request), metadata);
  }

  VerifyMyEmail(request: DeepPartial<VerifyMyEmailRequest>, metadata?: grpc.Metadata): Promise<VerifyMyEmailResponse> {
    return this.rpc.unary(AuthServiceVerifyMyEmailDesc, VerifyMyEmailRequest.fromPartial(request), metadata);
  }

  ResendMyEmailVerification(
    request: DeepPartial<ResendMyEmailVerificationRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ResendMyEmailVerificationResponse> {
    return this.rpc.unary(
      AuthServiceResendMyEmailVerificationDesc,
      ResendMyEmailVerificationRequest.fromPartial(request),
      metadata,
    );
  }

  GetMyPhone(request: DeepPartial<GetMyPhoneRequest>, metadata?: grpc.Metadata): Promise<GetMyPhoneResponse> {
    return this.rpc.unary(AuthServiceGetMyPhoneDesc, GetMyPhoneRequest.fromPartial(request), metadata);
  }

  SetMyPhone(request: DeepPartial<SetMyPhoneRequest>, metadata?: grpc.Metadata): Promise<SetMyPhoneResponse> {
    return this.rpc.unary(AuthServiceSetMyPhoneDesc, SetMyPhoneRequest.fromPartial(request), metadata);
  }

  VerifyMyPhone(request: DeepPartial<VerifyMyPhoneRequest>, metadata?: grpc.Metadata): Promise<VerifyMyPhoneResponse> {
    return this.rpc.unary(AuthServiceVerifyMyPhoneDesc, VerifyMyPhoneRequest.fromPartial(request), metadata);
  }

  ResendMyPhoneVerification(
    request: DeepPartial<ResendMyPhoneVerificationRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ResendMyPhoneVerificationResponse> {
    return this.rpc.unary(
      AuthServiceResendMyPhoneVerificationDesc,
      ResendMyPhoneVerificationRequest.fromPartial(request),
      metadata,
    );
  }

  RemoveMyPhone(request: DeepPartial<RemoveMyPhoneRequest>, metadata?: grpc.Metadata): Promise<RemoveMyPhoneResponse> {
    return this.rpc.unary(AuthServiceRemoveMyPhoneDesc, RemoveMyPhoneRequest.fromPartial(request), metadata);
  }

  RemoveMyAvatar(
    request: DeepPartial<RemoveMyAvatarRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveMyAvatarResponse> {
    return this.rpc.unary(AuthServiceRemoveMyAvatarDesc, RemoveMyAvatarRequest.fromPartial(request), metadata);
  }

  ListMyLinkedIDPs(
    request: DeepPartial<ListMyLinkedIDPsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyLinkedIDPsResponse> {
    return this.rpc.unary(AuthServiceListMyLinkedIDPsDesc, ListMyLinkedIDPsRequest.fromPartial(request), metadata);
  }

  RemoveMyLinkedIDP(
    request: DeepPartial<RemoveMyLinkedIDPRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveMyLinkedIDPResponse> {
    return this.rpc.unary(AuthServiceRemoveMyLinkedIDPDesc, RemoveMyLinkedIDPRequest.fromPartial(request), metadata);
  }

  ListMyAuthFactors(
    request: DeepPartial<ListMyAuthFactorsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyAuthFactorsResponse> {
    return this.rpc.unary(AuthServiceListMyAuthFactorsDesc, ListMyAuthFactorsRequest.fromPartial(request), metadata);
  }

  AddMyAuthFactorOTP(
    request: DeepPartial<AddMyAuthFactorOTPRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AddMyAuthFactorOTPResponse> {
    return this.rpc.unary(AuthServiceAddMyAuthFactorOTPDesc, AddMyAuthFactorOTPRequest.fromPartial(request), metadata);
  }

  VerifyMyAuthFactorOTP(
    request: DeepPartial<VerifyMyAuthFactorOTPRequest>,
    metadata?: grpc.Metadata,
  ): Promise<VerifyMyAuthFactorOTPResponse> {
    return this.rpc.unary(
      AuthServiceVerifyMyAuthFactorOTPDesc,
      VerifyMyAuthFactorOTPRequest.fromPartial(request),
      metadata,
    );
  }

  RemoveMyAuthFactorOTP(
    request: DeepPartial<RemoveMyAuthFactorOTPRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveMyAuthFactorOTPResponse> {
    return this.rpc.unary(
      AuthServiceRemoveMyAuthFactorOTPDesc,
      RemoveMyAuthFactorOTPRequest.fromPartial(request),
      metadata,
    );
  }

  AddMyAuthFactorU2F(
    request: DeepPartial<AddMyAuthFactorU2FRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AddMyAuthFactorU2FResponse> {
    return this.rpc.unary(AuthServiceAddMyAuthFactorU2FDesc, AddMyAuthFactorU2FRequest.fromPartial(request), metadata);
  }

  VerifyMyAuthFactorU2F(
    request: DeepPartial<VerifyMyAuthFactorU2FRequest>,
    metadata?: grpc.Metadata,
  ): Promise<VerifyMyAuthFactorU2FResponse> {
    return this.rpc.unary(
      AuthServiceVerifyMyAuthFactorU2FDesc,
      VerifyMyAuthFactorU2FRequest.fromPartial(request),
      metadata,
    );
  }

  RemoveMyAuthFactorU2F(
    request: DeepPartial<RemoveMyAuthFactorU2FRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveMyAuthFactorU2FResponse> {
    return this.rpc.unary(
      AuthServiceRemoveMyAuthFactorU2FDesc,
      RemoveMyAuthFactorU2FRequest.fromPartial(request),
      metadata,
    );
  }

  ListMyPasswordless(
    request: DeepPartial<ListMyPasswordlessRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyPasswordlessResponse> {
    return this.rpc.unary(AuthServiceListMyPasswordlessDesc, ListMyPasswordlessRequest.fromPartial(request), metadata);
  }

  AddMyPasswordless(
    request: DeepPartial<AddMyPasswordlessRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AddMyPasswordlessResponse> {
    return this.rpc.unary(AuthServiceAddMyPasswordlessDesc, AddMyPasswordlessRequest.fromPartial(request), metadata);
  }

  AddMyPasswordlessLink(
    request: DeepPartial<AddMyPasswordlessLinkRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AddMyPasswordlessLinkResponse> {
    return this.rpc.unary(
      AuthServiceAddMyPasswordlessLinkDesc,
      AddMyPasswordlessLinkRequest.fromPartial(request),
      metadata,
    );
  }

  SendMyPasswordlessLink(
    request: DeepPartial<SendMyPasswordlessLinkRequest>,
    metadata?: grpc.Metadata,
  ): Promise<SendMyPasswordlessLinkResponse> {
    return this.rpc.unary(
      AuthServiceSendMyPasswordlessLinkDesc,
      SendMyPasswordlessLinkRequest.fromPartial(request),
      metadata,
    );
  }

  VerifyMyPasswordless(
    request: DeepPartial<VerifyMyPasswordlessRequest>,
    metadata?: grpc.Metadata,
  ): Promise<VerifyMyPasswordlessResponse> {
    return this.rpc.unary(
      AuthServiceVerifyMyPasswordlessDesc,
      VerifyMyPasswordlessRequest.fromPartial(request),
      metadata,
    );
  }

  RemoveMyPasswordless(
    request: DeepPartial<RemoveMyPasswordlessRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveMyPasswordlessResponse> {
    return this.rpc.unary(
      AuthServiceRemoveMyPasswordlessDesc,
      RemoveMyPasswordlessRequest.fromPartial(request),
      metadata,
    );
  }

  ListMyUserGrants(
    request: DeepPartial<ListMyUserGrantsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyUserGrantsResponse> {
    return this.rpc.unary(AuthServiceListMyUserGrantsDesc, ListMyUserGrantsRequest.fromPartial(request), metadata);
  }

  ListMyProjectOrgs(
    request: DeepPartial<ListMyProjectOrgsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyProjectOrgsResponse> {
    return this.rpc.unary(AuthServiceListMyProjectOrgsDesc, ListMyProjectOrgsRequest.fromPartial(request), metadata);
  }

  ListMyZitadelPermissions(
    request: DeepPartial<ListMyZitadelPermissionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyZitadelPermissionsResponse> {
    return this.rpc.unary(
      AuthServiceListMyZitadelPermissionsDesc,
      ListMyZitadelPermissionsRequest.fromPartial(request),
      metadata,
    );
  }

  ListMyProjectPermissions(
    request: DeepPartial<ListMyProjectPermissionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyProjectPermissionsResponse> {
    return this.rpc.unary(
      AuthServiceListMyProjectPermissionsDesc,
      ListMyProjectPermissionsRequest.fromPartial(request),
      metadata,
    );
  }

  ListMyMemberships(
    request: DeepPartial<ListMyMembershipsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListMyMembershipsResponse> {
    return this.rpc.unary(AuthServiceListMyMembershipsDesc, ListMyMembershipsRequest.fromPartial(request), metadata);
  }

  GetMyLabelPolicy(
    request: DeepPartial<GetMyLabelPolicyRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetMyLabelPolicyResponse> {
    return this.rpc.unary(AuthServiceGetMyLabelPolicyDesc, GetMyLabelPolicyRequest.fromPartial(request), metadata);
  }

  GetMyPrivacyPolicy(
    request: DeepPartial<GetMyPrivacyPolicyRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetMyPrivacyPolicyResponse> {
    return this.rpc.unary(AuthServiceGetMyPrivacyPolicyDesc, GetMyPrivacyPolicyRequest.fromPartial(request), metadata);
  }

  GetMyLoginPolicy(
    request: DeepPartial<GetMyLoginPolicyRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetMyLoginPolicyResponse> {
    return this.rpc.unary(AuthServiceGetMyLoginPolicyDesc, GetMyLoginPolicyRequest.fromPartial(request), metadata);
  }
}

export const AuthServiceDesc = { serviceName: "zitadel.auth.v1.AuthService" };

export const AuthServiceHealthzDesc: UnaryMethodDefinitionish = {
  methodName: "Healthz",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return HealthzRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = HealthzResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceGetSupportedLanguagesDesc: UnaryMethodDefinitionish = {
  methodName: "GetSupportedLanguages",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetSupportedLanguagesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetSupportedLanguagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceGetMyUserDesc: UnaryMethodDefinitionish = {
  methodName: "GetMyUser",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetMyUserRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetMyUserResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceRemoveMyUserDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveMyUser",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RemoveMyUserRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RemoveMyUserResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceListMyUserChangesDesc: UnaryMethodDefinitionish = {
  methodName: "ListMyUserChanges",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListMyUserChangesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListMyUserChangesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceListMyUserSessionsDesc: UnaryMethodDefinitionish = {
  methodName: "ListMyUserSessions",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListMyUserSessionsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListMyUserSessionsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceListMyMetadataDesc: UnaryMethodDefinitionish = {
  methodName: "ListMyMetadata",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListMyMetadataRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListMyMetadataResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceGetMyMetadataDesc: UnaryMethodDefinitionish = {
  methodName: "GetMyMetadata",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetMyMetadataRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetMyMetadataResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceListMyRefreshTokensDesc: UnaryMethodDefinitionish = {
  methodName: "ListMyRefreshTokens",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListMyRefreshTokensRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListMyRefreshTokensResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceRevokeMyRefreshTokenDesc: UnaryMethodDefinitionish = {
  methodName: "RevokeMyRefreshToken",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RevokeMyRefreshTokenRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RevokeMyRefreshTokenResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceRevokeAllMyRefreshTokensDesc: UnaryMethodDefinitionish = {
  methodName: "RevokeAllMyRefreshTokens",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RevokeAllMyRefreshTokensRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RevokeAllMyRefreshTokensResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceUpdateMyUserNameDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateMyUserName",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateMyUserNameRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdateMyUserNameResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceGetMyPasswordComplexityPolicyDesc: UnaryMethodDefinitionish = {
  methodName: "GetMyPasswordComplexityPolicy",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetMyPasswordComplexityPolicyRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetMyPasswordComplexityPolicyResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceUpdateMyPasswordDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateMyPassword",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateMyPasswordRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdateMyPasswordResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceGetMyProfileDesc: UnaryMethodDefinitionish = {
  methodName: "GetMyProfile",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetMyProfileRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetMyProfileResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceUpdateMyProfileDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateMyProfile",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateMyProfileRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdateMyProfileResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceGetMyEmailDesc: UnaryMethodDefinitionish = {
  methodName: "GetMyEmail",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetMyEmailRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetMyEmailResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceSetMyEmailDesc: UnaryMethodDefinitionish = {
  methodName: "SetMyEmail",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SetMyEmailRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SetMyEmailResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceVerifyMyEmailDesc: UnaryMethodDefinitionish = {
  methodName: "VerifyMyEmail",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return VerifyMyEmailRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = VerifyMyEmailResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceResendMyEmailVerificationDesc: UnaryMethodDefinitionish = {
  methodName: "ResendMyEmailVerification",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ResendMyEmailVerificationRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResendMyEmailVerificationResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceGetMyPhoneDesc: UnaryMethodDefinitionish = {
  methodName: "GetMyPhone",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetMyPhoneRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetMyPhoneResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceSetMyPhoneDesc: UnaryMethodDefinitionish = {
  methodName: "SetMyPhone",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SetMyPhoneRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SetMyPhoneResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceVerifyMyPhoneDesc: UnaryMethodDefinitionish = {
  methodName: "VerifyMyPhone",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return VerifyMyPhoneRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = VerifyMyPhoneResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceResendMyPhoneVerificationDesc: UnaryMethodDefinitionish = {
  methodName: "ResendMyPhoneVerification",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ResendMyPhoneVerificationRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResendMyPhoneVerificationResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceRemoveMyPhoneDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveMyPhone",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RemoveMyPhoneRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RemoveMyPhoneResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceRemoveMyAvatarDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveMyAvatar",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RemoveMyAvatarRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RemoveMyAvatarResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceListMyLinkedIDPsDesc: UnaryMethodDefinitionish = {
  methodName: "ListMyLinkedIDPs",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListMyLinkedIDPsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListMyLinkedIDPsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceRemoveMyLinkedIDPDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveMyLinkedIDP",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RemoveMyLinkedIDPRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RemoveMyLinkedIDPResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceListMyAuthFactorsDesc: UnaryMethodDefinitionish = {
  methodName: "ListMyAuthFactors",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListMyAuthFactorsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListMyAuthFactorsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceAddMyAuthFactorOTPDesc: UnaryMethodDefinitionish = {
  methodName: "AddMyAuthFactorOTP",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AddMyAuthFactorOTPRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AddMyAuthFactorOTPResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceVerifyMyAuthFactorOTPDesc: UnaryMethodDefinitionish = {
  methodName: "VerifyMyAuthFactorOTP",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return VerifyMyAuthFactorOTPRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = VerifyMyAuthFactorOTPResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceRemoveMyAuthFactorOTPDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveMyAuthFactorOTP",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RemoveMyAuthFactorOTPRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RemoveMyAuthFactorOTPResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceAddMyAuthFactorU2FDesc: UnaryMethodDefinitionish = {
  methodName: "AddMyAuthFactorU2F",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AddMyAuthFactorU2FRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AddMyAuthFactorU2FResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceVerifyMyAuthFactorU2FDesc: UnaryMethodDefinitionish = {
  methodName: "VerifyMyAuthFactorU2F",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return VerifyMyAuthFactorU2FRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = VerifyMyAuthFactorU2FResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceRemoveMyAuthFactorU2FDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveMyAuthFactorU2F",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RemoveMyAuthFactorU2FRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RemoveMyAuthFactorU2FResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceListMyPasswordlessDesc: UnaryMethodDefinitionish = {
  methodName: "ListMyPasswordless",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListMyPasswordlessRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListMyPasswordlessResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceAddMyPasswordlessDesc: UnaryMethodDefinitionish = {
  methodName: "AddMyPasswordless",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AddMyPasswordlessRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AddMyPasswordlessResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceAddMyPasswordlessLinkDesc: UnaryMethodDefinitionish = {
  methodName: "AddMyPasswordlessLink",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AddMyPasswordlessLinkRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AddMyPasswordlessLinkResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceSendMyPasswordlessLinkDesc: UnaryMethodDefinitionish = {
  methodName: "SendMyPasswordlessLink",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SendMyPasswordlessLinkRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SendMyPasswordlessLinkResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceVerifyMyPasswordlessDesc: UnaryMethodDefinitionish = {
  methodName: "VerifyMyPasswordless",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return VerifyMyPasswordlessRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = VerifyMyPasswordlessResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceRemoveMyPasswordlessDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveMyPasswordless",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RemoveMyPasswordlessRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RemoveMyPasswordlessResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceListMyUserGrantsDesc: UnaryMethodDefinitionish = {
  methodName: "ListMyUserGrants",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListMyUserGrantsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListMyUserGrantsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceListMyProjectOrgsDesc: UnaryMethodDefinitionish = {
  methodName: "ListMyProjectOrgs",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListMyProjectOrgsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListMyProjectOrgsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceListMyZitadelPermissionsDesc: UnaryMethodDefinitionish = {
  methodName: "ListMyZitadelPermissions",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListMyZitadelPermissionsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListMyZitadelPermissionsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceListMyProjectPermissionsDesc: UnaryMethodDefinitionish = {
  methodName: "ListMyProjectPermissions",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListMyProjectPermissionsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListMyProjectPermissionsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceListMyMembershipsDesc: UnaryMethodDefinitionish = {
  methodName: "ListMyMemberships",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListMyMembershipsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListMyMembershipsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceGetMyLabelPolicyDesc: UnaryMethodDefinitionish = {
  methodName: "GetMyLabelPolicy",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetMyLabelPolicyRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetMyLabelPolicyResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceGetMyPrivacyPolicyDesc: UnaryMethodDefinitionish = {
  methodName: "GetMyPrivacyPolicy",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetMyPrivacyPolicyRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetMyPrivacyPolicyResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AuthServiceGetMyLoginPolicyDesc: UnaryMethodDefinitionish = {
  methodName: "GetMyLoginPolicy",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetMyLoginPolicyRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetMyLoginPolicyResponse.decode(data);
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

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends tsProtoGlobalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
