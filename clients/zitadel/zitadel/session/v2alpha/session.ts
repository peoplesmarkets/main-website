/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "zitadel.session.v2alpha";

export interface Session {
  id: string;
  creationDate: Date | undefined;
  changeDate: Date | undefined;
  sequence: number;
  factors: Factors | undefined;
  metadata: { [key: string]: Uint8Array };
  domain: string;
}

export interface Session_MetadataEntry {
  key: string;
  value: Uint8Array;
}

export interface Factors {
  user: UserFactor | undefined;
  password: PasswordFactor | undefined;
  passkey: PasskeyFactor | undefined;
  intent: IntentFactor | undefined;
}

export interface UserFactor {
  verifiedAt: Date | undefined;
  id: string;
  loginName: string;
  displayName: string;
  organisationId: string;
}

export interface PasswordFactor {
  verifiedAt: Date | undefined;
}

export interface IntentFactor {
  verifiedAt: Date | undefined;
}

export interface PasskeyFactor {
  verifiedAt: Date | undefined;
}

export interface SearchQuery {
  idsQuery?: IDsQuery | undefined;
}

export interface IDsQuery {
  ids: string[];
}

function createBaseSession(): Session {
  return {
    id: "",
    creationDate: undefined,
    changeDate: undefined,
    sequence: 0,
    factors: undefined,
    metadata: {},
    domain: "",
  };
}

