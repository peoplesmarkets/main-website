import _ from "lodash";
import { Resource } from "solid-js";

export function resourceIsReady<T>(resource: Resource<T>): boolean {
  return _.isNil(resource.error) && resource.state === "ready";
}
