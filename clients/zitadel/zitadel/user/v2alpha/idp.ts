/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Struct } from "../../../google/protobuf/struct";

export const protobufPackage = "zitadel.user.v2alpha";

export interface IDPInformation {
  oauth?: IDPOAuthAccessInformation | undefined;
  idpId: string;
  userId: string;
  userName: string;
  rawInformation: { [key: string]: any } | undefined;
}

export interface IDPOAuthAccessInformation {
  accessToken: string;
  idToken?: string | undefined;
}

export interface IDPLink {
  idpId: string;
  userId: string;
  userName: string;
}

function createBaseIDPInformation(): IDPInformation {
  return { oauth: undefined, idpId: "", userId: "", userName: "", rawInformation: undefined };
}

export const IDPInformation = {
  encode(message: IDPInformation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oauth !== undefined) {
      IDPOAuthAccessInformation.encode(message.oauth, writer.uint32(10).fork()).ldelim();
    }
    if (message.idpId !== "") {
      writer.uint32(18).string(message.idpId);
    }
    if (message.userId !== "") {
      writer.uint32(26).string(message.userId);
    }
    if (message.userName !== "") {
      writer.uint32(34).string(message.userName);
    }
    if (message.rawInformation !== undefined) {
      Struct.encode(Struct.wrap(message.rawInformation), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IDPInformation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIDPInformation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.oauth = IDPOAuthAccessInformation.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.idpId = reader.string();
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

          message.userName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.rawInformation = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IDPInformation {
    return {
      oauth: isSet(object.oauth) ? IDPOAuthAccessInformation.fromJSON(object.oauth) : undefined,
      idpId: isSet(object.idpId) ? String(object.idpId) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
      userName: isSet(object.userName) ? String(object.userName) : "",
      rawInformation: isObject(object.rawInformation) ? object.rawInformation : undefined,
    };
  },

  toJSON(message: IDPInformation): unknown {
    const obj: any = {};
    if (message.oauth !== undefined) {
      obj.oauth = IDPOAuthAccessInformation.toJSON(message.oauth);
    }
    if (message.idpId !== "") {
      obj.idpId = message.idpId;
    }
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.userName !== "") {
      obj.userName = message.userName;
    }
    if (message.rawInformation !== undefined) {
      obj.rawInformation = message.rawInformation;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IDPInformation>, I>>(base?: I): IDPInformation {
    return IDPInformation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IDPInformation>, I>>(object: I): IDPInformation {
    const message = createBaseIDPInformation();
    message.oauth = (object.oauth !== undefined && object.oauth !== null)
      ? IDPOAuthAccessInformation.fromPartial(object.oauth)
      : undefined;
    message.idpId = object.idpId ?? "";
    message.userId = object.userId ?? "";
    message.userName = object.userName ?? "";
    message.rawInformation = object.rawInformation ?? undefined;
    return message;
  },
};

function createBaseIDPOAuthAccessInformation(): IDPOAuthAccessInformation {
  return { accessToken: "", idToken: undefined };
}

export const IDPOAuthAccessInformation = {
  encode(message: IDPOAuthAccessInformation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.idToken !== undefined) {
      writer.uint32(18).string(message.idToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IDPOAuthAccessInformation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIDPOAuthAccessInformation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.idToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IDPOAuthAccessInformation {
    return {
      accessToken: isSet(object.accessToken) ? String(object.accessToken) : "",
      idToken: isSet(object.idToken) ? String(object.idToken) : undefined,
    };
  },

  toJSON(message: IDPOAuthAccessInformation): unknown {
    const obj: any = {};
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    if (message.idToken !== undefined) {
      obj.idToken = message.idToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IDPOAuthAccessInformation>, I>>(base?: I): IDPOAuthAccessInformation {
    return IDPOAuthAccessInformation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IDPOAuthAccessInformation>, I>>(object: I): IDPOAuthAccessInformation {
    const message = createBaseIDPOAuthAccessInformation();
    message.accessToken = object.accessToken ?? "";
    message.idToken = object.idToken ?? undefined;
    return message;
  },
};

function createBaseIDPLink(): IDPLink {
  return { idpId: "", userId: "", userName: "" };
}

export const IDPLink = {
  encode(message: IDPLink, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.idpId !== "") {
      writer.uint32(10).string(message.idpId);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.userName !== "") {
      writer.uint32(26).string(message.userName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IDPLink {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIDPLink();
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

          message.userId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): IDPLink {
    return {
      idpId: isSet(object.idpId) ? String(object.idpId) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
      userName: isSet(object.userName) ? String(object.userName) : "",
    };
  },

  toJSON(message: IDPLink): unknown {
    const obj: any = {};
    if (message.idpId !== "") {
      obj.idpId = message.idpId;
    }
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.userName !== "") {
      obj.userName = message.userName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IDPLink>, I>>(base?: I): IDPLink {
    return IDPLink.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IDPLink>, I>>(object: I): IDPLink {
    const message = createBaseIDPLink();
    message.idpId = object.idpId ?? "";
    message.userId = object.userId ?? "";
    message.userName = object.userName ?? "";
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
