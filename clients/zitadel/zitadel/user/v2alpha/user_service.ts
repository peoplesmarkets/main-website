/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Struct } from "../../../google/protobuf/struct";
import { Details, ListDetails, Organisation } from "../../object/v2alpha/object";
import {
  PasskeyAuthenticator,
  passkeyAuthenticatorFromJSON,
  passkeyAuthenticatorToJSON,
  PasskeyRegistrationCode,
  ReturnPasskeyRegistrationCode,
  SendPasskeyRegistrationLink,
} from "./auth";
import { ReturnEmailVerificationCode, SendEmailVerificationCode, SetHumanEmail } from "./email";
import { IDPInformation, IDPLink } from "./idp";
import { HashedPassword, Password, ReturnPasswordResetCode, SendPasswordResetLink } from "./password";
import { SetHumanProfile, SetMetadataEntry } from "./user";

export const protobufPackage = "zitadel.user.v2alpha";

export enum AuthenticationMethodType {
  AUTHENTICATION_METHOD_TYPE_UNSPECIFIED = 0,
  AUTHENTICATION_METHOD_TYPE_PASSWORD = 1,
  AUTHENTICATION_METHOD_TYPE_PASSKEY = 2,
  AUTHENTICATION_METHOD_TYPE_IDP = 3,
  AUTHENTICATION_METHOD_TYPE_TOTP = 4,
  AUTHENTICATION_METHOD_TYPE_U2F = 5,
  UNRECOGNIZED = -1,
}

export function authenticationMethodTypeFromJSON(object: any): AuthenticationMethodType {
  switch (object) {
    case 0:
    case "AUTHENTICATION_METHOD_TYPE_UNSPECIFIED":
      return AuthenticationMethodType.AUTHENTICATION_METHOD_TYPE_UNSPECIFIED;
    case 1:
    case "AUTHENTICATION_METHOD_TYPE_PASSWORD":
      return AuthenticationMethodType.AUTHENTICATION_METHOD_TYPE_PASSWORD;
    case 2:
    case "AUTHENTICATION_METHOD_TYPE_PASSKEY":
      return AuthenticationMethodType.AUTHENTICATION_METHOD_TYPE_PASSKEY;
    case 3:
    case "AUTHENTICATION_METHOD_TYPE_IDP":
      return AuthenticationMethodType.AUTHENTICATION_METHOD_TYPE_IDP;
    case 4:
    case "AUTHENTICATION_METHOD_TYPE_TOTP":
      return AuthenticationMethodType.AUTHENTICATION_METHOD_TYPE_TOTP;
    case 5:
    case "AUTHENTICATION_METHOD_TYPE_U2F":
      return AuthenticationMethodType.AUTHENTICATION_METHOD_TYPE_U2F;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AuthenticationMethodType.UNRECOGNIZED;
  }
}

