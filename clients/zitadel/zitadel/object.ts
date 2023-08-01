/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "zitadel.v1";

export enum TextQueryMethod {
  TEXT_QUERY_METHOD_EQUALS = 0,
  TEXT_QUERY_METHOD_EQUALS_IGNORE_CASE = 1,
  TEXT_QUERY_METHOD_STARTS_WITH = 2,
  TEXT_QUERY_METHOD_STARTS_WITH_IGNORE_CASE = 3,
  TEXT_QUERY_METHOD_CONTAINS = 4,
  TEXT_QUERY_METHOD_CONTAINS_IGNORE_CASE = 5,
  TEXT_QUERY_METHOD_ENDS_WITH = 6,
  TEXT_QUERY_METHOD_ENDS_WITH_IGNORE_CASE = 7,
  UNRECOGNIZED = -1,
}

export function textQueryMethodFromJSON(object: any): TextQueryMethod {
  switch (object) {
    case 0:
    case "TEXT_QUERY_METHOD_EQUALS":
      return TextQueryMethod.TEXT_QUERY_METHOD_EQUALS;
    case 1:
    case "TEXT_QUERY_METHOD_EQUALS_IGNORE_CASE":
      return TextQueryMethod.TEXT_QUERY_METHOD_EQUALS_IGNORE_CASE;
    case 2:
    case "TEXT_QUERY_METHOD_STARTS_WITH":
      return TextQueryMethod.TEXT_QUERY_METHOD_STARTS_WITH;
    case 3:
    case "TEXT_QUERY_METHOD_STARTS_WITH_IGNORE_CASE":
      return TextQueryMethod.TEXT_QUERY_METHOD_STARTS_WITH_IGNORE_CASE;
    case 4:
    case "TEXT_QUERY_METHOD_CONTAINS":
      return TextQueryMethod.TEXT_QUERY_METHOD_CONTAINS;
    case 5:
    case "TEXT_QUERY_METHOD_CONTAINS_IGNORE_CASE":
      return TextQueryMethod.TEXT_QUERY_METHOD_CONTAINS_IGNORE_CASE;
    case 6:
    case "TEXT_QUERY_METHOD_ENDS_WITH":
      return TextQueryMethod.TEXT_QUERY_METHOD_ENDS_WITH;
    case 7:
    case "TEXT_QUERY_METHOD_ENDS_WITH_IGNORE_CASE":
      return TextQueryMethod.TEXT_QUERY_METHOD_ENDS_WITH_IGNORE_CASE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TextQueryMethod.UNRECOGNIZED;
  }
}

