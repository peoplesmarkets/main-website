import _ from "lodash";
import { Resource, createEffect } from "solid-js";
import { createStore } from "solid-js/store";

import { Option, Select } from "@peoplesmarkets/frontend-lib";

import {
  ListMarketBoothsResponse,
  MarketBoothResponse,
} from "../../../clients/peoplesmarkets/commerce/v1/market_booth";
import styles from "./DashboardPanel.module.scss";
import { useTransContext } from "@mbarzda/solid-i18next";

type Props = {
  marketBoothList: Resource<ListMarketBoothsResponse>;
  selectedMarketBooth: Resource<MarketBoothResponse>;
  onSelectMarketBooth: (marketBoothId: string) => void;
};

export default function DashboardPanel(props: Props) {
  const [trans] = useTransContext();

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
        label={trans("dashboard.current-market-booth")}
        options={marketBoothOptions}
        onValue={props.onSelectMarketBooth}
        selected={selectedMarketBoothId}
      />
    </nav>
  );
}
