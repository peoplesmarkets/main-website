import _ from "lodash";
import { getOriginFromWindow, isCustomDomain } from "./env";

export function buildPath(...paths: string[]): string {
  if (paths.length === 1 && paths[0] === "/") {
    return "/";
  }

  return (
    "/" +
    paths
      .filter((p) => p !== "/" && !_.isEmpty(p))
      .map((p) => removeLeadingSlash(p))
      .map((p) => removeTralingSlash(p))
      .join("/")
  );
}

export function buildBaseUrl(...paths: string[]): string {
  if (isCustomDomain()) {
    return `${getOriginFromWindow()}${buildPath(...paths)}`;
  }
  return `${import.meta.env.VITE_BASE_URL}${buildPath(...paths)}`;
}

export function buildBaseUrlWithoutScheme(...paths: string[]): string {
  return `${import.meta.env.VITE_BASE_URL}${buildPath(...paths)}`
    .replace("https://", "")
    .replace("http://", "");
}

export function removeLeadingSlash(path: string) {
  if (_.isNil(path) || _.isEmpty(path) || path === "/") {
    return path;
  }

  return path.startsWith("/") ? path.slice(1) : path;
}

export function removeTralingSlash(path: string) {
  if (_.isNil(path) || _.isEmpty(path) || path === "/") {
    return path;
  }

  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function getPathSegments(path: string) {
  if (_.isNil(path) || _.isEmpty(path) || path === "/") {
    return [""];
  }

  return removeTralingSlash(path).split("/");
}

export function isSubPath(base: string, path: string): boolean {
  const cleanedBase = removeTralingSlash(base);
  const cleanedPath = removeTralingSlash(path);

  if (cleanedBase === cleanedPath) return false;

  if (!cleanedPath.startsWith(cleanedBase)) {
    return false;
  }

  const baseSegments = getPathSegments(cleanedBase);
  const pathSegments = getPathSegments(cleanedPath);

  if (baseSegments.length + 1 !== pathSegments.length) {
    return false;
  }

  pathSegments.pop();

  return baseSegments.join("") === pathSegments.join("");
}
