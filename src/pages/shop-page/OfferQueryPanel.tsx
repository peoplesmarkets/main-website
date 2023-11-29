import { useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { resetErrorBoundaries } from "solid-js";
import { MdIcon } from "../../components/assets";
import { TKEYS } from "../../locales";
import {
  OffersFilter,
  OffersFilterField,
  OffersOrderBy,
} from "../../services/peoplesmarkets/commerce/v1/offer";
import styles from "./OfferQueryPanel.module.scss";

type Props = {
  readonly filter: OffersFilter | undefined;
  readonly onFilterChange: (offersFilter?: OffersFilter | undefined) => void;
  readonly orderBy: OffersOrderBy | undefined;
  readonly onOrderByChange: (offersOrderBy?: OffersOrderBy | undefined) => void;
  readonly onUpdate: () => void;
};

export function OfferQueryPanel(props: Props) {
  const [trans] = useTransContext();

  function handleSearchInput(query: string) {
    if (!_.isEmpty(_.trim(query))) {
      props.onFilterChange({
        field: OffersFilterField.OFFERS_FILTER_FIELD_NAME_AND_DESCRIPTION,
        query,
      });
    } else {
      props.onFilterChange();
    }

    resetErrorBoundaries();
  }

  function handleSearchSubmit() {
    props.onFilterChange();
  }

  function handleUpdate() {
    props.onUpdate();
  }

  return (
    <>
      <form class={styles.Search} onSubmit={handleSearchSubmit}>
        <MdIcon class={styles.SearchIcon} icon="search" />

        <input
          class={styles.SearchInput}
          id="search"
          type="search"
          placeholder={trans(TKEYS["home-page"]["search-offers"])}
          value={props.filter?.query || ""}
          onInput={(event) => handleSearchInput(event.currentTarget.value)}
          aria-label="search"
        />

        <MdIcon
          class={styles.RefreshIcon}
          icon="refresh"
          onClick={handleUpdate}
        />
      </form>
    </>
  );
}
