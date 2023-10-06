import { buildBaseUrl, buildPath, isCustomDomain } from "../../lib";

export const ROOT_PATH = "/community";
export const DEVELOPMENT_POSTS_PATH = "/development-posts";
export const DEVELOPMENT_POST_PATH = DEVELOPMENT_POSTS_PATH + "/:postSlug";

export function buildCommunityPath() {
  return buildPath(ROOT_PATH);
}

export function buildCommunityPathOrUrl() {
  if (isCustomDomain()) {
    return buildBaseUrl(buildCommunityPath());
  }

  return buildCommunityPath();
}

export function buildDevelopementPostPath(postSlug: string) {
  return buildPath(ROOT_PATH, DEVELOPMENT_POSTS_PATH, postSlug);
}
