/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "zitadel.v1";

export interface ErrorDetail {
  id: string;
  message: string;
}

export interface LocalizedMessage {
  key: string;
  localizedMessage: string;
}

function createBaseErrorDetail(): ErrorDetail {
  return { id: "", message: "" };
}

export const ErrorDetail = {
  encode(message: ErrorDetail, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ErrorDetail {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseErrorDetail();
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

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ErrorDetail {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: ErrorDetail): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ErrorDetail>, I>>(base?: I): ErrorDetail {
    return ErrorDetail.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ErrorDetail>, I>>(object: I): ErrorDetail {
    const message = createBaseErrorDetail();
    message.id = object.id ?? "";
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseLocalizedMessage(): LocalizedMessage {
  return { key: "", localizedMessage: "" };
}

export const LocalizedMessage = {
  encode(message: LocalizedMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.localizedMessage !== "") {
      writer.uint32(18).string(message.localizedMessage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocalizedMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocalizedMessage();
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

          message.localizedMessage = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LocalizedMessage {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      localizedMessage: isSet(object.localizedMessage) ? String(object.localizedMessage) : "",
    };
  },

  toJSON(message: LocalizedMessage): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.localizedMessage !== "") {
      obj.localizedMessage = message.localizedMessage;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LocalizedMessage>, I>>(base?: I): LocalizedMessage {
    return LocalizedMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LocalizedMessage>, I>>(object: I): LocalizedMessage {
    const message = createBaseLocalizedMessage();
    message.key = object.key ?? "";
    message.localizedMessage = object.localizedMessage ?? "";
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
