import { For } from "solid-js";
import { Option } from "./Select";
import styles from "./SuggestionList.module.scss";

type Props = {
  readonly options: () => Option[];
  readonly onValue: (_key: string) => void;
  readonly class?: string;
};

export function SuggestionList(props: Props) {
  function handleSelect(key: string) {
    props.onValue?.(key);
  }

  return <></>;
}
