/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";
import { ObjectDetails, TextQueryMethod, textQueryMethodFromJSON, textQueryMethodToJSON } from "./object";

export const protobufPackage = "zitadel.user.v1";

export enum UserState {
  USER_STATE_UNSPECIFIED = 0,
  USER_STATE_ACTIVE = 1,
  USER_STATE_INACTIVE = 2,
  USER_STATE_DELETED = 3,
  USER_STATE_LOCKED = 4,
  USER_STATE_SUSPEND = 5,
  USER_STATE_INITIAL = 6,
  UNRECOGNIZED = -1,
}

export function userStateFromJSON(object: any): UserState {
  switch (object) {
    case 0:
    case "USER_STATE_UNSPECIFIED":
      return UserState.USER_STATE_UNSPECIFIED;
    case 1:
    case "USER_STATE_ACTIVE":
      return UserState.USER_STATE_ACTIVE;
    case 2:
    case "USER_STATE_INACTIVE":
      return UserState.USER_STATE_INACTIVE;
    case 3:
    case "USER_STATE_DELETED":
      return UserState.USER_STATE_DELETED;
    case 4:
    case "USER_STATE_LOCKED":
      return UserState.USER_STATE_LOCKED;
    case 5:
    case "USER_STATE_SUSPEND":
      return UserState.USER_STATE_SUSPEND;
    case 6:
    case "USER_STATE_INITIAL":
      return UserState.USER_STATE_INITIAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UserState.UNRECOGNIZED;
  }
}

