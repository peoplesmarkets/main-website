/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ResourceOwnerType, resourceOwnerTypeFromJSON, resourceOwnerTypeToJSON } from "./settings";

export const protobufPackage = "zitadel.settings.v2alpha";

export interface LegalAndSupportSettings {
  tosLink: string;
  privacyPolicyLink: string;
  helpLink: string;
  supportEmail: string;
  /** resource_owner_type returns if the setting is managed on the organization or on the instance */
  resourceOwnerType: ResourceOwnerType;
}

function createBaseLegalAndSupportSettings(): LegalAndSupportSettings {
  return { tosLink: "", privacyPolicyLink: "", helpLink: "", supportEmail: "", resourceOwnerType: 0 };
}

export const LegalAndSupportSettings = {
  encode(message: LegalAndSupportSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tosLink !== "") {
      writer.uint32(10).string(message.tosLink);
    }
    if (message.privacyPolicyLink !== "") {
      writer.uint32(18).string(message.privacyPolicyLink);
    }
    if (message.helpLink !== "") {
      writer.uint32(26).string(message.helpLink);
    }
    if (message.supportEmail !== "") {
      writer.uint32(34).string(message.supportEmail);
    }
    if (message.resourceOwnerType !== 0) {
      writer.uint32(40).int32(message.resourceOwnerType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegalAndSupportSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegalAndSupportSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tosLink = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.privacyPolicyLink = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.helpLink = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.supportEmail = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.resourceOwnerType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LegalAndSupportSettings {
    return {
      tosLink: isSet(object.tosLink) ? String(object.tosLink) : "",
      privacyPolicyLink: isSet(object.privacyPolicyLink) ? String(object.privacyPolicyLink) : "",
      helpLink: isSet(object.helpLink) ? String(object.helpLink) : "",
      supportEmail: isSet(object.supportEmail) ? String(object.supportEmail) : "",
      resourceOwnerType: isSet(object.resourceOwnerType) ? resourceOwnerTypeFromJSON(object.resourceOwnerType) : 0,
    };
  },

  toJSON(message: LegalAndSupportSettings): unknown {
    const obj: any = {};
    if (message.tosLink !== "") {
      obj.tosLink = message.tosLink;
    }
    if (message.privacyPolicyLink !== "") {
      obj.privacyPolicyLink = message.privacyPolicyLink;
    }
    if (message.helpLink !== "") {
      obj.helpLink = message.helpLink;
    }
    if (message.supportEmail !== "") {
      obj.supportEmail = message.supportEmail;
    }
    if (message.resourceOwnerType !== 0) {
      obj.resourceOwnerType = resourceOwnerTypeToJSON(message.resourceOwnerType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LegalAndSupportSettings>, I>>(base?: I): LegalAndSupportSettings {
    return LegalAndSupportSettings.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LegalAndSupportSettings>, I>>(object: I): LegalAndSupportSettings {
    const message = createBaseLegalAndSupportSettings();
    message.tosLink = object.tosLink ?? "";
    message.privacyPolicyLink = object.privacyPolicyLink ?? "";
    message.helpLink = object.helpLink ?? "";
    message.supportEmail = object.supportEmail ?? "";
    message.resourceOwnerType = object.resourceOwnerType ?? 0;
    return message;
  },
};

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
