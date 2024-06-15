import _ from "lodash";

import {
  PaginationRequest,
  PaginationResponse,
} from "../../services/sited_io/pagination/v1/pagination";
import Chevron from "../icons/Chevron";
import styles from "./Pagination.module.scss";

type Props = {
  readonly pagination: () => PaginationResponse | undefined;
  readonly onValue: (next: PaginationRequest) => void;
};

export function Pagination(props: Props) {
  function handlePagination(increment: number) {
    const pagination = props.pagination();

    if (!_.isNil(pagination)) {
      const nextPage = pagination.page + increment;
      const maxPage = Math.ceil(pagination.totalElements / pagination.size);

      if (nextPage > 0 && nextPage <= maxPage) {
        props.onValue({
          page: nextPage,
          size: pagination.size,
        });
      }
    }
  }

  function totalPages() {
    const pagination = props.pagination();

    if (!_.isNil(pagination)) {
      return Math.ceil(pagination.totalElements / pagination.size);
    }
  }

  return (
    <div class={styles.Pagination}>
      <button class={styles.Button} onClick={() => handlePagination(-1)}>
        <Chevron class={styles.Arrow} direction={() => "left"} />
      </button>
      <span>
        {props.pagination()?.page} / {totalPages()}
      </span>
      <button class={styles.Button} onClick={() => handlePagination(+1)}>
        <Chevron class={styles.Arrow} direction={() => "right"} />
      </button>
    </div>
  );
}
