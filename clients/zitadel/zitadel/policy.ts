/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../google/protobuf/duration";
import { IDPLoginPolicyLink } from "./idp";
import { ObjectDetails } from "./object";

export const protobufPackage = "zitadel.policy.v1";

export enum SecondFactorType {
  SECOND_FACTOR_TYPE_UNSPECIFIED = 0,
  /** SECOND_FACTOR_TYPE_OTP - SECOND_FACTOR_TYPE_OTP is the type for TOTP */
  SECOND_FACTOR_TYPE_OTP = 1,
  SECOND_FACTOR_TYPE_U2F = 2,
  SECOND_FACTOR_TYPE_OTP_EMAIL = 3,
  SECOND_FACTOR_TYPE_OTP_SMS = 4,
  UNRECOGNIZED = -1,
}

export function secondFactorTypeFromJSON(object: any): SecondFactorType {
  switch (object) {
    case 0:
    case "SECOND_FACTOR_TYPE_UNSPECIFIED":
      return SecondFactorType.SECOND_FACTOR_TYPE_UNSPECIFIED;
    case 1:
    case "SECOND_FACTOR_TYPE_OTP":
      return SecondFactorType.SECOND_FACTOR_TYPE_OTP;
    case 2:
    case "SECOND_FACTOR_TYPE_U2F":
      return SecondFactorType.SECOND_FACTOR_TYPE_U2F;
    case 3:
    case "SECOND_FACTOR_TYPE_OTP_EMAIL":
      return SecondFactorType.SECOND_FACTOR_TYPE_OTP_EMAIL;
    case 4:
    case "SECOND_FACTOR_TYPE_OTP_SMS":
      return SecondFactorType.SECOND_FACTOR_TYPE_OTP_SMS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SecondFactorType.UNRECOGNIZED;
  }
}