export function authenticationMethodTypeToJSON(object: AuthenticationMethodType): string {
  switch (object) {
    case AuthenticationMethodType.AUTHENTICATION_METHOD_TYPE_UNSPECIFIED:
      return "AUTHENTICATION_METHOD_TYPE_UNSPECIFIED";
    case AuthenticationMethodType.AUTHENTICATION_METHOD_TYPE_PASSWORD:
      return "AUTHENTICATION_METHOD_TYPE_PASSWORD";
    case AuthenticationMethodType.AUTHENTICATION_METHOD_TYPE_PASSKEY:
      return "AUTHENTICATION_METHOD_TYPE_PASSKEY";
    case AuthenticationMethodType.AUTHENTICATION_METHOD_TYPE_IDP:
      return "AUTHENTICATION_METHOD_TYPE_IDP";
    case AuthenticationMethodType.AUTHENTICATION_METHOD_TYPE_TOTP:
      return "AUTHENTICATION_METHOD_TYPE_TOTP";
    case AuthenticationMethodType.AUTHENTICATION_METHOD_TYPE_U2F:
      return "AUTHENTICATION_METHOD_TYPE_U2F";
    case AuthenticationMethodType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface AddHumanUserRequest {
  /** optionally set your own id unique for the user */
  userId?:
    | string
    | undefined;
  /** optionally set a unique username, if none is provided the email will be used */
  username?: string | undefined;
  organisation: Organisation | undefined;
  profile: SetHumanProfile | undefined;
  email: SetHumanEmail | undefined;
  metadata: SetMetadataEntry[];
  password?: Password | undefined;
  hashedPassword?: HashedPassword | undefined;
  idpLinks: IDPLink[];
}

export interface AddHumanUserResponse {
  userId: string;
  details: Details | undefined;
  emailCode?: string | undefined;
}

export interface SetEmailRequest {
  userId: string;
  email: string;
  sendCode?: SendEmailVerificationCode | undefined;
  returnCode?: ReturnEmailVerificationCode | undefined;
  isVerified?: boolean | undefined;
}

export interface SetEmailResponse {
  details:
    | Details
    | undefined;
  /** in case the verification was set to return_code, the code will be returned */
  verificationCode?: string | undefined;
}

export interface VerifyEmailRequest {
  userId: string;
  verificationCode: string;
}

export interface VerifyEmailResponse {
  details: Details | undefined;
}

export interface RegisterPasskeyRequest {
  userId: string;
  code?: PasskeyRegistrationCode | undefined;
  authenticator: PasskeyAuthenticator;
  domain: string;
}

export interface RegisterPasskeyResponse {
  details: Details | undefined;
  passkeyId: string;
  publicKeyCredentialCreationOptions: { [key: string]: any } | undefined;
}

export interface VerifyPasskeyRegistrationRequest {
  userId: string;
  passkeyId: string;
  publicKeyCredential: { [key: string]: any } | undefined;
  passkeyName: string;
}

export interface VerifyPasskeyRegistrationResponse {
  details: Details | undefined;
}

export interface RegisterU2FRequest {
  userId: string;
  domain: string;
}

export interface RegisterU2FResponse {
  details: Details | undefined;
  u2fId: string;
  publicKeyCredentialCreationOptions: { [key: string]: any } | undefined;
}

export interface VerifyU2FRegistrationRequest {
  userId: string;
  u2fId: string;
  publicKeyCredential: { [key: string]: any } | undefined;
  tokenName: string;
}

export interface VerifyU2FRegistrationResponse {
  details: Details | undefined;
}

export interface RegisterTOTPRequest {
  userId: string;
}

export interface RegisterTOTPResponse {
  details: Details | undefined;
  uri: string;
  secret: string;
}

export interface VerifyTOTPRegistrationRequest {
  userId: string;
  code: string;
}

export interface VerifyTOTPRegistrationResponse {
  details: Details | undefined;
}

export interface CreatePasskeyRegistrationLinkRequest {
  userId: string;
  sendLink?: SendPasskeyRegistrationLink | undefined;
  returnCode?: ReturnPasskeyRegistrationCode | undefined;
}

export interface CreatePasskeyRegistrationLinkResponse {
  details:
    | Details
    | undefined;
  /** in case the medium was set to return_code, the code will be returned */
  code?: PasskeyRegistrationCode | undefined;
}

export interface StartIdentityProviderFlowRequest {
  idpId: string;
  successUrl: string;
  failureUrl: string;
}

export interface StartIdentityProviderFlowResponse {
  details: Details | undefined;
  authUrl?: string | undefined;
}

export interface RetrieveIdentityProviderInformationRequest {
  intentId: string;
  token: string;
}

export interface RetrieveIdentityProviderInformationResponse {
  details: Details | undefined;
  idpInformation: IDPInformation | undefined;
}

export interface AddIDPLinkRequest {
  userId: string;
  idpLink: IDPLink | undefined;
}

export interface AddIDPLinkResponse {
  details: Details | undefined;
}

export interface PasswordResetRequest {
  userId: string;
  sendLink?: SendPasswordResetLink | undefined;
  returnCode?: ReturnPasswordResetCode | undefined;
}

export interface PasswordResetResponse {
  details:
    | Details
    | undefined;
  /** in case the medium was set to return_code, the code will be returned */
  verificationCode?: string | undefined;
}

export interface SetPasswordRequest {
  userId: string;
  newPassword: Password | undefined;
  currentPassword?: string | undefined;
  verificationCode?: string | undefined;
}

export interface SetPasswordResponse {
  details: Details | undefined;
}

export interface ListAuthenticationMethodTypesRequest {
  userId: string;
}

export interface ListAuthenticationMethodTypesResponse {
  details: ListDetails | undefined;
  authMethodTypes: AuthenticationMethodType[];
}

function createBaseAddHumanUserRequest(): AddHumanUserRequest {
  return {
    userId: undefined,
    username: undefined,
    organisation: undefined,
    profile: undefined,
    email: undefined,
    metadata: [],
    password: undefined,
    hashedPassword: undefined,
    idpLinks: [],
  };
}

export const AddHumanUserRequest = {
  encode(message: AddHumanUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== undefined) {
      writer.uint32(10).string(message.userId);
    }
    if (message.username !== undefined) {
      writer.uint32(18).string(message.username);
    }
    if (message.organisation !== undefined) {
      Organisation.encode(message.organisation, writer.uint32(26).fork()).ldelim();
    }
    if (message.profile !== undefined) {
      SetHumanProfile.encode(message.profile, writer.uint32(34).fork()).ldelim();
    }
    if (message.email !== undefined) {
      SetHumanEmail.encode(message.email, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.metadata) {
      SetMetadataEntry.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.password !== undefined) {
      Password.encode(message.password, writer.uint32(58).fork()).ldelim();
    }
    if (message.hashedPassword !== undefined) {
      HashedPassword.encode(message.hashedPassword, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.idpLinks) {
      IDPLink.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddHumanUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddHumanUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.username = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.organisation = Organisation.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.profile = SetHumanProfile.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.email = SetHumanEmail.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.metadata.push(SetMetadataEntry.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.password = Password.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.hashedPassword = HashedPassword.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.idpLinks.push(IDPLink.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddHumanUserRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : undefined,
      username: isSet(object.username) ? String(object.username) : undefined,
      organisation: isSet(object.organisation) ? Organisation.fromJSON(object.organisation) : undefined,
      profile: isSet(object.profile) ? SetHumanProfile.fromJSON(object.profile) : undefined,
      email: isSet(object.email) ? SetHumanEmail.fromJSON(object.email) : undefined,
      metadata: Array.isArray(object?.metadata) ? object.metadata.map((e: any) => SetMetadataEntry.fromJSON(e)) : [],
      password: isSet(object.password) ? Password.fromJSON(object.password) : undefined,
      hashedPassword: isSet(object.hashedPassword) ? HashedPassword.fromJSON(object.hashedPassword) : undefined,
      idpLinks: Array.isArray(object?.idpLinks) ? object.idpLinks.map((e: any) => IDPLink.fromJSON(e)) : [],
    };
  },

  toJSON(message: AddHumanUserRequest): unknown {
    const obj: any = {};
    if (message.userId !== undefined) {
      obj.userId = message.userId;
    }
    if (message.username !== undefined) {
      obj.username = message.username;
    }
    if (message.organisation !== undefined) {
      obj.organisation = Organisation.toJSON(message.organisation);
    }
    if (message.profile !== undefined) {
      obj.profile = SetHumanProfile.toJSON(message.profile);
    }
    if (message.email !== undefined) {
      obj.email = SetHumanEmail.toJSON(message.email);
    }
    if (message.metadata?.length) {
      obj.metadata = message.metadata.map((e) => SetMetadataEntry.toJSON(e));
    }
    if (message.password !== undefined) {
      obj.password = Password.toJSON(message.password);
    }
    if (message.hashedPassword !== undefined) {
      obj.hashedPassword = HashedPassword.toJSON(message.hashedPassword);
    }
    if (message.idpLinks?.length) {
      obj.idpLinks = message.idpLinks.map((e) => IDPLink.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddHumanUserRequest>, I>>(base?: I): AddHumanUserRequest {
    return AddHumanUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddHumanUserRequest>, I>>(object: I): AddHumanUserRequest {
    const message = createBaseAddHumanUserRequest();
    message.userId = object.userId ?? undefined;
    message.username = object.username ?? undefined;
    message.organisation = (object.organisation !== undefined && object.organisation !== null)
      ? Organisation.fromPartial(object.organisation)
      : undefined;
    message.profile = (object.profile !== undefined && object.profile !== null)
      ? SetHumanProfile.fromPartial(object.profile)
      : undefined;
    message.email = (object.email !== undefined && object.email !== null)
      ? SetHumanEmail.fromPartial(object.email)
      : undefined;
    message.metadata = object.metadata?.map((e) => SetMetadataEntry.fromPartial(e)) || [];
    message.password = (object.password !== undefined && object.password !== null)
      ? Password.fromPartial(object.password)
      : undefined;
    message.hashedPassword = (object.hashedPassword !== undefined && object.hashedPassword !== null)
      ? HashedPassword.fromPartial(object.hashedPassword)
      : undefined;
    message.idpLinks = object.idpLinks?.map((e) => IDPLink.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAddHumanUserResponse(): AddHumanUserResponse {
  return { userId: "", details: undefined, emailCode: undefined };
}

export const AddHumanUserResponse = {
  encode(message: AddHumanUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(18).fork()).ldelim();
    }
    if (message.emailCode !== undefined) {
      writer.uint32(26).string(message.emailCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddHumanUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddHumanUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.details = Details.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.emailCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddHumanUserResponse {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      emailCode: isSet(object.emailCode) ? String(object.emailCode) : undefined,
    };
  },

  toJSON(message: AddHumanUserResponse): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.emailCode !== undefined) {
      obj.emailCode = message.emailCode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddHumanUserResponse>, I>>(base?: I): AddHumanUserResponse {
    return AddHumanUserResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddHumanUserResponse>, I>>(object: I): AddHumanUserResponse {
    const message = createBaseAddHumanUserResponse();
    message.userId = object.userId ?? "";
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.emailCode = object.emailCode ?? undefined;
    return message;
  },
};

function createBaseSetEmailRequest(): SetEmailRequest {
  return { userId: "", email: "", sendCode: undefined, returnCode: undefined, isVerified: undefined };
}

export const SetEmailRequest = {
  encode(message: SetEmailRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.sendCode !== undefined) {
      SendEmailVerificationCode.encode(message.sendCode, writer.uint32(26).fork()).ldelim();
    }
    if (message.returnCode !== undefined) {
      ReturnEmailVerificationCode.encode(message.returnCode, writer.uint32(34).fork()).ldelim();
    }
    if (message.isVerified !== undefined) {
      writer.uint32(40).bool(message.isVerified);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetEmailRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetEmailRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.email = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sendCode = SendEmailVerificationCode.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.returnCode = ReturnEmailVerificationCode.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.isVerified = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetEmailRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      email: isSet(object.email) ? String(object.email) : "",
      sendCode: isSet(object.sendCode) ? SendEmailVerificationCode.fromJSON(object.sendCode) : undefined,
      returnCode: isSet(object.returnCode) ? ReturnEmailVerificationCode.fromJSON(object.returnCode) : undefined,
      isVerified: isSet(object.isVerified) ? Boolean(object.isVerified) : undefined,
    };
  },

  toJSON(message: SetEmailRequest): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.sendCode !== undefined) {
      obj.sendCode = SendEmailVerificationCode.toJSON(message.sendCode);
    }
    if (message.returnCode !== undefined) {
      obj.returnCode = ReturnEmailVerificationCode.toJSON(message.returnCode);
    }
    if (message.isVerified !== undefined) {
      obj.isVerified = message.isVerified;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetEmailRequest>, I>>(base?: I): SetEmailRequest {
    return SetEmailRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetEmailRequest>, I>>(object: I): SetEmailRequest {
    const message = createBaseSetEmailRequest();
    message.userId = object.userId ?? "";
    message.email = object.email ?? "";
    message.sendCode = (object.sendCode !== undefined && object.sendCode !== null)
      ? SendEmailVerificationCode.fromPartial(object.sendCode)
      : undefined;
    message.returnCode = (object.returnCode !== undefined && object.returnCode !== null)
      ? ReturnEmailVerificationCode.fromPartial(object.returnCode)
      : undefined;
    message.isVerified = object.isVerified ?? undefined;
    return message;
  },
};

function createBaseSetEmailResponse(): SetEmailResponse {
  return { details: undefined, verificationCode: undefined };
}

export const SetEmailResponse = {
  encode(message: SetEmailResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.verificationCode !== undefined) {
      writer.uint32(18).string(message.verificationCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetEmailResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetEmailResponse();
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

          message.verificationCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetEmailResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      verificationCode: isSet(object.verificationCode) ? String(object.verificationCode) : undefined,
    };
  },

  toJSON(message: SetEmailResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.verificationCode !== undefined) {
      obj.verificationCode = message.verificationCode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetEmailResponse>, I>>(base?: I): SetEmailResponse {
    return SetEmailResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetEmailResponse>, I>>(object: I): SetEmailResponse {
    const message = createBaseSetEmailResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.verificationCode = object.verificationCode ?? undefined;
    return message;
  },
};

function createBaseVerifyEmailRequest(): VerifyEmailRequest {
  return { userId: "", verificationCode: "" };
}

export const VerifyEmailRequest = {
  encode(message: VerifyEmailRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.verificationCode !== "") {
      writer.uint32(18).string(message.verificationCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyEmailRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyEmailRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.verificationCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyEmailRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      verificationCode: isSet(object.verificationCode) ? String(object.verificationCode) : "",
    };
  },

  toJSON(message: VerifyEmailRequest): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.verificationCode !== "") {
      obj.verificationCode = message.verificationCode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyEmailRequest>, I>>(base?: I): VerifyEmailRequest {
    return VerifyEmailRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyEmailRequest>, I>>(object: I): VerifyEmailRequest {
    const message = createBaseVerifyEmailRequest();
    message.userId = object.userId ?? "";
    message.verificationCode = object.verificationCode ?? "";
    return message;
  },
};

function createBaseVerifyEmailResponse(): VerifyEmailResponse {
  return { details: undefined };
}

export const VerifyEmailResponse = {
  encode(message: VerifyEmailResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyEmailResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyEmailResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = Details.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyEmailResponse {
    return { details: isSet(object.details) ? Details.fromJSON(object.details) : undefined };
  },

  toJSON(message: VerifyEmailResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyEmailResponse>, I>>(base?: I): VerifyEmailResponse {
    return VerifyEmailResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyEmailResponse>, I>>(object: I): VerifyEmailResponse {
    const message = createBaseVerifyEmailResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseRegisterPasskeyRequest(): RegisterPasskeyRequest {
  return { userId: "", code: undefined, authenticator: 0, domain: "" };
}

export const RegisterPasskeyRequest = {
  encode(message: RegisterPasskeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.code !== undefined) {
      PasskeyRegistrationCode.encode(message.code, writer.uint32(18).fork()).ldelim();
    }
    if (message.authenticator !== 0) {
      writer.uint32(24).int32(message.authenticator);
    }
    if (message.domain !== "") {
      writer.uint32(34).string(message.domain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterPasskeyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterPasskeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.code = PasskeyRegistrationCode.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.authenticator = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.domain = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisterPasskeyRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      code: isSet(object.code) ? PasskeyRegistrationCode.fromJSON(object.code) : undefined,
      authenticator: isSet(object.authenticator) ? passkeyAuthenticatorFromJSON(object.authenticator) : 0,
      domain: isSet(object.domain) ? String(object.domain) : "",
    };
  },

  toJSON(message: RegisterPasskeyRequest): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.code !== undefined) {
      obj.code = PasskeyRegistrationCode.toJSON(message.code);
    }
    if (message.authenticator !== 0) {
      obj.authenticator = passkeyAuthenticatorToJSON(message.authenticator);
    }
    if (message.domain !== "") {
      obj.domain = message.domain;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterPasskeyRequest>, I>>(base?: I): RegisterPasskeyRequest {
    return RegisterPasskeyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisterPasskeyRequest>, I>>(object: I): RegisterPasskeyRequest {
    const message = createBaseRegisterPasskeyRequest();
    message.userId = object.userId ?? "";
    message.code = (object.code !== undefined && object.code !== null)
      ? PasskeyRegistrationCode.fromPartial(object.code)
      : undefined;
    message.authenticator = object.authenticator ?? 0;
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseRegisterPasskeyResponse(): RegisterPasskeyResponse {
  return { details: undefined, passkeyId: "", publicKeyCredentialCreationOptions: undefined };
}

export const RegisterPasskeyResponse = {
  encode(message: RegisterPasskeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.passkeyId !== "") {
      writer.uint32(18).string(message.passkeyId);
    }
    if (message.publicKeyCredentialCreationOptions !== undefined) {
      Struct.encode(Struct.wrap(message.publicKeyCredentialCreationOptions), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterPasskeyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterPasskeyResponse();
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

          message.passkeyId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.publicKeyCredentialCreationOptions = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisterPasskeyResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      passkeyId: isSet(object.passkeyId) ? String(object.passkeyId) : "",
      publicKeyCredentialCreationOptions: isObject(object.publicKeyCredentialCreationOptions)
        ? object.publicKeyCredentialCreationOptions
        : undefined,
    };
  },

  toJSON(message: RegisterPasskeyResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.passkeyId !== "") {
      obj.passkeyId = message.passkeyId;
    }
    if (message.publicKeyCredentialCreationOptions !== undefined) {
      obj.publicKeyCredentialCreationOptions = message.publicKeyCredentialCreationOptions;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterPasskeyResponse>, I>>(base?: I): RegisterPasskeyResponse {
    return RegisterPasskeyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisterPasskeyResponse>, I>>(object: I): RegisterPasskeyResponse {
    const message = createBaseRegisterPasskeyResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.passkeyId = object.passkeyId ?? "";
    message.publicKeyCredentialCreationOptions = object.publicKeyCredentialCreationOptions ?? undefined;
    return message;
  },
};

function createBaseVerifyPasskeyRegistrationRequest(): VerifyPasskeyRegistrationRequest {
  return { userId: "", passkeyId: "", publicKeyCredential: undefined, passkeyName: "" };
}

export const VerifyPasskeyRegistrationRequest = {
  encode(message: VerifyPasskeyRegistrationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.passkeyId !== "") {
      writer.uint32(18).string(message.passkeyId);
    }
    if (message.publicKeyCredential !== undefined) {
      Struct.encode(Struct.wrap(message.publicKeyCredential), writer.uint32(26).fork()).ldelim();
    }
    if (message.passkeyName !== "") {
      writer.uint32(34).string(message.passkeyName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyPasskeyRegistrationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyPasskeyRegistrationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.passkeyId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.publicKeyCredential = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.passkeyName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyPasskeyRegistrationRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      passkeyId: isSet(object.passkeyId) ? String(object.passkeyId) : "",
      publicKeyCredential: isObject(object.publicKeyCredential) ? object.publicKeyCredential : undefined,
      passkeyName: isSet(object.passkeyName) ? String(object.passkeyName) : "",
    };
  },

  toJSON(message: VerifyPasskeyRegistrationRequest): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.passkeyId !== "") {
      obj.passkeyId = message.passkeyId;
    }
    if (message.publicKeyCredential !== undefined) {
      obj.publicKeyCredential = message.publicKeyCredential;
    }
    if (message.passkeyName !== "") {
      obj.passkeyName = message.passkeyName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyPasskeyRegistrationRequest>, I>>(
    base?: I,
  ): VerifyPasskeyRegistrationRequest {
    return VerifyPasskeyRegistrationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyPasskeyRegistrationRequest>, I>>(
    object: I,
  ): VerifyPasskeyRegistrationRequest {
    const message = createBaseVerifyPasskeyRegistrationRequest();
    message.userId = object.userId ?? "";
    message.passkeyId = object.passkeyId ?? "";
    message.publicKeyCredential = object.publicKeyCredential ?? undefined;
    message.passkeyName = object.passkeyName ?? "";
    return message;
  },
};

function createBaseVerifyPasskeyRegistrationResponse(): VerifyPasskeyRegistrationResponse {
  return { details: undefined };
}

export const VerifyPasskeyRegistrationResponse = {
  encode(message: VerifyPasskeyRegistrationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyPasskeyRegistrationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyPasskeyRegistrationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = Details.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyPasskeyRegistrationResponse {
    return { details: isSet(object.details) ? Details.fromJSON(object.details) : undefined };
  },

  toJSON(message: VerifyPasskeyRegistrationResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyPasskeyRegistrationResponse>, I>>(
    base?: I,
  ): VerifyPasskeyRegistrationResponse {
    return VerifyPasskeyRegistrationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyPasskeyRegistrationResponse>, I>>(
    object: I,
  ): VerifyPasskeyRegistrationResponse {
    const message = createBaseVerifyPasskeyRegistrationResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseRegisterU2FRequest(): RegisterU2FRequest {
  return { userId: "", domain: "" };
}

export const RegisterU2FRequest = {
  encode(message: RegisterU2FRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.domain !== "") {
      writer.uint32(18).string(message.domain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterU2FRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterU2FRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.domain = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisterU2FRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      domain: isSet(object.domain) ? String(object.domain) : "",
    };
  },

  toJSON(message: RegisterU2FRequest): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.domain !== "") {
      obj.domain = message.domain;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterU2FRequest>, I>>(base?: I): RegisterU2FRequest {
    return RegisterU2FRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisterU2FRequest>, I>>(object: I): RegisterU2FRequest {
    const message = createBaseRegisterU2FRequest();
    message.userId = object.userId ?? "";
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseRegisterU2FResponse(): RegisterU2FResponse {
  return { details: undefined, u2fId: "", publicKeyCredentialCreationOptions: undefined };
}

export const RegisterU2FResponse = {
  encode(message: RegisterU2FResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.u2fId !== "") {
      writer.uint32(18).string(message.u2fId);
    }
    if (message.publicKeyCredentialCreationOptions !== undefined) {
      Struct.encode(Struct.wrap(message.publicKeyCredentialCreationOptions), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterU2FResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterU2FResponse();
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

          message.u2fId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.publicKeyCredentialCreationOptions = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisterU2FResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      u2fId: isSet(object.u2fId) ? String(object.u2fId) : "",
      publicKeyCredentialCreationOptions: isObject(object.publicKeyCredentialCreationOptions)
        ? object.publicKeyCredentialCreationOptions
        : undefined,
    };
  },

  toJSON(message: RegisterU2FResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.u2fId !== "") {
      obj.u2fId = message.u2fId;
    }
    if (message.publicKeyCredentialCreationOptions !== undefined) {
      obj.publicKeyCredentialCreationOptions = message.publicKeyCredentialCreationOptions;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterU2FResponse>, I>>(base?: I): RegisterU2FResponse {
    return RegisterU2FResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisterU2FResponse>, I>>(object: I): RegisterU2FResponse {
    const message = createBaseRegisterU2FResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.u2fId = object.u2fId ?? "";
    message.publicKeyCredentialCreationOptions = object.publicKeyCredentialCreationOptions ?? undefined;
    return message;
  },
};

function createBaseVerifyU2FRegistrationRequest(): VerifyU2FRegistrationRequest {
  return { userId: "", u2fId: "", publicKeyCredential: undefined, tokenName: "" };
}

export const VerifyU2FRegistrationRequest = {
  encode(message: VerifyU2FRegistrationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.u2fId !== "") {
      writer.uint32(18).string(message.u2fId);
    }
    if (message.publicKeyCredential !== undefined) {
      Struct.encode(Struct.wrap(message.publicKeyCredential), writer.uint32(26).fork()).ldelim();
    }
    if (message.tokenName !== "") {
      writer.uint32(34).string(message.tokenName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyU2FRegistrationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyU2FRegistrationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.u2fId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.publicKeyCredential = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.tokenName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyU2FRegistrationRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      u2fId: isSet(object.u2fId) ? String(object.u2fId) : "",
      publicKeyCredential: isObject(object.publicKeyCredential) ? object.publicKeyCredential : undefined,
      tokenName: isSet(object.tokenName) ? String(object.tokenName) : "",
    };
  },

  toJSON(message: VerifyU2FRegistrationRequest): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.u2fId !== "") {
      obj.u2fId = message.u2fId;
    }
    if (message.publicKeyCredential !== undefined) {
      obj.publicKeyCredential = message.publicKeyCredential;
    }
    if (message.tokenName !== "") {
      obj.tokenName = message.tokenName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyU2FRegistrationRequest>, I>>(base?: I): VerifyU2FRegistrationRequest {
    return VerifyU2FRegistrationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyU2FRegistrationRequest>, I>>(object: I): VerifyU2FRegistrationRequest {
    const message = createBaseVerifyU2FRegistrationRequest();
    message.userId = object.userId ?? "";
    message.u2fId = object.u2fId ?? "";
    message.publicKeyCredential = object.publicKeyCredential ?? undefined;
    message.tokenName = object.tokenName ?? "";
    return message;
  },
};

function createBaseVerifyU2FRegistrationResponse(): VerifyU2FRegistrationResponse {
  return { details: undefined };
}

export const VerifyU2FRegistrationResponse = {
  encode(message: VerifyU2FRegistrationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyU2FRegistrationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyU2FRegistrationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = Details.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyU2FRegistrationResponse {
    return { details: isSet(object.details) ? Details.fromJSON(object.details) : undefined };
  },

  toJSON(message: VerifyU2FRegistrationResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyU2FRegistrationResponse>, I>>(base?: I): VerifyU2FRegistrationResponse {
    return VerifyU2FRegistrationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyU2FRegistrationResponse>, I>>(
    object: I,
  ): VerifyU2FRegistrationResponse {
    const message = createBaseVerifyU2FRegistrationResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseRegisterTOTPRequest(): RegisterTOTPRequest {
  return { userId: "" };
}

export const RegisterTOTPRequest = {
  encode(message: RegisterTOTPRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterTOTPRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterTOTPRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisterTOTPRequest {
    return { userId: isSet(object.userId) ? String(object.userId) : "" };
  },

  toJSON(message: RegisterTOTPRequest): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterTOTPRequest>, I>>(base?: I): RegisterTOTPRequest {
    return RegisterTOTPRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisterTOTPRequest>, I>>(object: I): RegisterTOTPRequest {
    const message = createBaseRegisterTOTPRequest();
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseRegisterTOTPResponse(): RegisterTOTPResponse {
  return { details: undefined, uri: "", secret: "" };
}

export const RegisterTOTPResponse = {
  encode(message: RegisterTOTPResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.uri !== "") {
      writer.uint32(18).string(message.uri);
    }
    if (message.secret !== "") {
      writer.uint32(26).string(message.secret);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterTOTPResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterTOTPResponse();
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

          message.uri = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.secret = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisterTOTPResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      uri: isSet(object.uri) ? String(object.uri) : "",
      secret: isSet(object.secret) ? String(object.secret) : "",
    };
  },

  toJSON(message: RegisterTOTPResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.uri !== "") {
      obj.uri = message.uri;
    }
    if (message.secret !== "") {
      obj.secret = message.secret;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterTOTPResponse>, I>>(base?: I): RegisterTOTPResponse {
    return RegisterTOTPResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisterTOTPResponse>, I>>(object: I): RegisterTOTPResponse {
    const message = createBaseRegisterTOTPResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.uri = object.uri ?? "";
    message.secret = object.secret ?? "";
    return message;
  },
};

function createBaseVerifyTOTPRegistrationRequest(): VerifyTOTPRegistrationRequest {
  return { userId: "", code: "" };
}

export const VerifyTOTPRegistrationRequest = {
  encode(message: VerifyTOTPRegistrationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.code !== "") {
      writer.uint32(18).string(message.code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyTOTPRegistrationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyTOTPRegistrationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): VerifyTOTPRegistrationRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      code: isSet(object.code) ? String(object.code) : "",
    };
  },

  toJSON(message: VerifyTOTPRegistrationRequest): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.code !== "") {
      obj.code = message.code;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyTOTPRegistrationRequest>, I>>(base?: I): VerifyTOTPRegistrationRequest {
    return VerifyTOTPRegistrationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyTOTPRegistrationRequest>, I>>(
    object: I,
  ): VerifyTOTPRegistrationRequest {
    const message = createBaseVerifyTOTPRegistrationRequest();
    message.userId = object.userId ?? "";
    message.code = object.code ?? "";
    return message;
  },
};

function createBaseVerifyTOTPRegistrationResponse(): VerifyTOTPRegistrationResponse {
  return { details: undefined };
}

export const VerifyTOTPRegistrationResponse = {
  encode(message: VerifyTOTPRegistrationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyTOTPRegistrationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyTOTPRegistrationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = Details.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyTOTPRegistrationResponse {
    return { details: isSet(object.details) ? Details.fromJSON(object.details) : undefined };
  },

  toJSON(message: VerifyTOTPRegistrationResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyTOTPRegistrationResponse>, I>>(base?: I): VerifyTOTPRegistrationResponse {
    return VerifyTOTPRegistrationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyTOTPRegistrationResponse>, I>>(
    object: I,
  ): VerifyTOTPRegistrationResponse {
    const message = createBaseVerifyTOTPRegistrationResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseCreatePasskeyRegistrationLinkRequest(): CreatePasskeyRegistrationLinkRequest {
  return { userId: "", sendLink: undefined, returnCode: undefined };
}

export const CreatePasskeyRegistrationLinkRequest = {
  encode(message: CreatePasskeyRegistrationLinkRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.sendLink !== undefined) {
      SendPasskeyRegistrationLink.encode(message.sendLink, writer.uint32(18).fork()).ldelim();
    }
    if (message.returnCode !== undefined) {
      ReturnPasskeyRegistrationCode.encode(message.returnCode, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreatePasskeyRegistrationLinkRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreatePasskeyRegistrationLinkRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sendLink = SendPasskeyRegistrationLink.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.returnCode = ReturnPasskeyRegistrationCode.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreatePasskeyRegistrationLinkRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      sendLink: isSet(object.sendLink) ? SendPasskeyRegistrationLink.fromJSON(object.sendLink) : undefined,
      returnCode: isSet(object.returnCode) ? ReturnPasskeyRegistrationCode.fromJSON(object.returnCode) : undefined,
    };
  },

  toJSON(message: CreatePasskeyRegistrationLinkRequest): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.sendLink !== undefined) {
      obj.sendLink = SendPasskeyRegistrationLink.toJSON(message.sendLink);
    }
    if (message.returnCode !== undefined) {
      obj.returnCode = ReturnPasskeyRegistrationCode.toJSON(message.returnCode);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreatePasskeyRegistrationLinkRequest>, I>>(
    base?: I,
  ): CreatePasskeyRegistrationLinkRequest {
    return CreatePasskeyRegistrationLinkRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreatePasskeyRegistrationLinkRequest>, I>>(
    object: I,
  ): CreatePasskeyRegistrationLinkRequest {
    const message = createBaseCreatePasskeyRegistrationLinkRequest();
    message.userId = object.userId ?? "";
    message.sendLink = (object.sendLink !== undefined && object.sendLink !== null)
      ? SendPasskeyRegistrationLink.fromPartial(object.sendLink)
      : undefined;
    message.returnCode = (object.returnCode !== undefined && object.returnCode !== null)
      ? ReturnPasskeyRegistrationCode.fromPartial(object.returnCode)
      : undefined;
    return message;
  },
};

function createBaseCreatePasskeyRegistrationLinkResponse(): CreatePasskeyRegistrationLinkResponse {
  return { details: undefined, code: undefined };
}

export const CreatePasskeyRegistrationLinkResponse = {
  encode(message: CreatePasskeyRegistrationLinkResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.code !== undefined) {
      PasskeyRegistrationCode.encode(message.code, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreatePasskeyRegistrationLinkResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreatePasskeyRegistrationLinkResponse();
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

          message.code = PasskeyRegistrationCode.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreatePasskeyRegistrationLinkResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      code: isSet(object.code) ? PasskeyRegistrationCode.fromJSON(object.code) : undefined,
    };
  },

  toJSON(message: CreatePasskeyRegistrationLinkResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.code !== undefined) {
      obj.code = PasskeyRegistrationCode.toJSON(message.code);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreatePasskeyRegistrationLinkResponse>, I>>(
    base?: I,
  ): CreatePasskeyRegistrationLinkResponse {
    return CreatePasskeyRegistrationLinkResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreatePasskeyRegistrationLinkResponse>, I>>(
    object: I,
  ): CreatePasskeyRegistrationLinkResponse {
    const message = createBaseCreatePasskeyRegistrationLinkResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.code = (object.code !== undefined && object.code !== null)
      ? PasskeyRegistrationCode.fromPartial(object.code)
      : undefined;
    return message;
  },
};

function createBaseStartIdentityProviderFlowRequest(): StartIdentityProviderFlowRequest {
  return { idpId: "", successUrl: "", failureUrl: "" };
}

export const StartIdentityProviderFlowRequest = {
  encode(message: StartIdentityProviderFlowRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.idpId !== "") {
      writer.uint32(10).string(message.idpId);
    }
    if (message.successUrl !== "") {
      writer.uint32(18).string(message.successUrl);
    }
    if (message.failureUrl !== "") {
      writer.uint32(26).string(message.failureUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StartIdentityProviderFlowRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStartIdentityProviderFlowRequest();
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

          message.successUrl = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.failureUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StartIdentityProviderFlowRequest {
    return {
      idpId: isSet(object.idpId) ? String(object.idpId) : "",
      successUrl: isSet(object.successUrl) ? String(object.successUrl) : "",
      failureUrl: isSet(object.failureUrl) ? String(object.failureUrl) : "",
    };
  },

  toJSON(message: StartIdentityProviderFlowRequest): unknown {
    const obj: any = {};
    if (message.idpId !== "") {
      obj.idpId = message.idpId;
    }
    if (message.successUrl !== "") {
      obj.successUrl = message.successUrl;
    }
    if (message.failureUrl !== "") {
      obj.failureUrl = message.failureUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StartIdentityProviderFlowRequest>, I>>(
    base?: I,
  ): StartIdentityProviderFlowRequest {
    return StartIdentityProviderFlowRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StartIdentityProviderFlowRequest>, I>>(
    object: I,
  ): StartIdentityProviderFlowRequest {
    const message = createBaseStartIdentityProviderFlowRequest();
    message.idpId = object.idpId ?? "";
    message.successUrl = object.successUrl ?? "";
    message.failureUrl = object.failureUrl ?? "";
    return message;
  },
};

function createBaseStartIdentityProviderFlowResponse(): StartIdentityProviderFlowResponse {
  return { details: undefined, authUrl: undefined };
}

export const StartIdentityProviderFlowResponse = {
  encode(message: StartIdentityProviderFlowResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.authUrl !== undefined) {
      writer.uint32(18).string(message.authUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StartIdentityProviderFlowResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStartIdentityProviderFlowResponse();
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

          message.authUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StartIdentityProviderFlowResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      authUrl: isSet(object.authUrl) ? String(object.authUrl) : undefined,
    };
  },

  toJSON(message: StartIdentityProviderFlowResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.authUrl !== undefined) {
      obj.authUrl = message.authUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StartIdentityProviderFlowResponse>, I>>(
    base?: I,
  ): StartIdentityProviderFlowResponse {
    return StartIdentityProviderFlowResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StartIdentityProviderFlowResponse>, I>>(
    object: I,
  ): StartIdentityProviderFlowResponse {
    const message = createBaseStartIdentityProviderFlowResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.authUrl = object.authUrl ?? undefined;
    return message;
  },
};

function createBaseRetrieveIdentityProviderInformationRequest(): RetrieveIdentityProviderInformationRequest {
  return { intentId: "", token: "" };
}

export const RetrieveIdentityProviderInformationRequest = {
  encode(message: RetrieveIdentityProviderInformationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.intentId !== "") {
      writer.uint32(10).string(message.intentId);
    }
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RetrieveIdentityProviderInformationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetrieveIdentityProviderInformationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.intentId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RetrieveIdentityProviderInformationRequest {
    return {
      intentId: isSet(object.intentId) ? String(object.intentId) : "",
      token: isSet(object.token) ? String(object.token) : "",
    };
  },

  toJSON(message: RetrieveIdentityProviderInformationRequest): unknown {
    const obj: any = {};
    if (message.intentId !== "") {
      obj.intentId = message.intentId;
    }
    if (message.token !== "") {
      obj.token = message.token;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RetrieveIdentityProviderInformationRequest>, I>>(
    base?: I,
  ): RetrieveIdentityProviderInformationRequest {
    return RetrieveIdentityProviderInformationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RetrieveIdentityProviderInformationRequest>, I>>(
    object: I,
  ): RetrieveIdentityProviderInformationRequest {
    const message = createBaseRetrieveIdentityProviderInformationRequest();
    message.intentId = object.intentId ?? "";
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseRetrieveIdentityProviderInformationResponse(): RetrieveIdentityProviderInformationResponse {
  return { details: undefined, idpInformation: undefined };
}

export const RetrieveIdentityProviderInformationResponse = {
  encode(message: RetrieveIdentityProviderInformationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.idpInformation !== undefined) {
      IDPInformation.encode(message.idpInformation, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RetrieveIdentityProviderInformationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetrieveIdentityProviderInformationResponse();
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

          message.idpInformation = IDPInformation.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RetrieveIdentityProviderInformationResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      idpInformation: isSet(object.idpInformation) ? IDPInformation.fromJSON(object.idpInformation) : undefined,
    };
  },

  toJSON(message: RetrieveIdentityProviderInformationResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.idpInformation !== undefined) {
      obj.idpInformation = IDPInformation.toJSON(message.idpInformation);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RetrieveIdentityProviderInformationResponse>, I>>(
    base?: I,
  ): RetrieveIdentityProviderInformationResponse {
    return RetrieveIdentityProviderInformationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RetrieveIdentityProviderInformationResponse>, I>>(
    object: I,
  ): RetrieveIdentityProviderInformationResponse {
    const message = createBaseRetrieveIdentityProviderInformationResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.idpInformation = (object.idpInformation !== undefined && object.idpInformation !== null)
      ? IDPInformation.fromPartial(object.idpInformation)
      : undefined;
    return message;
  },
};

function createBaseAddIDPLinkRequest(): AddIDPLinkRequest {
  return { userId: "", idpLink: undefined };
}

export const AddIDPLinkRequest = {
  encode(message: AddIDPLinkRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.idpLink !== undefined) {
      IDPLink.encode(message.idpLink, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddIDPLinkRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddIDPLinkRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.idpLink = IDPLink.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddIDPLinkRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      idpLink: isSet(object.idpLink) ? IDPLink.fromJSON(object.idpLink) : undefined,
    };
  },

  toJSON(message: AddIDPLinkRequest): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.idpLink !== undefined) {
      obj.idpLink = IDPLink.toJSON(message.idpLink);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddIDPLinkRequest>, I>>(base?: I): AddIDPLinkRequest {
    return AddIDPLinkRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddIDPLinkRequest>, I>>(object: I): AddIDPLinkRequest {
    const message = createBaseAddIDPLinkRequest();
    message.userId = object.userId ?? "";
    message.idpLink = (object.idpLink !== undefined && object.idpLink !== null)
      ? IDPLink.fromPartial(object.idpLink)
      : undefined;
    return message;
  },
};

function createBaseAddIDPLinkResponse(): AddIDPLinkResponse {
  return { details: undefined };
}

export const AddIDPLinkResponse = {
  encode(message: AddIDPLinkResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddIDPLinkResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddIDPLinkResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = Details.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddIDPLinkResponse {
    return { details: isSet(object.details) ? Details.fromJSON(object.details) : undefined };
  },

  toJSON(message: AddIDPLinkResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddIDPLinkResponse>, I>>(base?: I): AddIDPLinkResponse {
    return AddIDPLinkResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddIDPLinkResponse>, I>>(object: I): AddIDPLinkResponse {
    const message = createBaseAddIDPLinkResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBasePasswordResetRequest(): PasswordResetRequest {
  return { userId: "", sendLink: undefined, returnCode: undefined };
}

export const PasswordResetRequest = {
  encode(message: PasswordResetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.sendLink !== undefined) {
      SendPasswordResetLink.encode(message.sendLink, writer.uint32(18).fork()).ldelim();
    }
    if (message.returnCode !== undefined) {
      ReturnPasswordResetCode.encode(message.returnCode, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PasswordResetRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePasswordResetRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sendLink = SendPasswordResetLink.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.returnCode = ReturnPasswordResetCode.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PasswordResetRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      sendLink: isSet(object.sendLink) ? SendPasswordResetLink.fromJSON(object.sendLink) : undefined,
      returnCode: isSet(object.returnCode) ? ReturnPasswordResetCode.fromJSON(object.returnCode) : undefined,
    };
  },

  toJSON(message: PasswordResetRequest): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.sendLink !== undefined) {
      obj.sendLink = SendPasswordResetLink.toJSON(message.sendLink);
    }
    if (message.returnCode !== undefined) {
      obj.returnCode = ReturnPasswordResetCode.toJSON(message.returnCode);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PasswordResetRequest>, I>>(base?: I): PasswordResetRequest {
    return PasswordResetRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PasswordResetRequest>, I>>(object: I): PasswordResetRequest {
    const message = createBasePasswordResetRequest();
    message.userId = object.userId ?? "";
    message.sendLink = (object.sendLink !== undefined && object.sendLink !== null)
      ? SendPasswordResetLink.fromPartial(object.sendLink)
      : undefined;
    message.returnCode = (object.returnCode !== undefined && object.returnCode !== null)
      ? ReturnPasswordResetCode.fromPartial(object.returnCode)
      : undefined;
    return message;
  },
};

function createBasePasswordResetResponse(): PasswordResetResponse {
  return { details: undefined, verificationCode: undefined };
}

export const PasswordResetResponse = {
  encode(message: PasswordResetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.verificationCode !== undefined) {
      writer.uint32(18).string(message.verificationCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PasswordResetResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePasswordResetResponse();
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

          message.verificationCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PasswordResetResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      verificationCode: isSet(object.verificationCode) ? String(object.verificationCode) : undefined,
    };
  },

  toJSON(message: PasswordResetResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.verificationCode !== undefined) {
      obj.verificationCode = message.verificationCode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PasswordResetResponse>, I>>(base?: I): PasswordResetResponse {
    return PasswordResetResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PasswordResetResponse>, I>>(object: I): PasswordResetResponse {
    const message = createBasePasswordResetResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.verificationCode = object.verificationCode ?? undefined;
    return message;
  },
};

function createBaseSetPasswordRequest(): SetPasswordRequest {
  return { userId: "", newPassword: undefined, currentPassword: undefined, verificationCode: undefined };
}

export const SetPasswordRequest = {
  encode(message: SetPasswordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.newPassword !== undefined) {
      Password.encode(message.newPassword, writer.uint32(18).fork()).ldelim();
    }
    if (message.currentPassword !== undefined) {
      writer.uint32(26).string(message.currentPassword);
    }
    if (message.verificationCode !== undefined) {
      writer.uint32(34).string(message.verificationCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetPasswordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPasswordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.newPassword = Password.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.currentPassword = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.verificationCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetPasswordRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      newPassword: isSet(object.newPassword) ? Password.fromJSON(object.newPassword) : undefined,
      currentPassword: isSet(object.currentPassword) ? String(object.currentPassword) : undefined,
      verificationCode: isSet(object.verificationCode) ? String(object.verificationCode) : undefined,
    };
  },

  toJSON(message: SetPasswordRequest): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.newPassword !== undefined) {
      obj.newPassword = Password.toJSON(message.newPassword);
    }
    if (message.currentPassword !== undefined) {
      obj.currentPassword = message.currentPassword;
    }
    if (message.verificationCode !== undefined) {
      obj.verificationCode = message.verificationCode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetPasswordRequest>, I>>(base?: I): SetPasswordRequest {
    return SetPasswordRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetPasswordRequest>, I>>(object: I): SetPasswordRequest {
    const message = createBaseSetPasswordRequest();
    message.userId = object.userId ?? "";
    message.newPassword = (object.newPassword !== undefined && object.newPassword !== null)
      ? Password.fromPartial(object.newPassword)
      : undefined;
    message.currentPassword = object.currentPassword ?? undefined;
    message.verificationCode = object.verificationCode ?? undefined;
    return message;
  },
};

function createBaseSetPasswordResponse(): SetPasswordResponse {
  return { details: undefined };
}

export const SetPasswordResponse = {
  encode(message: SetPasswordResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetPasswordResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPasswordResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = Details.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetPasswordResponse {
    return { details: isSet(object.details) ? Details.fromJSON(object.details) : undefined };
  },

  toJSON(message: SetPasswordResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetPasswordResponse>, I>>(base?: I): SetPasswordResponse {
    return SetPasswordResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetPasswordResponse>, I>>(object: I): SetPasswordResponse {
    const message = createBaseSetPasswordResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseListAuthenticationMethodTypesRequest(): ListAuthenticationMethodTypesRequest {
  return { userId: "" };
}

export const ListAuthenticationMethodTypesRequest = {
  encode(message: ListAuthenticationMethodTypesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListAuthenticationMethodTypesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListAuthenticationMethodTypesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListAuthenticationMethodTypesRequest {
    return { userId: isSet(object.userId) ? String(object.userId) : "" };
  },

  toJSON(message: ListAuthenticationMethodTypesRequest): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListAuthenticationMethodTypesRequest>, I>>(
    base?: I,
  ): ListAuthenticationMethodTypesRequest {
    return ListAuthenticationMethodTypesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListAuthenticationMethodTypesRequest>, I>>(
    object: I,
  ): ListAuthenticationMethodTypesRequest {
    const message = createBaseListAuthenticationMethodTypesRequest();
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseListAuthenticationMethodTypesResponse(): ListAuthenticationMethodTypesResponse {
  return { details: undefined, authMethodTypes: [] };
}

export const ListAuthenticationMethodTypesResponse = {
  encode(message: ListAuthenticationMethodTypesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ListDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).fork();
    for (const v of message.authMethodTypes) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListAuthenticationMethodTypesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListAuthenticationMethodTypesResponse();
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
          if (tag === 16) {
            message.authMethodTypes.push(reader.int32() as any);

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.authMethodTypes.push(reader.int32() as any);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListAuthenticationMethodTypesResponse {
    return {
      details: isSet(object.details) ? ListDetails.fromJSON(object.details) : undefined,
      authMethodTypes: Array.isArray(object?.authMethodTypes)
        ? object.authMethodTypes.map((e: any) => authenticationMethodTypeFromJSON(e))
        : [],
    };
  },

  toJSON(message: ListAuthenticationMethodTypesResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ListDetails.toJSON(message.details);
    }
    if (message.authMethodTypes?.length) {
      obj.authMethodTypes = message.authMethodTypes.map((e) => authenticationMethodTypeToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListAuthenticationMethodTypesResponse>, I>>(
    base?: I,
  ): ListAuthenticationMethodTypesResponse {
    return ListAuthenticationMethodTypesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListAuthenticationMethodTypesResponse>, I>>(
    object: I,
  ): ListAuthenticationMethodTypesResponse {
    const message = createBaseListAuthenticationMethodTypesResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ListDetails.fromPartial(object.details)
      : undefined;
    message.authMethodTypes = object.authMethodTypes?.map((e) => e) || [];
    return message;
  },
};

export interface UserService {
  /** Create a new human user */
  AddHumanUser(request: DeepPartial<AddHumanUserRequest>, metadata?: grpc.Metadata): Promise<AddHumanUserResponse>;
  /** Change the email of a user */
  SetEmail(request: DeepPartial<SetEmailRequest>, metadata?: grpc.Metadata): Promise<SetEmailResponse>;
  /** Verify the email with the provided code */
  VerifyEmail(request: DeepPartial<VerifyEmailRequest>, metadata?: grpc.Metadata): Promise<VerifyEmailResponse>;
  RegisterPasskey(
    request: DeepPartial<RegisterPasskeyRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RegisterPasskeyResponse>;
  VerifyPasskeyRegistration(
    request: DeepPartial<VerifyPasskeyRegistrationRequest>,
    metadata?: grpc.Metadata,
  ): Promise<VerifyPasskeyRegistrationResponse>;
  CreatePasskeyRegistrationLink(
    request: DeepPartial<CreatePasskeyRegistrationLinkRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CreatePasskeyRegistrationLinkResponse>;
  RegisterU2F(request: DeepPartial<RegisterU2FRequest>, metadata?: grpc.Metadata): Promise<RegisterU2FResponse>;
  VerifyU2FRegistration(
    request: DeepPartial<VerifyU2FRegistrationRequest>,
    metadata?: grpc.Metadata,
  ): Promise<VerifyU2FRegistrationResponse>;
  RegisterTOTP(request: DeepPartial<RegisterTOTPRequest>, metadata?: grpc.Metadata): Promise<RegisterTOTPResponse>;
  VerifyTOTPRegistration(
    request: DeepPartial<VerifyTOTPRegistrationRequest>,
    metadata?: grpc.Metadata,
  ): Promise<VerifyTOTPRegistrationResponse>;
  /** Start an IDP authentication (for external login, registration or linking) */
  StartIdentityProviderFlow(
    request: DeepPartial<StartIdentityProviderFlowRequest>,
    metadata?: grpc.Metadata,
  ): Promise<StartIdentityProviderFlowResponse>;
  RetrieveIdentityProviderInformation(
    request: DeepPartial<RetrieveIdentityProviderInformationRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RetrieveIdentityProviderInformationResponse>;
  /** Link an IDP to an existing user */
  AddIDPLink(request: DeepPartial<AddIDPLinkRequest>, metadata?: grpc.Metadata): Promise<AddIDPLinkResponse>;
  /** Request password reset */
  PasswordReset(request: DeepPartial<PasswordResetRequest>, metadata?: grpc.Metadata): Promise<PasswordResetResponse>;
  /** Change password */
  SetPassword(request: DeepPartial<SetPasswordRequest>, metadata?: grpc.Metadata): Promise<SetPasswordResponse>;
  /** List all possible authentication methods of a user */
  ListAuthenticationMethodTypes(
    request: DeepPartial<ListAuthenticationMethodTypesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListAuthenticationMethodTypesResponse>;
}

export class UserServiceClientImpl implements UserService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.AddHumanUser = this.AddHumanUser.bind(this);
    this.SetEmail = this.SetEmail.bind(this);
    this.VerifyEmail = this.VerifyEmail.bind(this);
    this.RegisterPasskey = this.RegisterPasskey.bind(this);
    this.VerifyPasskeyRegistration = this.VerifyPasskeyRegistration.bind(this);
    this.CreatePasskeyRegistrationLink = this.CreatePasskeyRegistrationLink.bind(this);
    this.RegisterU2F = this.RegisterU2F.bind(this);
    this.VerifyU2FRegistration = this.VerifyU2FRegistration.bind(this);
    this.RegisterTOTP = this.RegisterTOTP.bind(this);
    this.VerifyTOTPRegistration = this.VerifyTOTPRegistration.bind(this);
    this.StartIdentityProviderFlow = this.StartIdentityProviderFlow.bind(this);
    this.RetrieveIdentityProviderInformation = this.RetrieveIdentityProviderInformation.bind(this);
    this.AddIDPLink = this.AddIDPLink.bind(this);
    this.PasswordReset = this.PasswordReset.bind(this);
    this.SetPassword = this.SetPassword.bind(this);
    this.ListAuthenticationMethodTypes = this.ListAuthenticationMethodTypes.bind(this);
  }

  AddHumanUser(request: DeepPartial<AddHumanUserRequest>, metadata?: grpc.Metadata): Promise<AddHumanUserResponse> {
    return this.rpc.unary(UserServiceAddHumanUserDesc, AddHumanUserRequest.fromPartial(request), metadata);
  }

  SetEmail(request: DeepPartial<SetEmailRequest>, metadata?: grpc.Metadata): Promise<SetEmailResponse> {
    return this.rpc.unary(UserServiceSetEmailDesc, SetEmailRequest.fromPartial(request), metadata);
  }

  VerifyEmail(request: DeepPartial<VerifyEmailRequest>, metadata?: grpc.Metadata): Promise<VerifyEmailResponse> {
    return this.rpc.unary(UserServiceVerifyEmailDesc, VerifyEmailRequest.fromPartial(request), metadata);
  }

  RegisterPasskey(
    request: DeepPartial<RegisterPasskeyRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RegisterPasskeyResponse> {
    return this.rpc.unary(UserServiceRegisterPasskeyDesc, RegisterPasskeyRequest.fromPartial(request), metadata);
  }

  VerifyPasskeyRegistration(
    request: DeepPartial<VerifyPasskeyRegistrationRequest>,
    metadata?: grpc.Metadata,
  ): Promise<VerifyPasskeyRegistrationResponse> {
    return this.rpc.unary(
      UserServiceVerifyPasskeyRegistrationDesc,
      VerifyPasskeyRegistrationRequest.fromPartial(request),
      metadata,
    );
  }

  CreatePasskeyRegistrationLink(
    request: DeepPartial<CreatePasskeyRegistrationLinkRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CreatePasskeyRegistrationLinkResponse> {
    return this.rpc.unary(
      UserServiceCreatePasskeyRegistrationLinkDesc,
      CreatePasskeyRegistrationLinkRequest.fromPartial(request),
      metadata,
    );
  }

  RegisterU2F(request: DeepPartial<RegisterU2FRequest>, metadata?: grpc.Metadata): Promise<RegisterU2FResponse> {
    return this.rpc.unary(UserServiceRegisterU2FDesc, RegisterU2FRequest.fromPartial(request), metadata);
  }

  VerifyU2FRegistration(
    request: DeepPartial<VerifyU2FRegistrationRequest>,
    metadata?: grpc.Metadata,
  ): Promise<VerifyU2FRegistrationResponse> {
    return this.rpc.unary(
      UserServiceVerifyU2FRegistrationDesc,
      VerifyU2FRegistrationRequest.fromPartial(request),
      metadata,
    );
  }

  RegisterTOTP(request: DeepPartial<RegisterTOTPRequest>, metadata?: grpc.Metadata): Promise<RegisterTOTPResponse> {
    return this.rpc.unary(UserServiceRegisterTOTPDesc, RegisterTOTPRequest.fromPartial(request), metadata);
  }

  VerifyTOTPRegistration(
    request: DeepPartial<VerifyTOTPRegistrationRequest>,
    metadata?: grpc.Metadata,
  ): Promise<VerifyTOTPRegistrationResponse> {
    return this.rpc.unary(
      UserServiceVerifyTOTPRegistrationDesc,
      VerifyTOTPRegistrationRequest.fromPartial(request),
      metadata,
    );
  }

  StartIdentityProviderFlow(
    request: DeepPartial<StartIdentityProviderFlowRequest>,
    metadata?: grpc.Metadata,
  ): Promise<StartIdentityProviderFlowResponse> {
    return this.rpc.unary(
      UserServiceStartIdentityProviderFlowDesc,
      StartIdentityProviderFlowRequest.fromPartial(request),
      metadata,
    );
  }

  RetrieveIdentityProviderInformation(
    request: DeepPartial<RetrieveIdentityProviderInformationRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RetrieveIdentityProviderInformationResponse> {
    return this.rpc.unary(
      UserServiceRetrieveIdentityProviderInformationDesc,
      RetrieveIdentityProviderInformationRequest.fromPartial(request),
      metadata,
    );
  }

  AddIDPLink(request: DeepPartial<AddIDPLinkRequest>, metadata?: grpc.Metadata): Promise<AddIDPLinkResponse> {
    return this.rpc.unary(UserServiceAddIDPLinkDesc, AddIDPLinkRequest.fromPartial(request), metadata);
  }

  PasswordReset(request: DeepPartial<PasswordResetRequest>, metadata?: grpc.Metadata): Promise<PasswordResetResponse> {
    return this.rpc.unary(UserServicePasswordResetDesc, PasswordResetRequest.fromPartial(request), metadata);
  }

  SetPassword(request: DeepPartial<SetPasswordRequest>, metadata?: grpc.Metadata): Promise<SetPasswordResponse> {
    return this.rpc.unary(UserServiceSetPasswordDesc, SetPasswordRequest.fromPartial(request), metadata);
  }

  ListAuthenticationMethodTypes(
    request: DeepPartial<ListAuthenticationMethodTypesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListAuthenticationMethodTypesResponse> {
    return this.rpc.unary(
      UserServiceListAuthenticationMethodTypesDesc,
      ListAuthenticationMethodTypesRequest.fromPartial(request),
      metadata,
    );
  }
}

export const UserServiceDesc = { serviceName: "zitadel.user.v2alpha.UserService" };

export const UserServiceAddHumanUserDesc: UnaryMethodDefinitionish = {
  methodName: "AddHumanUser",
  service: UserServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AddHumanUserRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AddHumanUserResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UserServiceSetEmailDesc: UnaryMethodDefinitionish = {
  methodName: "SetEmail",
  service: UserServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SetEmailRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SetEmailResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UserServiceVerifyEmailDesc: UnaryMethodDefinitionish = {
  methodName: "VerifyEmail",
  service: UserServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return VerifyEmailRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = VerifyEmailResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UserServiceRegisterPasskeyDesc: UnaryMethodDefinitionish = {
  methodName: "RegisterPasskey",
  service: UserServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RegisterPasskeyRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RegisterPasskeyResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UserServiceVerifyPasskeyRegistrationDesc: UnaryMethodDefinitionish = {
  methodName: "VerifyPasskeyRegistration",
  service: UserServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return VerifyPasskeyRegistrationRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = VerifyPasskeyRegistrationResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UserServiceCreatePasskeyRegistrationLinkDesc: UnaryMethodDefinitionish = {
  methodName: "CreatePasskeyRegistrationLink",
  service: UserServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreatePasskeyRegistrationLinkRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CreatePasskeyRegistrationLinkResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UserServiceRegisterU2FDesc: UnaryMethodDefinitionish = {
  methodName: "RegisterU2F",
  service: UserServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RegisterU2FRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RegisterU2FResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UserServiceVerifyU2FRegistrationDesc: UnaryMethodDefinitionish = {
  methodName: "VerifyU2FRegistration",
  service: UserServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return VerifyU2FRegistrationRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = VerifyU2FRegistrationResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UserServiceRegisterTOTPDesc: UnaryMethodDefinitionish = {
  methodName: "RegisterTOTP",
  service: UserServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RegisterTOTPRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RegisterTOTPResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UserServiceVerifyTOTPRegistrationDesc: UnaryMethodDefinitionish = {
  methodName: "VerifyTOTPRegistration",
  service: UserServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return VerifyTOTPRegistrationRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = VerifyTOTPRegistrationResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UserServiceStartIdentityProviderFlowDesc: UnaryMethodDefinitionish = {
  methodName: "StartIdentityProviderFlow",
  service: UserServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return StartIdentityProviderFlowRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = StartIdentityProviderFlowResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UserServiceRetrieveIdentityProviderInformationDesc: UnaryMethodDefinitionish = {
  methodName: "RetrieveIdentityProviderInformation",
  service: UserServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RetrieveIdentityProviderInformationRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RetrieveIdentityProviderInformationResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UserServiceAddIDPLinkDesc: UnaryMethodDefinitionish = {
  methodName: "AddIDPLink",
  service: UserServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AddIDPLinkRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AddIDPLinkResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UserServicePasswordResetDesc: UnaryMethodDefinitionish = {
  methodName: "PasswordReset",
  service: UserServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return PasswordResetRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = PasswordResetResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UserServiceSetPasswordDesc: UnaryMethodDefinitionish = {
  methodName: "SetPassword",
  service: UserServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SetPasswordRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SetPasswordResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UserServiceListAuthenticationMethodTypesDesc: UnaryMethodDefinitionish = {
  methodName: "ListAuthenticationMethodTypes",
  service: UserServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListAuthenticationMethodTypesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListAuthenticationMethodTypesResponse.decode(data);
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends tsProtoGlobalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
