/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Struct } from "../../../google/protobuf/struct";
import { Details, ListDetails, ListQuery } from "../../object/v2alpha/object";
import { ChallengeKind, challengeKindFromJSON, challengeKindToJSON, Challenges } from "./challenge";
import { SearchQuery, Session } from "./session";

export const protobufPackage = "zitadel.session.v2alpha";

export interface ListSessionsRequest {
  query: ListQuery | undefined;
  queries: SearchQuery[];
}

export interface ListSessionsResponse {
  details: ListDetails | undefined;
  sessions: Session[];
}

export interface GetSessionRequest {
  sessionId: string;
  sessionToken?: string | undefined;
}

export interface GetSessionResponse {
  session: Session | undefined;
}

export interface CreateSessionRequest {
  checks: Checks | undefined;
  metadata: { [key: string]: Uint8Array };
  challenges: ChallengeKind[];
  domain: string;
}

export interface CreateSessionRequest_MetadataEntry {
  key: string;
  value: Uint8Array;
}

export interface CreateSessionResponse {
  details: Details | undefined;
  sessionId: string;
  sessionToken: string;
  challenges: Challenges | undefined;
}

export interface SetSessionRequest {
  sessionId: string;
  sessionToken: string;
  checks: Checks | undefined;
  metadata: { [key: string]: Uint8Array };
  challenges: ChallengeKind[];
}

export interface SetSessionRequest_MetadataEntry {
  key: string;
  value: Uint8Array;
}

export interface SetSessionResponse {
  details: Details | undefined;
  sessionToken: string;
  challenges: Challenges | undefined;
}

export interface DeleteSessionRequest {
  sessionId: string;
  sessionToken?: string | undefined;
}

export interface DeleteSessionResponse {
  details: Details | undefined;
}

export interface Checks {
  user?: CheckUser | undefined;
  password?: CheckPassword | undefined;
  passkey?: CheckPasskey | undefined;
  intent?: CheckIntent | undefined;
}

export interface CheckUser {
  userId?: string | undefined;
  loginName?: string | undefined;
}

export interface CheckPassword {
  password: string;
}

export interface CheckPasskey {
  credentialAssertionData: { [key: string]: any } | undefined;
}

export interface CheckIntent {
  intentId: string;
  token: string;
}

function createBaseListSessionsRequest(): ListSessionsRequest {
  return { query: undefined, queries: [] };
}

