import _ from "lodash";

/// Removes nil values from objects and removes all keys not included in filter
/// then compairs the objects for difference by key and value.
/// If one of the objects is nil function returns false
export function isDifferentOmittingNilWithFilter(
  a: Record<string, any> | undefined,
  b: Record<string, any> | undefined,
  filter: string[]
): boolean {
  if (_.isNil(a) || _.isNil(b)) {
    return false;
  }

  return !_.isEqual(
    _.pick(_.omitBy(a, _.isNil), filter),
    _.pick(_.omitBy(b, _.isNil), filter)
  );
}
