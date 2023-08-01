/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../google/protobuf/duration";
import { Timestamp } from "../google/protobuf/timestamp";
import { KeyType, keyTypeFromJSON, keyTypeToJSON } from "./auth_n_key";
import {
  Domain,
  DomainFieldName,
  domainFieldNameFromJSON,
  domainFieldNameToJSON,
  DomainSearchQuery,
  FieldName,
  fieldNameFromJSON,
  fieldNameToJSON,
  Instance,
  InstanceDetail,
  Query,
} from "./instance";
import { Member, SearchQuery } from "./member";
import { ListDetails, ListQuery, ObjectDetails } from "./object";
import { Notification, Unit, unitFromJSON, unitToJSON } from "./quota";

export const protobufPackage = "zitadel.system.v1";

/** This is an empty request */
export interface HealthzRequest {
}

/** This is an empty response */
export interface HealthzResponse {
}

export interface ListInstancesRequest {
  /** list limitations and ordering */
  query:
    | ListQuery
    | undefined;
  /** the field the result is sorted */
  sortingColumn: FieldName;
  /** criterias the client is looking for */
  queries: Query[];
}

export interface ListInstancesResponse {
  details: ListDetails | undefined;
  sortingColumn: FieldName;
  result: Instance[];
}

export interface GetInstanceRequest {
  instanceId: string;
}

export interface GetInstanceResponse {
  instance: InstanceDetail | undefined;
}

export interface AddInstanceRequest {
  instanceName: string;
  firstOrgName: string;
  customDomain: string;
  ownerUserName: string;
  ownerEmail: AddInstanceRequest_Email | undefined;
  ownerProfile: AddInstanceRequest_Profile | undefined;
  ownerPassword: AddInstanceRequest_Password | undefined;
  defaultLanguage: string;
}

export interface AddInstanceRequest_Profile {
  firstName: string;
  lastName: string;
  preferredLanguage: string;
}

export interface AddInstanceRequest_Email {
  email: string;
  isEmailVerified: boolean;
}

export interface AddInstanceRequest_Password {
  password: string;
  passwordChangeRequired: boolean;
}

export interface AddInstanceResponse {
  instanceId: string;
  details: ObjectDetails | undefined;
}

export interface CreateInstanceRequest {
  instanceName: string;
  firstOrgName: string;
  customDomain: string;
  /** oneof field for the user managing the instance */
  human?: CreateInstanceRequest_Human | undefined;
  machine?: CreateInstanceRequest_Machine | undefined;
  defaultLanguage: string;
}

export interface CreateInstanceRequest_Profile {
  firstName: string;
  lastName: string;
  preferredLanguage: string;
}

export interface CreateInstanceRequest_Email {
  email: string;
  isEmailVerified: boolean;
}

export interface CreateInstanceRequest_Password {
  password: string;
  passwordChangeRequired: boolean;
}

export interface CreateInstanceRequest_Human {
  userName: string;
  email: CreateInstanceRequest_Email | undefined;
  profile: CreateInstanceRequest_Profile | undefined;
  password: CreateInstanceRequest_Password | undefined;
}

export interface CreateInstanceRequest_PersonalAccessToken {
  expirationDate: Date | undefined;
}

export interface CreateInstanceRequest_MachineKey {
  type: KeyType;
  expirationDate: Date | undefined;
}

export interface CreateInstanceRequest_Machine {
  userName: string;
  name: string;
  personalAccessToken: CreateInstanceRequest_PersonalAccessToken | undefined;
  machineKey: CreateInstanceRequest_MachineKey | undefined;
}

export interface CreateInstanceResponse {
  instanceId: string;
  details: ObjectDetails | undefined;
  pat: string;
  machineKey: Uint8Array;
}

export interface UpdateInstanceRequest {
  instanceId: string;
  instanceName: string;
}

export interface UpdateInstanceResponse {
  details: ObjectDetails | undefined;
}

export interface RemoveInstanceRequest {
  instanceId: string;
}

export interface RemoveInstanceResponse {
  details: ObjectDetails | undefined;
}

export interface ListIAMMembersRequest {
  query: ListQuery | undefined;
  instanceId: string;
  queries: SearchQuery[];
}

export interface ListIAMMembersResponse {
  details: ListDetails | undefined;
  result: Member[];
}

export interface GetUsageRequest {
  instanceId: string;
}

export interface AddQuotaRequest {
  instanceId: string;
  /** the unit a quota should be imposed on */
  unit: Unit;
  /** the starting time from which the current quota period is calculated from. This is relevant for querying the current usage. */
  from:
    | Date
    | undefined;
  /** the quota periods duration */
  resetInterval:
    | Duration
    | undefined;
  /** the quota amount of units */
  amount: number;
  /** whether ZITADEL should block further usage when the configured amount is used */
  limit: boolean;
  /** the handlers, ZITADEL executes when certain quota percentages are reached */
  notifications: Notification[];
}

export interface AddQuotaResponse {
  details: ObjectDetails | undefined;
}

export interface RemoveQuotaRequest {
  instanceId: string;
  unit: Unit;
}

export interface RemoveQuotaResponse {
  details: ObjectDetails | undefined;
}

export interface ExistsDomainRequest {
  domain: string;
}

export interface ExistsDomainResponse {
  exists: boolean;
}

export interface ListDomainsRequest {
  /** list limitations and ordering */
  instanceId: string;
  query:
    | ListQuery
    | undefined;
  /** the field the result is sorted */
  sortingColumn: DomainFieldName;
  /** criterias the client is looking for */
  queries: DomainSearchQuery[];
}

export interface ListDomainsResponse {
  details: ListDetails | undefined;
  sortingColumn: DomainFieldName;
  result: Domain[];
}

export interface AddDomainRequest {
  instanceId: string;
  domain: string;
}

export interface AddDomainResponse {
  details: ObjectDetails | undefined;
}

export interface RemoveDomainRequest {
  instanceId: string;
  domain: string;
}

export interface RemoveDomainResponse {
  details: ObjectDetails | undefined;
}

export interface SetPrimaryDomainRequest {
  instanceId: string;
  domain: string;
}

export interface SetPrimaryDomainResponse {
  details: ObjectDetails | undefined;
}

export interface ChangeSubscriptionRequest {
  domain: string;
  subscriptionName: string;
  requestLimit: number;
  actionMinsLimit: number;
}

export interface ChangeSubscriptionResponse {
  details: ObjectDetails | undefined;
}

/** This is an empty request */
export interface ListViewsRequest {
}

export interface ListViewsResponse {
  /** TODO: list details */
  result: View[];
}

export interface ClearViewRequest {
  database: string;
  viewName: string;
}

/** This is an empty response */
export interface ClearViewResponse {
}

/** This is an empty request */
export interface ListFailedEventsRequest {
}

export interface ListFailedEventsResponse {
  /** TODO: list details */
  result: FailedEvent[];
}

export interface RemoveFailedEventRequest {
  database: string;
  viewName: string;
  failedSequence: number;
  instanceId: string;
}

/** This is an empty response */
export interface RemoveFailedEventResponse {
}

export interface View {
  database: string;
  viewName: string;
  processedSequence: number;
  /** The timestamp the event occured */
  eventTimestamp: Date | undefined;
  lastSuccessfulSpoolerRun: Date | undefined;
  instance: string;
}

export interface FailedEvent {
  database: string;
  viewName: string;
  failedSequence: number;
  failureCount: number;
  errorMessage: string;
  lastFailed: Date | undefined;
}

function createBaseHealthzRequest(): HealthzRequest {
  return {};
}

