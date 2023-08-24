import { Route } from "@solidjs/router";

import { DEVELOPMENT_POSTS_SUBPATH, buildPath } from "../../App";
import Home from "./Home";
import { Posts } from "./Posts";
import { PostsNav } from "./PostsNav";

export default function CommunityRoutes() {
  return (
    <>
      <Route path="" component={Home} />
      <Route path="/" element={<PostsNav />}>
        <Route
          path={buildPath(DEVELOPMENT_POSTS_SUBPATH, ":postSlug")}
          component={Posts}
        />
      </Route>
    </>
  );
}
