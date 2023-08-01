/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Duration } from "../google/protobuf/duration";
import { LocalizedMessage } from "./message";
import { ObjectDetails, TextQueryMethod, textQueryMethodFromJSON, textQueryMethodToJSON } from "./object";

export const protobufPackage = "zitadel.action.v1";

export enum ActionState {
  ACTION_STATE_UNSPECIFIED = 0,
  ACTION_STATE_INACTIVE = 1,
  ACTION_STATE_ACTIVE = 2,
  UNRECOGNIZED = -1,
}

export function actionStateFromJSON(object: any): ActionState {
  switch (object) {
    case 0:
    case "ACTION_STATE_UNSPECIFIED":
      return ActionState.ACTION_STATE_UNSPECIFIED;
    case 1:
    case "ACTION_STATE_INACTIVE":
      return ActionState.ACTION_STATE_INACTIVE;
    case 2:
    case "ACTION_STATE_ACTIVE":
      return ActionState.ACTION_STATE_ACTIVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ActionState.UNRECOGNIZED;
  }
}

export function actionStateToJSON(object: ActionState): string {
  switch (object) {
    case ActionState.ACTION_STATE_UNSPECIFIED:
      return "ACTION_STATE_UNSPECIFIED";
    case ActionState.ACTION_STATE_INACTIVE:
      return "ACTION_STATE_INACTIVE";
    case ActionState.ACTION_STATE_ACTIVE:
      return "ACTION_STATE_ACTIVE";
    case ActionState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ActionFieldName {
  ACTION_FIELD_NAME_UNSPECIFIED = 0,
  ACTION_FIELD_NAME_NAME = 1,
  ACTION_FIELD_NAME_ID = 2,
  ACTION_FIELD_NAME_STATE = 3,
  UNRECOGNIZED = -1,
}

export function actionFieldNameFromJSON(object: any): ActionFieldName {
  switch (object) {
    case 0:
    case "ACTION_FIELD_NAME_UNSPECIFIED":
      return ActionFieldName.ACTION_FIELD_NAME_UNSPECIFIED;
    case 1:
    case "ACTION_FIELD_NAME_NAME":
      return ActionFieldName.ACTION_FIELD_NAME_NAME;
    case 2:
    case "ACTION_FIELD_NAME_ID":
      return ActionFieldName.ACTION_FIELD_NAME_ID;
    case 3:
    case "ACTION_FIELD_NAME_STATE":
      return ActionFieldName.ACTION_FIELD_NAME_STATE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ActionFieldName.UNRECOGNIZED;
  }
}

export function actionFieldNameToJSON(object: ActionFieldName): string {
  switch (object) {
    case ActionFieldName.ACTION_FIELD_NAME_UNSPECIFIED:
      return "ACTION_FIELD_NAME_UNSPECIFIED";
    case ActionFieldName.ACTION_FIELD_NAME_NAME:
      return "ACTION_FIELD_NAME_NAME";
    case ActionFieldName.ACTION_FIELD_NAME_ID:
      return "ACTION_FIELD_NAME_ID";
    case ActionFieldName.ACTION_FIELD_NAME_STATE:
      return "ACTION_FIELD_NAME_STATE";
    case ActionFieldName.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum FlowState {
  FLOW_STATE_UNSPECIFIED = 0,
  FLOW_STATE_INACTIVE = 1,
  FLOW_STATE_ACTIVE = 2,
  UNRECOGNIZED = -1,
}

export function flowStateFromJSON(object: any): FlowState {
  switch (object) {
    case 0:
    case "FLOW_STATE_UNSPECIFIED":
      return FlowState.FLOW_STATE_UNSPECIFIED;
    case 1:
    case "FLOW_STATE_INACTIVE":
      return FlowState.FLOW_STATE_INACTIVE;
    case 2:
    case "FLOW_STATE_ACTIVE":
      return FlowState.FLOW_STATE_ACTIVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FlowState.UNRECOGNIZED;
  }
}

export function flowStateToJSON(object: FlowState): string {
  switch (object) {
    case FlowState.FLOW_STATE_UNSPECIFIED:
      return "FLOW_STATE_UNSPECIFIED";
    case FlowState.FLOW_STATE_INACTIVE:
      return "FLOW_STATE_INACTIVE";
    case FlowState.FLOW_STATE_ACTIVE:
      return "FLOW_STATE_ACTIVE";
    case FlowState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Action {
  id: string;
  details: ObjectDetails | undefined;
  state: ActionState;
  name: string;
  script: string;
  timeout: Duration | undefined;
  allowedToFail: boolean;
}

export interface ActionIDQuery {
  id: string;
}

export interface ActionNameQuery {
  name: string;
  method: TextQueryMethod;
}

/** ActionStateQuery always equals */
export interface ActionStateQuery {
  state: ActionState;
}

export interface Flow {
  /** id of the flow type */
  type: FlowType | undefined;
  details: ObjectDetails | undefined;
  state: FlowState;
  triggerActions: TriggerAction[];
}

export interface FlowType {
  /** identifier of the type */
  id: string;
  /** key and name of the type */
  name: LocalizedMessage | undefined;
}

export interface TriggerType {
  /** identifier of the type */
  id: string;
  /** key and name of the type */
  name: LocalizedMessage | undefined;
}

export interface TriggerAction {
  /** id of the trigger type */
  triggerType: TriggerType | undefined;
  actions: Action[];
}

function createBaseAction(): Action {
  return { id: "", details: undefined, state: 0, name: "", script: "", timeout: undefined, allowedToFail: false };
}

export const Action = {
  encode(message: Action, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(18).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(24).int32(message.state);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    if (message.script !== "") {
      writer.uint32(42).string(message.script);
    }
    if (message.timeout !== undefined) {
      Duration.encode(message.timeout, writer.uint32(50).fork()).ldelim();
    }
    if (message.allowedToFail === true) {
      writer.uint32(56).bool(message.allowedToFail);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Action {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAction();
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

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.name = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.script = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.timeout = Duration.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.allowedToFail = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Action {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      state: isSet(object.state) ? actionStateFromJSON(object.state) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      script: isSet(object.script) ? String(object.script) : "",
      timeout: isSet(object.timeout) ? Duration.fromJSON(object.timeout) : undefined,
      allowedToFail: isSet(object.allowedToFail) ? Boolean(object.allowedToFail) : false,
    };
  },

  toJSON(message: Action): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.state !== 0) {
      obj.state = actionStateToJSON(message.state);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.script !== "") {
      obj.script = message.script;
    }
    if (message.timeout !== undefined) {
      obj.timeout = Duration.toJSON(message.timeout);
    }
    if (message.allowedToFail === true) {
      obj.allowedToFail = message.allowedToFail;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Action>, I>>(base?: I): Action {
    return Action.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Action>, I>>(object: I): Action {
    const message = createBaseAction();
    message.id = object.id ?? "";
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.state = object.state ?? 0;
    message.name = object.name ?? "";
    message.script = object.script ?? "";
    message.timeout = (object.timeout !== undefined && object.timeout !== null)
      ? Duration.fromPartial(object.timeout)
      : undefined;
    message.allowedToFail = object.allowedToFail ?? false;
    return message;
  },
};

function createBaseActionIDQuery(): ActionIDQuery {
  return { id: "" };
}

export const ActionIDQuery = {
  encode(message: ActionIDQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionIDQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionIDQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionIDQuery {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: ActionIDQuery): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionIDQuery>, I>>(base?: I): ActionIDQuery {
    return ActionIDQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionIDQuery>, I>>(object: I): ActionIDQuery {
    const message = createBaseActionIDQuery();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseActionNameQuery(): ActionNameQuery {
  return { name: "", method: 0 };
}

export const ActionNameQuery = {
  encode(message: ActionNameQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionNameQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionNameQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
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

  fromJSON(object: any): ActionNameQuery {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      method: isSet(object.method) ? textQueryMethodFromJSON(object.method) : 0,
    };
  },

  toJSON(message: ActionNameQuery): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.method !== 0) {
      obj.method = textQueryMethodToJSON(message.method);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionNameQuery>, I>>(base?: I): ActionNameQuery {
    return ActionNameQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionNameQuery>, I>>(object: I): ActionNameQuery {
    const message = createBaseActionNameQuery();
    message.name = object.name ?? "";
    message.method = object.method ?? 0;
    return message;
  },
};

function createBaseActionStateQuery(): ActionStateQuery {
  return { state: 0 };
}

export const ActionStateQuery = {
  encode(message: ActionStateQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionStateQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionStateQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionStateQuery {
    return { state: isSet(object.state) ? actionStateFromJSON(object.state) : 0 };
  },

  toJSON(message: ActionStateQuery): unknown {
    const obj: any = {};
    if (message.state !== 0) {
      obj.state = actionStateToJSON(message.state);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionStateQuery>, I>>(base?: I): ActionStateQuery {
    return ActionStateQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionStateQuery>, I>>(object: I): ActionStateQuery {
    const message = createBaseActionStateQuery();
    message.state = object.state ?? 0;
    return message;
  },
};

function createBaseFlow(): Flow {
  return { type: undefined, details: undefined, state: 0, triggerActions: [] };
}

export const Flow = {
  encode(message: Flow, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== undefined) {
      FlowType.encode(message.type, writer.uint32(10).fork()).ldelim();
    }
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(18).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(24).int32(message.state);
    }
    for (const v of message.triggerActions) {
      TriggerAction.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Flow {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFlow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = FlowType.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.triggerActions.push(TriggerAction.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Flow {
    return {
      type: isSet(object.type) ? FlowType.fromJSON(object.type) : undefined,
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      state: isSet(object.state) ? flowStateFromJSON(object.state) : 0,
      triggerActions: Array.isArray(object?.triggerActions)
        ? object.triggerActions.map((e: any) => TriggerAction.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Flow): unknown {
    const obj: any = {};
    if (message.type !== undefined) {
      obj.type = FlowType.toJSON(message.type);
    }
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.state !== 0) {
      obj.state = flowStateToJSON(message.state);
    }
    if (message.triggerActions?.length) {
      obj.triggerActions = message.triggerActions.map((e) => TriggerAction.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Flow>, I>>(base?: I): Flow {
    return Flow.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Flow>, I>>(object: I): Flow {
    const message = createBaseFlow();
    message.type = (object.type !== undefined && object.type !== null) ? FlowType.fromPartial(object.type) : undefined;
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.state = object.state ?? 0;
    message.triggerActions = object.triggerActions?.map((e) => TriggerAction.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFlowType(): FlowType {
  return { id: "", name: undefined };
}

export const FlowType = {
  encode(message: FlowType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined) {
      LocalizedMessage.encode(message.name, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FlowType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFlowType();
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

          message.name = LocalizedMessage.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FlowType {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? LocalizedMessage.fromJSON(object.name) : undefined,
    };
  },

  toJSON(message: FlowType): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== undefined) {
      obj.name = LocalizedMessage.toJSON(message.name);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FlowType>, I>>(base?: I): FlowType {
    return FlowType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FlowType>, I>>(object: I): FlowType {
    const message = createBaseFlowType();
    message.id = object.id ?? "";
    message.name = (object.name !== undefined && object.name !== null)
      ? LocalizedMessage.fromPartial(object.name)
      : undefined;
    return message;
  },
};

function createBaseTriggerType(): TriggerType {
  return { id: "", name: undefined };
}

export const TriggerType = {
  encode(message: TriggerType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined) {
      LocalizedMessage.encode(message.name, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TriggerType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTriggerType();
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

          message.name = LocalizedMessage.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TriggerType {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? LocalizedMessage.fromJSON(object.name) : undefined,
    };
  },

  toJSON(message: TriggerType): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== undefined) {
      obj.name = LocalizedMessage.toJSON(message.name);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TriggerType>, I>>(base?: I): TriggerType {
    return TriggerType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TriggerType>, I>>(object: I): TriggerType {
    const message = createBaseTriggerType();
    message.id = object.id ?? "";
    message.name = (object.name !== undefined && object.name !== null)
      ? LocalizedMessage.fromPartial(object.name)
      : undefined;
    return message;
  },
};

function createBaseTriggerAction(): TriggerAction {
  return { triggerType: undefined, actions: [] };
}

export const TriggerAction = {
  encode(message: TriggerAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.triggerType !== undefined) {
      TriggerType.encode(message.triggerType, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.actions) {
      Action.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TriggerAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTriggerAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.triggerType = TriggerType.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.actions.push(Action.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TriggerAction {
    return {
      triggerType: isSet(object.triggerType) ? TriggerType.fromJSON(object.triggerType) : undefined,
      actions: Array.isArray(object?.actions) ? object.actions.map((e: any) => Action.fromJSON(e)) : [],
    };
  },

  toJSON(message: TriggerAction): unknown {
    const obj: any = {};
    if (message.triggerType !== undefined) {
      obj.triggerType = TriggerType.toJSON(message.triggerType);
    }
    if (message.actions?.length) {
      obj.actions = message.actions.map((e) => Action.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TriggerAction>, I>>(base?: I): TriggerAction {
    return TriggerAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TriggerAction>, I>>(object: I): TriggerAction {
    const message = createBaseTriggerAction();
    message.triggerType = (object.triggerType !== undefined && object.triggerType !== null)
      ? TriggerType.fromPartial(object.triggerType)
      : undefined;
    message.actions = object.actions?.map((e) => Action.fromPartial(e)) || [];
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