export const Session = {
  encode(message: Session, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.creationDate !== undefined) {
      Timestamp.encode(toTimestamp(message.creationDate), writer.uint32(18).fork()).ldelim();
    }
    if (message.changeDate !== undefined) {
      Timestamp.encode(toTimestamp(message.changeDate), writer.uint32(26).fork()).ldelim();
    }
    if (message.sequence !== 0) {
      writer.uint32(32).uint64(message.sequence);
    }
    if (message.factors !== undefined) {
      Factors.encode(message.factors, writer.uint32(42).fork()).ldelim();
    }
    Object.entries(message.metadata).forEach(([key, value]) => {
      Session_MetadataEntry.encode({ key: key as any, value }, writer.uint32(50).fork()).ldelim();
    });
    if (message.domain !== "") {
      writer.uint32(58).string(message.domain);
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

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.creationDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.changeDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.sequence = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.factors = Factors.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          const entry6 = Session_MetadataEntry.decode(reader, reader.uint32());
          if (entry6.value !== undefined) {
            message.metadata[entry6.key] = entry6.value;
          }
          continue;
        case 7:
          if (tag !== 58) {
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

  fromJSON(object: any): Session {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      creationDate: isSet(object.creationDate) ? fromJsonTimestamp(object.creationDate) : undefined,
      changeDate: isSet(object.changeDate) ? fromJsonTimestamp(object.changeDate) : undefined,
      sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
      factors: isSet(object.factors) ? Factors.fromJSON(object.factors) : undefined,
      metadata: isObject(object.metadata)
        ? Object.entries(object.metadata).reduce<{ [key: string]: Uint8Array }>((acc, [key, value]) => {
          acc[key] = bytesFromBase64(value as string);
          return acc;
        }, {})
        : {},
      domain: isSet(object.domain) ? String(object.domain) : "",
    };
  },

  toJSON(message: Session): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.creationDate !== undefined) {
      obj.creationDate = message.creationDate.toISOString();
    }
    if (message.changeDate !== undefined) {
      obj.changeDate = message.changeDate.toISOString();
    }
    if (message.sequence !== 0) {
      obj.sequence = Math.round(message.sequence);
    }
    if (message.factors !== undefined) {
      obj.factors = Factors.toJSON(message.factors);
    }
    if (message.metadata) {
      const entries = Object.entries(message.metadata);
      if (entries.length > 0) {
        obj.metadata = {};
        entries.forEach(([k, v]) => {
          obj.metadata[k] = base64FromBytes(v);
        });
      }
    }
    if (message.domain !== "") {
      obj.domain = message.domain;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Session>, I>>(base?: I): Session {
    return Session.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Session>, I>>(object: I): Session {
    const message = createBaseSession();
    message.id = object.id ?? "";
    message.creationDate = object.creationDate ?? undefined;
    message.changeDate = object.changeDate ?? undefined;
    message.sequence = object.sequence ?? 0;
    message.factors = (object.factors !== undefined && object.factors !== null)
      ? Factors.fromPartial(object.factors)
      : undefined;
    message.metadata = Object.entries(object.metadata ?? {}).reduce<{ [key: string]: Uint8Array }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseSession_MetadataEntry(): Session_MetadataEntry {
  return { key: "", value: new Uint8Array(0) };
}

export const Session_MetadataEntry = {
  encode(message: Session_MetadataEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Session_MetadataEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSession_MetadataEntry();
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

  fromJSON(object: any): Session_MetadataEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
    };
  },

  toJSON(message: Session_MetadataEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Session_MetadataEntry>, I>>(base?: I): Session_MetadataEntry {
    return Session_MetadataEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Session_MetadataEntry>, I>>(object: I): Session_MetadataEntry {
    const message = createBaseSession_MetadataEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseFactors(): Factors {
  return { user: undefined, password: undefined, passkey: undefined, intent: undefined };
}

export const Factors = {
  encode(message: Factors, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      UserFactor.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    if (message.password !== undefined) {
      PasswordFactor.encode(message.password, writer.uint32(18).fork()).ldelim();
    }
    if (message.passkey !== undefined) {
      PasskeyFactor.encode(message.passkey, writer.uint32(26).fork()).ldelim();
    }
    if (message.intent !== undefined) {
      IntentFactor.encode(message.intent, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Factors {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFactors();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = UserFactor.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = PasswordFactor.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.passkey = PasskeyFactor.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.intent = IntentFactor.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Factors {
    return {
      user: isSet(object.user) ? UserFactor.fromJSON(object.user) : undefined,
      password: isSet(object.password) ? PasswordFactor.fromJSON(object.password) : undefined,
      passkey: isSet(object.passkey) ? PasskeyFactor.fromJSON(object.passkey) : undefined,
      intent: isSet(object.intent) ? IntentFactor.fromJSON(object.intent) : undefined,
    };
  },

  toJSON(message: Factors): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = UserFactor.toJSON(message.user);
    }
    if (message.password !== undefined) {
      obj.password = PasswordFactor.toJSON(message.password);
    }
    if (message.passkey !== undefined) {
      obj.passkey = PasskeyFactor.toJSON(message.passkey);
    }
    if (message.intent !== undefined) {
      obj.intent = IntentFactor.toJSON(message.intent);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Factors>, I>>(base?: I): Factors {
    return Factors.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Factors>, I>>(object: I): Factors {
    const message = createBaseFactors();
    message.user = (object.user !== undefined && object.user !== null)
      ? UserFactor.fromPartial(object.user)
      : undefined;
    message.password = (object.password !== undefined && object.password !== null)
      ? PasswordFactor.fromPartial(object.password)
      : undefined;
    message.passkey = (object.passkey !== undefined && object.passkey !== null)
      ? PasskeyFactor.fromPartial(object.passkey)
      : undefined;
    message.intent = (object.intent !== undefined && object.intent !== null)
      ? IntentFactor.fromPartial(object.intent)
      : undefined;
    return message;
  },
};

function createBaseUserFactor(): UserFactor {
  return { verifiedAt: undefined, id: "", loginName: "", displayName: "", organisationId: "" };
}

export const UserFactor = {
  encode(message: UserFactor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.verifiedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.verifiedAt), writer.uint32(10).fork()).ldelim();
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.loginName !== "") {
      writer.uint32(26).string(message.loginName);
    }
    if (message.displayName !== "") {
      writer.uint32(34).string(message.displayName);
    }
    if (message.organisationId !== "") {
      writer.uint32(42).string(message.organisationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserFactor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserFactor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.verifiedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.loginName = reader.string();
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

          message.organisationId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserFactor {
    return {
      verifiedAt: isSet(object.verifiedAt) ? fromJsonTimestamp(object.verifiedAt) : undefined,
      id: isSet(object.id) ? String(object.id) : "",
      loginName: isSet(object.loginName) ? String(object.loginName) : "",
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      organisationId: isSet(object.organisationId) ? String(object.organisationId) : "",
    };
  },

  toJSON(message: UserFactor): unknown {
    const obj: any = {};
    if (message.verifiedAt !== undefined) {
      obj.verifiedAt = message.verifiedAt.toISOString();
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.loginName !== "") {
      obj.loginName = message.loginName;
    }
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.organisationId !== "") {
      obj.organisationId = message.organisationId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserFactor>, I>>(base?: I): UserFactor {
    return UserFactor.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserFactor>, I>>(object: I): UserFactor {
    const message = createBaseUserFactor();
    message.verifiedAt = object.verifiedAt ?? undefined;
    message.id = object.id ?? "";
    message.loginName = object.loginName ?? "";
    message.displayName = object.displayName ?? "";
    message.organisationId = object.organisationId ?? "";
    return message;
  },
};

function createBasePasswordFactor(): PasswordFactor {
  return { verifiedAt: undefined };
}

export const PasswordFactor = {
  encode(message: PasswordFactor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.verifiedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.verifiedAt), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PasswordFactor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePasswordFactor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.verifiedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PasswordFactor {
    return { verifiedAt: isSet(object.verifiedAt) ? fromJsonTimestamp(object.verifiedAt) : undefined };
  },

  toJSON(message: PasswordFactor): unknown {
    const obj: any = {};
    if (message.verifiedAt !== undefined) {
      obj.verifiedAt = message.verifiedAt.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PasswordFactor>, I>>(base?: I): PasswordFactor {
    return PasswordFactor.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PasswordFactor>, I>>(object: I): PasswordFactor {
    const message = createBasePasswordFactor();
    message.verifiedAt = object.verifiedAt ?? undefined;
    return message;
  },
};

function createBaseIntentFactor(): IntentFactor {
  return { verifiedAt: undefined };
}

export const IntentFactor = {
  encode(message: IntentFactor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.verifiedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.verifiedAt), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntentFactor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntentFactor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.verifiedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IntentFactor {
    return { verifiedAt: isSet(object.verifiedAt) ? fromJsonTimestamp(object.verifiedAt) : undefined };
  },

  toJSON(message: IntentFactor): unknown {
    const obj: any = {};
    if (message.verifiedAt !== undefined) {
      obj.verifiedAt = message.verifiedAt.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IntentFactor>, I>>(base?: I): IntentFactor {
    return IntentFactor.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IntentFactor>, I>>(object: I): IntentFactor {
    const message = createBaseIntentFactor();
    message.verifiedAt = object.verifiedAt ?? undefined;
    return message;
  },
};

function createBasePasskeyFactor(): PasskeyFactor {
  return { verifiedAt: undefined };
}

export const PasskeyFactor = {
  encode(message: PasskeyFactor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.verifiedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.verifiedAt), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PasskeyFactor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePasskeyFactor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.verifiedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PasskeyFactor {
    return { verifiedAt: isSet(object.verifiedAt) ? fromJsonTimestamp(object.verifiedAt) : undefined };
  },

  toJSON(message: PasskeyFactor): unknown {
    const obj: any = {};
    if (message.verifiedAt !== undefined) {
      obj.verifiedAt = message.verifiedAt.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PasskeyFactor>, I>>(base?: I): PasskeyFactor {
    return PasskeyFactor.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PasskeyFactor>, I>>(object: I): PasskeyFactor {
    const message = createBasePasskeyFactor();
    message.verifiedAt = object.verifiedAt ?? undefined;
    return message;
  },
};

function createBaseSearchQuery(): SearchQuery {
  return { idsQuery: undefined };
}

export const SearchQuery = {
  encode(message: SearchQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.idsQuery !== undefined) {
      IDsQuery.encode(message.idsQuery, writer.uint32(10).fork()).ldelim();
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

          message.idsQuery = IDsQuery.decode(reader, reader.uint32());
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
    return { idsQuery: isSet(object.idsQuery) ? IDsQuery.fromJSON(object.idsQuery) : undefined };
  },

  toJSON(message: SearchQuery): unknown {
    const obj: any = {};
    if (message.idsQuery !== undefined) {
      obj.idsQuery = IDsQuery.toJSON(message.idsQuery);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SearchQuery>, I>>(base?: I): SearchQuery {
    return SearchQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SearchQuery>, I>>(object: I): SearchQuery {
    const message = createBaseSearchQuery();
    message.idsQuery = (object.idsQuery !== undefined && object.idsQuery !== null)
      ? IDsQuery.fromPartial(object.idsQuery)
      : undefined;
    return message;
  },
};

function createBaseIDsQuery(): IDsQuery {
  return { ids: [] };
}

export const IDsQuery = {
  encode(message: IDsQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IDsQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIDsQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ids.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IDsQuery {
    return { ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => String(e)) : [] };
  },

  toJSON(message: IDsQuery): unknown {
    const obj: any = {};
    if (message.ids?.length) {
      obj.ids = message.ids;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IDsQuery>, I>>(base?: I): IDsQuery {
    return IDsQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IDsQuery>, I>>(object: I): IDsQuery {
    const message = createBaseIDsQuery();
    message.ids = object.ids?.map((e) => e) || [];
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
