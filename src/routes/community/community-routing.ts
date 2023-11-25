import { buildBaseUrl, buildPath, isCustomDomain } from "../../lib";

export const DEVELOPMENT_POST_PATH_SEGMENT = "/:postSlug";

export function buildCommunityPath() {
  return "/community";
}

export function buildCommunityPathOrUrl() {
  if (isCustomDomain()) {
    return buildBaseUrl(buildCommunityPath());
  }

  return buildCommunityPath();
}

export function buildDevelopementPostsPath() {
  return buildPath(buildCommunityPath(), "development-posts");
}

export function buildDevelopementPostPath(postSlug: string) {
  return buildPath(buildDevelopementPostsPath(), postSlug);
}