export function textQueryMethodToJSON(object: TextQueryMethod): string {
  switch (object) {
    case TextQueryMethod.TEXT_QUERY_METHOD_EQUALS:
      return "TEXT_QUERY_METHOD_EQUALS";
    case TextQueryMethod.TEXT_QUERY_METHOD_EQUALS_IGNORE_CASE:
      return "TEXT_QUERY_METHOD_EQUALS_IGNORE_CASE";
    case TextQueryMethod.TEXT_QUERY_METHOD_STARTS_WITH:
      return "TEXT_QUERY_METHOD_STARTS_WITH";
    case TextQueryMethod.TEXT_QUERY_METHOD_STARTS_WITH_IGNORE_CASE:
      return "TEXT_QUERY_METHOD_STARTS_WITH_IGNORE_CASE";
    case TextQueryMethod.TEXT_QUERY_METHOD_CONTAINS:
      return "TEXT_QUERY_METHOD_CONTAINS";
    case TextQueryMethod.TEXT_QUERY_METHOD_CONTAINS_IGNORE_CASE:
      return "TEXT_QUERY_METHOD_CONTAINS_IGNORE_CASE";
    case TextQueryMethod.TEXT_QUERY_METHOD_ENDS_WITH:
      return "TEXT_QUERY_METHOD_ENDS_WITH";
    case TextQueryMethod.TEXT_QUERY_METHOD_ENDS_WITH_IGNORE_CASE:
      return "TEXT_QUERY_METHOD_ENDS_WITH_IGNORE_CASE";
    case TextQueryMethod.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ListQueryMethod {
  LIST_QUERY_METHOD_IN = 0,
  UNRECOGNIZED = -1,
}

export function listQueryMethodFromJSON(object: any): ListQueryMethod {
  switch (object) {
    case 0:
    case "LIST_QUERY_METHOD_IN":
      return ListQueryMethod.LIST_QUERY_METHOD_IN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ListQueryMethod.UNRECOGNIZED;
  }
}

export function listQueryMethodToJSON(object: ListQueryMethod): string {
  switch (object) {
    case ListQueryMethod.LIST_QUERY_METHOD_IN:
      return "LIST_QUERY_METHOD_IN";
    case ListQueryMethod.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ObjectDetails {
  /**
   * sequence represents the order of events. It's always counting
   *
   * on read: the sequence of the last event reduced by the projection
   *
   * on manipulation: the timestamp of the event(s) added by the manipulation
   */
  sequence: number;
  /**
   * creation_date is the timestamp where the first operation on the object was made
   *
   * on read: the timestamp of the first event of the object
   *
   * on create: the timestamp of the event(s) added by the manipulation
   */
  creationDate:
    | Date
    | undefined;
  /**
   * change_date is the timestamp when the object was changed
   *
   * on read: the timestamp of the last event reduced by the projection
   *
   * on manipulation: the
   */
  changeDate:
    | Date
    | undefined;
  /** resource_owner is the organization an object belongs to */
  resourceOwner: string;
}

export interface ListQuery {
  offset: number;
  limit: number;
  asc: boolean;
}

export interface ListDetails {
  totalResult: number;
  processedSequence: number;
  viewTimestamp: Date | undefined;
}

function createBaseObjectDetails(): ObjectDetails {
  return { sequence: 0, creationDate: undefined, changeDate: undefined, resourceOwner: "" };
}

export const ObjectDetails = {
  encode(message: ObjectDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sequence !== 0) {
      writer.uint32(8).uint64(message.sequence);
    }
    if (message.creationDate !== undefined) {
      Timestamp.encode(toTimestamp(message.creationDate), writer.uint32(18).fork()).ldelim();
    }
    if (message.changeDate !== undefined) {
      Timestamp.encode(toTimestamp(message.changeDate), writer.uint32(26).fork()).ldelim();
    }
    if (message.resourceOwner !== "") {
      writer.uint32(34).string(message.resourceOwner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObjectDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectDetails();
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

          message.creationDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.changeDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): ObjectDetails {
    return {
      sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
      creationDate: isSet(object.creationDate) ? fromJsonTimestamp(object.creationDate) : undefined,
      changeDate: isSet(object.changeDate) ? fromJsonTimestamp(object.changeDate) : undefined,
      resourceOwner: isSet(object.resourceOwner) ? String(object.resourceOwner) : "",
    };
  },

  toJSON(message: ObjectDetails): unknown {
    const obj: any = {};
    if (message.sequence !== 0) {
      obj.sequence = Math.round(message.sequence);
    }
    if (message.creationDate !== undefined) {
      obj.creationDate = message.creationDate.toISOString();
    }
    if (message.changeDate !== undefined) {
      obj.changeDate = message.changeDate.toISOString();
    }
    if (message.resourceOwner !== "") {
      obj.resourceOwner = message.resourceOwner;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ObjectDetails>, I>>(base?: I): ObjectDetails {
    return ObjectDetails.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ObjectDetails>, I>>(object: I): ObjectDetails {
    const message = createBaseObjectDetails();
    message.sequence = object.sequence ?? 0;
    message.creationDate = object.creationDate ?? undefined;
    message.changeDate = object.changeDate ?? undefined;
    message.resourceOwner = object.resourceOwner ?? "";
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

function createBaseListDetails(): ListDetails {
  return { totalResult: 0, processedSequence: 0, viewTimestamp: undefined };
}

export const ListDetails = {
  encode(message: ListDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalResult !== 0) {
      writer.uint32(8).uint64(message.totalResult);
    }
    if (message.processedSequence !== 0) {
      writer.uint32(16).uint64(message.processedSequence);
    }
    if (message.viewTimestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.viewTimestamp), writer.uint32(26).fork()).ldelim();
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

          message.viewTimestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
      viewTimestamp: isSet(object.viewTimestamp) ? fromJsonTimestamp(object.viewTimestamp) : undefined,
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
    if (message.viewTimestamp !== undefined) {
      obj.viewTimestamp = message.viewTimestamp.toISOString();
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
    message.viewTimestamp = object.viewTimestamp ?? undefined;
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
