import { Outlet, useRouteData } from "@solidjs/router";
import { storeData } from "./storeData";
import { Panel } from "../../Panel";
import { Page } from "../../components/layout";

export default function StoreRoutesWrapper() {
  const store = useRouteData<typeof storeData>();

  return (
    <>
      <Panel store={() => store()} />
      <Page>
        <Outlet />
      </Page>
    </>
  );
}
