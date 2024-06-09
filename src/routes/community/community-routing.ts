import { buildPath } from "../../lib";

export const DEVELOPMENT_POST_PATH_SEGMENT = "/:postSlug";

export function buildCommunityPath() {
  return "/community";
}

export function buildDevelopementPostsPath() {
  return buildPath(buildCommunityPath(), "development-posts");
}

export function buildDevelopementPostPath(postSlug: string) {
  return buildPath(buildDevelopementPostsPath(), postSlug);
}
