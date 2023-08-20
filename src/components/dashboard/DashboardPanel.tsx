import _ from "lodash";
import { Resource, createEffect } from "solid-js";
import { createStore } from "solid-js/store";

import { Select, Option } from "../../../frontend-lib";

import {
  GetMarketBoothResponse,
  ListMarketBoothsResponse,
  MarketBoothResponse,
} from "../../../clients/peoplesmarkets/commerce/v1/market_booth";
import styles from "./DashboardPanel.module.scss";

type Props = {
  marketBoothList: Resource<ListMarketBoothsResponse>;
  selectedMarketBooth: Resource<MarketBoothResponse>;
  onSelectMarketBooth: (marketBoothId: string) => void;
};

export default function DashboardPanel(props: Props) {
  const [marketBoothOptions, setMarketBoothOptions] = createStore<Option[]>([]);

  createEffect(() => {
    if (!_.isEmpty(marketBooths())) {
      setMarketBoothOptions(
        marketBooths()!.map(({ marketBoothId, name }) => ({
          key: marketBoothId,
          name,
        }))
      );
    }
  });

  function marketBooths() {
    return props.marketBoothList()?.marketBooths;
  }

  function selectedMarketBoothId() {
    return props.selectedMarketBooth()?.marketBoothId;
  }

  return (
    <nav class={styles.DashboardPanel}>
      <Select
        label="Current Market Booth"
        options={marketBoothOptions}
        onValue={props.onSelectMarketBooth}
        selected={selectedMarketBoothId}
      />
    </nav>
  );
}