export const ListSessionsRequest = {
  encode(message: ListSessionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== undefined) {
      ListQuery.encode(message.query, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.queries) {
      SearchQuery.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSessionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSessionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.query = ListQuery.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.queries.push(SearchQuery.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListSessionsRequest {
    return {
      query: isSet(object.query) ? ListQuery.fromJSON(object.query) : undefined,
      queries: Array.isArray(object?.queries) ? object.queries.map((e: any) => SearchQuery.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListSessionsRequest): unknown {
    const obj: any = {};
    if (message.query !== undefined) {
      obj.query = ListQuery.toJSON(message.query);
    }
    if (message.queries?.length) {
      obj.queries = message.queries.map((e) => SearchQuery.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListSessionsRequest>, I>>(base?: I): ListSessionsRequest {
    return ListSessionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListSessionsRequest>, I>>(object: I): ListSessionsRequest {
    const message = createBaseListSessionsRequest();
    message.query = (object.query !== undefined && object.query !== null)
      ? ListQuery.fromPartial(object.query)
      : undefined;
    message.queries = object.queries?.map((e) => SearchQuery.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListSessionsResponse(): ListSessionsResponse {
  return { details: undefined, sessions: [] };
}

export const ListSessionsResponse = {
  encode(message: ListSessionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ListDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.sessions) {
      Session.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSessionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSessionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ListDetails.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sessions.push(Session.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListSessionsResponse {
    return {
      details: isSet(object.details) ? ListDetails.fromJSON(object.details) : undefined,
      sessions: Array.isArray(object?.sessions) ? object.sessions.map((e: any) => Session.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListSessionsResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ListDetails.toJSON(message.details);
    }
    if (message.sessions?.length) {
      obj.sessions = message.sessions.map((e) => Session.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListSessionsResponse>, I>>(base?: I): ListSessionsResponse {
    return ListSessionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListSessionsResponse>, I>>(object: I): ListSessionsResponse {
    const message = createBaseListSessionsResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ListDetails.fromPartial(object.details)
      : undefined;
    message.sessions = object.sessions?.map((e) => Session.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetSessionRequest(): GetSessionRequest {
  return { sessionId: "", sessionToken: undefined };
}

export const GetSessionRequest = {
  encode(message: GetSessionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.sessionToken !== undefined) {
      writer.uint32(18).string(message.sessionToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSessionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSessionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sessionToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSessionRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      sessionToken: isSet(object.sessionToken) ? String(object.sessionToken) : undefined,
    };
  },

  toJSON(message: GetSessionRequest): unknown {
    const obj: any = {};
    if (message.sessionId !== "") {
      obj.sessionId = message.sessionId;
    }
    if (message.sessionToken !== undefined) {
      obj.sessionToken = message.sessionToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSessionRequest>, I>>(base?: I): GetSessionRequest {
    return GetSessionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSessionRequest>, I>>(object: I): GetSessionRequest {
    const message = createBaseGetSessionRequest();
    message.sessionId = object.sessionId ?? "";
    message.sessionToken = object.sessionToken ?? undefined;
    return message;
  },
};

function createBaseGetSessionResponse(): GetSessionResponse {
  return { session: undefined };
}

export const GetSessionResponse = {
  encode(message: GetSessionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.session !== undefined) {
      Session.encode(message.session, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSessionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSessionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.session = Session.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSessionResponse {
    return { session: isSet(object.session) ? Session.fromJSON(object.session) : undefined };
  },

  toJSON(message: GetSessionResponse): unknown {
    const obj: any = {};
    if (message.session !== undefined) {
      obj.session = Session.toJSON(message.session);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSessionResponse>, I>>(base?: I): GetSessionResponse {
    return GetSessionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSessionResponse>, I>>(object: I): GetSessionResponse {
    const message = createBaseGetSessionResponse();
    message.session = (object.session !== undefined && object.session !== null)
      ? Session.fromPartial(object.session)
      : undefined;
    return message;
  },
};

function createBaseCreateSessionRequest(): CreateSessionRequest {
  return { checks: undefined, metadata: {}, challenges: [], domain: "" };
}

export const CreateSessionRequest = {
  encode(message: CreateSessionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.checks !== undefined) {
      Checks.encode(message.checks, writer.uint32(10).fork()).ldelim();
    }
    Object.entries(message.metadata).forEach(([key, value]) => {
      CreateSessionRequest_MetadataEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    writer.uint32(26).fork();
    for (const v of message.challenges) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.domain !== "") {
      writer.uint32(34).string(message.domain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateSessionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateSessionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.checks = Checks.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = CreateSessionRequest_MetadataEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.metadata[entry2.key] = entry2.value;
          }
          continue;
        case 3:
          if (tag === 24) {
            message.challenges.push(reader.int32() as any);

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.challenges.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): CreateSessionRequest {
    return {
      checks: isSet(object.checks) ? Checks.fromJSON(object.checks) : undefined,
      metadata: isObject(object.metadata)
        ? Object.entries(object.metadata).reduce<{ [key: string]: Uint8Array }>((acc, [key, value]) => {
          acc[key] = bytesFromBase64(value as string);
          return acc;
        }, {})
        : {},
      challenges: Array.isArray(object?.challenges) ? object.challenges.map((e: any) => challengeKindFromJSON(e)) : [],
      domain: isSet(object.domain) ? String(object.domain) : "",
    };
  },

  toJSON(message: CreateSessionRequest): unknown {
    const obj: any = {};
    if (message.checks !== undefined) {
      obj.checks = Checks.toJSON(message.checks);
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
    if (message.challenges?.length) {
      obj.challenges = message.challenges.map((e) => challengeKindToJSON(e));
    }
    if (message.domain !== "") {
      obj.domain = message.domain;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateSessionRequest>, I>>(base?: I): CreateSessionRequest {
    return CreateSessionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateSessionRequest>, I>>(object: I): CreateSessionRequest {
    const message = createBaseCreateSessionRequest();
    message.checks = (object.checks !== undefined && object.checks !== null)
      ? Checks.fromPartial(object.checks)
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
    message.challenges = object.challenges?.map((e) => e) || [];
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseCreateSessionRequest_MetadataEntry(): CreateSessionRequest_MetadataEntry {
  return { key: "", value: new Uint8Array(0) };
}

export const CreateSessionRequest_MetadataEntry = {
  encode(message: CreateSessionRequest_MetadataEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateSessionRequest_MetadataEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateSessionRequest_MetadataEntry();
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

  fromJSON(object: any): CreateSessionRequest_MetadataEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
    };
  },

  toJSON(message: CreateSessionRequest_MetadataEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateSessionRequest_MetadataEntry>, I>>(
    base?: I,
  ): CreateSessionRequest_MetadataEntry {
    return CreateSessionRequest_MetadataEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateSessionRequest_MetadataEntry>, I>>(
    object: I,
  ): CreateSessionRequest_MetadataEntry {
    const message = createBaseCreateSessionRequest_MetadataEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseCreateSessionResponse(): CreateSessionResponse {
  return { details: undefined, sessionId: "", sessionToken: "", challenges: undefined };
}

export const CreateSessionResponse = {
  encode(message: CreateSessionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.sessionId !== "") {
      writer.uint32(18).string(message.sessionId);
    }
    if (message.sessionToken !== "") {
      writer.uint32(26).string(message.sessionToken);
    }
    if (message.challenges !== undefined) {
      Challenges.encode(message.challenges, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateSessionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateSessionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = Details.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sessionToken = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.challenges = Challenges.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateSessionResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      sessionToken: isSet(object.sessionToken) ? String(object.sessionToken) : "",
      challenges: isSet(object.challenges) ? Challenges.fromJSON(object.challenges) : undefined,
    };
  },

  toJSON(message: CreateSessionResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.sessionId !== "") {
      obj.sessionId = message.sessionId;
    }
    if (message.sessionToken !== "") {
      obj.sessionToken = message.sessionToken;
    }
    if (message.challenges !== undefined) {
      obj.challenges = Challenges.toJSON(message.challenges);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateSessionResponse>, I>>(base?: I): CreateSessionResponse {
    return CreateSessionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateSessionResponse>, I>>(object: I): CreateSessionResponse {
    const message = createBaseCreateSessionResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.sessionId = object.sessionId ?? "";
    message.sessionToken = object.sessionToken ?? "";
    message.challenges = (object.challenges !== undefined && object.challenges !== null)
      ? Challenges.fromPartial(object.challenges)
      : undefined;
    return message;
  },
};

function createBaseSetSessionRequest(): SetSessionRequest {
  return { sessionId: "", sessionToken: "", checks: undefined, metadata: {}, challenges: [] };
}

export const SetSessionRequest = {
  encode(message: SetSessionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.sessionToken !== "") {
      writer.uint32(18).string(message.sessionToken);
    }
    if (message.checks !== undefined) {
      Checks.encode(message.checks, writer.uint32(26).fork()).ldelim();
    }
    Object.entries(message.metadata).forEach(([key, value]) => {
      SetSessionRequest_MetadataEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    });
    writer.uint32(42).fork();
    for (const v of message.challenges) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetSessionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetSessionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sessionToken = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.checks = Checks.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = SetSessionRequest_MetadataEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.metadata[entry4.key] = entry4.value;
          }
          continue;
        case 5:
          if (tag === 40) {
            message.challenges.push(reader.int32() as any);

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.challenges.push(reader.int32() as any);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetSessionRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      sessionToken: isSet(object.sessionToken) ? String(object.sessionToken) : "",
      checks: isSet(object.checks) ? Checks.fromJSON(object.checks) : undefined,
      metadata: isObject(object.metadata)
        ? Object.entries(object.metadata).reduce<{ [key: string]: Uint8Array }>((acc, [key, value]) => {
          acc[key] = bytesFromBase64(value as string);
          return acc;
        }, {})
        : {},
      challenges: Array.isArray(object?.challenges) ? object.challenges.map((e: any) => challengeKindFromJSON(e)) : [],
    };
  },

  toJSON(message: SetSessionRequest): unknown {
    const obj: any = {};
    if (message.sessionId !== "") {
      obj.sessionId = message.sessionId;
    }
    if (message.sessionToken !== "") {
      obj.sessionToken = message.sessionToken;
    }
    if (message.checks !== undefined) {
      obj.checks = Checks.toJSON(message.checks);
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
    if (message.challenges?.length) {
      obj.challenges = message.challenges.map((e) => challengeKindToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetSessionRequest>, I>>(base?: I): SetSessionRequest {
    return SetSessionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetSessionRequest>, I>>(object: I): SetSessionRequest {
    const message = createBaseSetSessionRequest();
    message.sessionId = object.sessionId ?? "";
    message.sessionToken = object.sessionToken ?? "";
    message.checks = (object.checks !== undefined && object.checks !== null)
      ? Checks.fromPartial(object.checks)
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
    message.challenges = object.challenges?.map((e) => e) || [];
    return message;
  },
};

function createBaseSetSessionRequest_MetadataEntry(): SetSessionRequest_MetadataEntry {
  return { key: "", value: new Uint8Array(0) };
}

export const SetSessionRequest_MetadataEntry = {
  encode(message: SetSessionRequest_MetadataEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetSessionRequest_MetadataEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetSessionRequest_MetadataEntry();
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

  fromJSON(object: any): SetSessionRequest_MetadataEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
    };
  },

  toJSON(message: SetSessionRequest_MetadataEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetSessionRequest_MetadataEntry>, I>>(base?: I): SetSessionRequest_MetadataEntry {
    return SetSessionRequest_MetadataEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetSessionRequest_MetadataEntry>, I>>(
    object: I,
  ): SetSessionRequest_MetadataEntry {
    const message = createBaseSetSessionRequest_MetadataEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseSetSessionResponse(): SetSessionResponse {
  return { details: undefined, sessionToken: "", challenges: undefined };
}

export const SetSessionResponse = {
  encode(message: SetSessionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.sessionToken !== "") {
      writer.uint32(18).string(message.sessionToken);
    }
    if (message.challenges !== undefined) {
      Challenges.encode(message.challenges, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetSessionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetSessionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = Details.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sessionToken = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.challenges = Challenges.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetSessionResponse {
    return {
      details: isSet(object.details) ? Details.fromJSON(object.details) : undefined,
      sessionToken: isSet(object.sessionToken) ? String(object.sessionToken) : "",
      challenges: isSet(object.challenges) ? Challenges.fromJSON(object.challenges) : undefined,
    };
  },

  toJSON(message: SetSessionResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    if (message.sessionToken !== "") {
      obj.sessionToken = message.sessionToken;
    }
    if (message.challenges !== undefined) {
      obj.challenges = Challenges.toJSON(message.challenges);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetSessionResponse>, I>>(base?: I): SetSessionResponse {
    return SetSessionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetSessionResponse>, I>>(object: I): SetSessionResponse {
    const message = createBaseSetSessionResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    message.sessionToken = object.sessionToken ?? "";
    message.challenges = (object.challenges !== undefined && object.challenges !== null)
      ? Challenges.fromPartial(object.challenges)
      : undefined;
    return message;
  },
};

function createBaseDeleteSessionRequest(): DeleteSessionRequest {
  return { sessionId: "", sessionToken: undefined };
}

export const DeleteSessionRequest = {
  encode(message: DeleteSessionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.sessionToken !== undefined) {
      writer.uint32(18).string(message.sessionToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteSessionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteSessionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sessionToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteSessionRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      sessionToken: isSet(object.sessionToken) ? String(object.sessionToken) : undefined,
    };
  },

  toJSON(message: DeleteSessionRequest): unknown {
    const obj: any = {};
    if (message.sessionId !== "") {
      obj.sessionId = message.sessionId;
    }
    if (message.sessionToken !== undefined) {
      obj.sessionToken = message.sessionToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteSessionRequest>, I>>(base?: I): DeleteSessionRequest {
    return DeleteSessionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteSessionRequest>, I>>(object: I): DeleteSessionRequest {
    const message = createBaseDeleteSessionRequest();
    message.sessionId = object.sessionId ?? "";
    message.sessionToken = object.sessionToken ?? undefined;
    return message;
  },
};

function createBaseDeleteSessionResponse(): DeleteSessionResponse {
  return { details: undefined };
}

export const DeleteSessionResponse = {
  encode(message: DeleteSessionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      Details.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteSessionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteSessionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = Details.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteSessionResponse {
    return { details: isSet(object.details) ? Details.fromJSON(object.details) : undefined };
  },

  toJSON(message: DeleteSessionResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = Details.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteSessionResponse>, I>>(base?: I): DeleteSessionResponse {
    return DeleteSessionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteSessionResponse>, I>>(object: I): DeleteSessionResponse {
    const message = createBaseDeleteSessionResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? Details.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseChecks(): Checks {
  return { user: undefined, password: undefined, passkey: undefined, intent: undefined };
}

export const Checks = {
  encode(message: Checks, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      CheckUser.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    if (message.password !== undefined) {
      CheckPassword.encode(message.password, writer.uint32(18).fork()).ldelim();
    }
    if (message.passkey !== undefined) {
      CheckPasskey.encode(message.passkey, writer.uint32(26).fork()).ldelim();
    }
    if (message.intent !== undefined) {
      CheckIntent.encode(message.intent, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Checks {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChecks();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = CheckUser.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = CheckPassword.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.passkey = CheckPasskey.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.intent = CheckIntent.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Checks {
    return {
      user: isSet(object.user) ? CheckUser.fromJSON(object.user) : undefined,
      password: isSet(object.password) ? CheckPassword.fromJSON(object.password) : undefined,
      passkey: isSet(object.passkey) ? CheckPasskey.fromJSON(object.passkey) : undefined,
      intent: isSet(object.intent) ? CheckIntent.fromJSON(object.intent) : undefined,
    };
  },

  toJSON(message: Checks): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = CheckUser.toJSON(message.user);
    }
    if (message.password !== undefined) {
      obj.password = CheckPassword.toJSON(message.password);
    }
    if (message.passkey !== undefined) {
      obj.passkey = CheckPasskey.toJSON(message.passkey);
    }
    if (message.intent !== undefined) {
      obj.intent = CheckIntent.toJSON(message.intent);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Checks>, I>>(base?: I): Checks {
    return Checks.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Checks>, I>>(object: I): Checks {
    const message = createBaseChecks();
    message.user = (object.user !== undefined && object.user !== null) ? CheckUser.fromPartial(object.user) : undefined;
    message.password = (object.password !== undefined && object.password !== null)
      ? CheckPassword.fromPartial(object.password)
      : undefined;
    message.passkey = (object.passkey !== undefined && object.passkey !== null)
      ? CheckPasskey.fromPartial(object.passkey)
      : undefined;
    message.intent = (object.intent !== undefined && object.intent !== null)
      ? CheckIntent.fromPartial(object.intent)
      : undefined;
    return message;
  },
};

function createBaseCheckUser(): CheckUser {
  return { userId: undefined, loginName: undefined };
}

export const CheckUser = {
  encode(message: CheckUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== undefined) {
      writer.uint32(10).string(message.userId);
    }
    if (message.loginName !== undefined) {
      writer.uint32(18).string(message.loginName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CheckUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCheckUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.loginName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CheckUser {
    return {
      userId: isSet(object.userId) ? String(object.userId) : undefined,
      loginName: isSet(object.loginName) ? String(object.loginName) : undefined,
    };
  },

  toJSON(message: CheckUser): unknown {
    const obj: any = {};
    if (message.userId !== undefined) {
      obj.userId = message.userId;
    }
    if (message.loginName !== undefined) {
      obj.loginName = message.loginName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CheckUser>, I>>(base?: I): CheckUser {
    return CheckUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CheckUser>, I>>(object: I): CheckUser {
    const message = createBaseCheckUser();
    message.userId = object.userId ?? undefined;
    message.loginName = object.loginName ?? undefined;
    return message;
  },
};

function createBaseCheckPassword(): CheckPassword {
  return { password: "" };
}

export const CheckPassword = {
  encode(message: CheckPassword, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.password !== "") {
      writer.uint32(10).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CheckPassword {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCheckPassword();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CheckPassword {
    return { password: isSet(object.password) ? String(object.password) : "" };
  },

  toJSON(message: CheckPassword): unknown {
    const obj: any = {};
    if (message.password !== "") {
      obj.password = message.password;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CheckPassword>, I>>(base?: I): CheckPassword {
    return CheckPassword.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CheckPassword>, I>>(object: I): CheckPassword {
    const message = createBaseCheckPassword();
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseCheckPasskey(): CheckPasskey {
  return { credentialAssertionData: undefined };
}

export const CheckPasskey = {
  encode(message: CheckPasskey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credentialAssertionData !== undefined) {
      Struct.encode(Struct.wrap(message.credentialAssertionData), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CheckPasskey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCheckPasskey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.credentialAssertionData = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CheckPasskey {
    return {
      credentialAssertionData: isObject(object.credentialAssertionData) ? object.credentialAssertionData : undefined,
    };
  },

  toJSON(message: CheckPasskey): unknown {
    const obj: any = {};
    if (message.credentialAssertionData !== undefined) {
      obj.credentialAssertionData = message.credentialAssertionData;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CheckPasskey>, I>>(base?: I): CheckPasskey {
    return CheckPasskey.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CheckPasskey>, I>>(object: I): CheckPasskey {
    const message = createBaseCheckPasskey();
    message.credentialAssertionData = object.credentialAssertionData ?? undefined;
    return message;
  },
};

function createBaseCheckIntent(): CheckIntent {
  return { intentId: "", token: "" };
}

export const CheckIntent = {
  encode(message: CheckIntent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.intentId !== "") {
      writer.uint32(10).string(message.intentId);
    }
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CheckIntent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCheckIntent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.intentId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CheckIntent {
    return {
      intentId: isSet(object.intentId) ? String(object.intentId) : "",
      token: isSet(object.token) ? String(object.token) : "",
    };
  },

  toJSON(message: CheckIntent): unknown {
    const obj: any = {};
    if (message.intentId !== "") {
      obj.intentId = message.intentId;
    }
    if (message.token !== "") {
      obj.token = message.token;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CheckIntent>, I>>(base?: I): CheckIntent {
    return CheckIntent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CheckIntent>, I>>(object: I): CheckIntent {
    const message = createBaseCheckIntent();
    message.intentId = object.intentId ?? "";
    message.token = object.token ?? "";
    return message;
  },
};

export interface SessionService {
  /** Search sessions */
  ListSessions(request: DeepPartial<ListSessionsRequest>, metadata?: grpc.Metadata): Promise<ListSessionsResponse>;
  /** GetSession a session */
  GetSession(request: DeepPartial<GetSessionRequest>, metadata?: grpc.Metadata): Promise<GetSessionResponse>;
  /** Create a new session */
  CreateSession(request: DeepPartial<CreateSessionRequest>, metadata?: grpc.Metadata): Promise<CreateSessionResponse>;
  /** Update a session */
  SetSession(request: DeepPartial<SetSessionRequest>, metadata?: grpc.Metadata): Promise<SetSessionResponse>;
  /** Terminate a session */
  DeleteSession(request: DeepPartial<DeleteSessionRequest>, metadata?: grpc.Metadata): Promise<DeleteSessionResponse>;
}

export class SessionServiceClientImpl implements SessionService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListSessions = this.ListSessions.bind(this);
    this.GetSession = this.GetSession.bind(this);
    this.CreateSession = this.CreateSession.bind(this);
    this.SetSession = this.SetSession.bind(this);
    this.DeleteSession = this.DeleteSession.bind(this);
  }

  ListSessions(request: DeepPartial<ListSessionsRequest>, metadata?: grpc.Metadata): Promise<ListSessionsResponse> {
    return this.rpc.unary(SessionServiceListSessionsDesc, ListSessionsRequest.fromPartial(request), metadata);
  }

  GetSession(request: DeepPartial<GetSessionRequest>, metadata?: grpc.Metadata): Promise<GetSessionResponse> {
    return this.rpc.unary(SessionServiceGetSessionDesc, GetSessionRequest.fromPartial(request), metadata);
  }

  CreateSession(request: DeepPartial<CreateSessionRequest>, metadata?: grpc.Metadata): Promise<CreateSessionResponse> {
    return this.rpc.unary(SessionServiceCreateSessionDesc, CreateSessionRequest.fromPartial(request), metadata);
  }

  SetSession(request: DeepPartial<SetSessionRequest>, metadata?: grpc.Metadata): Promise<SetSessionResponse> {
    return this.rpc.unary(SessionServiceSetSessionDesc, SetSessionRequest.fromPartial(request), metadata);
  }

  DeleteSession(request: DeepPartial<DeleteSessionRequest>, metadata?: grpc.Metadata): Promise<DeleteSessionResponse> {
    return this.rpc.unary(SessionServiceDeleteSessionDesc, DeleteSessionRequest.fromPartial(request), metadata);
  }
}

export const SessionServiceDesc = { serviceName: "zitadel.session.v2alpha.SessionService" };

export const SessionServiceListSessionsDesc: UnaryMethodDefinitionish = {
  methodName: "ListSessions",
  service: SessionServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListSessionsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListSessionsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SessionServiceGetSessionDesc: UnaryMethodDefinitionish = {
  methodName: "GetSession",
  service: SessionServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetSessionRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetSessionResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SessionServiceCreateSessionDesc: UnaryMethodDefinitionish = {
  methodName: "CreateSession",
  service: SessionServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateSessionRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CreateSessionResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SessionServiceSetSessionDesc: UnaryMethodDefinitionish = {
  methodName: "SetSession",
  service: SessionServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SetSessionRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SetSessionResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SessionServiceDeleteSessionDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteSession",
  service: SessionServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteSessionRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = DeleteSessionResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
      upStreamRetryCodes?: number[];
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata ?? this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata ?? {},
        ...(this.options.transport !== undefined ? { transport: this.options.transport } : {}),
        debug: this.options.debug ?? false,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message!.toObject());
          } else {
            const err = new GrpcWebError(response.statusMessage, response.status, response.trailers);
            reject(err);
          }
        },
      });
    });
  }
}

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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends tsProtoGlobalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
