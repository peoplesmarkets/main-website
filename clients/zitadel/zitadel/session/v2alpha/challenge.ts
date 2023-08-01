/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Struct } from "../../../google/protobuf/struct";

export const protobufPackage = "zitadel.session.v2alpha";

export enum ChallengeKind {
  CHALLENGE_KIND_UNSPECIFIED = 0,
  CHALLENGE_KIND_PASSKEY = 1,
  UNRECOGNIZED = -1,
}

export function challengeKindFromJSON(object: any): ChallengeKind {
  switch (object) {
    case 0:
    case "CHALLENGE_KIND_UNSPECIFIED":
      return ChallengeKind.CHALLENGE_KIND_UNSPECIFIED;
    case 1:
    case "CHALLENGE_KIND_PASSKEY":
      return ChallengeKind.CHALLENGE_KIND_PASSKEY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ChallengeKind.UNRECOGNIZED;
  }
}

export function challengeKindToJSON(object: ChallengeKind): string {
  switch (object) {
    case ChallengeKind.CHALLENGE_KIND_UNSPECIFIED:
      return "CHALLENGE_KIND_UNSPECIFIED";
    case ChallengeKind.CHALLENGE_KIND_PASSKEY:
      return "CHALLENGE_KIND_PASSKEY";
    case ChallengeKind.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Challenges {
  passkey?: Challenges_Passkey | undefined;
}

export interface Challenges_Passkey {
  publicKeyCredentialRequestOptions: { [key: string]: any } | undefined;
}

function createBaseChallenges(): Challenges {
  return { passkey: undefined };
}

export const Challenges = {
  encode(message: Challenges, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.passkey !== undefined) {
      Challenges_Passkey.encode(message.passkey, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Challenges {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChallenges();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.passkey = Challenges_Passkey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Challenges {
    return { passkey: isSet(object.passkey) ? Challenges_Passkey.fromJSON(object.passkey) : undefined };
  },

  toJSON(message: Challenges): unknown {
    const obj: any = {};
    if (message.passkey !== undefined) {
      obj.passkey = Challenges_Passkey.toJSON(message.passkey);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Challenges>, I>>(base?: I): Challenges {
    return Challenges.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Challenges>, I>>(object: I): Challenges {
    const message = createBaseChallenges();
    message.passkey = (object.passkey !== undefined && object.passkey !== null)
      ? Challenges_Passkey.fromPartial(object.passkey)
      : undefined;
    return message;
  },
};

function createBaseChallenges_Passkey(): Challenges_Passkey {
  return { publicKeyCredentialRequestOptions: undefined };
}

export const Challenges_Passkey = {
  encode(message: Challenges_Passkey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.publicKeyCredentialRequestOptions !== undefined) {
      Struct.encode(Struct.wrap(message.publicKeyCredentialRequestOptions), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Challenges_Passkey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChallenges_Passkey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.publicKeyCredentialRequestOptions = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Challenges_Passkey {
    return {
      publicKeyCredentialRequestOptions: isObject(object.publicKeyCredentialRequestOptions)
        ? object.publicKeyCredentialRequestOptions
        : undefined,
    };
  },

  toJSON(message: Challenges_Passkey): unknown {
    const obj: any = {};
    if (message.publicKeyCredentialRequestOptions !== undefined) {
      obj.publicKeyCredentialRequestOptions = message.publicKeyCredentialRequestOptions;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Challenges_Passkey>, I>>(base?: I): Challenges_Passkey {
    return Challenges_Passkey.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Challenges_Passkey>, I>>(object: I): Challenges_Passkey {
    const message = createBaseChallenges_Passkey();
    message.publicKeyCredentialRequestOptions = object.publicKeyCredentialRequestOptions ?? undefined;
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
