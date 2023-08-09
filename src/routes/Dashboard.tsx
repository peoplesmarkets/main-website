import {
  Show,
  createEffect,
  createResource,
  createSignal,
  onMount,
} from "solid-js";

import { GET_STARTED_PATH } from "../App";
import CreateShopDialog, {
  CreateShop,
} from "../components/commerce/CreateShopDialog";
import Section from "../components/layout/Section";
import { authGuardRedirect } from "../lib/auth";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { ShopServiceClient } from "../../clients";
import _ from "lodash";
import { grpc } from "@improbable-eng/grpc-web";

export default function Dashboard() {
  const { accessToken, currentSession } = useAccessTokensContext();

  const shopService = new ShopServiceClient(accessToken);

  const [showCreateShop, setShowCreateShop] = createSignal(false);
  const [shops, { mutate, refetch }] = createResource(
    currentSession().userId,
    listShops
  );

  createEffect(() => {
    if (shops.state === "ready" && shops().shops.length < 1) {
      setShowCreateShop(true);
    }
  });

  async function listShops(userId: string) {
    const request = {
      userId,
    };

    const res = await shopService.client.ListShops(
      request,
      await shopService.withAuthHeader()
    );

    return res;
  }

  async function createShop(shop: CreateShop) {
    try {
      await shopService.client.CreateShop(
        shop,
        await shopService.withAuthHeader()
      );
    } catch (err: any) {
      if (err.code && err.code == grpc.Code.AlreadyExists) {
        console.log("Already exists");
      } else {
        throw err;
      }
    }
  }

  function closeCreateShop() {
    setShowCreateShop(false);
  }

  function openCreateShop() {
    setShowCreateShop(true);
  }

  onMount(async () => {
    await authGuardRedirect(GET_STARTED_PATH);
  });

  return (
    <>
      <Show when={showCreateShop()}>
        <CreateShopDialog onValue={createShop} onClose={closeCreateShop} />
      </Show>

      <Section wide={true}>
        <h2>Dashboard</h2>
        <p>{shops.state}</p>
        <p>{shops.loading}</p>
        <p>{shops.error}</p>
        <p>{JSON.stringify(shops())}</p>
        <button onClick={openCreateShop}>Create a new Shop</button>
      </Section>
    </>
  );
}
