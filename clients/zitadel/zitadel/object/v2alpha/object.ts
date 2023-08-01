/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "zitadel.object.v2alpha";

export interface Organisation {
  orgId?: string | undefined;
  orgDomain?: string | undefined;
}

export interface RequestContext {
  orgId?: string | undefined;
  instance?: boolean | undefined;
}

export interface ListQuery {
  offset: number;
  limit: number;
  asc: boolean;
}

export interface Details {
  /**
   * sequence represents the order of events. It's always counting
   *
   * on read: the sequence of the last event reduced by the projection
   *
   * on manipulation: the timestamp of the event(s) added by the manipulation
   */
  sequence: number;
  /**
   * change_date is the timestamp when the object was changed
   *
   * on read: the timestamp of the last event reduced by the projection
   *
   * on manipulation: the timestamp of the event(s) added by the manipulation
   */
  changeDate:
    | Date
    | undefined;
  /** resource_owner is the organization or instance_id an object belongs to */
  resourceOwner: string;
}

export interface ListDetails {
  totalResult: number;
  processedSequence: number;
  timestamp: Date | undefined;
}

function createBaseOrganisation(): Organisation {
  return { orgId: undefined, orgDomain: undefined };
}

export const Organisation = {
  encode(message: Organisation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined) {
      writer.uint32(10).string(message.orgId);
    }
    if (message.orgDomain !== undefined) {
      writer.uint32(18).string(message.orgDomain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Organisation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrganisation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.orgDomain = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Organisation {
    return {
      orgId: isSet(object.orgId) ? String(object.orgId) : undefined,
      orgDomain: isSet(object.orgDomain) ? String(object.orgDomain) : undefined,
    };
  },

  toJSON(message: Organisation): unknown {
    const obj: any = {};
    if (message.orgId !== undefined) {
      obj.orgId = message.orgId;
    }
    if (message.orgDomain !== undefined) {
      obj.orgDomain = message.orgDomain;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Organisation>, I>>(base?: I): Organisation {
    return Organisation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Organisation>, I>>(object: I): Organisation {
    const message = createBaseOrganisation();
    message.orgId = object.orgId ?? undefined;
    message.orgDomain = object.orgDomain ?? undefined;
    return message;
  },
};

function createBaseRequestContext(): RequestContext {
  return { orgId: undefined, instance: undefined };
}

export const RequestContext = {
  encode(message: RequestContext, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined) {
      writer.uint32(10).string(message.orgId);
    }
    if (message.instance !== undefined) {
      writer.uint32(16).bool(message.instance);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestContext {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestContext();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.instance = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestContext {
    return {
      orgId: isSet(object.orgId) ? String(object.orgId) : undefined,
      instance: isSet(object.instance) ? Boolean(object.instance) : undefined,
    };
  },

  toJSON(message: RequestContext): unknown {
    const obj: any = {};
    if (message.orgId !== undefined) {
      obj.orgId = message.orgId;
    }
    if (message.instance !== undefined) {
      obj.instance = message.instance;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestContext>, I>>(base?: I): RequestContext {
    return RequestContext.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestContext>, I>>(object: I): RequestContext {
    const message = createBaseRequestContext();
    message.orgId = object.orgId ?? undefined;
    message.instance = object.instance ?? undefined;
    return message;
  },
};

function createBaseListQuery(): ListQuery {
  return { offset: 0, limit: 0, asc: false };
}

export const ListQuery = {
  encode(message: ListQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.offset !== 0) {
      writer.uint32(8).uint64(message.offset);
    }
    if (message.limit !== 0) {
      writer.uint32(16).uint32(message.limit);
    }
    if (message.asc === true) {
      writer.uint32(24).bool(message.asc);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.limit = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.asc = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListQuery {
    return {
      offset: isSet(object.offset) ? Number(object.offset) : 0,
      limit: isSet(object.limit) ? Number(object.limit) : 0,
      asc: isSet(object.asc) ? Boolean(object.asc) : false,
    };
  },

  toJSON(message: ListQuery): unknown {
    const obj: any = {};
    if (message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    if (message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    if (message.asc === true) {
      obj.asc = message.asc;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListQuery>, I>>(base?: I): ListQuery {
    return ListQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListQuery>, I>>(object: I): ListQuery {
    const message = createBaseListQuery();
    message.offset = object.offset ?? 0;
    message.limit = object.limit ?? 0;
    message.asc = object.asc ?? false;
    return message;
  },
};

function createBaseDetails(): Details {
  return { sequence: 0, changeDate: undefined, resourceOwner: "" };
}

export const Details = {
  encode(message: Details, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sequence !== 0) {
      writer.uint32(8).uint64(message.sequence);
    }
    if (message.changeDate !== undefined) {
      Timestamp.encode(toTimestamp(message.changeDate), writer.uint32(18).fork()).ldelim();
    }
    if (message.resourceOwner !== "") {
      writer.uint32(26).string(message.resourceOwner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Details {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.sequence = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.changeDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.resourceOwner = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Details {
    return {
      sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
      changeDate: isSet(object.changeDate) ? fromJsonTimestamp(object.changeDate) : undefined,
      resourceOwner: isSet(object.resourceOwner) ? String(object.resourceOwner) : "",
    };
  },

  toJSON(message: Details): unknown {
    const obj: any = {};
    if (message.sequence !== 0) {
      obj.sequence = Math.round(message.sequence);
    }
    if (message.changeDate !== undefined) {
      obj.changeDate = message.changeDate.toISOString();
    }
    if (message.resourceOwner !== "") {
      obj.resourceOwner = message.resourceOwner;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Details>, I>>(base?: I): Details {
    return Details.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Details>, I>>(object: I): Details {
    const message = createBaseDetails();
    message.sequence = object.sequence ?? 0;
    message.changeDate = object.changeDate ?? undefined;
    message.resourceOwner = object.resourceOwner ?? "";
    return message;
  },
};

function createBaseListDetails(): ListDetails {
  return { totalResult: 0, processedSequence: 0, timestamp: undefined };
}

export const ListDetails = {
  encode(message: ListDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalResult !== 0) {
      writer.uint32(8).uint64(message.totalResult);
    }
    if (message.processedSequence !== 0) {
      writer.uint32(16).uint64(message.processedSequence);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.totalResult = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.processedSequence = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListDetails {
    return {
      totalResult: isSet(object.totalResult) ? Number(object.totalResult) : 0,
      processedSequence: isSet(object.processedSequence) ? Number(object.processedSequence) : 0,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
    };
  },

  toJSON(message: ListDetails): unknown {
    const obj: any = {};
    if (message.totalResult !== 0) {
      obj.totalResult = Math.round(message.totalResult);
    }
    if (message.processedSequence !== 0) {
      obj.processedSequence = Math.round(message.processedSequence);
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListDetails>, I>>(base?: I): ListDetails {
    return ListDetails.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListDetails>, I>>(object: I): ListDetails {
    const message = createBaseListDetails();
    message.totalResult = object.totalResult ?? 0;
    message.processedSequence = object.processedSequence ?? 0;
    message.timestamp = object.timestamp ?? undefined;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
