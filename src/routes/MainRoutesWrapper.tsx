import { Outlet } from "@solidjs/router";

import { Panel } from "../Panel";
import { Page } from "../components/layout";

export default function MainRoutesWrapper() {
  return (
    <>
      <Panel />
      <Page>
        <Outlet />
      </Page>
    </>
  );
}