export function secondFactorTypeToJSON(object: SecondFactorType): string {
  switch (object) {
    case SecondFactorType.SECOND_FACTOR_TYPE_UNSPECIFIED:
      return "SECOND_FACTOR_TYPE_UNSPECIFIED";
    case SecondFactorType.SECOND_FACTOR_TYPE_OTP:
      return "SECOND_FACTOR_TYPE_OTP";
    case SecondFactorType.SECOND_FACTOR_TYPE_U2F:
      return "SECOND_FACTOR_TYPE_U2F";
    case SecondFactorType.SECOND_FACTOR_TYPE_OTP_EMAIL:
      return "SECOND_FACTOR_TYPE_OTP_EMAIL";
    case SecondFactorType.SECOND_FACTOR_TYPE_OTP_SMS:
      return "SECOND_FACTOR_TYPE_OTP_SMS";
    case SecondFactorType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum MultiFactorType {
  MULTI_FACTOR_TYPE_UNSPECIFIED = 0,
  MULTI_FACTOR_TYPE_U2F_WITH_VERIFICATION = 1,
  UNRECOGNIZED = -1,
}

export function multiFactorTypeFromJSON(object: any): MultiFactorType {
  switch (object) {
    case 0:
    case "MULTI_FACTOR_TYPE_UNSPECIFIED":
      return MultiFactorType.MULTI_FACTOR_TYPE_UNSPECIFIED;
    case 1:
    case "MULTI_FACTOR_TYPE_U2F_WITH_VERIFICATION":
      return MultiFactorType.MULTI_FACTOR_TYPE_U2F_WITH_VERIFICATION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MultiFactorType.UNRECOGNIZED;
  }
}

export function multiFactorTypeToJSON(object: MultiFactorType): string {
  switch (object) {
    case MultiFactorType.MULTI_FACTOR_TYPE_UNSPECIFIED:
      return "MULTI_FACTOR_TYPE_UNSPECIFIED";
    case MultiFactorType.MULTI_FACTOR_TYPE_U2F_WITH_VERIFICATION:
      return "MULTI_FACTOR_TYPE_U2F_WITH_VERIFICATION";
    case MultiFactorType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum PasswordlessType {
  PASSWORDLESS_TYPE_NOT_ALLOWED = 0,
  /** PASSWORDLESS_TYPE_ALLOWED - PLANNED: PASSWORDLESS_TYPE_WITH_CERT */
  PASSWORDLESS_TYPE_ALLOWED = 1,
  UNRECOGNIZED = -1,
}

export function passwordlessTypeFromJSON(object: any): PasswordlessType {
  switch (object) {
    case 0:
    case "PASSWORDLESS_TYPE_NOT_ALLOWED":
      return PasswordlessType.PASSWORDLESS_TYPE_NOT_ALLOWED;
    case 1:
    case "PASSWORDLESS_TYPE_ALLOWED":
      return PasswordlessType.PASSWORDLESS_TYPE_ALLOWED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PasswordlessType.UNRECOGNIZED;
  }
}

export function passwordlessTypeToJSON(object: PasswordlessType): string {
  switch (object) {
    case PasswordlessType.PASSWORDLESS_TYPE_NOT_ALLOWED:
      return "PASSWORDLESS_TYPE_NOT_ALLOWED";
    case PasswordlessType.PASSWORDLESS_TYPE_ALLOWED:
      return "PASSWORDLESS_TYPE_ALLOWED";
    case PasswordlessType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** deprecated: please use DomainPolicy instead */
export interface OrgIAMPolicy {
  details: ObjectDetails | undefined;
  userLoginMustBeDomain: boolean;
  isDefault: boolean;
}

export interface DomainPolicy {
  details: ObjectDetails | undefined;
  userLoginMustBeDomain: boolean;
  isDefault: boolean;
  validateOrgDomains: boolean;
  smtpSenderAddressMatchesInstanceDomain: boolean;
}

export interface LabelPolicy {
  details:
    | ObjectDetails
    | undefined;
  /** hex value for primary color */
  primaryColor: string;
  /** defines if the organization's admin changed the policy */
  isDefault: boolean;
  /** hides the org suffix on the login form if the scope \"urn:zitadel:iam:org:domain:primary:{domainname}\" is set */
  hideLoginNameSuffix: boolean;
  /** hex value for secondary color */
  warnColor: string;
  /** hex value for background color */
  backgroundColor: string;
  /** hex value for font color */
  fontColor: string;
  /** hex value for primary color dark theme */
  primaryColorDark: string;
  /** hex value for background color dark theme */
  backgroundColorDark: string;
  /** hex value for warning color dark theme */
  warnColorDark: string;
  /** hex value for font color dark theme */
  fontColorDark: string;
  disableWatermark: boolean;
  logoUrl: string;
  iconUrl: string;
  logoUrlDark: string;
  iconUrlDark: string;
  fontUrl: string;
}

export interface LoginPolicy {
  details: ObjectDetails | undefined;
  allowUsernamePassword: boolean;
  allowRegister: boolean;
  allowExternalIdp: boolean;
  forceMfa: boolean;
  passwordlessType: PasswordlessType;
  isDefault: boolean;
  hidePasswordReset: boolean;
  ignoreUnknownUsernames: boolean;
  defaultRedirectUri: string;
  passwordCheckLifetime: Duration | undefined;
  externalLoginCheckLifetime: Duration | undefined;
  mfaInitSkipLifetime: Duration | undefined;
  secondFactorCheckLifetime: Duration | undefined;
  multiFactorCheckLifetime: Duration | undefined;
  secondFactors: SecondFactorType[];
  multiFactors: MultiFactorType[];
  idps: IDPLoginPolicyLink[];
  /** If set to true, the suffix (@domain.com) of an unknown username input on the login screen will be matched against the org domains and will redirect to the registration of that organization on success. */
  allowDomainDiscovery: boolean;
  disableLoginWithEmail: boolean;
  disableLoginWithPhone: boolean;
  forceMfaLocalOnly: boolean;
}

export interface PasswordComplexityPolicy {
  details: ObjectDetails | undefined;
  minLength: number;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  isDefault: boolean;
}

export interface PasswordAgePolicy {
  details: ObjectDetails | undefined;
  maxAgeDays: number;
  expireWarnDays: number;
  isDefault: boolean;
}

export interface LockoutPolicy {
  details: ObjectDetails | undefined;
  maxPasswordAttempts: number;
  isDefault: boolean;
}

export interface PrivacyPolicy {
  details: ObjectDetails | undefined;
  tosLink: string;
  privacyLink: string;
  isDefault: boolean;
  helpLink: string;
  supportEmail: string;
}

export interface NotificationPolicy {
  details: ObjectDetails | undefined;
  isDefault: boolean;
  passwordChange: boolean;
}

function createBaseOrgIAMPolicy(): OrgIAMPolicy {
  return { details: undefined, userLoginMustBeDomain: false, isDefault: false };
}

export const OrgIAMPolicy = {
  encode(message: OrgIAMPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.userLoginMustBeDomain === true) {
      writer.uint32(16).bool(message.userLoginMustBeDomain);
    }
    if (message.isDefault === true) {
      writer.uint32(24).bool(message.isDefault);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgIAMPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgIAMPolicy();
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
          if (tag !== 16) {
            break;
          }

          message.userLoginMustBeDomain = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.isDefault = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OrgIAMPolicy {
    return {
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      userLoginMustBeDomain: isSet(object.userLoginMustBeDomain) ? Boolean(object.userLoginMustBeDomain) : false,
      isDefault: isSet(object.isDefault) ? Boolean(object.isDefault) : false,
    };
  },

  toJSON(message: OrgIAMPolicy): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.userLoginMustBeDomain === true) {
      obj.userLoginMustBeDomain = message.userLoginMustBeDomain;
    }
    if (message.isDefault === true) {
      obj.isDefault = message.isDefault;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OrgIAMPolicy>, I>>(base?: I): OrgIAMPolicy {
    return OrgIAMPolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OrgIAMPolicy>, I>>(object: I): OrgIAMPolicy {
    const message = createBaseOrgIAMPolicy();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.userLoginMustBeDomain = object.userLoginMustBeDomain ?? false;
    message.isDefault = object.isDefault ?? false;
    return message;
  },
};

function createBaseDomainPolicy(): DomainPolicy {
  return {
    details: undefined,
    userLoginMustBeDomain: false,
    isDefault: false,
    validateOrgDomains: false,
    smtpSenderAddressMatchesInstanceDomain: false,
  };
}

export const DomainPolicy = {
  encode(message: DomainPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.userLoginMustBeDomain === true) {
      writer.uint32(16).bool(message.userLoginMustBeDomain);
    }
    if (message.isDefault === true) {
      writer.uint32(24).bool(message.isDefault);
    }
    if (message.validateOrgDomains === true) {
      writer.uint32(32).bool(message.validateOrgDomains);
    }
    if (message.smtpSenderAddressMatchesInstanceDomain === true) {
      writer.uint32(40).bool(message.smtpSenderAddressMatchesInstanceDomain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DomainPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDomainPolicy();
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
          if (tag !== 16) {
            break;
          }

          message.userLoginMustBeDomain = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.isDefault = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.validateOrgDomains = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.smtpSenderAddressMatchesInstanceDomain = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DomainPolicy {
    return {
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      userLoginMustBeDomain: isSet(object.userLoginMustBeDomain) ? Boolean(object.userLoginMustBeDomain) : false,
      isDefault: isSet(object.isDefault) ? Boolean(object.isDefault) : false,
      validateOrgDomains: isSet(object.validateOrgDomains) ? Boolean(object.validateOrgDomains) : false,
      smtpSenderAddressMatchesInstanceDomain: isSet(object.smtpSenderAddressMatchesInstanceDomain)
        ? Boolean(object.smtpSenderAddressMatchesInstanceDomain)
        : false,
    };
  },

  toJSON(message: DomainPolicy): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.userLoginMustBeDomain === true) {
      obj.userLoginMustBeDomain = message.userLoginMustBeDomain;
    }
    if (message.isDefault === true) {
      obj.isDefault = message.isDefault;
    }
    if (message.validateOrgDomains === true) {
      obj.validateOrgDomains = message.validateOrgDomains;
    }
    if (message.smtpSenderAddressMatchesInstanceDomain === true) {
      obj.smtpSenderAddressMatchesInstanceDomain = message.smtpSenderAddressMatchesInstanceDomain;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DomainPolicy>, I>>(base?: I): DomainPolicy {
    return DomainPolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DomainPolicy>, I>>(object: I): DomainPolicy {
    const message = createBaseDomainPolicy();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.userLoginMustBeDomain = object.userLoginMustBeDomain ?? false;
    message.isDefault = object.isDefault ?? false;
    message.validateOrgDomains = object.validateOrgDomains ?? false;
    message.smtpSenderAddressMatchesInstanceDomain = object.smtpSenderAddressMatchesInstanceDomain ?? false;
    return message;
  },
};

function createBaseLabelPolicy(): LabelPolicy {
  return {
    details: undefined,
    primaryColor: "",
    isDefault: false,
    hideLoginNameSuffix: false,
    warnColor: "",
    backgroundColor: "",
    fontColor: "",
    primaryColorDark: "",
    backgroundColorDark: "",
    warnColorDark: "",
    fontColorDark: "",
    disableWatermark: false,
    logoUrl: "",
    iconUrl: "",
    logoUrlDark: "",
    iconUrlDark: "",
    fontUrl: "",
  };
}

export const LabelPolicy = {
  encode(message: LabelPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.primaryColor !== "") {
      writer.uint32(18).string(message.primaryColor);
    }
    if (message.isDefault === true) {
      writer.uint32(32).bool(message.isDefault);
    }
    if (message.hideLoginNameSuffix === true) {
      writer.uint32(40).bool(message.hideLoginNameSuffix);
    }
    if (message.warnColor !== "") {
      writer.uint32(50).string(message.warnColor);
    }
    if (message.backgroundColor !== "") {
      writer.uint32(58).string(message.backgroundColor);
    }
    if (message.fontColor !== "") {
      writer.uint32(66).string(message.fontColor);
    }
    if (message.primaryColorDark !== "") {
      writer.uint32(74).string(message.primaryColorDark);
    }
    if (message.backgroundColorDark !== "") {
      writer.uint32(82).string(message.backgroundColorDark);
    }
    if (message.warnColorDark !== "") {
      writer.uint32(90).string(message.warnColorDark);
    }
    if (message.fontColorDark !== "") {
      writer.uint32(98).string(message.fontColorDark);
    }
    if (message.disableWatermark === true) {
      writer.uint32(104).bool(message.disableWatermark);
    }
    if (message.logoUrl !== "") {
      writer.uint32(114).string(message.logoUrl);
    }
    if (message.iconUrl !== "") {
      writer.uint32(122).string(message.iconUrl);
    }
    if (message.logoUrlDark !== "") {
      writer.uint32(130).string(message.logoUrlDark);
    }
    if (message.iconUrlDark !== "") {
      writer.uint32(138).string(message.iconUrlDark);
    }
    if (message.fontUrl !== "") {
      writer.uint32(146).string(message.fontUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LabelPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLabelPolicy();
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

          message.primaryColor = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.isDefault = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.hideLoginNameSuffix = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.warnColor = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.backgroundColor = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.fontColor = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.primaryColorDark = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.backgroundColorDark = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.warnColorDark = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.fontColorDark = reader.string();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.disableWatermark = reader.bool();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.logoUrl = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.iconUrl = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.logoUrlDark = reader.string();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.iconUrlDark = reader.string();
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.fontUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LabelPolicy {
    return {
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      primaryColor: isSet(object.primaryColor) ? String(object.primaryColor) : "",
      isDefault: isSet(object.isDefault) ? Boolean(object.isDefault) : false,
      hideLoginNameSuffix: isSet(object.hideLoginNameSuffix) ? Boolean(object.hideLoginNameSuffix) : false,
      warnColor: isSet(object.warnColor) ? String(object.warnColor) : "",
      backgroundColor: isSet(object.backgroundColor) ? String(object.backgroundColor) : "",
      fontColor: isSet(object.fontColor) ? String(object.fontColor) : "",
      primaryColorDark: isSet(object.primaryColorDark) ? String(object.primaryColorDark) : "",
      backgroundColorDark: isSet(object.backgroundColorDark) ? String(object.backgroundColorDark) : "",
      warnColorDark: isSet(object.warnColorDark) ? String(object.warnColorDark) : "",
      fontColorDark: isSet(object.fontColorDark) ? String(object.fontColorDark) : "",
      disableWatermark: isSet(object.disableWatermark) ? Boolean(object.disableWatermark) : false,
      logoUrl: isSet(object.logoUrl) ? String(object.logoUrl) : "",
      iconUrl: isSet(object.iconUrl) ? String(object.iconUrl) : "",
      logoUrlDark: isSet(object.logoUrlDark) ? String(object.logoUrlDark) : "",
      iconUrlDark: isSet(object.iconUrlDark) ? String(object.iconUrlDark) : "",
      fontUrl: isSet(object.fontUrl) ? String(object.fontUrl) : "",
    };
  },

  toJSON(message: LabelPolicy): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.primaryColor !== "") {
      obj.primaryColor = message.primaryColor;
    }
    if (message.isDefault === true) {
      obj.isDefault = message.isDefault;
    }
    if (message.hideLoginNameSuffix === true) {
      obj.hideLoginNameSuffix = message.hideLoginNameSuffix;
    }
    if (message.warnColor !== "") {
      obj.warnColor = message.warnColor;
    }
    if (message.backgroundColor !== "") {
      obj.backgroundColor = message.backgroundColor;
    }
    if (message.fontColor !== "") {
      obj.fontColor = message.fontColor;
    }
    if (message.primaryColorDark !== "") {
      obj.primaryColorDark = message.primaryColorDark;
    }
    if (message.backgroundColorDark !== "") {
      obj.backgroundColorDark = message.backgroundColorDark;
    }
    if (message.warnColorDark !== "") {
      obj.warnColorDark = message.warnColorDark;
    }
    if (message.fontColorDark !== "") {
      obj.fontColorDark = message.fontColorDark;
    }
    if (message.disableWatermark === true) {
      obj.disableWatermark = message.disableWatermark;
    }
    if (message.logoUrl !== "") {
      obj.logoUrl = message.logoUrl;
    }
    if (message.iconUrl !== "") {
      obj.iconUrl = message.iconUrl;
    }
    if (message.logoUrlDark !== "") {
      obj.logoUrlDark = message.logoUrlDark;
    }
    if (message.iconUrlDark !== "") {
      obj.iconUrlDark = message.iconUrlDark;
    }
    if (message.fontUrl !== "") {
      obj.fontUrl = message.fontUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LabelPolicy>, I>>(base?: I): LabelPolicy {
    return LabelPolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LabelPolicy>, I>>(object: I): LabelPolicy {
    const message = createBaseLabelPolicy();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.primaryColor = object.primaryColor ?? "";
    message.isDefault = object.isDefault ?? false;
    message.hideLoginNameSuffix = object.hideLoginNameSuffix ?? false;
    message.warnColor = object.warnColor ?? "";
    message.backgroundColor = object.backgroundColor ?? "";
    message.fontColor = object.fontColor ?? "";
    message.primaryColorDark = object.primaryColorDark ?? "";
    message.backgroundColorDark = object.backgroundColorDark ?? "";
    message.warnColorDark = object.warnColorDark ?? "";
    message.fontColorDark = object.fontColorDark ?? "";
    message.disableWatermark = object.disableWatermark ?? false;
    message.logoUrl = object.logoUrl ?? "";
    message.iconUrl = object.iconUrl ?? "";
    message.logoUrlDark = object.logoUrlDark ?? "";
    message.iconUrlDark = object.iconUrlDark ?? "";
    message.fontUrl = object.fontUrl ?? "";
    return message;
  },
};

function createBaseLoginPolicy(): LoginPolicy {
  return {
    details: undefined,
    allowUsernamePassword: false,
    allowRegister: false,
    allowExternalIdp: false,
    forceMfa: false,
    passwordlessType: 0,
    isDefault: false,
    hidePasswordReset: false,
    ignoreUnknownUsernames: false,
    defaultRedirectUri: "",
    passwordCheckLifetime: undefined,
    externalLoginCheckLifetime: undefined,
    mfaInitSkipLifetime: undefined,
    secondFactorCheckLifetime: undefined,
    multiFactorCheckLifetime: undefined,
    secondFactors: [],
    multiFactors: [],
    idps: [],
    allowDomainDiscovery: false,
    disableLoginWithEmail: false,
    disableLoginWithPhone: false,
    forceMfaLocalOnly: false,
  };
}

export const LoginPolicy = {
  encode(message: LoginPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.allowUsernamePassword === true) {
      writer.uint32(16).bool(message.allowUsernamePassword);
    }
    if (message.allowRegister === true) {
      writer.uint32(24).bool(message.allowRegister);
    }
    if (message.allowExternalIdp === true) {
      writer.uint32(32).bool(message.allowExternalIdp);
    }
    if (message.forceMfa === true) {
      writer.uint32(40).bool(message.forceMfa);
    }
    if (message.passwordlessType !== 0) {
      writer.uint32(48).int32(message.passwordlessType);
    }
    if (message.isDefault === true) {
      writer.uint32(56).bool(message.isDefault);
    }
    if (message.hidePasswordReset === true) {
      writer.uint32(64).bool(message.hidePasswordReset);
    }
    if (message.ignoreUnknownUsernames === true) {
      writer.uint32(72).bool(message.ignoreUnknownUsernames);
    }
    if (message.defaultRedirectUri !== "") {
      writer.uint32(82).string(message.defaultRedirectUri);
    }
    if (message.passwordCheckLifetime !== undefined) {
      Duration.encode(message.passwordCheckLifetime, writer.uint32(90).fork()).ldelim();
    }
    if (message.externalLoginCheckLifetime !== undefined) {
      Duration.encode(message.externalLoginCheckLifetime, writer.uint32(98).fork()).ldelim();
    }
    if (message.mfaInitSkipLifetime !== undefined) {
      Duration.encode(message.mfaInitSkipLifetime, writer.uint32(106).fork()).ldelim();
    }
    if (message.secondFactorCheckLifetime !== undefined) {
      Duration.encode(message.secondFactorCheckLifetime, writer.uint32(114).fork()).ldelim();
    }
    if (message.multiFactorCheckLifetime !== undefined) {
      Duration.encode(message.multiFactorCheckLifetime, writer.uint32(122).fork()).ldelim();
    }
    writer.uint32(130).fork();
    for (const v of message.secondFactors) {
      writer.int32(v);
    }
    writer.ldelim();
    writer.uint32(138).fork();
    for (const v of message.multiFactors) {
      writer.int32(v);
    }
    writer.ldelim();
    for (const v of message.idps) {
      IDPLoginPolicyLink.encode(v!, writer.uint32(146).fork()).ldelim();
    }
    if (message.allowDomainDiscovery === true) {
      writer.uint32(152).bool(message.allowDomainDiscovery);
    }
    if (message.disableLoginWithEmail === true) {
      writer.uint32(160).bool(message.disableLoginWithEmail);
    }
    if (message.disableLoginWithPhone === true) {
      writer.uint32(168).bool(message.disableLoginWithPhone);
    }
    if (message.forceMfaLocalOnly === true) {
      writer.uint32(176).bool(message.forceMfaLocalOnly);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginPolicy();
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
          if (tag !== 16) {
            break;
          }

          message.allowUsernamePassword = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.allowRegister = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.allowExternalIdp = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.forceMfa = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.passwordlessType = reader.int32() as any;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.isDefault = reader.bool();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.hidePasswordReset = reader.bool();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.ignoreUnknownUsernames = reader.bool();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.defaultRedirectUri = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.passwordCheckLifetime = Duration.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.externalLoginCheckLifetime = Duration.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.mfaInitSkipLifetime = Duration.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.secondFactorCheckLifetime = Duration.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.multiFactorCheckLifetime = Duration.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag === 128) {
            message.secondFactors.push(reader.int32() as any);

            continue;
          }

          if (tag === 130) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.secondFactors.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 17:
          if (tag === 136) {
            message.multiFactors.push(reader.int32() as any);

            continue;
          }

          if (tag === 138) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.multiFactors.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.idps.push(IDPLoginPolicyLink.decode(reader, reader.uint32()));
          continue;
        case 19:
          if (tag !== 152) {
            break;
          }

          message.allowDomainDiscovery = reader.bool();
          continue;
        case 20:
          if (tag !== 160) {
            break;
          }

          message.disableLoginWithEmail = reader.bool();
          continue;
        case 21:
          if (tag !== 168) {
            break;
          }

          message.disableLoginWithPhone = reader.bool();
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.forceMfaLocalOnly = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LoginPolicy {
    return {
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      allowUsernamePassword: isSet(object.allowUsernamePassword) ? Boolean(object.allowUsernamePassword) : false,
      allowRegister: isSet(object.allowRegister) ? Boolean(object.allowRegister) : false,
      allowExternalIdp: isSet(object.allowExternalIdp) ? Boolean(object.allowExternalIdp) : false,
      forceMfa: isSet(object.forceMfa) ? Boolean(object.forceMfa) : false,
      passwordlessType: isSet(object.passwordlessType) ? passwordlessTypeFromJSON(object.passwordlessType) : 0,
      isDefault: isSet(object.isDefault) ? Boolean(object.isDefault) : false,
      hidePasswordReset: isSet(object.hidePasswordReset) ? Boolean(object.hidePasswordReset) : false,
      ignoreUnknownUsernames: isSet(object.ignoreUnknownUsernames) ? Boolean(object.ignoreUnknownUsernames) : false,
      defaultRedirectUri: isSet(object.defaultRedirectUri) ? String(object.defaultRedirectUri) : "",
      passwordCheckLifetime: isSet(object.passwordCheckLifetime)
        ? Duration.fromJSON(object.passwordCheckLifetime)
        : undefined,
      externalLoginCheckLifetime: isSet(object.externalLoginCheckLifetime)
        ? Duration.fromJSON(object.externalLoginCheckLifetime)
        : undefined,
      mfaInitSkipLifetime: isSet(object.mfaInitSkipLifetime)
        ? Duration.fromJSON(object.mfaInitSkipLifetime)
        : undefined,
      secondFactorCheckLifetime: isSet(object.secondFactorCheckLifetime)
        ? Duration.fromJSON(object.secondFactorCheckLifetime)
        : undefined,
      multiFactorCheckLifetime: isSet(object.multiFactorCheckLifetime)
        ? Duration.fromJSON(object.multiFactorCheckLifetime)
        : undefined,
      secondFactors: Array.isArray(object?.secondFactors)
        ? object.secondFactors.map((e: any) => secondFactorTypeFromJSON(e))
        : [],
      multiFactors: Array.isArray(object?.multiFactors)
        ? object.multiFactors.map((e: any) => multiFactorTypeFromJSON(e))
        : [],
      idps: Array.isArray(object?.idps) ? object.idps.map((e: any) => IDPLoginPolicyLink.fromJSON(e)) : [],
      allowDomainDiscovery: isSet(object.allowDomainDiscovery) ? Boolean(object.allowDomainDiscovery) : false,
      disableLoginWithEmail: isSet(object.disableLoginWithEmail) ? Boolean(object.disableLoginWithEmail) : false,
      disableLoginWithPhone: isSet(object.disableLoginWithPhone) ? Boolean(object.disableLoginWithPhone) : false,
      forceMfaLocalOnly: isSet(object.forceMfaLocalOnly) ? Boolean(object.forceMfaLocalOnly) : false,
    };
  },

  toJSON(message: LoginPolicy): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.allowUsernamePassword === true) {
      obj.allowUsernamePassword = message.allowUsernamePassword;
    }
    if (message.allowRegister === true) {
      obj.allowRegister = message.allowRegister;
    }
    if (message.allowExternalIdp === true) {
      obj.allowExternalIdp = message.allowExternalIdp;
    }
    if (message.forceMfa === true) {
      obj.forceMfa = message.forceMfa;
    }
    if (message.passwordlessType !== 0) {
      obj.passwordlessType = passwordlessTypeToJSON(message.passwordlessType);
    }
    if (message.isDefault === true) {
      obj.isDefault = message.isDefault;
    }
    if (message.hidePasswordReset === true) {
      obj.hidePasswordReset = message.hidePasswordReset;
    }
    if (message.ignoreUnknownUsernames === true) {
      obj.ignoreUnknownUsernames = message.ignoreUnknownUsernames;
    }
    if (message.defaultRedirectUri !== "") {
      obj.defaultRedirectUri = message.defaultRedirectUri;
    }
    if (message.passwordCheckLifetime !== undefined) {
      obj.passwordCheckLifetime = Duration.toJSON(message.passwordCheckLifetime);
    }
    if (message.externalLoginCheckLifetime !== undefined) {
      obj.externalLoginCheckLifetime = Duration.toJSON(message.externalLoginCheckLifetime);
    }
    if (message.mfaInitSkipLifetime !== undefined) {
      obj.mfaInitSkipLifetime = Duration.toJSON(message.mfaInitSkipLifetime);
    }
    if (message.secondFactorCheckLifetime !== undefined) {
      obj.secondFactorCheckLifetime = Duration.toJSON(message.secondFactorCheckLifetime);
    }
    if (message.multiFactorCheckLifetime !== undefined) {
      obj.multiFactorCheckLifetime = Duration.toJSON(message.multiFactorCheckLifetime);
    }
    if (message.secondFactors?.length) {
      obj.secondFactors = message.secondFactors.map((e) => secondFactorTypeToJSON(e));
    }
    if (message.multiFactors?.length) {
      obj.multiFactors = message.multiFactors.map((e) => multiFactorTypeToJSON(e));
    }
    if (message.idps?.length) {
      obj.idps = message.idps.map((e) => IDPLoginPolicyLink.toJSON(e));
    }
    if (message.allowDomainDiscovery === true) {
      obj.allowDomainDiscovery = message.allowDomainDiscovery;
    }
    if (message.disableLoginWithEmail === true) {
      obj.disableLoginWithEmail = message.disableLoginWithEmail;
    }
    if (message.disableLoginWithPhone === true) {
      obj.disableLoginWithPhone = message.disableLoginWithPhone;
    }
    if (message.forceMfaLocalOnly === true) {
      obj.forceMfaLocalOnly = message.forceMfaLocalOnly;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LoginPolicy>, I>>(base?: I): LoginPolicy {
    return LoginPolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LoginPolicy>, I>>(object: I): LoginPolicy {
    const message = createBaseLoginPolicy();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.allowUsernamePassword = object.allowUsernamePassword ?? false;
    message.allowRegister = object.allowRegister ?? false;
    message.allowExternalIdp = object.allowExternalIdp ?? false;
    message.forceMfa = object.forceMfa ?? false;
    message.passwordlessType = object.passwordlessType ?? 0;
    message.isDefault = object.isDefault ?? false;
    message.hidePasswordReset = object.hidePasswordReset ?? false;
    message.ignoreUnknownUsernames = object.ignoreUnknownUsernames ?? false;
    message.defaultRedirectUri = object.defaultRedirectUri ?? "";
    message.passwordCheckLifetime =
      (object.passwordCheckLifetime !== undefined && object.passwordCheckLifetime !== null)
        ? Duration.fromPartial(object.passwordCheckLifetime)
        : undefined;
    message.externalLoginCheckLifetime =
      (object.externalLoginCheckLifetime !== undefined && object.externalLoginCheckLifetime !== null)
        ? Duration.fromPartial(object.externalLoginCheckLifetime)
        : undefined;
    message.mfaInitSkipLifetime = (object.mfaInitSkipLifetime !== undefined && object.mfaInitSkipLifetime !== null)
      ? Duration.fromPartial(object.mfaInitSkipLifetime)
      : undefined;
    message.secondFactorCheckLifetime =
      (object.secondFactorCheckLifetime !== undefined && object.secondFactorCheckLifetime !== null)
        ? Duration.fromPartial(object.secondFactorCheckLifetime)
        : undefined;
    message.multiFactorCheckLifetime =
      (object.multiFactorCheckLifetime !== undefined && object.multiFactorCheckLifetime !== null)
        ? Duration.fromPartial(object.multiFactorCheckLifetime)
        : undefined;
    message.secondFactors = object.secondFactors?.map((e) => e) || [];
    message.multiFactors = object.multiFactors?.map((e) => e) || [];
    message.idps = object.idps?.map((e) => IDPLoginPolicyLink.fromPartial(e)) || [];
    message.allowDomainDiscovery = object.allowDomainDiscovery ?? false;
    message.disableLoginWithEmail = object.disableLoginWithEmail ?? false;
    message.disableLoginWithPhone = object.disableLoginWithPhone ?? false;
    message.forceMfaLocalOnly = object.forceMfaLocalOnly ?? false;
    return message;
  },
};

function createBasePasswordComplexityPolicy(): PasswordComplexityPolicy {
  return {
    details: undefined,
    minLength: 0,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSymbol: false,
    isDefault: false,
  };
}

export const PasswordComplexityPolicy = {
  encode(message: PasswordComplexityPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.minLength !== 0) {
      writer.uint32(16).uint64(message.minLength);
    }
    if (message.hasUppercase === true) {
      writer.uint32(24).bool(message.hasUppercase);
    }
    if (message.hasLowercase === true) {
      writer.uint32(32).bool(message.hasLowercase);
    }
    if (message.hasNumber === true) {
      writer.uint32(40).bool(message.hasNumber);
    }
    if (message.hasSymbol === true) {
      writer.uint32(48).bool(message.hasSymbol);
    }
    if (message.isDefault === true) {
      writer.uint32(56).bool(message.isDefault);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PasswordComplexityPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePasswordComplexityPolicy();
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
          if (tag !== 16) {
            break;
          }

          message.minLength = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.hasUppercase = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.hasLowercase = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.hasNumber = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.hasSymbol = reader.bool();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.isDefault = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PasswordComplexityPolicy {
    return {
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      minLength: isSet(object.minLength) ? Number(object.minLength) : 0,
      hasUppercase: isSet(object.hasUppercase) ? Boolean(object.hasUppercase) : false,
      hasLowercase: isSet(object.hasLowercase) ? Boolean(object.hasLowercase) : false,
      hasNumber: isSet(object.hasNumber) ? Boolean(object.hasNumber) : false,
      hasSymbol: isSet(object.hasSymbol) ? Boolean(object.hasSymbol) : false,
      isDefault: isSet(object.isDefault) ? Boolean(object.isDefault) : false,
    };
  },

  toJSON(message: PasswordComplexityPolicy): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.minLength !== 0) {
      obj.minLength = Math.round(message.minLength);
    }
    if (message.hasUppercase === true) {
      obj.hasUppercase = message.hasUppercase;
    }
    if (message.hasLowercase === true) {
      obj.hasLowercase = message.hasLowercase;
    }
    if (message.hasNumber === true) {
      obj.hasNumber = message.hasNumber;
    }
    if (message.hasSymbol === true) {
      obj.hasSymbol = message.hasSymbol;
    }
    if (message.isDefault === true) {
      obj.isDefault = message.isDefault;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PasswordComplexityPolicy>, I>>(base?: I): PasswordComplexityPolicy {
    return PasswordComplexityPolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PasswordComplexityPolicy>, I>>(object: I): PasswordComplexityPolicy {
    const message = createBasePasswordComplexityPolicy();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.minLength = object.minLength ?? 0;
    message.hasUppercase = object.hasUppercase ?? false;
    message.hasLowercase = object.hasLowercase ?? false;
    message.hasNumber = object.hasNumber ?? false;
    message.hasSymbol = object.hasSymbol ?? false;
    message.isDefault = object.isDefault ?? false;
    return message;
  },
};

function createBasePasswordAgePolicy(): PasswordAgePolicy {
  return { details: undefined, maxAgeDays: 0, expireWarnDays: 0, isDefault: false };
}

export const PasswordAgePolicy = {
  encode(message: PasswordAgePolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.maxAgeDays !== 0) {
      writer.uint32(16).uint64(message.maxAgeDays);
    }
    if (message.expireWarnDays !== 0) {
      writer.uint32(24).uint64(message.expireWarnDays);
    }
    if (message.isDefault === true) {
      writer.uint32(32).bool(message.isDefault);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PasswordAgePolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePasswordAgePolicy();
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
          if (tag !== 16) {
            break;
          }

          message.maxAgeDays = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.expireWarnDays = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.isDefault = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PasswordAgePolicy {
    return {
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      maxAgeDays: isSet(object.maxAgeDays) ? Number(object.maxAgeDays) : 0,
      expireWarnDays: isSet(object.expireWarnDays) ? Number(object.expireWarnDays) : 0,
      isDefault: isSet(object.isDefault) ? Boolean(object.isDefault) : false,
    };
  },

  toJSON(message: PasswordAgePolicy): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.maxAgeDays !== 0) {
      obj.maxAgeDays = Math.round(message.maxAgeDays);
    }
    if (message.expireWarnDays !== 0) {
      obj.expireWarnDays = Math.round(message.expireWarnDays);
    }
    if (message.isDefault === true) {
      obj.isDefault = message.isDefault;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PasswordAgePolicy>, I>>(base?: I): PasswordAgePolicy {
    return PasswordAgePolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PasswordAgePolicy>, I>>(object: I): PasswordAgePolicy {
    const message = createBasePasswordAgePolicy();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.maxAgeDays = object.maxAgeDays ?? 0;
    message.expireWarnDays = object.expireWarnDays ?? 0;
    message.isDefault = object.isDefault ?? false;
    return message;
  },
};

function createBaseLockoutPolicy(): LockoutPolicy {
  return { details: undefined, maxPasswordAttempts: 0, isDefault: false };
}

export const LockoutPolicy = {
  encode(message: LockoutPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.maxPasswordAttempts !== 0) {
      writer.uint32(16).uint64(message.maxPasswordAttempts);
    }
    if (message.isDefault === true) {
      writer.uint32(32).bool(message.isDefault);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LockoutPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLockoutPolicy();
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
          if (tag !== 16) {
            break;
          }

          message.maxPasswordAttempts = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.isDefault = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LockoutPolicy {
    return {
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      maxPasswordAttempts: isSet(object.maxPasswordAttempts) ? Number(object.maxPasswordAttempts) : 0,
      isDefault: isSet(object.isDefault) ? Boolean(object.isDefault) : false,
    };
  },

  toJSON(message: LockoutPolicy): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.maxPasswordAttempts !== 0) {
      obj.maxPasswordAttempts = Math.round(message.maxPasswordAttempts);
    }
    if (message.isDefault === true) {
      obj.isDefault = message.isDefault;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LockoutPolicy>, I>>(base?: I): LockoutPolicy {
    return LockoutPolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LockoutPolicy>, I>>(object: I): LockoutPolicy {
    const message = createBaseLockoutPolicy();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.maxPasswordAttempts = object.maxPasswordAttempts ?? 0;
    message.isDefault = object.isDefault ?? false;
    return message;
  },
};

function createBasePrivacyPolicy(): PrivacyPolicy {
  return { details: undefined, tosLink: "", privacyLink: "", isDefault: false, helpLink: "", supportEmail: "" };
}

export const PrivacyPolicy = {
  encode(message: PrivacyPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.tosLink !== "") {
      writer.uint32(18).string(message.tosLink);
    }
    if (message.privacyLink !== "") {
      writer.uint32(26).string(message.privacyLink);
    }
    if (message.isDefault === true) {
      writer.uint32(32).bool(message.isDefault);
    }
    if (message.helpLink !== "") {
      writer.uint32(42).string(message.helpLink);
    }
    if (message.supportEmail !== "") {
      writer.uint32(50).string(message.supportEmail);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PrivacyPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrivacyPolicy();
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

          message.tosLink = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.privacyLink = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.isDefault = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.helpLink = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.supportEmail = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PrivacyPolicy {
    return {
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      tosLink: isSet(object.tosLink) ? String(object.tosLink) : "",
      privacyLink: isSet(object.privacyLink) ? String(object.privacyLink) : "",
      isDefault: isSet(object.isDefault) ? Boolean(object.isDefault) : false,
      helpLink: isSet(object.helpLink) ? String(object.helpLink) : "",
      supportEmail: isSet(object.supportEmail) ? String(object.supportEmail) : "",
    };
  },

  toJSON(message: PrivacyPolicy): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.tosLink !== "") {
      obj.tosLink = message.tosLink;
    }
    if (message.privacyLink !== "") {
      obj.privacyLink = message.privacyLink;
    }
    if (message.isDefault === true) {
      obj.isDefault = message.isDefault;
    }
    if (message.helpLink !== "") {
      obj.helpLink = message.helpLink;
    }
    if (message.supportEmail !== "") {
      obj.supportEmail = message.supportEmail;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PrivacyPolicy>, I>>(base?: I): PrivacyPolicy {
    return PrivacyPolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PrivacyPolicy>, I>>(object: I): PrivacyPolicy {
    const message = createBasePrivacyPolicy();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.tosLink = object.tosLink ?? "";
    message.privacyLink = object.privacyLink ?? "";
    message.isDefault = object.isDefault ?? false;
    message.helpLink = object.helpLink ?? "";
    message.supportEmail = object.supportEmail ?? "";
    return message;
  },
};

function createBaseNotificationPolicy(): NotificationPolicy {
  return { details: undefined, isDefault: false, passwordChange: false };
}

export const NotificationPolicy = {
  encode(message: NotificationPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.isDefault === true) {
      writer.uint32(16).bool(message.isDefault);
    }
    if (message.passwordChange === true) {
      writer.uint32(24).bool(message.passwordChange);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NotificationPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNotificationPolicy();
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
          if (tag !== 16) {
            break;
          }

          message.isDefault = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.passwordChange = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NotificationPolicy {
    return {
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      isDefault: isSet(object.isDefault) ? Boolean(object.isDefault) : false,
      passwordChange: isSet(object.passwordChange) ? Boolean(object.passwordChange) : false,
    };
  },

  toJSON(message: NotificationPolicy): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.isDefault === true) {
      obj.isDefault = message.isDefault;
    }
    if (message.passwordChange === true) {
      obj.passwordChange = message.passwordChange;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NotificationPolicy>, I>>(base?: I): NotificationPolicy {
    return NotificationPolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NotificationPolicy>, I>>(object: I): NotificationPolicy {
    const message = createBaseNotificationPolicy();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.isDefault = object.isDefault ?? false;
    message.passwordChange = object.passwordChange ?? false;
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

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
