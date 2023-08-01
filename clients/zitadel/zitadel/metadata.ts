/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ObjectDetails, TextQueryMethod, textQueryMethodFromJSON, textQueryMethodToJSON } from "./object";

export const protobufPackage = "zitadel.metadata.v1";

export interface Metadata {
  details: ObjectDetails | undefined;
  key: string;
  value: Uint8Array;
}

export interface MetadataQuery {
  keyQuery?: MetadataKeyQuery | undefined;
}

export interface MetadataKeyQuery {
  key: string;
  method: TextQueryMethod;
}

function createBaseMetadata(): Metadata {
  return { details: undefined, key: "", value: new Uint8Array(0) };
}

export const Metadata = {
  encode(message: Metadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(26).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Metadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadata();
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

          message.key = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): Metadata {
    return {
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
    };
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Metadata>, I>>(base?: I): Metadata {
    return Metadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Metadata>, I>>(object: I): Metadata {
    const message = createBaseMetadata();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMetadataQuery(): MetadataQuery {
  return { keyQuery: undefined };
}

export const MetadataQuery = {
  encode(message: MetadataQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.keyQuery !== undefined) {
      MetadataKeyQuery.encode(message.keyQuery, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MetadataQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadataQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.keyQuery = MetadataKeyQuery.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MetadataQuery {
    return { keyQuery: isSet(object.keyQuery) ? MetadataKeyQuery.fromJSON(object.keyQuery) : undefined };
  },

  toJSON(message: MetadataQuery): unknown {
    const obj: any = {};
    if (message.keyQuery !== undefined) {
      obj.keyQuery = MetadataKeyQuery.toJSON(message.keyQuery);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MetadataQuery>, I>>(base?: I): MetadataQuery {
    return MetadataQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MetadataQuery>, I>>(object: I): MetadataQuery {
    const message = createBaseMetadataQuery();
    message.keyQuery = (object.keyQuery !== undefined && object.keyQuery !== null)
      ? MetadataKeyQuery.fromPartial(object.keyQuery)
      : undefined;
    return message;
  },
};

function createBaseMetadataKeyQuery(): MetadataKeyQuery {
  return { key: "", method: 0 };
}

export const MetadataKeyQuery = {
  encode(message: MetadataKeyQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MetadataKeyQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadataKeyQuery();
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

  fromJSON(object: any): MetadataKeyQuery {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: MetadataKeyQuery): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MetadataKeyQuery>, I>>(base?: I): MetadataKeyQuery {
    return MetadataKeyQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MetadataKeyQuery>, I>>(object: I): MetadataKeyQuery {
    const message = createBaseMetadataKeyQuery();
    message.key = object.key ?? "";
    message.method = object.method ?? 0;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
