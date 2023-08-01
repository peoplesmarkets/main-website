/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ResourceOwnerType, resourceOwnerTypeFromJSON, resourceOwnerTypeToJSON } from "./settings";

export const protobufPackage = "zitadel.settings.v2alpha";

export interface PasswordComplexitySettings {
  minLength: number;
  requiresUppercase: boolean;
  requiresLowercase: boolean;
  requiresNumber: boolean;
  requiresSymbol: boolean;
  /** resource_owner_type returns if the settings is managed on the organization or on the instance */
  resourceOwnerType: ResourceOwnerType;
}

function createBasePasswordComplexitySettings(): PasswordComplexitySettings {
  return {
    minLength: 0,
    requiresUppercase: false,
    requiresLowercase: false,
    requiresNumber: false,
    requiresSymbol: false,
    resourceOwnerType: 0,
  };
}

export const PasswordComplexitySettings = {
  encode(message: PasswordComplexitySettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.minLength !== 0) {
      writer.uint32(8).uint64(message.minLength);
    }
    if (message.requiresUppercase === true) {
      writer.uint32(16).bool(message.requiresUppercase);
    }
    if (message.requiresLowercase === true) {
      writer.uint32(24).bool(message.requiresLowercase);
    }
    if (message.requiresNumber === true) {
      writer.uint32(32).bool(message.requiresNumber);
    }
    if (message.requiresSymbol === true) {
      writer.uint32(40).bool(message.requiresSymbol);
    }
    if (message.resourceOwnerType !== 0) {
      writer.uint32(48).int32(message.resourceOwnerType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PasswordComplexitySettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePasswordComplexitySettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.minLength = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.requiresUppercase = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.requiresLowercase = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.requiresNumber = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.requiresSymbol = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
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

  fromJSON(object: any): PasswordComplexitySettings {
    return {
      minLength: isSet(object.minLength) ? Number(object.minLength) : 0,
      requiresUppercase: isSet(object.requiresUppercase) ? Boolean(object.requiresUppercase) : false,
      requiresLowercase: isSet(object.requiresLowercase) ? Boolean(object.requiresLowercase) : false,
      requiresNumber: isSet(object.requiresNumber) ? Boolean(object.requiresNumber) : false,
      requiresSymbol: isSet(object.requiresSymbol) ? Boolean(object.requiresSymbol) : false,
      resourceOwnerType: isSet(object.resourceOwnerType) ? resourceOwnerTypeFromJSON(object.resourceOwnerType) : 0,
    };
  },

  toJSON(message: PasswordComplexitySettings): unknown {
    const obj: any = {};
    if (message.minLength !== 0) {
      obj.minLength = Math.round(message.minLength);
    }
    if (message.requiresUppercase === true) {
      obj.requiresUppercase = message.requiresUppercase;
    }
    if (message.requiresLowercase === true) {
      obj.requiresLowercase = message.requiresLowercase;
    }
    if (message.requiresNumber === true) {
      obj.requiresNumber = message.requiresNumber;
    }
    if (message.requiresSymbol === true) {
      obj.requiresSymbol = message.requiresSymbol;
    }
    if (message.resourceOwnerType !== 0) {
      obj.resourceOwnerType = resourceOwnerTypeToJSON(message.resourceOwnerType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PasswordComplexitySettings>, I>>(base?: I): PasswordComplexitySettings {
    return PasswordComplexitySettings.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PasswordComplexitySettings>, I>>(object: I): PasswordComplexitySettings {
    const message = createBasePasswordComplexitySettings();
    message.minLength = object.minLength ?? 0;
    message.requiresUppercase = object.requiresUppercase ?? false;
    message.requiresLowercase = object.requiresLowercase ?? false;
    message.requiresNumber = object.requiresNumber ?? false;
    message.requiresSymbol = object.requiresSymbol ?? false;
    message.resourceOwnerType = object.resourceOwnerType ?? 0;
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