export function userStateToJSON(object: UserState): string {
  switch (object) {
    case UserState.USER_STATE_UNSPECIFIED:
      return "USER_STATE_UNSPECIFIED";
    case UserState.USER_STATE_ACTIVE:
      return "USER_STATE_ACTIVE";
    case UserState.USER_STATE_INACTIVE:
      return "USER_STATE_INACTIVE";
    case UserState.USER_STATE_DELETED:
      return "USER_STATE_DELETED";
    case UserState.USER_STATE_LOCKED:
      return "USER_STATE_LOCKED";
    case UserState.USER_STATE_SUSPEND:
      return "USER_STATE_SUSPEND";
    case UserState.USER_STATE_INITIAL:
      return "USER_STATE_INITIAL";
    case UserState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum Gender {
  GENDER_UNSPECIFIED = 0,
  GENDER_FEMALE = 1,
  GENDER_MALE = 2,
  GENDER_DIVERSE = 3,
  UNRECOGNIZED = -1,
}

export function genderFromJSON(object: any): Gender {
  switch (object) {
    case 0:
    case "GENDER_UNSPECIFIED":
      return Gender.GENDER_UNSPECIFIED;
    case 1:
    case "GENDER_FEMALE":
      return Gender.GENDER_FEMALE;
    case 2:
    case "GENDER_MALE":
      return Gender.GENDER_MALE;
    case 3:
    case "GENDER_DIVERSE":
      return Gender.GENDER_DIVERSE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Gender.UNRECOGNIZED;
  }
}

export function genderToJSON(object: Gender): string {
  switch (object) {
    case Gender.GENDER_UNSPECIFIED:
      return "GENDER_UNSPECIFIED";
    case Gender.GENDER_FEMALE:
      return "GENDER_FEMALE";
    case Gender.GENDER_MALE:
      return "GENDER_MALE";
    case Gender.GENDER_DIVERSE:
      return "GENDER_DIVERSE";
    case Gender.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum AccessTokenType {
  ACCESS_TOKEN_TYPE_BEARER = 0,
  ACCESS_TOKEN_TYPE_JWT = 1,
  UNRECOGNIZED = -1,
}

export function accessTokenTypeFromJSON(object: any): AccessTokenType {
  switch (object) {
    case 0:
    case "ACCESS_TOKEN_TYPE_BEARER":
      return AccessTokenType.ACCESS_TOKEN_TYPE_BEARER;
    case 1:
    case "ACCESS_TOKEN_TYPE_JWT":
      return AccessTokenType.ACCESS_TOKEN_TYPE_JWT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AccessTokenType.UNRECOGNIZED;
  }
}

export function accessTokenTypeToJSON(object: AccessTokenType): string {
  switch (object) {
    case AccessTokenType.ACCESS_TOKEN_TYPE_BEARER:
      return "ACCESS_TOKEN_TYPE_BEARER";
    case AccessTokenType.ACCESS_TOKEN_TYPE_JWT:
      return "ACCESS_TOKEN_TYPE_JWT";
    case AccessTokenType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum Type {
  TYPE_UNSPECIFIED = 0,
  TYPE_HUMAN = 1,
  TYPE_MACHINE = 2,
  UNRECOGNIZED = -1,
}

export function typeFromJSON(object: any): Type {
  switch (object) {
    case 0:
    case "TYPE_UNSPECIFIED":
      return Type.TYPE_UNSPECIFIED;
    case 1:
    case "TYPE_HUMAN":
      return Type.TYPE_HUMAN;
    case 2:
    case "TYPE_MACHINE":
      return Type.TYPE_MACHINE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Type.UNRECOGNIZED;
  }
}

export function typeToJSON(object: Type): string {
  switch (object) {
    case Type.TYPE_UNSPECIFIED:
      return "TYPE_UNSPECIFIED";
    case Type.TYPE_HUMAN:
      return "TYPE_HUMAN";
    case Type.TYPE_MACHINE:
      return "TYPE_MACHINE";
    case Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum UserFieldName {
  USER_FIELD_NAME_UNSPECIFIED = 0,
  USER_FIELD_NAME_USER_NAME = 1,
  USER_FIELD_NAME_FIRST_NAME = 2,
  USER_FIELD_NAME_LAST_NAME = 3,
  USER_FIELD_NAME_NICK_NAME = 4,
  USER_FIELD_NAME_DISPLAY_NAME = 5,
  USER_FIELD_NAME_EMAIL = 6,
  USER_FIELD_NAME_STATE = 7,
  USER_FIELD_NAME_TYPE = 8,
  USER_FIELD_NAME_CREATION_DATE = 9,
  UNRECOGNIZED = -1,
}

export function userFieldNameFromJSON(object: any): UserFieldName {
  switch (object) {
    case 0:
    case "USER_FIELD_NAME_UNSPECIFIED":
      return UserFieldName.USER_FIELD_NAME_UNSPECIFIED;
    case 1:
    case "USER_FIELD_NAME_USER_NAME":
      return UserFieldName.USER_FIELD_NAME_USER_NAME;
    case 2:
    case "USER_FIELD_NAME_FIRST_NAME":
      return UserFieldName.USER_FIELD_NAME_FIRST_NAME;
    case 3:
    case "USER_FIELD_NAME_LAST_NAME":
      return UserFieldName.USER_FIELD_NAME_LAST_NAME;
    case 4:
    case "USER_FIELD_NAME_NICK_NAME":
      return UserFieldName.USER_FIELD_NAME_NICK_NAME;
    case 5:
    case "USER_FIELD_NAME_DISPLAY_NAME":
      return UserFieldName.USER_FIELD_NAME_DISPLAY_NAME;
    case 6:
    case "USER_FIELD_NAME_EMAIL":
      return UserFieldName.USER_FIELD_NAME_EMAIL;
    case 7:
    case "USER_FIELD_NAME_STATE":
      return UserFieldName.USER_FIELD_NAME_STATE;
    case 8:
    case "USER_FIELD_NAME_TYPE":
      return UserFieldName.USER_FIELD_NAME_TYPE;
    case 9:
    case "USER_FIELD_NAME_CREATION_DATE":
      return UserFieldName.USER_FIELD_NAME_CREATION_DATE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UserFieldName.UNRECOGNIZED;
  }
}

export function userFieldNameToJSON(object: UserFieldName): string {
  switch (object) {
    case UserFieldName.USER_FIELD_NAME_UNSPECIFIED:
      return "USER_FIELD_NAME_UNSPECIFIED";
    case UserFieldName.USER_FIELD_NAME_USER_NAME:
      return "USER_FIELD_NAME_USER_NAME";
    case UserFieldName.USER_FIELD_NAME_FIRST_NAME:
      return "USER_FIELD_NAME_FIRST_NAME";
    case UserFieldName.USER_FIELD_NAME_LAST_NAME:
      return "USER_FIELD_NAME_LAST_NAME";
    case UserFieldName.USER_FIELD_NAME_NICK_NAME:
      return "USER_FIELD_NAME_NICK_NAME";
    case UserFieldName.USER_FIELD_NAME_DISPLAY_NAME:
      return "USER_FIELD_NAME_DISPLAY_NAME";
    case UserFieldName.USER_FIELD_NAME_EMAIL:
      return "USER_FIELD_NAME_EMAIL";
    case UserFieldName.USER_FIELD_NAME_STATE:
      return "USER_FIELD_NAME_STATE";
    case UserFieldName.USER_FIELD_NAME_TYPE:
      return "USER_FIELD_NAME_TYPE";
    case UserFieldName.USER_FIELD_NAME_CREATION_DATE:
      return "USER_FIELD_NAME_CREATION_DATE";
    case UserFieldName.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum AuthFactorState {
  AUTH_FACTOR_STATE_UNSPECIFIED = 0,
  AUTH_FACTOR_STATE_NOT_READY = 1,
  AUTH_FACTOR_STATE_READY = 2,
  AUTH_FACTOR_STATE_REMOVED = 3,
  UNRECOGNIZED = -1,
}

export function authFactorStateFromJSON(object: any): AuthFactorState {
  switch (object) {
    case 0:
    case "AUTH_FACTOR_STATE_UNSPECIFIED":
      return AuthFactorState.AUTH_FACTOR_STATE_UNSPECIFIED;
    case 1:
    case "AUTH_FACTOR_STATE_NOT_READY":
      return AuthFactorState.AUTH_FACTOR_STATE_NOT_READY;
    case 2:
    case "AUTH_FACTOR_STATE_READY":
      return AuthFactorState.AUTH_FACTOR_STATE_READY;
    case 3:
    case "AUTH_FACTOR_STATE_REMOVED":
      return AuthFactorState.AUTH_FACTOR_STATE_REMOVED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AuthFactorState.UNRECOGNIZED;
  }
}

export function authFactorStateToJSON(object: AuthFactorState): string {
  switch (object) {
    case AuthFactorState.AUTH_FACTOR_STATE_UNSPECIFIED:
      return "AUTH_FACTOR_STATE_UNSPECIFIED";
    case AuthFactorState.AUTH_FACTOR_STATE_NOT_READY:
      return "AUTH_FACTOR_STATE_NOT_READY";
    case AuthFactorState.AUTH_FACTOR_STATE_READY:
      return "AUTH_FACTOR_STATE_READY";
    case AuthFactorState.AUTH_FACTOR_STATE_REMOVED:
      return "AUTH_FACTOR_STATE_REMOVED";
    case AuthFactorState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum SessionState {
  SESSION_STATE_UNSPECIFIED = 0,
  SESSION_STATE_ACTIVE = 1,
  SESSION_STATE_TERMINATED = 2,
  UNRECOGNIZED = -1,
}

export function sessionStateFromJSON(object: any): SessionState {
  switch (object) {
    case 0:
    case "SESSION_STATE_UNSPECIFIED":
      return SessionState.SESSION_STATE_UNSPECIFIED;
    case 1:
    case "SESSION_STATE_ACTIVE":
      return SessionState.SESSION_STATE_ACTIVE;
    case 2:
    case "SESSION_STATE_TERMINATED":
      return SessionState.SESSION_STATE_TERMINATED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SessionState.UNRECOGNIZED;
  }
}

export function sessionStateToJSON(object: SessionState): string {
  switch (object) {
    case SessionState.SESSION_STATE_UNSPECIFIED:
      return "SESSION_STATE_UNSPECIFIED";
    case SessionState.SESSION_STATE_ACTIVE:
      return "SESSION_STATE_ACTIVE";
    case SessionState.SESSION_STATE_TERMINATED:
      return "SESSION_STATE_TERMINATED";
    case SessionState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum UserGrantState {
  USER_GRANT_STATE_UNSPECIFIED = 0,
  USER_GRANT_STATE_ACTIVE = 1,
  USER_GRANT_STATE_INACTIVE = 2,
  UNRECOGNIZED = -1,
}

export function userGrantStateFromJSON(object: any): UserGrantState {
  switch (object) {
    case 0:
    case "USER_GRANT_STATE_UNSPECIFIED":
      return UserGrantState.USER_GRANT_STATE_UNSPECIFIED;
    case 1:
    case "USER_GRANT_STATE_ACTIVE":
      return UserGrantState.USER_GRANT_STATE_ACTIVE;
    case 2:
    case "USER_GRANT_STATE_INACTIVE":
      return UserGrantState.USER_GRANT_STATE_INACTIVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UserGrantState.UNRECOGNIZED;
  }
}

export function userGrantStateToJSON(object: UserGrantState): string {
  switch (object) {
    case UserGrantState.USER_GRANT_STATE_UNSPECIFIED:
      return "USER_GRANT_STATE_UNSPECIFIED";
    case UserGrantState.USER_GRANT_STATE_ACTIVE:
      return "USER_GRANT_STATE_ACTIVE";
    case UserGrantState.USER_GRANT_STATE_INACTIVE:
      return "USER_GRANT_STATE_INACTIVE";
    case UserGrantState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface User {
  id: string;
  details: ObjectDetails | undefined;
  state: UserState;
  userName: string;
  loginNames: string[];
  preferredLoginName: string;
  human?: Human | undefined;
  machine?: Machine | undefined;
}

export interface Human {
  profile: Profile | undefined;
  email: Email | undefined;
  phone: Phone | undefined;
}

export interface Machine {
  name: string;
  description: string;
  hasSecret: boolean;
  accessTokenType: AccessTokenType;
}

export interface Profile {
  firstName: string;
  lastName: string;
  nickName: string;
  displayName: string;
  preferredLanguage: string;
  gender: Gender;
  avatarUrl: string;
}

export interface Email {
  email: string;
  isEmailVerified: boolean;
}

export interface Phone {
  phone: string;
  isPhoneVerified: boolean;
}

export interface SearchQuery {
  userNameQuery?: UserNameQuery | undefined;
  firstNameQuery?: FirstNameQuery | undefined;
  lastNameQuery?: LastNameQuery | undefined;
  nickNameQuery?: NickNameQuery | undefined;
  displayNameQuery?: DisplayNameQuery | undefined;
  emailQuery?: EmailQuery | undefined;
  stateQuery?: StateQuery | undefined;
  typeQuery?: TypeQuery | undefined;
  loginNameQuery?: LoginNameQuery | undefined;
}

export interface UserNameQuery {
  userName: string;
  method: TextQueryMethod;
}

export interface FirstNameQuery {
  firstName: string;
  method: TextQueryMethod;
}

export interface LastNameQuery {
  lastName: string;
  method: TextQueryMethod;
}

export interface NickNameQuery {
  nickName: string;
  method: TextQueryMethod;
}

export interface DisplayNameQuery {
  displayName: string;
  method: TextQueryMethod;
}

export interface EmailQuery {
  emailAddress: string;
  method: TextQueryMethod;
}

export interface LoginNameQuery {
  loginName: string;
  method: TextQueryMethod;
}

/** UserStateQuery always equals */
export interface StateQuery {
  state: UserState;
}

/** UserTypeQuery always equals */
export interface TypeQuery {
  type: Type;
}

export interface AuthFactor {
  state: AuthFactorState;
  otp?: AuthFactorOTP | undefined;
  u2f?: AuthFactorU2F | undefined;
}

export interface AuthFactorOTP {
}

export interface AuthFactorU2F {
  id: string;
  name: string;
}

export interface WebAuthNKey {
  publicKey: Uint8Array;
}

export interface WebAuthNVerification {
  publicKeyCredential: Uint8Array;
  tokenName: string;
}

export interface WebAuthNToken {
  id: string;
  state: AuthFactorState;
  name: string;
}

export interface Membership {
  userId: string;
  details: ObjectDetails | undefined;
  roles: string[];
  displayName: string;
  iam?: boolean | undefined;
  orgId?: string | undefined;
  projectId?: string | undefined;
  projectGrantId?: string | undefined;
}

export interface MembershipQuery {
  orgQuery?: MembershipOrgQuery | undefined;
  projectQuery?: MembershipProjectQuery | undefined;
  projectGrantQuery?: MembershipProjectGrantQuery | undefined;
  iamQuery?: MembershipIAMQuery | undefined;
}

/** this query always equals */
export interface MembershipOrgQuery {
  orgId: string;
}

/** this query always equals */
export interface MembershipProjectQuery {
  projectId: string;
}

/** this query always equals */
export interface MembershipProjectGrantQuery {
  projectGrantId: string;
}

/** this query always equals */
export interface MembershipIAMQuery {
  iam: boolean;
}

export interface Session {
  sessionId: string;
  agentId: string;
  authState: SessionState;
  userId: string;
  userName: string;
  loginName: string;
  displayName: string;
  details: ObjectDetails | undefined;
  avatarUrl: string;
}

export interface RefreshToken {
  id: string;
  details: ObjectDetails | undefined;
  clientId: string;
  authTime: Date | undefined;
  idleExpiration: Date | undefined;
  expiration: Date | undefined;
  scopes: string[];
  audience: string[];
}

export interface PersonalAccessToken {
  id: string;
  details: ObjectDetails | undefined;
  expirationDate: Date | undefined;
  scopes: string[];
}

export interface UserGrant {
  id: string;
  details: ObjectDetails | undefined;
  roleKeys: string[];
  state: UserGrantState;
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
  orgId: string;
  orgName: string;
  orgDomain: string;
  projectId: string;
  projectName: string;
  projectGrantId: string;
  avatarUrl: string;
  preferredLoginName: string;
  userType: Type;
}

export interface UserGrantQuery {
  projectIdQuery?: UserGrantProjectIDQuery | undefined;
  userIdQuery?: UserGrantUserIDQuery | undefined;
  withGrantedQuery?: UserGrantWithGrantedQuery | undefined;
  roleKeyQuery?: UserGrantRoleKeyQuery | undefined;
  projectGrantIdQuery?: UserGrantProjectGrantIDQuery | undefined;
  userNameQuery?: UserGrantUserNameQuery | undefined;
  firstNameQuery?: UserGrantFirstNameQuery | undefined;
  lastNameQuery?: UserGrantLastNameQuery | undefined;
  emailQuery?: UserGrantEmailQuery | undefined;
  orgNameQuery?: UserGrantOrgNameQuery | undefined;
  orgDomainQuery?: UserGrantOrgDomainQuery | undefined;
  projectNameQuery?: UserGrantProjectNameQuery | undefined;
  displayNameQuery?: UserGrantDisplayNameQuery | undefined;
  userTypeQuery?: UserGrantUserTypeQuery | undefined;
}

export interface UserGrantProjectIDQuery {
  projectId: string;
}

export interface UserGrantUserIDQuery {
  userId: string;
}

export interface UserGrantWithGrantedQuery {
  withGranted: boolean;
}

export interface UserGrantRoleKeyQuery {
  roleKey: string;
  method: TextQueryMethod;
}

export interface UserGrantProjectGrantIDQuery {
  projectGrantId: string;
}

export interface UserGrantUserNameQuery {
  userName: string;
  method: TextQueryMethod;
}

export interface UserGrantFirstNameQuery {
  firstName: string;
  method: TextQueryMethod;
}

export interface UserGrantLastNameQuery {
  lastName: string;
  method: TextQueryMethod;
}

export interface UserGrantEmailQuery {
  email: string;
  method: TextQueryMethod;
}

export interface UserGrantOrgNameQuery {
  orgName: string;
  method: TextQueryMethod;
}

export interface UserGrantOrgDomainQuery {
  orgDomain: string;
  method: TextQueryMethod;
}

export interface UserGrantProjectNameQuery {
  projectName: string;
  method: TextQueryMethod;
}

export interface UserGrantDisplayNameQuery {
  displayName: string;
  method: TextQueryMethod;
}

export interface UserGrantUserTypeQuery {
  type: Type;
}

function createBaseUser(): User {
  return {
    id: "",
    details: undefined,
    state: 0,
    userName: "",
    loginNames: [],
    preferredLoginName: "",
    human: undefined,
    machine: undefined,
  };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(18).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(24).int32(message.state);
    }
    if (message.userName !== "") {
      writer.uint32(34).string(message.userName);
    }
    for (const v of message.loginNames) {
      writer.uint32(42).string(v!);
    }
    if (message.preferredLoginName !== "") {
      writer.uint32(50).string(message.preferredLoginName);
    }
    if (message.human !== undefined) {
      Human.encode(message.human, writer.uint32(58).fork()).ldelim();
    }
    if (message.machine !== undefined) {
      Machine.encode(message.machine, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.userName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.loginNames.push(reader.string());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.preferredLoginName = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.human = Human.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.machine = Machine.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      state: isSet(object.state) ? userStateFromJSON(object.state) : 0,
      userName: isSet(object.userName) ? String(object.userName) : "",
      loginNames: Array.isArray(object?.loginNames) ? object.loginNames.map((e: any) => String(e)) : [],
      preferredLoginName: isSet(object.preferredLoginName) ? String(object.preferredLoginName) : "",
      human: isSet(object.human) ? Human.fromJSON(object.human) : undefined,
      machine: isSet(object.machine) ? Machine.fromJSON(object.machine) : undefined,
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.state !== 0) {
      obj.state = userStateToJSON(message.state);
    }
    if (message.userName !== "") {
      obj.userName = message.userName;
    }
    if (message.loginNames?.length) {
      obj.loginNames = message.loginNames;
    }
    if (message.preferredLoginName !== "") {
      obj.preferredLoginName = message.preferredLoginName;
    }
    if (message.human !== undefined) {
      obj.human = Human.toJSON(message.human);
    }
    if (message.machine !== undefined) {
      obj.machine = Machine.toJSON(message.machine);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<User>, I>>(base?: I): User {
    return User.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.id = object.id ?? "";
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.state = object.state ?? 0;
    message.userName = object.userName ?? "";
    message.loginNames = object.loginNames?.map((e) => e) || [];
    message.preferredLoginName = object.preferredLoginName ?? "";
    message.human = (object.human !== undefined && object.human !== null) ? Human.fromPartial(object.human) : undefined;
    message.machine = (object.machine !== undefined && object.machine !== null)
      ? Machine.fromPartial(object.machine)
      : undefined;
    return message;
  },
};

function createBaseHuman(): Human {
  return { profile: undefined, email: undefined, phone: undefined };
}

export const Human = {
  encode(message: Human, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.profile !== undefined) {
      Profile.encode(message.profile, writer.uint32(10).fork()).ldelim();
    }
    if (message.email !== undefined) {
      Email.encode(message.email, writer.uint32(18).fork()).ldelim();
    }
    if (message.phone !== undefined) {
      Phone.encode(message.phone, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Human {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHuman();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.profile = Profile.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.email = Email.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): Human {
    return {
      profile: isSet(object.profile) ? Profile.fromJSON(object.profile) : undefined,
      email: isSet(object.email) ? Email.fromJSON(object.email) : undefined,
      phone: isSet(object.phone) ? Phone.fromJSON(object.phone) : undefined,
    };
  },

  toJSON(message: Human): unknown {
    const obj: any = {};
    if (message.profile !== undefined) {
      obj.profile = Profile.toJSON(message.profile);
    }
    if (message.email !== undefined) {
      obj.email = Email.toJSON(message.email);
    }
    if (message.phone !== undefined) {
      obj.phone = Phone.toJSON(message.phone);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Human>, I>>(base?: I): Human {
    return Human.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Human>, I>>(object: I): Human {
    const message = createBaseHuman();
    message.profile = (object.profile !== undefined && object.profile !== null)
      ? Profile.fromPartial(object.profile)
      : undefined;
    message.email = (object.email !== undefined && object.email !== null) ? Email.fromPartial(object.email) : undefined;
    message.phone = (object.phone !== undefined && object.phone !== null) ? Phone.fromPartial(object.phone) : undefined;
    return message;
  },
};

function createBaseMachine(): Machine {
  return { name: "", description: "", hasSecret: false, accessTokenType: 0 };
}

export const Machine = {
  encode(message: Machine, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.hasSecret === true) {
      writer.uint32(24).bool(message.hasSecret);
    }
    if (message.accessTokenType !== 0) {
      writer.uint32(32).int32(message.accessTokenType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Machine {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMachine();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.hasSecret = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.accessTokenType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Machine {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      hasSecret: isSet(object.hasSecret) ? Boolean(object.hasSecret) : false,
      accessTokenType: isSet(object.accessTokenType) ? accessTokenTypeFromJSON(object.accessTokenType) : 0,
    };
  },

  toJSON(message: Machine): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.hasSecret === true) {
      obj.hasSecret = message.hasSecret;
    }
    if (message.accessTokenType !== 0) {
      obj.accessTokenType = accessTokenTypeToJSON(message.accessTokenType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Machine>, I>>(base?: I): Machine {
    return Machine.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Machine>, I>>(object: I): Machine {
    const message = createBaseMachine();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.hasSecret = object.hasSecret ?? false;
    message.accessTokenType = object.accessTokenType ?? 0;
    return message;
  },
};

function createBaseProfile(): Profile {
  return {
    firstName: "",
    lastName: "",
    nickName: "",
    displayName: "",
    preferredLanguage: "",
    gender: 0,
    avatarUrl: "",
  };
}

export const Profile = {
  encode(message: Profile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    if (message.avatarUrl !== "") {
      writer.uint32(58).string(message.avatarUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Profile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProfile();
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
        case 7:
          if (tag !== 58) {
            break;
          }

          message.avatarUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Profile {
    return {
      firstName: isSet(object.firstName) ? String(object.firstName) : "",
      lastName: isSet(object.lastName) ? String(object.lastName) : "",
      nickName: isSet(object.nickName) ? String(object.nickName) : "",
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      preferredLanguage: isSet(object.preferredLanguage) ? String(object.preferredLanguage) : "",
      gender: isSet(object.gender) ? genderFromJSON(object.gender) : 0,
      avatarUrl: isSet(object.avatarUrl) ? String(object.avatarUrl) : "",
    };
  },

  toJSON(message: Profile): unknown {
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
    if (message.avatarUrl !== "") {
      obj.avatarUrl = message.avatarUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Profile>, I>>(base?: I): Profile {
    return Profile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Profile>, I>>(object: I): Profile {
    const message = createBaseProfile();
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.nickName = object.nickName ?? "";
    message.displayName = object.displayName ?? "";
    message.preferredLanguage = object.preferredLanguage ?? "";
    message.gender = object.gender ?? 0;
    message.avatarUrl = object.avatarUrl ?? "";
    return message;
  },
};

function createBaseEmail(): Email {
  return { email: "", isEmailVerified: false };
}

export const Email = {
  encode(message: Email, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.isEmailVerified === true) {
      writer.uint32(16).bool(message.isEmailVerified);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Email {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmail();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.isEmailVerified = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Email {
    return {
      email: isSet(object.email) ? String(object.email) : "",
      isEmailVerified: isSet(object.isEmailVerified) ? Boolean(object.isEmailVerified) : false,
    };
  },

  toJSON(message: Email): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.isEmailVerified === true) {
      obj.isEmailVerified = message.isEmailVerified;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Email>, I>>(base?: I): Email {
    return Email.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Email>, I>>(object: I): Email {
    const message = createBaseEmail();
    message.email = object.email ?? "";
    message.isEmailVerified = object.isEmailVerified ?? false;
    return message;
  },
};

function createBasePhone(): Phone {
  return { phone: "", isPhoneVerified: false };
}

export const Phone = {
  encode(message: Phone, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.phone !== "") {
      writer.uint32(10).string(message.phone);
    }
    if (message.isPhoneVerified === true) {
      writer.uint32(16).bool(message.isPhoneVerified);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Phone {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePhone();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.phone = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.isPhoneVerified = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Phone {
    return {
      phone: isSet(object.phone) ? String(object.phone) : "",
      isPhoneVerified: isSet(object.isPhoneVerified) ? Boolean(object.isPhoneVerified) : false,
    };
  },

  toJSON(message: Phone): unknown {
    const obj: any = {};
    if (message.phone !== "") {
      obj.phone = message.phone;
    }
    if (message.isPhoneVerified === true) {
      obj.isPhoneVerified = message.isPhoneVerified;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Phone>, I>>(base?: I): Phone {
    return Phone.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Phone>, I>>(object: I): Phone {
    const message = createBasePhone();
    message.phone = object.phone ?? "";
    message.isPhoneVerified = object.isPhoneVerified ?? false;
    return message;
  },
};

function createBaseSearchQuery(): SearchQuery {
  return {
    userNameQuery: undefined,
    firstNameQuery: undefined,
    lastNameQuery: undefined,
    nickNameQuery: undefined,
    displayNameQuery: undefined,
    emailQuery: undefined,
    stateQuery: undefined,
    typeQuery: undefined,
    loginNameQuery: undefined,
  };
}

export const SearchQuery = {
  encode(message: SearchQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userNameQuery !== undefined) {
      UserNameQuery.encode(message.userNameQuery, writer.uint32(10).fork()).ldelim();
    }
    if (message.firstNameQuery !== undefined) {
      FirstNameQuery.encode(message.firstNameQuery, writer.uint32(18).fork()).ldelim();
    }
    if (message.lastNameQuery !== undefined) {
      LastNameQuery.encode(message.lastNameQuery, writer.uint32(26).fork()).ldelim();
    }
    if (message.nickNameQuery !== undefined) {
      NickNameQuery.encode(message.nickNameQuery, writer.uint32(34).fork()).ldelim();
    }
    if (message.displayNameQuery !== undefined) {
      DisplayNameQuery.encode(message.displayNameQuery, writer.uint32(42).fork()).ldelim();
    }
    if (message.emailQuery !== undefined) {
      EmailQuery.encode(message.emailQuery, writer.uint32(50).fork()).ldelim();
    }
    if (message.stateQuery !== undefined) {
      StateQuery.encode(message.stateQuery, writer.uint32(58).fork()).ldelim();
    }
    if (message.typeQuery !== undefined) {
      TypeQuery.encode(message.typeQuery, writer.uint32(66).fork()).ldelim();
    }
    if (message.loginNameQuery !== undefined) {
      LoginNameQuery.encode(message.loginNameQuery, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userNameQuery = UserNameQuery.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.firstNameQuery = FirstNameQuery.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lastNameQuery = LastNameQuery.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.nickNameQuery = NickNameQuery.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.displayNameQuery = DisplayNameQuery.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.emailQuery = EmailQuery.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.stateQuery = StateQuery.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.typeQuery = TypeQuery.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.loginNameQuery = LoginNameQuery.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchQuery {
    return {
      userNameQuery: isSet(object.userNameQuery) ? UserNameQuery.fromJSON(object.userNameQuery) : undefined,
      firstNameQuery: isSet(object.firstNameQuery) ? FirstNameQuery.fromJSON(object.firstNameQuery) : undefined,
      lastNameQuery: isSet(object.lastNameQuery) ? LastNameQuery.fromJSON(object.lastNameQuery) : undefined,
      nickNameQuery: isSet(object.nickNameQuery) ? NickNameQuery.fromJSON(object.nickNameQuery) : undefined,
      displayNameQuery: isSet(object.displayNameQuery) ? DisplayNameQuery.fromJSON(object.displayNameQuery) : undefined,
      emailQuery: isSet(object.emailQuery) ? EmailQuery.fromJSON(object.emailQuery) : undefined,
      stateQuery: isSet(object.stateQuery) ? StateQuery.fromJSON(object.stateQuery) : undefined,
      typeQuery: isSet(object.typeQuery) ? TypeQuery.fromJSON(object.typeQuery) : undefined,
      loginNameQuery: isSet(object.loginNameQuery) ? LoginNameQuery.fromJSON(object.loginNameQuery) : undefined,
    };
  },

  toJSON(message: SearchQuery): unknown {
    const obj: any = {};
    if (message.userNameQuery !== undefined) {
      obj.userNameQuery = UserNameQuery.toJSON(message.userNameQuery);
    }
    if (message.firstNameQuery !== undefined) {
      obj.firstNameQuery = FirstNameQuery.toJSON(message.firstNameQuery);
    }
    if (message.lastNameQuery !== undefined) {
      obj.lastNameQuery = LastNameQuery.toJSON(message.lastNameQuery);
    }
    if (message.nickNameQuery !== undefined) {
      obj.nickNameQuery = NickNameQuery.toJSON(message.nickNameQuery);
    }
    if (message.displayNameQuery !== undefined) {
      obj.displayNameQuery = DisplayNameQuery.toJSON(message.displayNameQuery);
    }
    if (message.emailQuery !== undefined) {
      obj.emailQuery = EmailQuery.toJSON(message.emailQuery);
    }
    if (message.stateQuery !== undefined) {
      obj.stateQuery = StateQuery.toJSON(message.stateQuery);
    }
    if (message.typeQuery !== undefined) {
      obj.typeQuery = TypeQuery.toJSON(message.typeQuery);
    }
    if (message.loginNameQuery !== undefined) {
      obj.loginNameQuery = LoginNameQuery.toJSON(message.loginNameQuery);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SearchQuery>, I>>(base?: I): SearchQuery {
    return SearchQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SearchQuery>, I>>(object: I): SearchQuery {
    const message = createBaseSearchQuery();
    message.userNameQuery = (object.userNameQuery !== undefined && object.userNameQuery !== null)
      ? UserNameQuery.fromPartial(object.userNameQuery)
      : undefined;
    message.firstNameQuery = (object.firstNameQuery !== undefined && object.firstNameQuery !== null)
      ? FirstNameQuery.fromPartial(object.firstNameQuery)
      : undefined;
    message.lastNameQuery = (object.lastNameQuery !== undefined && object.lastNameQuery !== null)
      ? LastNameQuery.fromPartial(object.lastNameQuery)
      : undefined;
    message.nickNameQuery = (object.nickNameQuery !== undefined && object.nickNameQuery !== null)
      ? NickNameQuery.fromPartial(object.nickNameQuery)
      : undefined;
    message.displayNameQuery = (object.displayNameQuery !== undefined && object.displayNameQuery !== null)
      ? DisplayNameQuery.fromPartial(object.displayNameQuery)
      : undefined;
    message.emailQuery = (object.emailQuery !== undefined && object.emailQuery !== null)
      ? EmailQuery.fromPartial(object.emailQuery)
      : undefined;
    message.stateQuery = (object.stateQuery !== undefined && object.stateQuery !== null)
      ? StateQuery.fromPartial(object.stateQuery)
      : undefined;
    message.typeQuery = (object.typeQuery !== undefined && object.typeQuery !== null)
      ? TypeQuery.fromPartial(object.typeQuery)
      : undefined;
    message.loginNameQuery = (object.loginNameQuery !== undefined && object.loginNameQuery !== null)
      ? LoginNameQuery.fromPartial(object.loginNameQuery)
      : undefined;
    return message;
  },
};

function createBaseUserNameQuery(): UserNameQuery {
  return { userName: "", method: 0 };
}

export const UserNameQuery = {
  encode(message: UserNameQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userName !== "") {
      writer.uint32(10).string(message.userName);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserNameQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserNameQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserNameQuery {
    return {
      userName: isSet(object.userName) ? String(object.userName) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: UserNameQuery): unknown {
    const obj: any = {};
    if (message.userName !== "") {
      obj.userName = message.userName;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserNameQuery>, I>>(base?: I): UserNameQuery {
    return UserNameQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserNameQuery>, I>>(object: I): UserNameQuery {
    const message = createBaseUserNameQuery();
    message.userName = object.userName ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseFirstNameQuery(): FirstNameQuery {
  return { firstName: "", method: 0 };
}

export const FirstNameQuery = {
  encode(message: FirstNameQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.firstName !== "") {
      writer.uint32(10).string(message.firstName);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FirstNameQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFirstNameQuery();
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
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FirstNameQuery {
    return {
      firstName: isSet(object.firstName) ? String(object.firstName) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: FirstNameQuery): unknown {
    const obj: any = {};
    if (message.firstName !== "") {
      obj.firstName = message.firstName;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FirstNameQuery>, I>>(base?: I): FirstNameQuery {
    return FirstNameQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FirstNameQuery>, I>>(object: I): FirstNameQuery {
    const message = createBaseFirstNameQuery();
    message.firstName = object.firstName ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseLastNameQuery(): LastNameQuery {
  return { lastName: "", method: 0 };
}

export const LastNameQuery = {
  encode(message: LastNameQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lastName !== "") {
      writer.uint32(10).string(message.lastName);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LastNameQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLastNameQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LastNameQuery {
    return {
      lastName: isSet(object.lastName) ? String(object.lastName) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: LastNameQuery): unknown {
    const obj: any = {};
    if (message.lastName !== "") {
      obj.lastName = message.lastName;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LastNameQuery>, I>>(base?: I): LastNameQuery {
    return LastNameQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LastNameQuery>, I>>(object: I): LastNameQuery {
    const message = createBaseLastNameQuery();
    message.lastName = object.lastName ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseNickNameQuery(): NickNameQuery {
  return { nickName: "", method: 0 };
}

export const NickNameQuery = {
  encode(message: NickNameQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nickName !== "") {
      writer.uint32(10).string(message.nickName);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NickNameQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNickNameQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nickName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NickNameQuery {
    return {
      nickName: isSet(object.nickName) ? String(object.nickName) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: NickNameQuery): unknown {
    const obj: any = {};
    if (message.nickName !== "") {
      obj.nickName = message.nickName;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NickNameQuery>, I>>(base?: I): NickNameQuery {
    return NickNameQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NickNameQuery>, I>>(object: I): NickNameQuery {
    const message = createBaseNickNameQuery();
    message.nickName = object.nickName ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseDisplayNameQuery(): DisplayNameQuery {
  return { displayName: "", method: 0 };
}

export const DisplayNameQuery = {
  encode(message: DisplayNameQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DisplayNameQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDisplayNameQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DisplayNameQuery {
    return {
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: DisplayNameQuery): unknown {
    const obj: any = {};
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DisplayNameQuery>, I>>(base?: I): DisplayNameQuery {
    return DisplayNameQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DisplayNameQuery>, I>>(object: I): DisplayNameQuery {
    const message = createBaseDisplayNameQuery();
    message.displayName = object.displayName ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseEmailQuery(): EmailQuery {
  return { emailAddress: "", method: 0 };
}

export const EmailQuery = {
  encode(message: EmailQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.emailAddress !== "") {
      writer.uint32(10).string(message.emailAddress);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmailQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmailQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.emailAddress = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EmailQuery {
    return {
      emailAddress: isSet(object.emailAddress) ? String(object.emailAddress) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: EmailQuery): unknown {
    const obj: any = {};
    if (message.emailAddress !== "") {
      obj.emailAddress = message.emailAddress;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EmailQuery>, I>>(base?: I): EmailQuery {
    return EmailQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EmailQuery>, I>>(object: I): EmailQuery {
    const message = createBaseEmailQuery();
    message.emailAddress = object.emailAddress ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseLoginNameQuery(): LoginNameQuery {
  return { loginName: "", method: 0 };
}

export const LoginNameQuery = {
  encode(message: LoginNameQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.loginName !== "") {
      writer.uint32(10).string(message.loginName);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginNameQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginNameQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.loginName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LoginNameQuery {
    return {
      loginName: isSet(object.loginName) ? String(object.loginName) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: LoginNameQuery): unknown {
    const obj: any = {};
    if (message.loginName !== "") {
      obj.loginName = message.loginName;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LoginNameQuery>, I>>(base?: I): LoginNameQuery {
    return LoginNameQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LoginNameQuery>, I>>(object: I): LoginNameQuery {
    const message = createBaseLoginNameQuery();
    message.loginName = object.loginName ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseStateQuery(): StateQuery {
  return { state: 0 };
}

export const StateQuery = {
  encode(message: StateQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StateQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStateQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StateQuery {
    return { state: isSet(object.state) ? userStateFromJSON(object.state) : 0 };
  },

  toJSON(message: StateQuery): unknown {
    const obj: any = {};
    if (message.state !== 0) {
      obj.state = userStateToJSON(message.state);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StateQuery>, I>>(base?: I): StateQuery {
    return StateQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StateQuery>, I>>(object: I): StateQuery {
    const message = createBaseStateQuery();
    message.state = object.state ?? 0;
    return message;
  },
};

function createBaseTypeQuery(): TypeQuery {
  return { type: 0 };
}

export const TypeQuery = {
  encode(message: TypeQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TypeQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTypeQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TypeQuery {
    return { type: isSet(object.type) ? typeFromJSON(object.type) : 0 };
  },

  toJSON(message: TypeQuery): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = typeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TypeQuery>, I>>(base?: I): TypeQuery {
    return TypeQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TypeQuery>, I>>(object: I): TypeQuery {
    const message = createBaseTypeQuery();
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseAuthFactor(): AuthFactor {
  return { state: 0, otp: undefined, u2f: undefined };
}

export const AuthFactor = {
  encode(message: AuthFactor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    if (message.otp !== undefined) {
      AuthFactorOTP.encode(message.otp, writer.uint32(18).fork()).ldelim();
    }
    if (message.u2f !== undefined) {
      AuthFactorU2F.encode(message.u2f, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthFactor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthFactor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.otp = AuthFactorOTP.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.u2f = AuthFactorU2F.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthFactor {
    return {
      state: isSet(object.state) ? authFactorStateFromJSON(object.state) : 0,
      otp: isSet(object.otp) ? AuthFactorOTP.fromJSON(object.otp) : undefined,
      u2f: isSet(object.u2f) ? AuthFactorU2F.fromJSON(object.u2f) : undefined,
    };
  },

  toJSON(message: AuthFactor): unknown {
    const obj: any = {};
    if (message.state !== 0) {
      obj.state = authFactorStateToJSON(message.state);
    }
    if (message.otp !== undefined) {
      obj.otp = AuthFactorOTP.toJSON(message.otp);
    }
    if (message.u2f !== undefined) {
      obj.u2f = AuthFactorU2F.toJSON(message.u2f);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthFactor>, I>>(base?: I): AuthFactor {
    return AuthFactor.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthFactor>, I>>(object: I): AuthFactor {
    const message = createBaseAuthFactor();
    message.state = object.state ?? 0;
    message.otp = (object.otp !== undefined && object.otp !== null) ? AuthFactorOTP.fromPartial(object.otp) : undefined;
    message.u2f = (object.u2f !== undefined && object.u2f !== null) ? AuthFactorU2F.fromPartial(object.u2f) : undefined;
    return message;
  },
};

function createBaseAuthFactorOTP(): AuthFactorOTP {
  return {};
}

export const AuthFactorOTP = {
  encode(_: AuthFactorOTP, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthFactorOTP {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthFactorOTP();
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

  fromJSON(_: any): AuthFactorOTP {
    return {};
  },

  toJSON(_: AuthFactorOTP): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthFactorOTP>, I>>(base?: I): AuthFactorOTP {
    return AuthFactorOTP.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthFactorOTP>, I>>(_: I): AuthFactorOTP {
    const message = createBaseAuthFactorOTP();
    return message;
  },
};

function createBaseAuthFactorU2F(): AuthFactorU2F {
  return { id: "", name: "" };
}

export const AuthFactorU2F = {
  encode(message: AuthFactorU2F, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthFactorU2F {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthFactorU2F();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthFactorU2F {
    return { id: isSet(object.id) ? String(object.id) : "", name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: AuthFactorU2F): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthFactorU2F>, I>>(base?: I): AuthFactorU2F {
    return AuthFactorU2F.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthFactorU2F>, I>>(object: I): AuthFactorU2F {
    const message = createBaseAuthFactorU2F();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseWebAuthNKey(): WebAuthNKey {
  return { publicKey: new Uint8Array(0) };
}

export const WebAuthNKey = {
  encode(message: WebAuthNKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.publicKey.length !== 0) {
      writer.uint32(10).bytes(message.publicKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WebAuthNKey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWebAuthNKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.publicKey = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WebAuthNKey {
    return { publicKey: isSet(object.publicKey) ? bytesFromBase64(object.publicKey) : new Uint8Array(0) };
  },

  toJSON(message: WebAuthNKey): unknown {
    const obj: any = {};
    if (message.publicKey.length !== 0) {
      obj.publicKey = base64FromBytes(message.publicKey);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WebAuthNKey>, I>>(base?: I): WebAuthNKey {
    return WebAuthNKey.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WebAuthNKey>, I>>(object: I): WebAuthNKey {
    const message = createBaseWebAuthNKey();
    message.publicKey = object.publicKey ?? new Uint8Array(0);
    return message;
  },
};

function createBaseWebAuthNVerification(): WebAuthNVerification {
  return { publicKeyCredential: new Uint8Array(0), tokenName: "" };
}

export const WebAuthNVerification = {
  encode(message: WebAuthNVerification, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.publicKeyCredential.length !== 0) {
      writer.uint32(10).bytes(message.publicKeyCredential);
    }
    if (message.tokenName !== "") {
      writer.uint32(18).string(message.tokenName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WebAuthNVerification {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWebAuthNVerification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.publicKeyCredential = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): WebAuthNVerification {
    return {
      publicKeyCredential: isSet(object.publicKeyCredential)
        ? bytesFromBase64(object.publicKeyCredential)
        : new Uint8Array(0),
      tokenName: isSet(object.tokenName) ? String(object.tokenName) : "",
    };
  },

  toJSON(message: WebAuthNVerification): unknown {
    const obj: any = {};
    if (message.publicKeyCredential.length !== 0) {
      obj.publicKeyCredential = base64FromBytes(message.publicKeyCredential);
    }
    if (message.tokenName !== "") {
      obj.tokenName = message.tokenName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WebAuthNVerification>, I>>(base?: I): WebAuthNVerification {
    return WebAuthNVerification.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WebAuthNVerification>, I>>(object: I): WebAuthNVerification {
    const message = createBaseWebAuthNVerification();
    message.publicKeyCredential = object.publicKeyCredential ?? new Uint8Array(0);
    message.tokenName = object.tokenName ?? "";
    return message;
  },
};

function createBaseWebAuthNToken(): WebAuthNToken {
  return { id: "", state: 0, name: "" };
}

export const WebAuthNToken = {
  encode(message: WebAuthNToken, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.state !== 0) {
      writer.uint32(16).int32(message.state);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WebAuthNToken {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWebAuthNToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WebAuthNToken {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      state: isSet(object.state) ? authFactorStateFromJSON(object.state) : 0,
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: WebAuthNToken): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.state !== 0) {
      obj.state = authFactorStateToJSON(message.state);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WebAuthNToken>, I>>(base?: I): WebAuthNToken {
    return WebAuthNToken.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WebAuthNToken>, I>>(object: I): WebAuthNToken {
    const message = createBaseWebAuthNToken();
    message.id = object.id ?? "";
    message.state = object.state ?? 0;
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseMembership(): Membership {
  return {
    userId: "",
    details: undefined,
    roles: [],
    displayName: "",
    iam: undefined,
    orgId: undefined,
    projectId: undefined,
    projectGrantId: undefined,
  };
}

export const Membership = {
  encode(message: Membership, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.roles) {
      writer.uint32(26).string(v!);
    }
    if (message.displayName !== "") {
      writer.uint32(34).string(message.displayName);
    }
    if (message.iam !== undefined) {
      writer.uint32(40).bool(message.iam);
    }
    if (message.orgId !== undefined) {
      writer.uint32(50).string(message.orgId);
    }
    if (message.projectId !== undefined) {
      writer.uint32(58).string(message.projectId);
    }
    if (message.projectGrantId !== undefined) {
      writer.uint32(66).string(message.projectGrantId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Membership {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMembership();
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

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.roles.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.iam = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.projectId = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.projectGrantId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Membership {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      roles: Array.isArray(object?.roles) ? object.roles.map((e: any) => String(e)) : [],
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      iam: isSet(object.iam) ? Boolean(object.iam) : undefined,
      orgId: isSet(object.orgId) ? String(object.orgId) : undefined,
      projectId: isSet(object.projectId) ? String(object.projectId) : undefined,
      projectGrantId: isSet(object.projectGrantId) ? String(object.projectGrantId) : undefined,
    };
  },

  toJSON(message: Membership): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.roles?.length) {
      obj.roles = message.roles;
    }
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.iam !== undefined) {
      obj.iam = message.iam;
    }
    if (message.orgId !== undefined) {
      obj.orgId = message.orgId;
    }
    if (message.projectId !== undefined) {
      obj.projectId = message.projectId;
    }
    if (message.projectGrantId !== undefined) {
      obj.projectGrantId = message.projectGrantId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Membership>, I>>(base?: I): Membership {
    return Membership.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Membership>, I>>(object: I): Membership {
    const message = createBaseMembership();
    message.userId = object.userId ?? "";
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.roles = object.roles?.map((e) => e) || [];
    message.displayName = object.displayName ?? "";
    message.iam = object.iam ?? undefined;
    message.orgId = object.orgId ?? undefined;
    message.projectId = object.projectId ?? undefined;
    message.projectGrantId = object.projectGrantId ?? undefined;
    return message;
  },
};

function createBaseMembershipQuery(): MembershipQuery {
  return { orgQuery: undefined, projectQuery: undefined, projectGrantQuery: undefined, iamQuery: undefined };
}

export const MembershipQuery = {
  encode(message: MembershipQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgQuery !== undefined) {
      MembershipOrgQuery.encode(message.orgQuery, writer.uint32(10).fork()).ldelim();
    }
    if (message.projectQuery !== undefined) {
      MembershipProjectQuery.encode(message.projectQuery, writer.uint32(18).fork()).ldelim();
    }
    if (message.projectGrantQuery !== undefined) {
      MembershipProjectGrantQuery.encode(message.projectGrantQuery, writer.uint32(26).fork()).ldelim();
    }
    if (message.iamQuery !== undefined) {
      MembershipIAMQuery.encode(message.iamQuery, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MembershipQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMembershipQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgQuery = MembershipOrgQuery.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.projectQuery = MembershipProjectQuery.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.projectGrantQuery = MembershipProjectGrantQuery.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.iamQuery = MembershipIAMQuery.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MembershipQuery {
    return {
      orgQuery: isSet(object.orgQuery) ? MembershipOrgQuery.fromJSON(object.orgQuery) : undefined,
      projectQuery: isSet(object.projectQuery) ? MembershipProjectQuery.fromJSON(object.projectQuery) : undefined,
      projectGrantQuery: isSet(object.projectGrantQuery)
        ? MembershipProjectGrantQuery.fromJSON(object.projectGrantQuery)
        : undefined,
      iamQuery: isSet(object.iamQuery) ? MembershipIAMQuery.fromJSON(object.iamQuery) : undefined,
    };
  },

  toJSON(message: MembershipQuery): unknown {
    const obj: any = {};
    if (message.orgQuery !== undefined) {
      obj.orgQuery = MembershipOrgQuery.toJSON(message.orgQuery);
    }
    if (message.projectQuery !== undefined) {
      obj.projectQuery = MembershipProjectQuery.toJSON(message.projectQuery);
    }
    if (message.projectGrantQuery !== undefined) {
      obj.projectGrantQuery = MembershipProjectGrantQuery.toJSON(message.projectGrantQuery);
    }
    if (message.iamQuery !== undefined) {
      obj.iamQuery = MembershipIAMQuery.toJSON(message.iamQuery);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MembershipQuery>, I>>(base?: I): MembershipQuery {
    return MembershipQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MembershipQuery>, I>>(object: I): MembershipQuery {
    const message = createBaseMembershipQuery();
    message.orgQuery = (object.orgQuery !== undefined && object.orgQuery !== null)
      ? MembershipOrgQuery.fromPartial(object.orgQuery)
      : undefined;
    message.projectQuery = (object.projectQuery !== undefined && object.projectQuery !== null)
      ? MembershipProjectQuery.fromPartial(object.projectQuery)
      : undefined;
    message.projectGrantQuery = (object.projectGrantQuery !== undefined && object.projectGrantQuery !== null)
      ? MembershipProjectGrantQuery.fromPartial(object.projectGrantQuery)
      : undefined;
    message.iamQuery = (object.iamQuery !== undefined && object.iamQuery !== null)
      ? MembershipIAMQuery.fromPartial(object.iamQuery)
      : undefined;
    return message;
  },
};

function createBaseMembershipOrgQuery(): MembershipOrgQuery {
  return { orgId: "" };
}

export const MembershipOrgQuery = {
  encode(message: MembershipOrgQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MembershipOrgQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMembershipOrgQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MembershipOrgQuery {
    return { orgId: isSet(object.orgId) ? String(object.orgId) : "" };
  },

  toJSON(message: MembershipOrgQuery): unknown {
    const obj: any = {};
    if (message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MembershipOrgQuery>, I>>(base?: I): MembershipOrgQuery {
    return MembershipOrgQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MembershipOrgQuery>, I>>(object: I): MembershipOrgQuery {
    const message = createBaseMembershipOrgQuery();
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseMembershipProjectQuery(): MembershipProjectQuery {
  return { projectId: "" };
}

export const MembershipProjectQuery = {
  encode(message: MembershipProjectQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MembershipProjectQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMembershipProjectQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MembershipProjectQuery {
    return { projectId: isSet(object.projectId) ? String(object.projectId) : "" };
  },

  toJSON(message: MembershipProjectQuery): unknown {
    const obj: any = {};
    if (message.projectId !== "") {
      obj.projectId = message.projectId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MembershipProjectQuery>, I>>(base?: I): MembershipProjectQuery {
    return MembershipProjectQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MembershipProjectQuery>, I>>(object: I): MembershipProjectQuery {
    const message = createBaseMembershipProjectQuery();
    message.projectId = object.projectId ?? "";
    return message;
  },
};

function createBaseMembershipProjectGrantQuery(): MembershipProjectGrantQuery {
  return { projectGrantId: "" };
}

export const MembershipProjectGrantQuery = {
  encode(message: MembershipProjectGrantQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectGrantId !== "") {
      writer.uint32(10).string(message.projectGrantId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MembershipProjectGrantQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMembershipProjectGrantQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectGrantId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MembershipProjectGrantQuery {
    return { projectGrantId: isSet(object.projectGrantId) ? String(object.projectGrantId) : "" };
  },

  toJSON(message: MembershipProjectGrantQuery): unknown {
    const obj: any = {};
    if (message.projectGrantId !== "") {
      obj.projectGrantId = message.projectGrantId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MembershipProjectGrantQuery>, I>>(base?: I): MembershipProjectGrantQuery {
    return MembershipProjectGrantQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MembershipProjectGrantQuery>, I>>(object: I): MembershipProjectGrantQuery {
    const message = createBaseMembershipProjectGrantQuery();
    message.projectGrantId = object.projectGrantId ?? "";
    return message;
  },
};

function createBaseMembershipIAMQuery(): MembershipIAMQuery {
  return { iam: false };
}

export const MembershipIAMQuery = {
  encode(message: MembershipIAMQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.iam === true) {
      writer.uint32(8).bool(message.iam);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MembershipIAMQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMembershipIAMQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.iam = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MembershipIAMQuery {
    return { iam: isSet(object.iam) ? Boolean(object.iam) : false };
  },

  toJSON(message: MembershipIAMQuery): unknown {
    const obj: any = {};
    if (message.iam === true) {
      obj.iam = message.iam;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MembershipIAMQuery>, I>>(base?: I): MembershipIAMQuery {
    return MembershipIAMQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MembershipIAMQuery>, I>>(object: I): MembershipIAMQuery {
    const message = createBaseMembershipIAMQuery();
    message.iam = object.iam ?? false;
    return message;
  },
};

function createBaseSession(): Session {
  return {
    sessionId: "",
    agentId: "",
    authState: 0,
    userId: "",
    userName: "",
    loginName: "",
    displayName: "",
    details: undefined,
    avatarUrl: "",
  };
}

export const Session = {
  encode(message: Session, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.agentId !== "") {
      writer.uint32(18).string(message.agentId);
    }
    if (message.authState !== 0) {
      writer.uint32(24).int32(message.authState);
    }
    if (message.userId !== "") {
      writer.uint32(34).string(message.userId);
    }
    if (message.userName !== "") {
      writer.uint32(42).string(message.userName);
    }
    if (message.loginName !== "") {
      writer.uint32(58).string(message.loginName);
    }
    if (message.displayName !== "") {
      writer.uint32(66).string(message.displayName);
    }
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(74).fork()).ldelim();
    }
    if (message.avatarUrl !== "") {
      writer.uint32(82).string(message.avatarUrl);
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

          message.agentId = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.authState = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.userName = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.loginName = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.avatarUrl = reader.string();
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
      agentId: isSet(object.agentId) ? String(object.agentId) : "",
      authState: isSet(object.authState) ? sessionStateFromJSON(object.authState) : 0,
      userId: isSet(object.userId) ? String(object.userId) : "",
      userName: isSet(object.userName) ? String(object.userName) : "",
      loginName: isSet(object.loginName) ? String(object.loginName) : "",
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      avatarUrl: isSet(object.avatarUrl) ? String(object.avatarUrl) : "",
    };
  },

  toJSON(message: Session): unknown {
    const obj: any = {};
    if (message.sessionId !== "") {
      obj.sessionId = message.sessionId;
    }
    if (message.agentId !== "") {
      obj.agentId = message.agentId;
    }
    if (message.authState !== 0) {
      obj.authState = sessionStateToJSON(message.authState);
    }
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.userName !== "") {
      obj.userName = message.userName;
    }
    if (message.loginName !== "") {
      obj.loginName = message.loginName;
    }
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.avatarUrl !== "") {
      obj.avatarUrl = message.avatarUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Session>, I>>(base?: I): Session {
    return Session.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Session>, I>>(object: I): Session {
    const message = createBaseSession();
    message.sessionId = object.sessionId ?? "";
    message.agentId = object.agentId ?? "";
    message.authState = object.authState ?? 0;
    message.userId = object.userId ?? "";
    message.userName = object.userName ?? "";
    message.loginName = object.loginName ?? "";
    message.displayName = object.displayName ?? "";
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.avatarUrl = object.avatarUrl ?? "";
    return message;
  },
};

function createBaseRefreshToken(): RefreshToken {
  return {
    id: "",
    details: undefined,
    clientId: "",
    authTime: undefined,
    idleExpiration: undefined,
    expiration: undefined,
    scopes: [],
    audience: [],
  };
}

export const RefreshToken = {
  encode(message: RefreshToken, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(18).fork()).ldelim();
    }
    if (message.clientId !== "") {
      writer.uint32(26).string(message.clientId);
    }
    if (message.authTime !== undefined) {
      Timestamp.encode(toTimestamp(message.authTime), writer.uint32(34).fork()).ldelim();
    }
    if (message.idleExpiration !== undefined) {
      Timestamp.encode(toTimestamp(message.idleExpiration), writer.uint32(42).fork()).ldelim();
    }
    if (message.expiration !== undefined) {
      Timestamp.encode(toTimestamp(message.expiration), writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.scopes) {
      writer.uint32(58).string(v!);
    }
    for (const v of message.audience) {
      writer.uint32(66).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RefreshToken {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefreshToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.clientId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.authTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.idleExpiration = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.expiration = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.scopes.push(reader.string());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.audience.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RefreshToken {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      clientId: isSet(object.clientId) ? String(object.clientId) : "",
      authTime: isSet(object.authTime) ? fromJsonTimestamp(object.authTime) : undefined,
      idleExpiration: isSet(object.idleExpiration) ? fromJsonTimestamp(object.idleExpiration) : undefined,
      expiration: isSet(object.expiration) ? fromJsonTimestamp(object.expiration) : undefined,
      scopes: Array.isArray(object?.scopes) ? object.scopes.map((e: any) => String(e)) : [],
      audience: Array.isArray(object?.audience) ? object.audience.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: RefreshToken): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.clientId !== "") {
      obj.clientId = message.clientId;
    }
    if (message.authTime !== undefined) {
      obj.authTime = message.authTime.toISOString();
    }
    if (message.idleExpiration !== undefined) {
      obj.idleExpiration = message.idleExpiration.toISOString();
    }
    if (message.expiration !== undefined) {
      obj.expiration = message.expiration.toISOString();
    }
    if (message.scopes?.length) {
      obj.scopes = message.scopes;
    }
    if (message.audience?.length) {
      obj.audience = message.audience;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RefreshToken>, I>>(base?: I): RefreshToken {
    return RefreshToken.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RefreshToken>, I>>(object: I): RefreshToken {
    const message = createBaseRefreshToken();
    message.id = object.id ?? "";
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.clientId = object.clientId ?? "";
    message.authTime = object.authTime ?? undefined;
    message.idleExpiration = object.idleExpiration ?? undefined;
    message.expiration = object.expiration ?? undefined;
    message.scopes = object.scopes?.map((e) => e) || [];
    message.audience = object.audience?.map((e) => e) || [];
    return message;
  },
};

function createBasePersonalAccessToken(): PersonalAccessToken {
  return { id: "", details: undefined, expirationDate: undefined, scopes: [] };
}

export const PersonalAccessToken = {
  encode(message: PersonalAccessToken, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(18).fork()).ldelim();
    }
    if (message.expirationDate !== undefined) {
      Timestamp.encode(toTimestamp(message.expirationDate), writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.scopes) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PersonalAccessToken {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePersonalAccessToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.expirationDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.scopes.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PersonalAccessToken {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      expirationDate: isSet(object.expirationDate) ? fromJsonTimestamp(object.expirationDate) : undefined,
      scopes: Array.isArray(object?.scopes) ? object.scopes.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: PersonalAccessToken): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.expirationDate !== undefined) {
      obj.expirationDate = message.expirationDate.toISOString();
    }
    if (message.scopes?.length) {
      obj.scopes = message.scopes;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PersonalAccessToken>, I>>(base?: I): PersonalAccessToken {
    return PersonalAccessToken.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PersonalAccessToken>, I>>(object: I): PersonalAccessToken {
    const message = createBasePersonalAccessToken();
    message.id = object.id ?? "";
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.expirationDate = object.expirationDate ?? undefined;
    message.scopes = object.scopes?.map((e) => e) || [];
    return message;
  },
};

function createBaseUserGrant(): UserGrant {
  return {
    id: "",
    details: undefined,
    roleKeys: [],
    state: 0,
    userId: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    displayName: "",
    orgId: "",
    orgName: "",
    orgDomain: "",
    projectId: "",
    projectName: "",
    projectGrantId: "",
    avatarUrl: "",
    preferredLoginName: "",
    userType: 0,
  };
}

export const UserGrant = {
  encode(message: UserGrant, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.roleKeys) {
      writer.uint32(26).string(v!);
    }
    if (message.state !== 0) {
      writer.uint32(32).int32(message.state);
    }
    if (message.userId !== "") {
      writer.uint32(42).string(message.userId);
    }
    if (message.userName !== "") {
      writer.uint32(50).string(message.userName);
    }
    if (message.firstName !== "") {
      writer.uint32(58).string(message.firstName);
    }
    if (message.lastName !== "") {
      writer.uint32(66).string(message.lastName);
    }
    if (message.email !== "") {
      writer.uint32(74).string(message.email);
    }
    if (message.displayName !== "") {
      writer.uint32(82).string(message.displayName);
    }
    if (message.orgId !== "") {
      writer.uint32(90).string(message.orgId);
    }
    if (message.orgName !== "") {
      writer.uint32(98).string(message.orgName);
    }
    if (message.orgDomain !== "") {
      writer.uint32(106).string(message.orgDomain);
    }
    if (message.projectId !== "") {
      writer.uint32(114).string(message.projectId);
    }
    if (message.projectName !== "") {
      writer.uint32(122).string(message.projectName);
    }
    if (message.projectGrantId !== "") {
      writer.uint32(130).string(message.projectGrantId);
    }
    if (message.avatarUrl !== "") {
      writer.uint32(138).string(message.avatarUrl);
    }
    if (message.preferredLoginName !== "") {
      writer.uint32(146).string(message.preferredLoginName);
    }
    if (message.userType !== 0) {
      writer.uint32(152).int32(message.userType);
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

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.roleKeys.push(reader.string());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.userName = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.firstName = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.email = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.orgName = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.orgDomain = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.projectId = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.projectName = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.projectGrantId = reader.string();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.avatarUrl = reader.string();
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.preferredLoginName = reader.string();
          continue;
        case 19:
          if (tag !== 152) {
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
      id: isSet(object.id) ? String(object.id) : "",
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      roleKeys: Array.isArray(object?.roleKeys) ? object.roleKeys.map((e: any) => String(e)) : [],
      state: isSet(object.state) ? userGrantStateFromJSON(object.state) : 0,
      userId: isSet(object.userId) ? String(object.userId) : "",
      userName: isSet(object.userName) ? String(object.userName) : "",
      firstName: isSet(object.firstName) ? String(object.firstName) : "",
      lastName: isSet(object.lastName) ? String(object.lastName) : "",
      email: isSet(object.email) ? String(object.email) : "",
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      orgId: isSet(object.orgId) ? String(object.orgId) : "",
      orgName: isSet(object.orgName) ? String(object.orgName) : "",
      orgDomain: isSet(object.orgDomain) ? String(object.orgDomain) : "",
      projectId: isSet(object.projectId) ? String(object.projectId) : "",
      projectName: isSet(object.projectName) ? String(object.projectName) : "",
      projectGrantId: isSet(object.projectGrantId) ? String(object.projectGrantId) : "",
      avatarUrl: isSet(object.avatarUrl) ? String(object.avatarUrl) : "",
      preferredLoginName: isSet(object.preferredLoginName) ? String(object.preferredLoginName) : "",
      userType: isSet(object.userType) ? typeFromJSON(object.userType) : 0,
    };
  },

  toJSON(message: UserGrant): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.roleKeys?.length) {
      obj.roleKeys = message.roleKeys;
    }
    if (message.state !== 0) {
      obj.state = userGrantStateToJSON(message.state);
    }
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.userName !== "") {
      obj.userName = message.userName;
    }
    if (message.firstName !== "") {
      obj.firstName = message.firstName;
    }
    if (message.lastName !== "") {
      obj.lastName = message.lastName;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.orgName !== "") {
      obj.orgName = message.orgName;
    }
    if (message.orgDomain !== "") {
      obj.orgDomain = message.orgDomain;
    }
    if (message.projectId !== "") {
      obj.projectId = message.projectId;
    }
    if (message.projectName !== "") {
      obj.projectName = message.projectName;
    }
    if (message.projectGrantId !== "") {
      obj.projectGrantId = message.projectGrantId;
    }
    if (message.avatarUrl !== "") {
      obj.avatarUrl = message.avatarUrl;
    }
    if (message.preferredLoginName !== "") {
      obj.preferredLoginName = message.preferredLoginName;
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
    message.id = object.id ?? "";
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.roleKeys = object.roleKeys?.map((e) => e) || [];
    message.state = object.state ?? 0;
    message.userId = object.userId ?? "";
    message.userName = object.userName ?? "";
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.email = object.email ?? "";
    message.displayName = object.displayName ?? "";
    message.orgId = object.orgId ?? "";
    message.orgName = object.orgName ?? "";
    message.orgDomain = object.orgDomain ?? "";
    message.projectId = object.projectId ?? "";
    message.projectName = object.projectName ?? "";
    message.projectGrantId = object.projectGrantId ?? "";
    message.avatarUrl = object.avatarUrl ?? "";
    message.preferredLoginName = object.preferredLoginName ?? "";
    message.userType = object.userType ?? 0;
    return message;
  },
};

function createBaseUserGrantQuery(): UserGrantQuery {
  return {
    projectIdQuery: undefined,
    userIdQuery: undefined,
    withGrantedQuery: undefined,
    roleKeyQuery: undefined,
    projectGrantIdQuery: undefined,
    userNameQuery: undefined,
    firstNameQuery: undefined,
    lastNameQuery: undefined,
    emailQuery: undefined,
    orgNameQuery: undefined,
    orgDomainQuery: undefined,
    projectNameQuery: undefined,
    displayNameQuery: undefined,
    userTypeQuery: undefined,
  };
}

export const UserGrantQuery = {
  encode(message: UserGrantQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectIdQuery !== undefined) {
      UserGrantProjectIDQuery.encode(message.projectIdQuery, writer.uint32(10).fork()).ldelim();
    }
    if (message.userIdQuery !== undefined) {
      UserGrantUserIDQuery.encode(message.userIdQuery, writer.uint32(18).fork()).ldelim();
    }
    if (message.withGrantedQuery !== undefined) {
      UserGrantWithGrantedQuery.encode(message.withGrantedQuery, writer.uint32(26).fork()).ldelim();
    }
    if (message.roleKeyQuery !== undefined) {
      UserGrantRoleKeyQuery.encode(message.roleKeyQuery, writer.uint32(34).fork()).ldelim();
    }
    if (message.projectGrantIdQuery !== undefined) {
      UserGrantProjectGrantIDQuery.encode(message.projectGrantIdQuery, writer.uint32(42).fork()).ldelim();
    }
    if (message.userNameQuery !== undefined) {
      UserGrantUserNameQuery.encode(message.userNameQuery, writer.uint32(50).fork()).ldelim();
    }
    if (message.firstNameQuery !== undefined) {
      UserGrantFirstNameQuery.encode(message.firstNameQuery, writer.uint32(58).fork()).ldelim();
    }
    if (message.lastNameQuery !== undefined) {
      UserGrantLastNameQuery.encode(message.lastNameQuery, writer.uint32(66).fork()).ldelim();
    }
    if (message.emailQuery !== undefined) {
      UserGrantEmailQuery.encode(message.emailQuery, writer.uint32(74).fork()).ldelim();
    }
    if (message.orgNameQuery !== undefined) {
      UserGrantOrgNameQuery.encode(message.orgNameQuery, writer.uint32(82).fork()).ldelim();
    }
    if (message.orgDomainQuery !== undefined) {
      UserGrantOrgDomainQuery.encode(message.orgDomainQuery, writer.uint32(90).fork()).ldelim();
    }
    if (message.projectNameQuery !== undefined) {
      UserGrantProjectNameQuery.encode(message.projectNameQuery, writer.uint32(98).fork()).ldelim();
    }
    if (message.displayNameQuery !== undefined) {
      UserGrantDisplayNameQuery.encode(message.displayNameQuery, writer.uint32(106).fork()).ldelim();
    }
    if (message.userTypeQuery !== undefined) {
      UserGrantUserTypeQuery.encode(message.userTypeQuery, writer.uint32(114).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGrantQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGrantQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectIdQuery = UserGrantProjectIDQuery.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.userIdQuery = UserGrantUserIDQuery.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.withGrantedQuery = UserGrantWithGrantedQuery.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.roleKeyQuery = UserGrantRoleKeyQuery.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.projectGrantIdQuery = UserGrantProjectGrantIDQuery.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.userNameQuery = UserGrantUserNameQuery.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.firstNameQuery = UserGrantFirstNameQuery.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.lastNameQuery = UserGrantLastNameQuery.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.emailQuery = UserGrantEmailQuery.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.orgNameQuery = UserGrantOrgNameQuery.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.orgDomainQuery = UserGrantOrgDomainQuery.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.projectNameQuery = UserGrantProjectNameQuery.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.displayNameQuery = UserGrantDisplayNameQuery.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.userTypeQuery = UserGrantUserTypeQuery.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGrantQuery {
    return {
      projectIdQuery: isSet(object.projectIdQuery)
        ? UserGrantProjectIDQuery.fromJSON(object.projectIdQuery)
        : undefined,
      userIdQuery: isSet(object.userIdQuery) ? UserGrantUserIDQuery.fromJSON(object.userIdQuery) : undefined,
      withGrantedQuery: isSet(object.withGrantedQuery)
        ? UserGrantWithGrantedQuery.fromJSON(object.withGrantedQuery)
        : undefined,
      roleKeyQuery: isSet(object.roleKeyQuery) ? UserGrantRoleKeyQuery.fromJSON(object.roleKeyQuery) : undefined,
      projectGrantIdQuery: isSet(object.projectGrantIdQuery)
        ? UserGrantProjectGrantIDQuery.fromJSON(object.projectGrantIdQuery)
        : undefined,
      userNameQuery: isSet(object.userNameQuery) ? UserGrantUserNameQuery.fromJSON(object.userNameQuery) : undefined,
      firstNameQuery: isSet(object.firstNameQuery)
        ? UserGrantFirstNameQuery.fromJSON(object.firstNameQuery)
        : undefined,
      lastNameQuery: isSet(object.lastNameQuery) ? UserGrantLastNameQuery.fromJSON(object.lastNameQuery) : undefined,
      emailQuery: isSet(object.emailQuery) ? UserGrantEmailQuery.fromJSON(object.emailQuery) : undefined,
      orgNameQuery: isSet(object.orgNameQuery) ? UserGrantOrgNameQuery.fromJSON(object.orgNameQuery) : undefined,
      orgDomainQuery: isSet(object.orgDomainQuery)
        ? UserGrantOrgDomainQuery.fromJSON(object.orgDomainQuery)
        : undefined,
      projectNameQuery: isSet(object.projectNameQuery)
        ? UserGrantProjectNameQuery.fromJSON(object.projectNameQuery)
        : undefined,
      displayNameQuery: isSet(object.displayNameQuery)
        ? UserGrantDisplayNameQuery.fromJSON(object.displayNameQuery)
        : undefined,
      userTypeQuery: isSet(object.userTypeQuery) ? UserGrantUserTypeQuery.fromJSON(object.userTypeQuery) : undefined,
    };
  },

  toJSON(message: UserGrantQuery): unknown {
    const obj: any = {};
    if (message.projectIdQuery !== undefined) {
      obj.projectIdQuery = UserGrantProjectIDQuery.toJSON(message.projectIdQuery);
    }
    if (message.userIdQuery !== undefined) {
      obj.userIdQuery = UserGrantUserIDQuery.toJSON(message.userIdQuery);
    }
    if (message.withGrantedQuery !== undefined) {
      obj.withGrantedQuery = UserGrantWithGrantedQuery.toJSON(message.withGrantedQuery);
    }
    if (message.roleKeyQuery !== undefined) {
      obj.roleKeyQuery = UserGrantRoleKeyQuery.toJSON(message.roleKeyQuery);
    }
    if (message.projectGrantIdQuery !== undefined) {
      obj.projectGrantIdQuery = UserGrantProjectGrantIDQuery.toJSON(message.projectGrantIdQuery);
    }
    if (message.userNameQuery !== undefined) {
      obj.userNameQuery = UserGrantUserNameQuery.toJSON(message.userNameQuery);
    }
    if (message.firstNameQuery !== undefined) {
      obj.firstNameQuery = UserGrantFirstNameQuery.toJSON(message.firstNameQuery);
    }
    if (message.lastNameQuery !== undefined) {
      obj.lastNameQuery = UserGrantLastNameQuery.toJSON(message.lastNameQuery);
    }
    if (message.emailQuery !== undefined) {
      obj.emailQuery = UserGrantEmailQuery.toJSON(message.emailQuery);
    }
    if (message.orgNameQuery !== undefined) {
      obj.orgNameQuery = UserGrantOrgNameQuery.toJSON(message.orgNameQuery);
    }
    if (message.orgDomainQuery !== undefined) {
      obj.orgDomainQuery = UserGrantOrgDomainQuery.toJSON(message.orgDomainQuery);
    }
    if (message.projectNameQuery !== undefined) {
      obj.projectNameQuery = UserGrantProjectNameQuery.toJSON(message.projectNameQuery);
    }
    if (message.displayNameQuery !== undefined) {
      obj.displayNameQuery = UserGrantDisplayNameQuery.toJSON(message.displayNameQuery);
    }
    if (message.userTypeQuery !== undefined) {
      obj.userTypeQuery = UserGrantUserTypeQuery.toJSON(message.userTypeQuery);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGrantQuery>, I>>(base?: I): UserGrantQuery {
    return UserGrantQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGrantQuery>, I>>(object: I): UserGrantQuery {
    const message = createBaseUserGrantQuery();
    message.projectIdQuery = (object.projectIdQuery !== undefined && object.projectIdQuery !== null)
      ? UserGrantProjectIDQuery.fromPartial(object.projectIdQuery)
      : undefined;
    message.userIdQuery = (object.userIdQuery !== undefined && object.userIdQuery !== null)
      ? UserGrantUserIDQuery.fromPartial(object.userIdQuery)
      : undefined;
    message.withGrantedQuery = (object.withGrantedQuery !== undefined && object.withGrantedQuery !== null)
      ? UserGrantWithGrantedQuery.fromPartial(object.withGrantedQuery)
      : undefined;
    message.roleKeyQuery = (object.roleKeyQuery !== undefined && object.roleKeyQuery !== null)
      ? UserGrantRoleKeyQuery.fromPartial(object.roleKeyQuery)
      : undefined;
    message.projectGrantIdQuery = (object.projectGrantIdQuery !== undefined && object.projectGrantIdQuery !== null)
      ? UserGrantProjectGrantIDQuery.fromPartial(object.projectGrantIdQuery)
      : undefined;
    message.userNameQuery = (object.userNameQuery !== undefined && object.userNameQuery !== null)
      ? UserGrantUserNameQuery.fromPartial(object.userNameQuery)
      : undefined;
    message.firstNameQuery = (object.firstNameQuery !== undefined && object.firstNameQuery !== null)
      ? UserGrantFirstNameQuery.fromPartial(object.firstNameQuery)
      : undefined;
    message.lastNameQuery = (object.lastNameQuery !== undefined && object.lastNameQuery !== null)
      ? UserGrantLastNameQuery.fromPartial(object.lastNameQuery)
      : undefined;
    message.emailQuery = (object.emailQuery !== undefined && object.emailQuery !== null)
      ? UserGrantEmailQuery.fromPartial(object.emailQuery)
      : undefined;
    message.orgNameQuery = (object.orgNameQuery !== undefined && object.orgNameQuery !== null)
      ? UserGrantOrgNameQuery.fromPartial(object.orgNameQuery)
      : undefined;
    message.orgDomainQuery = (object.orgDomainQuery !== undefined && object.orgDomainQuery !== null)
      ? UserGrantOrgDomainQuery.fromPartial(object.orgDomainQuery)
      : undefined;
    message.projectNameQuery = (object.projectNameQuery !== undefined && object.projectNameQuery !== null)
      ? UserGrantProjectNameQuery.fromPartial(object.projectNameQuery)
      : undefined;
    message.displayNameQuery = (object.displayNameQuery !== undefined && object.displayNameQuery !== null)
      ? UserGrantDisplayNameQuery.fromPartial(object.displayNameQuery)
      : undefined;
    message.userTypeQuery = (object.userTypeQuery !== undefined && object.userTypeQuery !== null)
      ? UserGrantUserTypeQuery.fromPartial(object.userTypeQuery)
      : undefined;
    return message;
  },
};

function createBaseUserGrantProjectIDQuery(): UserGrantProjectIDQuery {
  return { projectId: "" };
}

export const UserGrantProjectIDQuery = {
  encode(message: UserGrantProjectIDQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGrantProjectIDQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGrantProjectIDQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGrantProjectIDQuery {
    return { projectId: isSet(object.projectId) ? String(object.projectId) : "" };
  },

  toJSON(message: UserGrantProjectIDQuery): unknown {
    const obj: any = {};
    if (message.projectId !== "") {
      obj.projectId = message.projectId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGrantProjectIDQuery>, I>>(base?: I): UserGrantProjectIDQuery {
    return UserGrantProjectIDQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGrantProjectIDQuery>, I>>(object: I): UserGrantProjectIDQuery {
    const message = createBaseUserGrantProjectIDQuery();
    message.projectId = object.projectId ?? "";
    return message;
  },
};

function createBaseUserGrantUserIDQuery(): UserGrantUserIDQuery {
  return { userId: "" };
}

export const UserGrantUserIDQuery = {
  encode(message: UserGrantUserIDQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGrantUserIDQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGrantUserIDQuery();
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

  fromJSON(object: any): UserGrantUserIDQuery {
    return { userId: isSet(object.userId) ? String(object.userId) : "" };
  },

  toJSON(message: UserGrantUserIDQuery): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGrantUserIDQuery>, I>>(base?: I): UserGrantUserIDQuery {
    return UserGrantUserIDQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGrantUserIDQuery>, I>>(object: I): UserGrantUserIDQuery {
    const message = createBaseUserGrantUserIDQuery();
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseUserGrantWithGrantedQuery(): UserGrantWithGrantedQuery {
  return { withGranted: false };
}

export const UserGrantWithGrantedQuery = {
  encode(message: UserGrantWithGrantedQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.withGranted === true) {
      writer.uint32(8).bool(message.withGranted);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGrantWithGrantedQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGrantWithGrantedQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.withGranted = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGrantWithGrantedQuery {
    return { withGranted: isSet(object.withGranted) ? Boolean(object.withGranted) : false };
  },

  toJSON(message: UserGrantWithGrantedQuery): unknown {
    const obj: any = {};
    if (message.withGranted === true) {
      obj.withGranted = message.withGranted;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGrantWithGrantedQuery>, I>>(base?: I): UserGrantWithGrantedQuery {
    return UserGrantWithGrantedQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGrantWithGrantedQuery>, I>>(object: I): UserGrantWithGrantedQuery {
    const message = createBaseUserGrantWithGrantedQuery();
    message.withGranted = object.withGranted ?? false;
    return message;
  },
};

function createBaseUserGrantRoleKeyQuery(): UserGrantRoleKeyQuery {
  return { roleKey: "", method: 0 };
}

export const UserGrantRoleKeyQuery = {
  encode(message: UserGrantRoleKeyQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.roleKey !== "") {
      writer.uint32(10).string(message.roleKey);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGrantRoleKeyQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGrantRoleKeyQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.roleKey = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGrantRoleKeyQuery {
    return {
      roleKey: isSet(object.roleKey) ? String(object.roleKey) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: UserGrantRoleKeyQuery): unknown {
    const obj: any = {};
    if (message.roleKey !== "") {
      obj.roleKey = message.roleKey;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGrantRoleKeyQuery>, I>>(base?: I): UserGrantRoleKeyQuery {
    return UserGrantRoleKeyQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGrantRoleKeyQuery>, I>>(object: I): UserGrantRoleKeyQuery {
    const message = createBaseUserGrantRoleKeyQuery();
    message.roleKey = object.roleKey ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseUserGrantProjectGrantIDQuery(): UserGrantProjectGrantIDQuery {
  return { projectGrantId: "" };
}

export const UserGrantProjectGrantIDQuery = {
  encode(message: UserGrantProjectGrantIDQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectGrantId !== "") {
      writer.uint32(10).string(message.projectGrantId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGrantProjectGrantIDQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGrantProjectGrantIDQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectGrantId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGrantProjectGrantIDQuery {
    return { projectGrantId: isSet(object.projectGrantId) ? String(object.projectGrantId) : "" };
  },

  toJSON(message: UserGrantProjectGrantIDQuery): unknown {
    const obj: any = {};
    if (message.projectGrantId !== "") {
      obj.projectGrantId = message.projectGrantId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGrantProjectGrantIDQuery>, I>>(base?: I): UserGrantProjectGrantIDQuery {
    return UserGrantProjectGrantIDQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGrantProjectGrantIDQuery>, I>>(object: I): UserGrantProjectGrantIDQuery {
    const message = createBaseUserGrantProjectGrantIDQuery();
    message.projectGrantId = object.projectGrantId ?? "";
    return message;
  },
};

function createBaseUserGrantUserNameQuery(): UserGrantUserNameQuery {
  return { userName: "", method: 0 };
}

export const UserGrantUserNameQuery = {
  encode(message: UserGrantUserNameQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userName !== "") {
      writer.uint32(10).string(message.userName);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGrantUserNameQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGrantUserNameQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGrantUserNameQuery {
    return {
      userName: isSet(object.userName) ? String(object.userName) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: UserGrantUserNameQuery): unknown {
    const obj: any = {};
    if (message.userName !== "") {
      obj.userName = message.userName;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGrantUserNameQuery>, I>>(base?: I): UserGrantUserNameQuery {
    return UserGrantUserNameQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGrantUserNameQuery>, I>>(object: I): UserGrantUserNameQuery {
    const message = createBaseUserGrantUserNameQuery();
    message.userName = object.userName ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseUserGrantFirstNameQuery(): UserGrantFirstNameQuery {
  return { firstName: "", method: 0 };
}

export const UserGrantFirstNameQuery = {
  encode(message: UserGrantFirstNameQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.firstName !== "") {
      writer.uint32(10).string(message.firstName);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGrantFirstNameQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGrantFirstNameQuery();
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
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGrantFirstNameQuery {
    return {
      firstName: isSet(object.firstName) ? String(object.firstName) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: UserGrantFirstNameQuery): unknown {
    const obj: any = {};
    if (message.firstName !== "") {
      obj.firstName = message.firstName;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGrantFirstNameQuery>, I>>(base?: I): UserGrantFirstNameQuery {
    return UserGrantFirstNameQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGrantFirstNameQuery>, I>>(object: I): UserGrantFirstNameQuery {
    const message = createBaseUserGrantFirstNameQuery();
    message.firstName = object.firstName ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseUserGrantLastNameQuery(): UserGrantLastNameQuery {
  return { lastName: "", method: 0 };
}

export const UserGrantLastNameQuery = {
  encode(message: UserGrantLastNameQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lastName !== "") {
      writer.uint32(10).string(message.lastName);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGrantLastNameQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGrantLastNameQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGrantLastNameQuery {
    return {
      lastName: isSet(object.lastName) ? String(object.lastName) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: UserGrantLastNameQuery): unknown {
    const obj: any = {};
    if (message.lastName !== "") {
      obj.lastName = message.lastName;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGrantLastNameQuery>, I>>(base?: I): UserGrantLastNameQuery {
    return UserGrantLastNameQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGrantLastNameQuery>, I>>(object: I): UserGrantLastNameQuery {
    const message = createBaseUserGrantLastNameQuery();
    message.lastName = object.lastName ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseUserGrantEmailQuery(): UserGrantEmailQuery {
  return { email: "", method: 0 };
}

export const UserGrantEmailQuery = {
  encode(message: UserGrantEmailQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGrantEmailQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGrantEmailQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGrantEmailQuery {
    return {
      email: isSet(object.email) ? String(object.email) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: UserGrantEmailQuery): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGrantEmailQuery>, I>>(base?: I): UserGrantEmailQuery {
    return UserGrantEmailQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGrantEmailQuery>, I>>(object: I): UserGrantEmailQuery {
    const message = createBaseUserGrantEmailQuery();
    message.email = object.email ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseUserGrantOrgNameQuery(): UserGrantOrgNameQuery {
  return { orgName: "", method: 0 };
}

export const UserGrantOrgNameQuery = {
  encode(message: UserGrantOrgNameQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgName !== "") {
      writer.uint32(10).string(message.orgName);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGrantOrgNameQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGrantOrgNameQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGrantOrgNameQuery {
    return {
      orgName: isSet(object.orgName) ? String(object.orgName) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: UserGrantOrgNameQuery): unknown {
    const obj: any = {};
    if (message.orgName !== "") {
      obj.orgName = message.orgName;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGrantOrgNameQuery>, I>>(base?: I): UserGrantOrgNameQuery {
    return UserGrantOrgNameQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGrantOrgNameQuery>, I>>(object: I): UserGrantOrgNameQuery {
    const message = createBaseUserGrantOrgNameQuery();
    message.orgName = object.orgName ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseUserGrantOrgDomainQuery(): UserGrantOrgDomainQuery {
  return { orgDomain: "", method: 0 };
}

export const UserGrantOrgDomainQuery = {
  encode(message: UserGrantOrgDomainQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgDomain !== "") {
      writer.uint32(10).string(message.orgDomain);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGrantOrgDomainQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGrantOrgDomainQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgDomain = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGrantOrgDomainQuery {
    return {
      orgDomain: isSet(object.orgDomain) ? String(object.orgDomain) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: UserGrantOrgDomainQuery): unknown {
    const obj: any = {};
    if (message.orgDomain !== "") {
      obj.orgDomain = message.orgDomain;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGrantOrgDomainQuery>, I>>(base?: I): UserGrantOrgDomainQuery {
    return UserGrantOrgDomainQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGrantOrgDomainQuery>, I>>(object: I): UserGrantOrgDomainQuery {
    const message = createBaseUserGrantOrgDomainQuery();
    message.orgDomain = object.orgDomain ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseUserGrantProjectNameQuery(): UserGrantProjectNameQuery {
  return { projectName: "", method: 0 };
}

export const UserGrantProjectNameQuery = {
  encode(message: UserGrantProjectNameQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectName !== "") {
      writer.uint32(10).string(message.projectName);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGrantProjectNameQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGrantProjectNameQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGrantProjectNameQuery {
    return {
      projectName: isSet(object.projectName) ? String(object.projectName) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: UserGrantProjectNameQuery): unknown {
    const obj: any = {};
    if (message.projectName !== "") {
      obj.projectName = message.projectName;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGrantProjectNameQuery>, I>>(base?: I): UserGrantProjectNameQuery {
    return UserGrantProjectNameQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGrantProjectNameQuery>, I>>(object: I): UserGrantProjectNameQuery {
    const message = createBaseUserGrantProjectNameQuery();
    message.projectName = object.projectName ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseUserGrantDisplayNameQuery(): UserGrantDisplayNameQuery {
  return { displayName: "", method: 0 };
}

export const UserGrantDisplayNameQuery = {
  encode(message: UserGrantDisplayNameQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGrantDisplayNameQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGrantDisplayNameQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGrantDisplayNameQuery {
    return {
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: UserGrantDisplayNameQuery): unknown {
    const obj: any = {};
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGrantDisplayNameQuery>, I>>(base?: I): UserGrantDisplayNameQuery {
    return UserGrantDisplayNameQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGrantDisplayNameQuery>, I>>(object: I): UserGrantDisplayNameQuery {
    const message = createBaseUserGrantDisplayNameQuery();
    message.displayName = object.displayName ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseUserGrantUserTypeQuery(): UserGrantUserTypeQuery {
  return { type: 0 };
}

export const UserGrantUserTypeQuery = {
  encode(message: UserGrantUserTypeQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGrantUserTypeQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGrantUserTypeQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGrantUserTypeQuery {
    return { type: isSet(object.type) ? typeFromJSON(object.type) : 0 };
  },

  toJSON(message: UserGrantUserTypeQuery): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = typeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGrantUserTypeQuery>, I>>(base?: I): UserGrantUserTypeQuery {
    return UserGrantUserTypeQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGrantUserTypeQuery>, I>>(object: I): UserGrantUserTypeQuery {
    const message = createBaseUserGrantUserTypeQuery();
    message.type = object.type ?? 0;
    return message;
  },
};

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