export const HealthzRequest = {
  encode(_: HealthzRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HealthzRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHealthzRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): HealthzRequest {
    return {};
  },

  toJSON(_: HealthzRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<HealthzRequest>, I>>(base?: I): HealthzRequest {
    return HealthzRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HealthzRequest>, I>>(_: I): HealthzRequest {
    const message = createBaseHealthzRequest();
    return message;
  },
};

function createBaseHealthzResponse(): HealthzResponse {
  return {};
}

export const HealthzResponse = {
  encode(_: HealthzResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HealthzResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHealthzResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): HealthzResponse {
    return {};
  },

  toJSON(_: HealthzResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<HealthzResponse>, I>>(base?: I): HealthzResponse {
    return HealthzResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HealthzResponse>, I>>(_: I): HealthzResponse {
    const message = createBaseHealthzResponse();
    return message;
  },
};

function createBaseListInstancesRequest(): ListInstancesRequest {
  return { query: undefined, sortingColumn: 0, queries: [] };
}

export const ListInstancesRequest = {
  encode(message: ListInstancesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== undefined) {
      ListQuery.encode(message.query, writer.uint32(10).fork()).ldelim();
    }
    if (message.sortingColumn !== 0) {
      writer.uint32(16).int32(message.sortingColumn);
    }
    for (const v of message.queries) {
      Query.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListInstancesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListInstancesRequest();
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
          if (tag !== 16) {
            break;
          }

          message.sortingColumn = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.queries.push(Query.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListInstancesRequest {
    return {
      query: isSet(object.query) ? ListQuery.fromJSON(object.query) : undefined,
      sortingColumn: isSet(object.sortingColumn) ? fieldNameFromJSON(object.sortingColumn) : 0,
      queries: Array.isArray(object?.queries) ? object.queries.map((e: any) => Query.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListInstancesRequest): unknown {
    const obj: any = {};
    if (message.query !== undefined) {
      obj.query = ListQuery.toJSON(message.query);
    }
    if (message.sortingColumn !== 0) {
      obj.sortingColumn = fieldNameToJSON(message.sortingColumn);
    }
    if (message.queries?.length) {
      obj.queries = message.queries.map((e) => Query.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListInstancesRequest>, I>>(base?: I): ListInstancesRequest {
    return ListInstancesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListInstancesRequest>, I>>(object: I): ListInstancesRequest {
    const message = createBaseListInstancesRequest();
    message.query = (object.query !== undefined && object.query !== null)
      ? ListQuery.fromPartial(object.query)
      : undefined;
    message.sortingColumn = object.sortingColumn ?? 0;
    message.queries = object.queries?.map((e) => Query.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListInstancesResponse(): ListInstancesResponse {
  return { details: undefined, sortingColumn: 0, result: [] };
}

export const ListInstancesResponse = {
  encode(message: ListInstancesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ListDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.sortingColumn !== 0) {
      writer.uint32(16).int32(message.sortingColumn);
    }
    for (const v of message.result) {
      Instance.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListInstancesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListInstancesResponse();
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
          if (tag !== 16) {
            break;
          }

          message.sortingColumn = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.result.push(Instance.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListInstancesResponse {
    return {
      details: isSet(object.details) ? ListDetails.fromJSON(object.details) : undefined,
      sortingColumn: isSet(object.sortingColumn) ? fieldNameFromJSON(object.sortingColumn) : 0,
      result: Array.isArray(object?.result) ? object.result.map((e: any) => Instance.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListInstancesResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ListDetails.toJSON(message.details);
    }
    if (message.sortingColumn !== 0) {
      obj.sortingColumn = fieldNameToJSON(message.sortingColumn);
    }
    if (message.result?.length) {
      obj.result = message.result.map((e) => Instance.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListInstancesResponse>, I>>(base?: I): ListInstancesResponse {
    return ListInstancesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListInstancesResponse>, I>>(object: I): ListInstancesResponse {
    const message = createBaseListInstancesResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ListDetails.fromPartial(object.details)
      : undefined;
    message.sortingColumn = object.sortingColumn ?? 0;
    message.result = object.result?.map((e) => Instance.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetInstanceRequest(): GetInstanceRequest {
  return { instanceId: "" };
}

export const GetInstanceRequest = {
  encode(message: GetInstanceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceId !== "") {
      writer.uint32(10).string(message.instanceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetInstanceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetInstanceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instanceId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetInstanceRequest {
    return { instanceId: isSet(object.instanceId) ? String(object.instanceId) : "" };
  },

  toJSON(message: GetInstanceRequest): unknown {
    const obj: any = {};
    if (message.instanceId !== "") {
      obj.instanceId = message.instanceId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetInstanceRequest>, I>>(base?: I): GetInstanceRequest {
    return GetInstanceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetInstanceRequest>, I>>(object: I): GetInstanceRequest {
    const message = createBaseGetInstanceRequest();
    message.instanceId = object.instanceId ?? "";
    return message;
  },
};

function createBaseGetInstanceResponse(): GetInstanceResponse {
  return { instance: undefined };
}

export const GetInstanceResponse = {
  encode(message: GetInstanceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instance !== undefined) {
      InstanceDetail.encode(message.instance, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetInstanceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetInstanceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instance = InstanceDetail.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetInstanceResponse {
    return { instance: isSet(object.instance) ? InstanceDetail.fromJSON(object.instance) : undefined };
  },

  toJSON(message: GetInstanceResponse): unknown {
    const obj: any = {};
    if (message.instance !== undefined) {
      obj.instance = InstanceDetail.toJSON(message.instance);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetInstanceResponse>, I>>(base?: I): GetInstanceResponse {
    return GetInstanceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetInstanceResponse>, I>>(object: I): GetInstanceResponse {
    const message = createBaseGetInstanceResponse();
    message.instance = (object.instance !== undefined && object.instance !== null)
      ? InstanceDetail.fromPartial(object.instance)
      : undefined;
    return message;
  },
};

function createBaseAddInstanceRequest(): AddInstanceRequest {
  return {
    instanceName: "",
    firstOrgName: "",
    customDomain: "",
    ownerUserName: "",
    ownerEmail: undefined,
    ownerProfile: undefined,
    ownerPassword: undefined,
    defaultLanguage: "",
  };
}

export const AddInstanceRequest = {
  encode(message: AddInstanceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceName !== "") {
      writer.uint32(10).string(message.instanceName);
    }
    if (message.firstOrgName !== "") {
      writer.uint32(18).string(message.firstOrgName);
    }
    if (message.customDomain !== "") {
      writer.uint32(26).string(message.customDomain);
    }
    if (message.ownerUserName !== "") {
      writer.uint32(34).string(message.ownerUserName);
    }
    if (message.ownerEmail !== undefined) {
      AddInstanceRequest_Email.encode(message.ownerEmail, writer.uint32(42).fork()).ldelim();
    }
    if (message.ownerProfile !== undefined) {
      AddInstanceRequest_Profile.encode(message.ownerProfile, writer.uint32(50).fork()).ldelim();
    }
    if (message.ownerPassword !== undefined) {
      AddInstanceRequest_Password.encode(message.ownerPassword, writer.uint32(58).fork()).ldelim();
    }
    if (message.defaultLanguage !== "") {
      writer.uint32(66).string(message.defaultLanguage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddInstanceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddInstanceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instanceName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.firstOrgName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.customDomain = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.ownerUserName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.ownerEmail = AddInstanceRequest_Email.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.ownerProfile = AddInstanceRequest_Profile.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.ownerPassword = AddInstanceRequest_Password.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.defaultLanguage = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddInstanceRequest {
    return {
      instanceName: isSet(object.instanceName) ? String(object.instanceName) : "",
      firstOrgName: isSet(object.firstOrgName) ? String(object.firstOrgName) : "",
      customDomain: isSet(object.customDomain) ? String(object.customDomain) : "",
      ownerUserName: isSet(object.ownerUserName) ? String(object.ownerUserName) : "",
      ownerEmail: isSet(object.ownerEmail) ? AddInstanceRequest_Email.fromJSON(object.ownerEmail) : undefined,
      ownerProfile: isSet(object.ownerProfile) ? AddInstanceRequest_Profile.fromJSON(object.ownerProfile) : undefined,
      ownerPassword: isSet(object.ownerPassword)
        ? AddInstanceRequest_Password.fromJSON(object.ownerPassword)
        : undefined,
      defaultLanguage: isSet(object.defaultLanguage) ? String(object.defaultLanguage) : "",
    };
  },

  toJSON(message: AddInstanceRequest): unknown {
    const obj: any = {};
    if (message.instanceName !== "") {
      obj.instanceName = message.instanceName;
    }
    if (message.firstOrgName !== "") {
      obj.firstOrgName = message.firstOrgName;
    }
    if (message.customDomain !== "") {
      obj.customDomain = message.customDomain;
    }
    if (message.ownerUserName !== "") {
      obj.ownerUserName = message.ownerUserName;
    }
    if (message.ownerEmail !== undefined) {
      obj.ownerEmail = AddInstanceRequest_Email.toJSON(message.ownerEmail);
    }
    if (message.ownerProfile !== undefined) {
      obj.ownerProfile = AddInstanceRequest_Profile.toJSON(message.ownerProfile);
    }
    if (message.ownerPassword !== undefined) {
      obj.ownerPassword = AddInstanceRequest_Password.toJSON(message.ownerPassword);
    }
    if (message.defaultLanguage !== "") {
      obj.defaultLanguage = message.defaultLanguage;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddInstanceRequest>, I>>(base?: I): AddInstanceRequest {
    return AddInstanceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddInstanceRequest>, I>>(object: I): AddInstanceRequest {
    const message = createBaseAddInstanceRequest();
    message.instanceName = object.instanceName ?? "";
    message.firstOrgName = object.firstOrgName ?? "";
    message.customDomain = object.customDomain ?? "";
    message.ownerUserName = object.ownerUserName ?? "";
    message.ownerEmail = (object.ownerEmail !== undefined && object.ownerEmail !== null)
      ? AddInstanceRequest_Email.fromPartial(object.ownerEmail)
      : undefined;
    message.ownerProfile = (object.ownerProfile !== undefined && object.ownerProfile !== null)
      ? AddInstanceRequest_Profile.fromPartial(object.ownerProfile)
      : undefined;
    message.ownerPassword = (object.ownerPassword !== undefined && object.ownerPassword !== null)
      ? AddInstanceRequest_Password.fromPartial(object.ownerPassword)
      : undefined;
    message.defaultLanguage = object.defaultLanguage ?? "";
    return message;
  },
};

function createBaseAddInstanceRequest_Profile(): AddInstanceRequest_Profile {
  return { firstName: "", lastName: "", preferredLanguage: "" };
}

export const AddInstanceRequest_Profile = {
  encode(message: AddInstanceRequest_Profile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.firstName !== "") {
      writer.uint32(10).string(message.firstName);
    }
    if (message.lastName !== "") {
      writer.uint32(18).string(message.lastName);
    }
    if (message.preferredLanguage !== "") {
      writer.uint32(42).string(message.preferredLanguage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddInstanceRequest_Profile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddInstanceRequest_Profile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.firstName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.preferredLanguage = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddInstanceRequest_Profile {
    return {
      firstName: isSet(object.firstName) ? String(object.firstName) : "",
      lastName: isSet(object.lastName) ? String(object.lastName) : "",
      preferredLanguage: isSet(object.preferredLanguage) ? String(object.preferredLanguage) : "",
    };
  },

  toJSON(message: AddInstanceRequest_Profile): unknown {
    const obj: any = {};
    if (message.firstName !== "") {
      obj.firstName = message.firstName;
    }
    if (message.lastName !== "") {
      obj.lastName = message.lastName;
    }
    if (message.preferredLanguage !== "") {
      obj.preferredLanguage = message.preferredLanguage;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddInstanceRequest_Profile>, I>>(base?: I): AddInstanceRequest_Profile {
    return AddInstanceRequest_Profile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddInstanceRequest_Profile>, I>>(object: I): AddInstanceRequest_Profile {
    const message = createBaseAddInstanceRequest_Profile();
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.preferredLanguage = object.preferredLanguage ?? "";
    return message;
  },
};

function createBaseAddInstanceRequest_Email(): AddInstanceRequest_Email {
  return { email: "", isEmailVerified: false };
}

export const AddInstanceRequest_Email = {
  encode(message: AddInstanceRequest_Email, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.isEmailVerified === true) {
      writer.uint32(16).bool(message.isEmailVerified);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddInstanceRequest_Email {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddInstanceRequest_Email();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.isEmailVerified = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddInstanceRequest_Email {
    return {
      email: isSet(object.email) ? String(object.email) : "",
      isEmailVerified: isSet(object.isEmailVerified) ? Boolean(object.isEmailVerified) : false,
    };
  },

  toJSON(message: AddInstanceRequest_Email): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.isEmailVerified === true) {
      obj.isEmailVerified = message.isEmailVerified;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddInstanceRequest_Email>, I>>(base?: I): AddInstanceRequest_Email {
    return AddInstanceRequest_Email.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddInstanceRequest_Email>, I>>(object: I): AddInstanceRequest_Email {
    const message = createBaseAddInstanceRequest_Email();
    message.email = object.email ?? "";
    message.isEmailVerified = object.isEmailVerified ?? false;
    return message;
  },
};

function createBaseAddInstanceRequest_Password(): AddInstanceRequest_Password {
  return { password: "", passwordChangeRequired: false };
}

export const AddInstanceRequest_Password = {
  encode(message: AddInstanceRequest_Password, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.password !== "") {
      writer.uint32(10).string(message.password);
    }
    if (message.passwordChangeRequired === true) {
      writer.uint32(16).bool(message.passwordChangeRequired);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddInstanceRequest_Password {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddInstanceRequest_Password();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.password = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.passwordChangeRequired = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddInstanceRequest_Password {
    return {
      password: isSet(object.password) ? String(object.password) : "",
      passwordChangeRequired: isSet(object.passwordChangeRequired) ? Boolean(object.passwordChangeRequired) : false,
    };
  },

  toJSON(message: AddInstanceRequest_Password): unknown {
    const obj: any = {};
    if (message.password !== "") {
      obj.password = message.password;
    }
    if (message.passwordChangeRequired === true) {
      obj.passwordChangeRequired = message.passwordChangeRequired;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddInstanceRequest_Password>, I>>(base?: I): AddInstanceRequest_Password {
    return AddInstanceRequest_Password.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddInstanceRequest_Password>, I>>(object: I): AddInstanceRequest_Password {
    const message = createBaseAddInstanceRequest_Password();
    message.password = object.password ?? "";
    message.passwordChangeRequired = object.passwordChangeRequired ?? false;
    return message;
  },
};

function createBaseAddInstanceResponse(): AddInstanceResponse {
  return { instanceId: "", details: undefined };
}

export const AddInstanceResponse = {
  encode(message: AddInstanceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceId !== "") {
      writer.uint32(10).string(message.instanceId);
    }
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddInstanceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddInstanceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instanceId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddInstanceResponse {
    return {
      instanceId: isSet(object.instanceId) ? String(object.instanceId) : "",
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
    };
  },

  toJSON(message: AddInstanceResponse): unknown {
    const obj: any = {};
    if (message.instanceId !== "") {
      obj.instanceId = message.instanceId;
    }
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddInstanceResponse>, I>>(base?: I): AddInstanceResponse {
    return AddInstanceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddInstanceResponse>, I>>(object: I): AddInstanceResponse {
    const message = createBaseAddInstanceResponse();
    message.instanceId = object.instanceId ?? "";
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseCreateInstanceRequest(): CreateInstanceRequest {
  return {
    instanceName: "",
    firstOrgName: "",
    customDomain: "",
    human: undefined,
    machine: undefined,
    defaultLanguage: "",
  };
}

export const CreateInstanceRequest = {
  encode(message: CreateInstanceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceName !== "") {
      writer.uint32(10).string(message.instanceName);
    }
    if (message.firstOrgName !== "") {
      writer.uint32(18).string(message.firstOrgName);
    }
    if (message.customDomain !== "") {
      writer.uint32(26).string(message.customDomain);
    }
    if (message.human !== undefined) {
      CreateInstanceRequest_Human.encode(message.human, writer.uint32(34).fork()).ldelim();
    }
    if (message.machine !== undefined) {
      CreateInstanceRequest_Machine.encode(message.machine, writer.uint32(42).fork()).ldelim();
    }
    if (message.defaultLanguage !== "") {
      writer.uint32(50).string(message.defaultLanguage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateInstanceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInstanceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instanceName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.firstOrgName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.customDomain = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.human = CreateInstanceRequest_Human.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.machine = CreateInstanceRequest_Machine.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.defaultLanguage = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateInstanceRequest {
    return {
      instanceName: isSet(object.instanceName) ? String(object.instanceName) : "",
      firstOrgName: isSet(object.firstOrgName) ? String(object.firstOrgName) : "",
      customDomain: isSet(object.customDomain) ? String(object.customDomain) : "",
      human: isSet(object.human) ? CreateInstanceRequest_Human.fromJSON(object.human) : undefined,
      machine: isSet(object.machine) ? CreateInstanceRequest_Machine.fromJSON(object.machine) : undefined,
      defaultLanguage: isSet(object.defaultLanguage) ? String(object.defaultLanguage) : "",
    };
  },

  toJSON(message: CreateInstanceRequest): unknown {
    const obj: any = {};
    if (message.instanceName !== "") {
      obj.instanceName = message.instanceName;
    }
    if (message.firstOrgName !== "") {
      obj.firstOrgName = message.firstOrgName;
    }
    if (message.customDomain !== "") {
      obj.customDomain = message.customDomain;
    }
    if (message.human !== undefined) {
      obj.human = CreateInstanceRequest_Human.toJSON(message.human);
    }
    if (message.machine !== undefined) {
      obj.machine = CreateInstanceRequest_Machine.toJSON(message.machine);
    }
    if (message.defaultLanguage !== "") {
      obj.defaultLanguage = message.defaultLanguage;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateInstanceRequest>, I>>(base?: I): CreateInstanceRequest {
    return CreateInstanceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateInstanceRequest>, I>>(object: I): CreateInstanceRequest {
    const message = createBaseCreateInstanceRequest();
    message.instanceName = object.instanceName ?? "";
    message.firstOrgName = object.firstOrgName ?? "";
    message.customDomain = object.customDomain ?? "";
    message.human = (object.human !== undefined && object.human !== null)
      ? CreateInstanceRequest_Human.fromPartial(object.human)
      : undefined;
    message.machine = (object.machine !== undefined && object.machine !== null)
      ? CreateInstanceRequest_Machine.fromPartial(object.machine)
      : undefined;
    message.defaultLanguage = object.defaultLanguage ?? "";
    return message;
  },
};

function createBaseCreateInstanceRequest_Profile(): CreateInstanceRequest_Profile {
  return { firstName: "", lastName: "", preferredLanguage: "" };
}

export const CreateInstanceRequest_Profile = {
  encode(message: CreateInstanceRequest_Profile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.firstName !== "") {
      writer.uint32(10).string(message.firstName);
    }
    if (message.lastName !== "") {
      writer.uint32(18).string(message.lastName);
    }
    if (message.preferredLanguage !== "") {
      writer.uint32(26).string(message.preferredLanguage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateInstanceRequest_Profile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInstanceRequest_Profile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.firstName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.preferredLanguage = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateInstanceRequest_Profile {
    return {
      firstName: isSet(object.firstName) ? String(object.firstName) : "",
      lastName: isSet(object.lastName) ? String(object.lastName) : "",
      preferredLanguage: isSet(object.preferredLanguage) ? String(object.preferredLanguage) : "",
    };
  },

  toJSON(message: CreateInstanceRequest_Profile): unknown {
    const obj: any = {};
    if (message.firstName !== "") {
      obj.firstName = message.firstName;
    }
    if (message.lastName !== "") {
      obj.lastName = message.lastName;
    }
    if (message.preferredLanguage !== "") {
      obj.preferredLanguage = message.preferredLanguage;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateInstanceRequest_Profile>, I>>(base?: I): CreateInstanceRequest_Profile {
    return CreateInstanceRequest_Profile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateInstanceRequest_Profile>, I>>(
    object: I,
  ): CreateInstanceRequest_Profile {
    const message = createBaseCreateInstanceRequest_Profile();
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.preferredLanguage = object.preferredLanguage ?? "";
    return message;
  },
};

function createBaseCreateInstanceRequest_Email(): CreateInstanceRequest_Email {
  return { email: "", isEmailVerified: false };
}

export const CreateInstanceRequest_Email = {
  encode(message: CreateInstanceRequest_Email, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.isEmailVerified === true) {
      writer.uint32(16).bool(message.isEmailVerified);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateInstanceRequest_Email {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInstanceRequest_Email();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.isEmailVerified = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateInstanceRequest_Email {
    return {
      email: isSet(object.email) ? String(object.email) : "",
      isEmailVerified: isSet(object.isEmailVerified) ? Boolean(object.isEmailVerified) : false,
    };
  },

  toJSON(message: CreateInstanceRequest_Email): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.isEmailVerified === true) {
      obj.isEmailVerified = message.isEmailVerified;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateInstanceRequest_Email>, I>>(base?: I): CreateInstanceRequest_Email {
    return CreateInstanceRequest_Email.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateInstanceRequest_Email>, I>>(object: I): CreateInstanceRequest_Email {
    const message = createBaseCreateInstanceRequest_Email();
    message.email = object.email ?? "";
    message.isEmailVerified = object.isEmailVerified ?? false;
    return message;
  },
};

function createBaseCreateInstanceRequest_Password(): CreateInstanceRequest_Password {
  return { password: "", passwordChangeRequired: false };
}

export const CreateInstanceRequest_Password = {
  encode(message: CreateInstanceRequest_Password, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.password !== "") {
      writer.uint32(10).string(message.password);
    }
    if (message.passwordChangeRequired === true) {
      writer.uint32(16).bool(message.passwordChangeRequired);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateInstanceRequest_Password {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInstanceRequest_Password();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.password = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.passwordChangeRequired = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateInstanceRequest_Password {
    return {
      password: isSet(object.password) ? String(object.password) : "",
      passwordChangeRequired: isSet(object.passwordChangeRequired) ? Boolean(object.passwordChangeRequired) : false,
    };
  },

  toJSON(message: CreateInstanceRequest_Password): unknown {
    const obj: any = {};
    if (message.password !== "") {
      obj.password = message.password;
    }
    if (message.passwordChangeRequired === true) {
      obj.passwordChangeRequired = message.passwordChangeRequired;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateInstanceRequest_Password>, I>>(base?: I): CreateInstanceRequest_Password {
    return CreateInstanceRequest_Password.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateInstanceRequest_Password>, I>>(
    object: I,
  ): CreateInstanceRequest_Password {
    const message = createBaseCreateInstanceRequest_Password();
    message.password = object.password ?? "";
    message.passwordChangeRequired = object.passwordChangeRequired ?? false;
    return message;
  },
};

function createBaseCreateInstanceRequest_Human(): CreateInstanceRequest_Human {
  return { userName: "", email: undefined, profile: undefined, password: undefined };
}

export const CreateInstanceRequest_Human = {
  encode(message: CreateInstanceRequest_Human, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userName !== "") {
      writer.uint32(10).string(message.userName);
    }
    if (message.email !== undefined) {
      CreateInstanceRequest_Email.encode(message.email, writer.uint32(18).fork()).ldelim();
    }
    if (message.profile !== undefined) {
      CreateInstanceRequest_Profile.encode(message.profile, writer.uint32(26).fork()).ldelim();
    }
    if (message.password !== undefined) {
      CreateInstanceRequest_Password.encode(message.password, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateInstanceRequest_Human {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInstanceRequest_Human();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.email = CreateInstanceRequest_Email.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.profile = CreateInstanceRequest_Profile.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.password = CreateInstanceRequest_Password.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateInstanceRequest_Human {
    return {
      userName: isSet(object.userName) ? String(object.userName) : "",
      email: isSet(object.email) ? CreateInstanceRequest_Email.fromJSON(object.email) : undefined,
      profile: isSet(object.profile) ? CreateInstanceRequest_Profile.fromJSON(object.profile) : undefined,
      password: isSet(object.password) ? CreateInstanceRequest_Password.fromJSON(object.password) : undefined,
    };
  },

  toJSON(message: CreateInstanceRequest_Human): unknown {
    const obj: any = {};
    if (message.userName !== "") {
      obj.userName = message.userName;
    }
    if (message.email !== undefined) {
      obj.email = CreateInstanceRequest_Email.toJSON(message.email);
    }
    if (message.profile !== undefined) {
      obj.profile = CreateInstanceRequest_Profile.toJSON(message.profile);
    }
    if (message.password !== undefined) {
      obj.password = CreateInstanceRequest_Password.toJSON(message.password);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateInstanceRequest_Human>, I>>(base?: I): CreateInstanceRequest_Human {
    return CreateInstanceRequest_Human.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateInstanceRequest_Human>, I>>(object: I): CreateInstanceRequest_Human {
    const message = createBaseCreateInstanceRequest_Human();
    message.userName = object.userName ?? "";
    message.email = (object.email !== undefined && object.email !== null)
      ? CreateInstanceRequest_Email.fromPartial(object.email)
      : undefined;
    message.profile = (object.profile !== undefined && object.profile !== null)
      ? CreateInstanceRequest_Profile.fromPartial(object.profile)
      : undefined;
    message.password = (object.password !== undefined && object.password !== null)
      ? CreateInstanceRequest_Password.fromPartial(object.password)
      : undefined;
    return message;
  },
};

function createBaseCreateInstanceRequest_PersonalAccessToken(): CreateInstanceRequest_PersonalAccessToken {
  return { expirationDate: undefined };
}

export const CreateInstanceRequest_PersonalAccessToken = {
  encode(message: CreateInstanceRequest_PersonalAccessToken, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.expirationDate !== undefined) {
      Timestamp.encode(toTimestamp(message.expirationDate), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateInstanceRequest_PersonalAccessToken {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInstanceRequest_PersonalAccessToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.expirationDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateInstanceRequest_PersonalAccessToken {
    return { expirationDate: isSet(object.expirationDate) ? fromJsonTimestamp(object.expirationDate) : undefined };
  },

  toJSON(message: CreateInstanceRequest_PersonalAccessToken): unknown {
    const obj: any = {};
    if (message.expirationDate !== undefined) {
      obj.expirationDate = message.expirationDate.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateInstanceRequest_PersonalAccessToken>, I>>(
    base?: I,
  ): CreateInstanceRequest_PersonalAccessToken {
    return CreateInstanceRequest_PersonalAccessToken.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateInstanceRequest_PersonalAccessToken>, I>>(
    object: I,
  ): CreateInstanceRequest_PersonalAccessToken {
    const message = createBaseCreateInstanceRequest_PersonalAccessToken();
    message.expirationDate = object.expirationDate ?? undefined;
    return message;
  },
};

function createBaseCreateInstanceRequest_MachineKey(): CreateInstanceRequest_MachineKey {
  return { type: 0, expirationDate: undefined };
}

export const CreateInstanceRequest_MachineKey = {
  encode(message: CreateInstanceRequest_MachineKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.expirationDate !== undefined) {
      Timestamp.encode(toTimestamp(message.expirationDate), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateInstanceRequest_MachineKey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInstanceRequest_MachineKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.expirationDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateInstanceRequest_MachineKey {
    return {
      type: isSet(object.type) ? keyTypeFromJSON(object.type) : 0,
      expirationDate: isSet(object.expirationDate) ? fromJsonTimestamp(object.expirationDate) : undefined,
    };
  },

  toJSON(message: CreateInstanceRequest_MachineKey): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = keyTypeToJSON(message.type);
    }
    if (message.expirationDate !== undefined) {
      obj.expirationDate = message.expirationDate.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateInstanceRequest_MachineKey>, I>>(
    base?: I,
  ): CreateInstanceRequest_MachineKey {
    return CreateInstanceRequest_MachineKey.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateInstanceRequest_MachineKey>, I>>(
    object: I,
  ): CreateInstanceRequest_MachineKey {
    const message = createBaseCreateInstanceRequest_MachineKey();
    message.type = object.type ?? 0;
    message.expirationDate = object.expirationDate ?? undefined;
    return message;
  },
};

function createBaseCreateInstanceRequest_Machine(): CreateInstanceRequest_Machine {
  return { userName: "", name: "", personalAccessToken: undefined, machineKey: undefined };
}

export const CreateInstanceRequest_Machine = {
  encode(message: CreateInstanceRequest_Machine, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userName !== "") {
      writer.uint32(10).string(message.userName);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.personalAccessToken !== undefined) {
      CreateInstanceRequest_PersonalAccessToken.encode(message.personalAccessToken, writer.uint32(26).fork()).ldelim();
    }
    if (message.machineKey !== undefined) {
      CreateInstanceRequest_MachineKey.encode(message.machineKey, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateInstanceRequest_Machine {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInstanceRequest_Machine();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.personalAccessToken = CreateInstanceRequest_PersonalAccessToken.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.machineKey = CreateInstanceRequest_MachineKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateInstanceRequest_Machine {
    return {
      userName: isSet(object.userName) ? String(object.userName) : "",
      name: isSet(object.name) ? String(object.name) : "",
      personalAccessToken: isSet(object.personalAccessToken)
        ? CreateInstanceRequest_PersonalAccessToken.fromJSON(object.personalAccessToken)
        : undefined,
      machineKey: isSet(object.machineKey) ? CreateInstanceRequest_MachineKey.fromJSON(object.machineKey) : undefined,
    };
  },

  toJSON(message: CreateInstanceRequest_Machine): unknown {
    const obj: any = {};
    if (message.userName !== "") {
      obj.userName = message.userName;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.personalAccessToken !== undefined) {
      obj.personalAccessToken = CreateInstanceRequest_PersonalAccessToken.toJSON(message.personalAccessToken);
    }
    if (message.machineKey !== undefined) {
      obj.machineKey = CreateInstanceRequest_MachineKey.toJSON(message.machineKey);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateInstanceRequest_Machine>, I>>(base?: I): CreateInstanceRequest_Machine {
    return CreateInstanceRequest_Machine.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateInstanceRequest_Machine>, I>>(
    object: I,
  ): CreateInstanceRequest_Machine {
    const message = createBaseCreateInstanceRequest_Machine();
    message.userName = object.userName ?? "";
    message.name = object.name ?? "";
    message.personalAccessToken = (object.personalAccessToken !== undefined && object.personalAccessToken !== null)
      ? CreateInstanceRequest_PersonalAccessToken.fromPartial(object.personalAccessToken)
      : undefined;
    message.machineKey = (object.machineKey !== undefined && object.machineKey !== null)
      ? CreateInstanceRequest_MachineKey.fromPartial(object.machineKey)
      : undefined;
    return message;
  },
};

function createBaseCreateInstanceResponse(): CreateInstanceResponse {
  return { instanceId: "", details: undefined, pat: "", machineKey: new Uint8Array(0) };
}

export const CreateInstanceResponse = {
  encode(message: CreateInstanceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceId !== "") {
      writer.uint32(10).string(message.instanceId);
    }
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(18).fork()).ldelim();
    }
    if (message.pat !== "") {
      writer.uint32(26).string(message.pat);
    }
    if (message.machineKey.length !== 0) {
      writer.uint32(34).bytes(message.machineKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateInstanceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInstanceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instanceId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pat = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.machineKey = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateInstanceResponse {
    return {
      instanceId: isSet(object.instanceId) ? String(object.instanceId) : "",
      details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined,
      pat: isSet(object.pat) ? String(object.pat) : "",
      machineKey: isSet(object.machineKey) ? bytesFromBase64(object.machineKey) : new Uint8Array(0),
    };
  },

  toJSON(message: CreateInstanceResponse): unknown {
    const obj: any = {};
    if (message.instanceId !== "") {
      obj.instanceId = message.instanceId;
    }
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    if (message.pat !== "") {
      obj.pat = message.pat;
    }
    if (message.machineKey.length !== 0) {
      obj.machineKey = base64FromBytes(message.machineKey);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateInstanceResponse>, I>>(base?: I): CreateInstanceResponse {
    return CreateInstanceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateInstanceResponse>, I>>(object: I): CreateInstanceResponse {
    const message = createBaseCreateInstanceResponse();
    message.instanceId = object.instanceId ?? "";
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    message.pat = object.pat ?? "";
    message.machineKey = object.machineKey ?? new Uint8Array(0);
    return message;
  },
};

function createBaseUpdateInstanceRequest(): UpdateInstanceRequest {
  return { instanceId: "", instanceName: "" };
}

export const UpdateInstanceRequest = {
  encode(message: UpdateInstanceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceId !== "") {
      writer.uint32(10).string(message.instanceId);
    }
    if (message.instanceName !== "") {
      writer.uint32(18).string(message.instanceName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateInstanceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateInstanceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instanceId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.instanceName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateInstanceRequest {
    return {
      instanceId: isSet(object.instanceId) ? String(object.instanceId) : "",
      instanceName: isSet(object.instanceName) ? String(object.instanceName) : "",
    };
  },

  toJSON(message: UpdateInstanceRequest): unknown {
    const obj: any = {};
    if (message.instanceId !== "") {
      obj.instanceId = message.instanceId;
    }
    if (message.instanceName !== "") {
      obj.instanceName = message.instanceName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateInstanceRequest>, I>>(base?: I): UpdateInstanceRequest {
    return UpdateInstanceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateInstanceRequest>, I>>(object: I): UpdateInstanceRequest {
    const message = createBaseUpdateInstanceRequest();
    message.instanceId = object.instanceId ?? "";
    message.instanceName = object.instanceName ?? "";
    return message;
  },
};

function createBaseUpdateInstanceResponse(): UpdateInstanceResponse {
  return { details: undefined };
}

export const UpdateInstanceResponse = {
  encode(message: UpdateInstanceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateInstanceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateInstanceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateInstanceResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: UpdateInstanceResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateInstanceResponse>, I>>(base?: I): UpdateInstanceResponse {
    return UpdateInstanceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateInstanceResponse>, I>>(object: I): UpdateInstanceResponse {
    const message = createBaseUpdateInstanceResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseRemoveInstanceRequest(): RemoveInstanceRequest {
  return { instanceId: "" };
}

export const RemoveInstanceRequest = {
  encode(message: RemoveInstanceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceId !== "") {
      writer.uint32(10).string(message.instanceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveInstanceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveInstanceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instanceId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveInstanceRequest {
    return { instanceId: isSet(object.instanceId) ? String(object.instanceId) : "" };
  },

  toJSON(message: RemoveInstanceRequest): unknown {
    const obj: any = {};
    if (message.instanceId !== "") {
      obj.instanceId = message.instanceId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveInstanceRequest>, I>>(base?: I): RemoveInstanceRequest {
    return RemoveInstanceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveInstanceRequest>, I>>(object: I): RemoveInstanceRequest {
    const message = createBaseRemoveInstanceRequest();
    message.instanceId = object.instanceId ?? "";
    return message;
  },
};

function createBaseRemoveInstanceResponse(): RemoveInstanceResponse {
  return { details: undefined };
}

export const RemoveInstanceResponse = {
  encode(message: RemoveInstanceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveInstanceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveInstanceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveInstanceResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: RemoveInstanceResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveInstanceResponse>, I>>(base?: I): RemoveInstanceResponse {
    return RemoveInstanceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveInstanceResponse>, I>>(object: I): RemoveInstanceResponse {
    const message = createBaseRemoveInstanceResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseListIAMMembersRequest(): ListIAMMembersRequest {
  return { query: undefined, instanceId: "", queries: [] };
}

export const ListIAMMembersRequest = {
  encode(message: ListIAMMembersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== undefined) {
      ListQuery.encode(message.query, writer.uint32(10).fork()).ldelim();
    }
    if (message.instanceId !== "") {
      writer.uint32(18).string(message.instanceId);
    }
    for (const v of message.queries) {
      SearchQuery.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListIAMMembersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListIAMMembersRequest();
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

          message.instanceId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): ListIAMMembersRequest {
    return {
      query: isSet(object.query) ? ListQuery.fromJSON(object.query) : undefined,
      instanceId: isSet(object.instanceId) ? String(object.instanceId) : "",
      queries: Array.isArray(object?.queries) ? object.queries.map((e: any) => SearchQuery.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListIAMMembersRequest): unknown {
    const obj: any = {};
    if (message.query !== undefined) {
      obj.query = ListQuery.toJSON(message.query);
    }
    if (message.instanceId !== "") {
      obj.instanceId = message.instanceId;
    }
    if (message.queries?.length) {
      obj.queries = message.queries.map((e) => SearchQuery.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListIAMMembersRequest>, I>>(base?: I): ListIAMMembersRequest {
    return ListIAMMembersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListIAMMembersRequest>, I>>(object: I): ListIAMMembersRequest {
    const message = createBaseListIAMMembersRequest();
    message.query = (object.query !== undefined && object.query !== null)
      ? ListQuery.fromPartial(object.query)
      : undefined;
    message.instanceId = object.instanceId ?? "";
    message.queries = object.queries?.map((e) => SearchQuery.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListIAMMembersResponse(): ListIAMMembersResponse {
  return { details: undefined, result: [] };
}

export const ListIAMMembersResponse = {
  encode(message: ListIAMMembersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ListDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.result) {
      Member.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListIAMMembersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListIAMMembersResponse();
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

          message.result.push(Member.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListIAMMembersResponse {
    return {
      details: isSet(object.details) ? ListDetails.fromJSON(object.details) : undefined,
      result: Array.isArray(object?.result) ? object.result.map((e: any) => Member.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListIAMMembersResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ListDetails.toJSON(message.details);
    }
    if (message.result?.length) {
      obj.result = message.result.map((e) => Member.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListIAMMembersResponse>, I>>(base?: I): ListIAMMembersResponse {
    return ListIAMMembersResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListIAMMembersResponse>, I>>(object: I): ListIAMMembersResponse {
    const message = createBaseListIAMMembersResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ListDetails.fromPartial(object.details)
      : undefined;
    message.result = object.result?.map((e) => Member.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetUsageRequest(): GetUsageRequest {
  return { instanceId: "" };
}

export const GetUsageRequest = {
  encode(message: GetUsageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceId !== "") {
      writer.uint32(10).string(message.instanceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUsageRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUsageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instanceId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetUsageRequest {
    return { instanceId: isSet(object.instanceId) ? String(object.instanceId) : "" };
  },

  toJSON(message: GetUsageRequest): unknown {
    const obj: any = {};
    if (message.instanceId !== "") {
      obj.instanceId = message.instanceId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetUsageRequest>, I>>(base?: I): GetUsageRequest {
    return GetUsageRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetUsageRequest>, I>>(object: I): GetUsageRequest {
    const message = createBaseGetUsageRequest();
    message.instanceId = object.instanceId ?? "";
    return message;
  },
};

function createBaseAddQuotaRequest(): AddQuotaRequest {
  return {
    instanceId: "",
    unit: 0,
    from: undefined,
    resetInterval: undefined,
    amount: 0,
    limit: false,
    notifications: [],
  };
}

export const AddQuotaRequest = {
  encode(message: AddQuotaRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceId !== "") {
      writer.uint32(10).string(message.instanceId);
    }
    if (message.unit !== 0) {
      writer.uint32(16).int32(message.unit);
    }
    if (message.from !== undefined) {
      Timestamp.encode(toTimestamp(message.from), writer.uint32(26).fork()).ldelim();
    }
    if (message.resetInterval !== undefined) {
      Duration.encode(message.resetInterval, writer.uint32(34).fork()).ldelim();
    }
    if (message.amount !== 0) {
      writer.uint32(40).uint64(message.amount);
    }
    if (message.limit === true) {
      writer.uint32(48).bool(message.limit);
    }
    for (const v of message.notifications) {
      Notification.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddQuotaRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddQuotaRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instanceId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.unit = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.from = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.resetInterval = Duration.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.amount = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.limit = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.notifications.push(Notification.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddQuotaRequest {
    return {
      instanceId: isSet(object.instanceId) ? String(object.instanceId) : "",
      unit: isSet(object.unit) ? unitFromJSON(object.unit) : 0,
      from: isSet(object.from) ? fromJsonTimestamp(object.from) : undefined,
      resetInterval: isSet(object.resetInterval) ? Duration.fromJSON(object.resetInterval) : undefined,
      amount: isSet(object.amount) ? Number(object.amount) : 0,
      limit: isSet(object.limit) ? Boolean(object.limit) : false,
      notifications: Array.isArray(object?.notifications)
        ? object.notifications.map((e: any) => Notification.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AddQuotaRequest): unknown {
    const obj: any = {};
    if (message.instanceId !== "") {
      obj.instanceId = message.instanceId;
    }
    if (message.unit !== 0) {
      obj.unit = unitToJSON(message.unit);
    }
    if (message.from !== undefined) {
      obj.from = message.from.toISOString();
    }
    if (message.resetInterval !== undefined) {
      obj.resetInterval = Duration.toJSON(message.resetInterval);
    }
    if (message.amount !== 0) {
      obj.amount = Math.round(message.amount);
    }
    if (message.limit === true) {
      obj.limit = message.limit;
    }
    if (message.notifications?.length) {
      obj.notifications = message.notifications.map((e) => Notification.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddQuotaRequest>, I>>(base?: I): AddQuotaRequest {
    return AddQuotaRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddQuotaRequest>, I>>(object: I): AddQuotaRequest {
    const message = createBaseAddQuotaRequest();
    message.instanceId = object.instanceId ?? "";
    message.unit = object.unit ?? 0;
    message.from = object.from ?? undefined;
    message.resetInterval = (object.resetInterval !== undefined && object.resetInterval !== null)
      ? Duration.fromPartial(object.resetInterval)
      : undefined;
    message.amount = object.amount ?? 0;
    message.limit = object.limit ?? false;
    message.notifications = object.notifications?.map((e) => Notification.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAddQuotaResponse(): AddQuotaResponse {
  return { details: undefined };
}

export const AddQuotaResponse = {
  encode(message: AddQuotaResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddQuotaResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddQuotaResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddQuotaResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: AddQuotaResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddQuotaResponse>, I>>(base?: I): AddQuotaResponse {
    return AddQuotaResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddQuotaResponse>, I>>(object: I): AddQuotaResponse {
    const message = createBaseAddQuotaResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseRemoveQuotaRequest(): RemoveQuotaRequest {
  return { instanceId: "", unit: 0 };
}

export const RemoveQuotaRequest = {
  encode(message: RemoveQuotaRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceId !== "") {
      writer.uint32(10).string(message.instanceId);
    }
    if (message.unit !== 0) {
      writer.uint32(16).int32(message.unit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveQuotaRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveQuotaRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instanceId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.unit = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveQuotaRequest {
    return {
      instanceId: isSet(object.instanceId) ? String(object.instanceId) : "",
      unit: isSet(object.unit) ? unitFromJSON(object.unit) : 0,
    };
  },

  toJSON(message: RemoveQuotaRequest): unknown {
    const obj: any = {};
    if (message.instanceId !== "") {
      obj.instanceId = message.instanceId;
    }
    if (message.unit !== 0) {
      obj.unit = unitToJSON(message.unit);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveQuotaRequest>, I>>(base?: I): RemoveQuotaRequest {
    return RemoveQuotaRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveQuotaRequest>, I>>(object: I): RemoveQuotaRequest {
    const message = createBaseRemoveQuotaRequest();
    message.instanceId = object.instanceId ?? "";
    message.unit = object.unit ?? 0;
    return message;
  },
};

function createBaseRemoveQuotaResponse(): RemoveQuotaResponse {
  return { details: undefined };
}

export const RemoveQuotaResponse = {
  encode(message: RemoveQuotaResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveQuotaResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveQuotaResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveQuotaResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: RemoveQuotaResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveQuotaResponse>, I>>(base?: I): RemoveQuotaResponse {
    return RemoveQuotaResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveQuotaResponse>, I>>(object: I): RemoveQuotaResponse {
    const message = createBaseRemoveQuotaResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseExistsDomainRequest(): ExistsDomainRequest {
  return { domain: "" };
}

export const ExistsDomainRequest = {
  encode(message: ExistsDomainRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.domain !== "") {
      writer.uint32(10).string(message.domain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExistsDomainRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExistsDomainRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): ExistsDomainRequest {
    return { domain: isSet(object.domain) ? String(object.domain) : "" };
  },

  toJSON(message: ExistsDomainRequest): unknown {
    const obj: any = {};
    if (message.domain !== "") {
      obj.domain = message.domain;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExistsDomainRequest>, I>>(base?: I): ExistsDomainRequest {
    return ExistsDomainRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExistsDomainRequest>, I>>(object: I): ExistsDomainRequest {
    const message = createBaseExistsDomainRequest();
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseExistsDomainResponse(): ExistsDomainResponse {
  return { exists: false };
}

export const ExistsDomainResponse = {
  encode(message: ExistsDomainResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.exists === true) {
      writer.uint32(8).bool(message.exists);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExistsDomainResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExistsDomainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.exists = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExistsDomainResponse {
    return { exists: isSet(object.exists) ? Boolean(object.exists) : false };
  },

  toJSON(message: ExistsDomainResponse): unknown {
    const obj: any = {};
    if (message.exists === true) {
      obj.exists = message.exists;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExistsDomainResponse>, I>>(base?: I): ExistsDomainResponse {
    return ExistsDomainResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExistsDomainResponse>, I>>(object: I): ExistsDomainResponse {
    const message = createBaseExistsDomainResponse();
    message.exists = object.exists ?? false;
    return message;
  },
};

function createBaseListDomainsRequest(): ListDomainsRequest {
  return { instanceId: "", query: undefined, sortingColumn: 0, queries: [] };
}

export const ListDomainsRequest = {
  encode(message: ListDomainsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceId !== "") {
      writer.uint32(10).string(message.instanceId);
    }
    if (message.query !== undefined) {
      ListQuery.encode(message.query, writer.uint32(18).fork()).ldelim();
    }
    if (message.sortingColumn !== 0) {
      writer.uint32(24).int32(message.sortingColumn);
    }
    for (const v of message.queries) {
      DomainSearchQuery.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListDomainsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListDomainsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instanceId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.query = ListQuery.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.sortingColumn = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.queries.push(DomainSearchQuery.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListDomainsRequest {
    return {
      instanceId: isSet(object.instanceId) ? String(object.instanceId) : "",
      query: isSet(object.query) ? ListQuery.fromJSON(object.query) : undefined,
      sortingColumn: isSet(object.sortingColumn) ? domainFieldNameFromJSON(object.sortingColumn) : 0,
      queries: Array.isArray(object?.queries) ? object.queries.map((e: any) => DomainSearchQuery.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListDomainsRequest): unknown {
    const obj: any = {};
    if (message.instanceId !== "") {
      obj.instanceId = message.instanceId;
    }
    if (message.query !== undefined) {
      obj.query = ListQuery.toJSON(message.query);
    }
    if (message.sortingColumn !== 0) {
      obj.sortingColumn = domainFieldNameToJSON(message.sortingColumn);
    }
    if (message.queries?.length) {
      obj.queries = message.queries.map((e) => DomainSearchQuery.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListDomainsRequest>, I>>(base?: I): ListDomainsRequest {
    return ListDomainsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListDomainsRequest>, I>>(object: I): ListDomainsRequest {
    const message = createBaseListDomainsRequest();
    message.instanceId = object.instanceId ?? "";
    message.query = (object.query !== undefined && object.query !== null)
      ? ListQuery.fromPartial(object.query)
      : undefined;
    message.sortingColumn = object.sortingColumn ?? 0;
    message.queries = object.queries?.map((e) => DomainSearchQuery.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListDomainsResponse(): ListDomainsResponse {
  return { details: undefined, sortingColumn: 0, result: [] };
}

export const ListDomainsResponse = {
  encode(message: ListDomainsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ListDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.sortingColumn !== 0) {
      writer.uint32(16).int32(message.sortingColumn);
    }
    for (const v of message.result) {
      Domain.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListDomainsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListDomainsResponse();
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
          if (tag !== 16) {
            break;
          }

          message.sortingColumn = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.result.push(Domain.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListDomainsResponse {
    return {
      details: isSet(object.details) ? ListDetails.fromJSON(object.details) : undefined,
      sortingColumn: isSet(object.sortingColumn) ? domainFieldNameFromJSON(object.sortingColumn) : 0,
      result: Array.isArray(object?.result) ? object.result.map((e: any) => Domain.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListDomainsResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ListDetails.toJSON(message.details);
    }
    if (message.sortingColumn !== 0) {
      obj.sortingColumn = domainFieldNameToJSON(message.sortingColumn);
    }
    if (message.result?.length) {
      obj.result = message.result.map((e) => Domain.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListDomainsResponse>, I>>(base?: I): ListDomainsResponse {
    return ListDomainsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListDomainsResponse>, I>>(object: I): ListDomainsResponse {
    const message = createBaseListDomainsResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ListDetails.fromPartial(object.details)
      : undefined;
    message.sortingColumn = object.sortingColumn ?? 0;
    message.result = object.result?.map((e) => Domain.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAddDomainRequest(): AddDomainRequest {
  return { instanceId: "", domain: "" };
}

export const AddDomainRequest = {
  encode(message: AddDomainRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceId !== "") {
      writer.uint32(10).string(message.instanceId);
    }
    if (message.domain !== "") {
      writer.uint32(18).string(message.domain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddDomainRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddDomainRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instanceId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): AddDomainRequest {
    return {
      instanceId: isSet(object.instanceId) ? String(object.instanceId) : "",
      domain: isSet(object.domain) ? String(object.domain) : "",
    };
  },

  toJSON(message: AddDomainRequest): unknown {
    const obj: any = {};
    if (message.instanceId !== "") {
      obj.instanceId = message.instanceId;
    }
    if (message.domain !== "") {
      obj.domain = message.domain;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddDomainRequest>, I>>(base?: I): AddDomainRequest {
    return AddDomainRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddDomainRequest>, I>>(object: I): AddDomainRequest {
    const message = createBaseAddDomainRequest();
    message.instanceId = object.instanceId ?? "";
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseAddDomainResponse(): AddDomainResponse {
  return { details: undefined };
}

export const AddDomainResponse = {
  encode(message: AddDomainResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddDomainResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddDomainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddDomainResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: AddDomainResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddDomainResponse>, I>>(base?: I): AddDomainResponse {
    return AddDomainResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddDomainResponse>, I>>(object: I): AddDomainResponse {
    const message = createBaseAddDomainResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseRemoveDomainRequest(): RemoveDomainRequest {
  return { instanceId: "", domain: "" };
}

export const RemoveDomainRequest = {
  encode(message: RemoveDomainRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceId !== "") {
      writer.uint32(10).string(message.instanceId);
    }
    if (message.domain !== "") {
      writer.uint32(18).string(message.domain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveDomainRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveDomainRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instanceId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): RemoveDomainRequest {
    return {
      instanceId: isSet(object.instanceId) ? String(object.instanceId) : "",
      domain: isSet(object.domain) ? String(object.domain) : "",
    };
  },

  toJSON(message: RemoveDomainRequest): unknown {
    const obj: any = {};
    if (message.instanceId !== "") {
      obj.instanceId = message.instanceId;
    }
    if (message.domain !== "") {
      obj.domain = message.domain;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveDomainRequest>, I>>(base?: I): RemoveDomainRequest {
    return RemoveDomainRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveDomainRequest>, I>>(object: I): RemoveDomainRequest {
    const message = createBaseRemoveDomainRequest();
    message.instanceId = object.instanceId ?? "";
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseRemoveDomainResponse(): RemoveDomainResponse {
  return { details: undefined };
}

export const RemoveDomainResponse = {
  encode(message: RemoveDomainResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveDomainResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveDomainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveDomainResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: RemoveDomainResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveDomainResponse>, I>>(base?: I): RemoveDomainResponse {
    return RemoveDomainResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveDomainResponse>, I>>(object: I): RemoveDomainResponse {
    const message = createBaseRemoveDomainResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseSetPrimaryDomainRequest(): SetPrimaryDomainRequest {
  return { instanceId: "", domain: "" };
}

export const SetPrimaryDomainRequest = {
  encode(message: SetPrimaryDomainRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceId !== "") {
      writer.uint32(10).string(message.instanceId);
    }
    if (message.domain !== "") {
      writer.uint32(18).string(message.domain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetPrimaryDomainRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPrimaryDomainRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instanceId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): SetPrimaryDomainRequest {
    return {
      instanceId: isSet(object.instanceId) ? String(object.instanceId) : "",
      domain: isSet(object.domain) ? String(object.domain) : "",
    };
  },

  toJSON(message: SetPrimaryDomainRequest): unknown {
    const obj: any = {};
    if (message.instanceId !== "") {
      obj.instanceId = message.instanceId;
    }
    if (message.domain !== "") {
      obj.domain = message.domain;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetPrimaryDomainRequest>, I>>(base?: I): SetPrimaryDomainRequest {
    return SetPrimaryDomainRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetPrimaryDomainRequest>, I>>(object: I): SetPrimaryDomainRequest {
    const message = createBaseSetPrimaryDomainRequest();
    message.instanceId = object.instanceId ?? "";
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseSetPrimaryDomainResponse(): SetPrimaryDomainResponse {
  return { details: undefined };
}

export const SetPrimaryDomainResponse = {
  encode(message: SetPrimaryDomainResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetPrimaryDomainResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPrimaryDomainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetPrimaryDomainResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: SetPrimaryDomainResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetPrimaryDomainResponse>, I>>(base?: I): SetPrimaryDomainResponse {
    return SetPrimaryDomainResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetPrimaryDomainResponse>, I>>(object: I): SetPrimaryDomainResponse {
    const message = createBaseSetPrimaryDomainResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseChangeSubscriptionRequest(): ChangeSubscriptionRequest {
  return { domain: "", subscriptionName: "", requestLimit: 0, actionMinsLimit: 0 };
}

export const ChangeSubscriptionRequest = {
  encode(message: ChangeSubscriptionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.domain !== "") {
      writer.uint32(10).string(message.domain);
    }
    if (message.subscriptionName !== "") {
      writer.uint32(18).string(message.subscriptionName);
    }
    if (message.requestLimit !== 0) {
      writer.uint32(24).uint64(message.requestLimit);
    }
    if (message.actionMinsLimit !== 0) {
      writer.uint32(32).uint64(message.actionMinsLimit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangeSubscriptionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeSubscriptionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.domain = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.subscriptionName = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.requestLimit = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.actionMinsLimit = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChangeSubscriptionRequest {
    return {
      domain: isSet(object.domain) ? String(object.domain) : "",
      subscriptionName: isSet(object.subscriptionName) ? String(object.subscriptionName) : "",
      requestLimit: isSet(object.requestLimit) ? Number(object.requestLimit) : 0,
      actionMinsLimit: isSet(object.actionMinsLimit) ? Number(object.actionMinsLimit) : 0,
    };
  },

  toJSON(message: ChangeSubscriptionRequest): unknown {
    const obj: any = {};
    if (message.domain !== "") {
      obj.domain = message.domain;
    }
    if (message.subscriptionName !== "") {
      obj.subscriptionName = message.subscriptionName;
    }
    if (message.requestLimit !== 0) {
      obj.requestLimit = Math.round(message.requestLimit);
    }
    if (message.actionMinsLimit !== 0) {
      obj.actionMinsLimit = Math.round(message.actionMinsLimit);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChangeSubscriptionRequest>, I>>(base?: I): ChangeSubscriptionRequest {
    return ChangeSubscriptionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChangeSubscriptionRequest>, I>>(object: I): ChangeSubscriptionRequest {
    const message = createBaseChangeSubscriptionRequest();
    message.domain = object.domain ?? "";
    message.subscriptionName = object.subscriptionName ?? "";
    message.requestLimit = object.requestLimit ?? 0;
    message.actionMinsLimit = object.actionMinsLimit ?? 0;
    return message;
  },
};

function createBaseChangeSubscriptionResponse(): ChangeSubscriptionResponse {
  return { details: undefined };
}

export const ChangeSubscriptionResponse = {
  encode(message: ChangeSubscriptionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      ObjectDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangeSubscriptionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeSubscriptionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = ObjectDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChangeSubscriptionResponse {
    return { details: isSet(object.details) ? ObjectDetails.fromJSON(object.details) : undefined };
  },

  toJSON(message: ChangeSubscriptionResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = ObjectDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChangeSubscriptionResponse>, I>>(base?: I): ChangeSubscriptionResponse {
    return ChangeSubscriptionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChangeSubscriptionResponse>, I>>(object: I): ChangeSubscriptionResponse {
    const message = createBaseChangeSubscriptionResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? ObjectDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseListViewsRequest(): ListViewsRequest {
  return {};
}

export const ListViewsRequest = {
  encode(_: ListViewsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListViewsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListViewsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): ListViewsRequest {
    return {};
  },

  toJSON(_: ListViewsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ListViewsRequest>, I>>(base?: I): ListViewsRequest {
    return ListViewsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListViewsRequest>, I>>(_: I): ListViewsRequest {
    const message = createBaseListViewsRequest();
    return message;
  },
};

function createBaseListViewsResponse(): ListViewsResponse {
  return { result: [] };
}

export const ListViewsResponse = {
  encode(message: ListViewsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.result) {
      View.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListViewsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListViewsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.result.push(View.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListViewsResponse {
    return { result: Array.isArray(object?.result) ? object.result.map((e: any) => View.fromJSON(e)) : [] };
  },

  toJSON(message: ListViewsResponse): unknown {
    const obj: any = {};
    if (message.result?.length) {
      obj.result = message.result.map((e) => View.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListViewsResponse>, I>>(base?: I): ListViewsResponse {
    return ListViewsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListViewsResponse>, I>>(object: I): ListViewsResponse {
    const message = createBaseListViewsResponse();
    message.result = object.result?.map((e) => View.fromPartial(e)) || [];
    return message;
  },
};

function createBaseClearViewRequest(): ClearViewRequest {
  return { database: "", viewName: "" };
}

export const ClearViewRequest = {
  encode(message: ClearViewRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.database !== "") {
      writer.uint32(10).string(message.database);
    }
    if (message.viewName !== "") {
      writer.uint32(18).string(message.viewName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClearViewRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClearViewRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.database = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.viewName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClearViewRequest {
    return {
      database: isSet(object.database) ? String(object.database) : "",
      viewName: isSet(object.viewName) ? String(object.viewName) : "",
    };
  },

  toJSON(message: ClearViewRequest): unknown {
    const obj: any = {};
    if (message.database !== "") {
      obj.database = message.database;
    }
    if (message.viewName !== "") {
      obj.viewName = message.viewName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClearViewRequest>, I>>(base?: I): ClearViewRequest {
    return ClearViewRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClearViewRequest>, I>>(object: I): ClearViewRequest {
    const message = createBaseClearViewRequest();
    message.database = object.database ?? "";
    message.viewName = object.viewName ?? "";
    return message;
  },
};

function createBaseClearViewResponse(): ClearViewResponse {
  return {};
}

export const ClearViewResponse = {
  encode(_: ClearViewResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClearViewResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClearViewResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): ClearViewResponse {
    return {};
  },

  toJSON(_: ClearViewResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ClearViewResponse>, I>>(base?: I): ClearViewResponse {
    return ClearViewResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClearViewResponse>, I>>(_: I): ClearViewResponse {
    const message = createBaseClearViewResponse();
    return message;
  },
};

function createBaseListFailedEventsRequest(): ListFailedEventsRequest {
  return {};
}

export const ListFailedEventsRequest = {
  encode(_: ListFailedEventsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListFailedEventsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListFailedEventsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): ListFailedEventsRequest {
    return {};
  },

  toJSON(_: ListFailedEventsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ListFailedEventsRequest>, I>>(base?: I): ListFailedEventsRequest {
    return ListFailedEventsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListFailedEventsRequest>, I>>(_: I): ListFailedEventsRequest {
    const message = createBaseListFailedEventsRequest();
    return message;
  },
};

function createBaseListFailedEventsResponse(): ListFailedEventsResponse {
  return { result: [] };
}

export const ListFailedEventsResponse = {
  encode(message: ListFailedEventsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.result) {
      FailedEvent.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListFailedEventsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListFailedEventsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.result.push(FailedEvent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListFailedEventsResponse {
    return { result: Array.isArray(object?.result) ? object.result.map((e: any) => FailedEvent.fromJSON(e)) : [] };
  },

  toJSON(message: ListFailedEventsResponse): unknown {
    const obj: any = {};
    if (message.result?.length) {
      obj.result = message.result.map((e) => FailedEvent.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListFailedEventsResponse>, I>>(base?: I): ListFailedEventsResponse {
    return ListFailedEventsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListFailedEventsResponse>, I>>(object: I): ListFailedEventsResponse {
    const message = createBaseListFailedEventsResponse();
    message.result = object.result?.map((e) => FailedEvent.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRemoveFailedEventRequest(): RemoveFailedEventRequest {
  return { database: "", viewName: "", failedSequence: 0, instanceId: "" };
}

export const RemoveFailedEventRequest = {
  encode(message: RemoveFailedEventRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.database !== "") {
      writer.uint32(10).string(message.database);
    }
    if (message.viewName !== "") {
      writer.uint32(18).string(message.viewName);
    }
    if (message.failedSequence !== 0) {
      writer.uint32(24).uint64(message.failedSequence);
    }
    if (message.instanceId !== "") {
      writer.uint32(34).string(message.instanceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveFailedEventRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveFailedEventRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.database = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.viewName = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.failedSequence = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.instanceId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveFailedEventRequest {
    return {
      database: isSet(object.database) ? String(object.database) : "",
      viewName: isSet(object.viewName) ? String(object.viewName) : "",
      failedSequence: isSet(object.failedSequence) ? Number(object.failedSequence) : 0,
      instanceId: isSet(object.instanceId) ? String(object.instanceId) : "",
    };
  },

  toJSON(message: RemoveFailedEventRequest): unknown {
    const obj: any = {};
    if (message.database !== "") {
      obj.database = message.database;
    }
    if (message.viewName !== "") {
      obj.viewName = message.viewName;
    }
    if (message.failedSequence !== 0) {
      obj.failedSequence = Math.round(message.failedSequence);
    }
    if (message.instanceId !== "") {
      obj.instanceId = message.instanceId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveFailedEventRequest>, I>>(base?: I): RemoveFailedEventRequest {
    return RemoveFailedEventRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveFailedEventRequest>, I>>(object: I): RemoveFailedEventRequest {
    const message = createBaseRemoveFailedEventRequest();
    message.database = object.database ?? "";
    message.viewName = object.viewName ?? "";
    message.failedSequence = object.failedSequence ?? 0;
    message.instanceId = object.instanceId ?? "";
    return message;
  },
};

function createBaseRemoveFailedEventResponse(): RemoveFailedEventResponse {
  return {};
}

export const RemoveFailedEventResponse = {
  encode(_: RemoveFailedEventResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveFailedEventResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveFailedEventResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): RemoveFailedEventResponse {
    return {};
  },

  toJSON(_: RemoveFailedEventResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveFailedEventResponse>, I>>(base?: I): RemoveFailedEventResponse {
    return RemoveFailedEventResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveFailedEventResponse>, I>>(_: I): RemoveFailedEventResponse {
    const message = createBaseRemoveFailedEventResponse();
    return message;
  },
};

function createBaseView(): View {
  return {
    database: "",
    viewName: "",
    processedSequence: 0,
    eventTimestamp: undefined,
    lastSuccessfulSpoolerRun: undefined,
    instance: "",
  };
}

export const View = {
  encode(message: View, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.database !== "") {
      writer.uint32(10).string(message.database);
    }
    if (message.viewName !== "") {
      writer.uint32(18).string(message.viewName);
    }
    if (message.processedSequence !== 0) {
      writer.uint32(24).uint64(message.processedSequence);
    }
    if (message.eventTimestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.eventTimestamp), writer.uint32(34).fork()).ldelim();
    }
    if (message.lastSuccessfulSpoolerRun !== undefined) {
      Timestamp.encode(toTimestamp(message.lastSuccessfulSpoolerRun), writer.uint32(42).fork()).ldelim();
    }
    if (message.instance !== "") {
      writer.uint32(50).string(message.instance);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): View {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseView();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.database = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.viewName = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.processedSequence = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.eventTimestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.lastSuccessfulSpoolerRun = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.instance = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): View {
    return {
      database: isSet(object.database) ? String(object.database) : "",
      viewName: isSet(object.viewName) ? String(object.viewName) : "",
      processedSequence: isSet(object.processedSequence) ? Number(object.processedSequence) : 0,
      eventTimestamp: isSet(object.eventTimestamp) ? fromJsonTimestamp(object.eventTimestamp) : undefined,
      lastSuccessfulSpoolerRun: isSet(object.lastSuccessfulSpoolerRun)
        ? fromJsonTimestamp(object.lastSuccessfulSpoolerRun)
        : undefined,
      instance: isSet(object.instance) ? String(object.instance) : "",
    };
  },

  toJSON(message: View): unknown {
    const obj: any = {};
    if (message.database !== "") {
      obj.database = message.database;
    }
    if (message.viewName !== "") {
      obj.viewName = message.viewName;
    }
    if (message.processedSequence !== 0) {
      obj.processedSequence = Math.round(message.processedSequence);
    }
    if (message.eventTimestamp !== undefined) {
      obj.eventTimestamp = message.eventTimestamp.toISOString();
    }
    if (message.lastSuccessfulSpoolerRun !== undefined) {
      obj.lastSuccessfulSpoolerRun = message.lastSuccessfulSpoolerRun.toISOString();
    }
    if (message.instance !== "") {
      obj.instance = message.instance;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<View>, I>>(base?: I): View {
    return View.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<View>, I>>(object: I): View {
    const message = createBaseView();
    message.database = object.database ?? "";
    message.viewName = object.viewName ?? "";
    message.processedSequence = object.processedSequence ?? 0;
    message.eventTimestamp = object.eventTimestamp ?? undefined;
    message.lastSuccessfulSpoolerRun = object.lastSuccessfulSpoolerRun ?? undefined;
    message.instance = object.instance ?? "";
    return message;
  },
};

function createBaseFailedEvent(): FailedEvent {
  return { database: "", viewName: "", failedSequence: 0, failureCount: 0, errorMessage: "", lastFailed: undefined };
}

export const FailedEvent = {
  encode(message: FailedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.database !== "") {
      writer.uint32(10).string(message.database);
    }
    if (message.viewName !== "") {
      writer.uint32(18).string(message.viewName);
    }
    if (message.failedSequence !== 0) {
      writer.uint32(24).uint64(message.failedSequence);
    }
    if (message.failureCount !== 0) {
      writer.uint32(32).uint64(message.failureCount);
    }
    if (message.errorMessage !== "") {
      writer.uint32(42).string(message.errorMessage);
    }
    if (message.lastFailed !== undefined) {
      Timestamp.encode(toTimestamp(message.lastFailed), writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FailedEvent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFailedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.database = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.viewName = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.failedSequence = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.failureCount = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.errorMessage = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.lastFailed = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FailedEvent {
    return {
      database: isSet(object.database) ? String(object.database) : "",
      viewName: isSet(object.viewName) ? String(object.viewName) : "",
      failedSequence: isSet(object.failedSequence) ? Number(object.failedSequence) : 0,
      failureCount: isSet(object.failureCount) ? Number(object.failureCount) : 0,
      errorMessage: isSet(object.errorMessage) ? String(object.errorMessage) : "",
      lastFailed: isSet(object.lastFailed) ? fromJsonTimestamp(object.lastFailed) : undefined,
    };
  },

  toJSON(message: FailedEvent): unknown {
    const obj: any = {};
    if (message.database !== "") {
      obj.database = message.database;
    }
    if (message.viewName !== "") {
      obj.viewName = message.viewName;
    }
    if (message.failedSequence !== 0) {
      obj.failedSequence = Math.round(message.failedSequence);
    }
    if (message.failureCount !== 0) {
      obj.failureCount = Math.round(message.failureCount);
    }
    if (message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    if (message.lastFailed !== undefined) {
      obj.lastFailed = message.lastFailed.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FailedEvent>, I>>(base?: I): FailedEvent {
    return FailedEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FailedEvent>, I>>(object: I): FailedEvent {
    const message = createBaseFailedEvent();
    message.database = object.database ?? "";
    message.viewName = object.viewName ?? "";
    message.failedSequence = object.failedSequence ?? 0;
    message.failureCount = object.failureCount ?? 0;
    message.errorMessage = object.errorMessage ?? "";
    message.lastFailed = object.lastFailed ?? undefined;
    return message;
  },
};

export interface SystemService {
  /**
   * Indicates if ZITADEL is running.
   * It respondes as soon as ZITADEL started
   */
  Healthz(request: DeepPartial<HealthzRequest>, metadata?: grpc.Metadata): Promise<HealthzResponse>;
  /** Returns a list of ZITADEL instances */
  ListInstances(request: DeepPartial<ListInstancesRequest>, metadata?: grpc.Metadata): Promise<ListInstancesResponse>;
  /** Returns the detail of an instance */
  GetInstance(request: DeepPartial<GetInstanceRequest>, metadata?: grpc.Metadata): Promise<GetInstanceResponse>;
  /**
   * Deprecated: Use CreateInstance instead
   * Creates a new instance with all needed setup data
   * This might take some time
   */
  AddInstance(request: DeepPartial<AddInstanceRequest>, metadata?: grpc.Metadata): Promise<AddInstanceResponse>;
  /** Updates name of an existing instance */
  UpdateInstance(
    request: DeepPartial<UpdateInstanceRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateInstanceResponse>;
  /**
   * Creates a new instance with all needed setup data
   * This might take some time
   */
  CreateInstance(
    request: DeepPartial<CreateInstanceRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CreateInstanceResponse>;
  /**
   * Removes an instance
   * This might take some time
   */
  RemoveInstance(
    request: DeepPartial<RemoveInstanceRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveInstanceResponse>;
  /**
   * Returns all instance members matching the request
   * all queries need to match (ANDed)
   */
  ListIAMMembers(
    request: DeepPartial<ListIAMMembersRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListIAMMembersResponse>;
  /** Checks if a domain exists */
  ExistsDomain(request: DeepPartial<ExistsDomainRequest>, metadata?: grpc.Metadata): Promise<ExistsDomainResponse>;
  /** Returns the custom domains of an instance */
  ListDomains(request: DeepPartial<ListDomainsRequest>, metadata?: grpc.Metadata): Promise<ListDomainsResponse>;
  /** Adds a domain to an instance */
  AddDomain(request: DeepPartial<AddDomainRequest>, metadata?: grpc.Metadata): Promise<AddDomainResponse>;
  /** Removes the domain of an instance */
  RemoveDomain(request: DeepPartial<RemoveDomainRequest>, metadata?: grpc.Metadata): Promise<RemoveDomainResponse>;
  /** Sets the primary domain of an instance */
  SetPrimaryDomain(
    request: DeepPartial<SetPrimaryDomainRequest>,
    metadata?: grpc.Metadata,
  ): Promise<SetPrimaryDomainResponse>;
  /**
   * Returns all stored read models of ZITADEL
   * views are used for search optimisation and optimise request latencies
   * they represent the delta of the event happend on the objects
   */
  ListViews(request: DeepPartial<ListViewsRequest>, metadata?: grpc.Metadata): Promise<ListViewsResponse>;
  /**
   * Truncates the delta of the change stream
   * be carefull with this function because ZITADEL has to
   * recompute the deltas after they got cleared.
   * Search requests will return wrong results until all deltas are recomputed
   */
  ClearView(request: DeepPartial<ClearViewRequest>, metadata?: grpc.Metadata): Promise<ClearViewResponse>;
  /**
   * Returns event descriptions which cannot be processed.
   * It's possible that some events need some retries.
   * For example if the SMTP-API wasn't able to send an email at the first time
   */
  ListFailedEvents(
    request: DeepPartial<ListFailedEventsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListFailedEventsResponse>;
  /**
   * Deletes the event from failed events view.
   * the event is not removed from the change stream
   * This call is usefull if the system was able to process the event later.
   * e.g. if the second try of sending an email was successful. the first try produced a
   * failed event. You can find out if it worked on the `failure_count`
   */
  RemoveFailedEvent(
    request: DeepPartial<RemoveFailedEventRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveFailedEventResponse>;
  /** Creates a new quota */
  AddQuota(request: DeepPartial<AddQuotaRequest>, metadata?: grpc.Metadata): Promise<AddQuotaResponse>;
  /** Removes a quota */
  RemoveQuota(request: DeepPartial<RemoveQuotaRequest>, metadata?: grpc.Metadata): Promise<RemoveQuotaResponse>;
}

export class SystemServiceClientImpl implements SystemService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Healthz = this.Healthz.bind(this);
    this.ListInstances = this.ListInstances.bind(this);
    this.GetInstance = this.GetInstance.bind(this);
    this.AddInstance = this.AddInstance.bind(this);
    this.UpdateInstance = this.UpdateInstance.bind(this);
    this.CreateInstance = this.CreateInstance.bind(this);
    this.RemoveInstance = this.RemoveInstance.bind(this);
    this.ListIAMMembers = this.ListIAMMembers.bind(this);
    this.ExistsDomain = this.ExistsDomain.bind(this);
    this.ListDomains = this.ListDomains.bind(this);
    this.AddDomain = this.AddDomain.bind(this);
    this.RemoveDomain = this.RemoveDomain.bind(this);
    this.SetPrimaryDomain = this.SetPrimaryDomain.bind(this);
    this.ListViews = this.ListViews.bind(this);
    this.ClearView = this.ClearView.bind(this);
    this.ListFailedEvents = this.ListFailedEvents.bind(this);
    this.RemoveFailedEvent = this.RemoveFailedEvent.bind(this);
    this.AddQuota = this.AddQuota.bind(this);
    this.RemoveQuota = this.RemoveQuota.bind(this);
  }

  Healthz(request: DeepPartial<HealthzRequest>, metadata?: grpc.Metadata): Promise<HealthzResponse> {
    return this.rpc.unary(SystemServiceHealthzDesc, HealthzRequest.fromPartial(request), metadata);
  }

  ListInstances(request: DeepPartial<ListInstancesRequest>, metadata?: grpc.Metadata): Promise<ListInstancesResponse> {
    return this.rpc.unary(SystemServiceListInstancesDesc, ListInstancesRequest.fromPartial(request), metadata);
  }

  GetInstance(request: DeepPartial<GetInstanceRequest>, metadata?: grpc.Metadata): Promise<GetInstanceResponse> {
    return this.rpc.unary(SystemServiceGetInstanceDesc, GetInstanceRequest.fromPartial(request), metadata);
  }

  AddInstance(request: DeepPartial<AddInstanceRequest>, metadata?: grpc.Metadata): Promise<AddInstanceResponse> {
    return this.rpc.unary(SystemServiceAddInstanceDesc, AddInstanceRequest.fromPartial(request), metadata);
  }

  UpdateInstance(
    request: DeepPartial<UpdateInstanceRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateInstanceResponse> {
    return this.rpc.unary(SystemServiceUpdateInstanceDesc, UpdateInstanceRequest.fromPartial(request), metadata);
  }

  CreateInstance(
    request: DeepPartial<CreateInstanceRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CreateInstanceResponse> {
    return this.rpc.unary(SystemServiceCreateInstanceDesc, CreateInstanceRequest.fromPartial(request), metadata);
  }

  RemoveInstance(
    request: DeepPartial<RemoveInstanceRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveInstanceResponse> {
    return this.rpc.unary(SystemServiceRemoveInstanceDesc, RemoveInstanceRequest.fromPartial(request), metadata);
  }

  ListIAMMembers(
    request: DeepPartial<ListIAMMembersRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListIAMMembersResponse> {
    return this.rpc.unary(SystemServiceListIAMMembersDesc, ListIAMMembersRequest.fromPartial(request), metadata);
  }

  ExistsDomain(request: DeepPartial<ExistsDomainRequest>, metadata?: grpc.Metadata): Promise<ExistsDomainResponse> {
    return this.rpc.unary(SystemServiceExistsDomainDesc, ExistsDomainRequest.fromPartial(request), metadata);
  }

  ListDomains(request: DeepPartial<ListDomainsRequest>, metadata?: grpc.Metadata): Promise<ListDomainsResponse> {
    return this.rpc.unary(SystemServiceListDomainsDesc, ListDomainsRequest.fromPartial(request), metadata);
  }

  AddDomain(request: DeepPartial<AddDomainRequest>, metadata?: grpc.Metadata): Promise<AddDomainResponse> {
    return this.rpc.unary(SystemServiceAddDomainDesc, AddDomainRequest.fromPartial(request), metadata);
  }

  RemoveDomain(request: DeepPartial<RemoveDomainRequest>, metadata?: grpc.Metadata): Promise<RemoveDomainResponse> {
    return this.rpc.unary(SystemServiceRemoveDomainDesc, RemoveDomainRequest.fromPartial(request), metadata);
  }

  SetPrimaryDomain(
    request: DeepPartial<SetPrimaryDomainRequest>,
    metadata?: grpc.Metadata,
  ): Promise<SetPrimaryDomainResponse> {
    return this.rpc.unary(SystemServiceSetPrimaryDomainDesc, SetPrimaryDomainRequest.fromPartial(request), metadata);
  }

  ListViews(request: DeepPartial<ListViewsRequest>, metadata?: grpc.Metadata): Promise<ListViewsResponse> {
    return this.rpc.unary(SystemServiceListViewsDesc, ListViewsRequest.fromPartial(request), metadata);
  }

  ClearView(request: DeepPartial<ClearViewRequest>, metadata?: grpc.Metadata): Promise<ClearViewResponse> {
    return this.rpc.unary(SystemServiceClearViewDesc, ClearViewRequest.fromPartial(request), metadata);
  }

  ListFailedEvents(
    request: DeepPartial<ListFailedEventsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListFailedEventsResponse> {
    return this.rpc.unary(SystemServiceListFailedEventsDesc, ListFailedEventsRequest.fromPartial(request), metadata);
  }

  RemoveFailedEvent(
    request: DeepPartial<RemoveFailedEventRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveFailedEventResponse> {
    return this.rpc.unary(SystemServiceRemoveFailedEventDesc, RemoveFailedEventRequest.fromPartial(request), metadata);
  }

  AddQuota(request: DeepPartial<AddQuotaRequest>, metadata?: grpc.Metadata): Promise<AddQuotaResponse> {
    return this.rpc.unary(SystemServiceAddQuotaDesc, AddQuotaRequest.fromPartial(request), metadata);
  }

  RemoveQuota(request: DeepPartial<RemoveQuotaRequest>, metadata?: grpc.Metadata): Promise<RemoveQuotaResponse> {
    return this.rpc.unary(SystemServiceRemoveQuotaDesc, RemoveQuotaRequest.fromPartial(request), metadata);
  }
}

export const SystemServiceDesc = { serviceName: "zitadel.system.v1.SystemService" };

export const SystemServiceHealthzDesc: UnaryMethodDefinitionish = {
  methodName: "Healthz",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return HealthzRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = HealthzResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceListInstancesDesc: UnaryMethodDefinitionish = {
  methodName: "ListInstances",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListInstancesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListInstancesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceGetInstanceDesc: UnaryMethodDefinitionish = {
  methodName: "GetInstance",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetInstanceRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetInstanceResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceAddInstanceDesc: UnaryMethodDefinitionish = {
  methodName: "AddInstance",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AddInstanceRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AddInstanceResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceUpdateInstanceDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateInstance",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateInstanceRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdateInstanceResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceCreateInstanceDesc: UnaryMethodDefinitionish = {
  methodName: "CreateInstance",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateInstanceRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CreateInstanceResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceRemoveInstanceDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveInstance",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RemoveInstanceRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RemoveInstanceResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceListIAMMembersDesc: UnaryMethodDefinitionish = {
  methodName: "ListIAMMembers",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListIAMMembersRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListIAMMembersResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceExistsDomainDesc: UnaryMethodDefinitionish = {
  methodName: "ExistsDomain",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ExistsDomainRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ExistsDomainResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceListDomainsDesc: UnaryMethodDefinitionish = {
  methodName: "ListDomains",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListDomainsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListDomainsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceAddDomainDesc: UnaryMethodDefinitionish = {
  methodName: "AddDomain",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AddDomainRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AddDomainResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceRemoveDomainDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveDomain",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RemoveDomainRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RemoveDomainResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceSetPrimaryDomainDesc: UnaryMethodDefinitionish = {
  methodName: "SetPrimaryDomain",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SetPrimaryDomainRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SetPrimaryDomainResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceListViewsDesc: UnaryMethodDefinitionish = {
  methodName: "ListViews",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListViewsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListViewsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceClearViewDesc: UnaryMethodDefinitionish = {
  methodName: "ClearView",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ClearViewRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ClearViewResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceListFailedEventsDesc: UnaryMethodDefinitionish = {
  methodName: "ListFailedEvents",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListFailedEventsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListFailedEventsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceRemoveFailedEventDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveFailedEvent",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RemoveFailedEventRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RemoveFailedEventResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceAddQuotaDesc: UnaryMethodDefinitionish = {
  methodName: "AddQuota",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AddQuotaRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AddQuotaResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SystemServiceRemoveQuotaDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveQuota",
  service: SystemServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RemoveQuotaRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RemoveQuotaResponse.decode(data);
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

export class GrpcWebError extends tsProtoGlobalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
