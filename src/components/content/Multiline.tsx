import _ from "lodash";
import { For, Show } from "solid-js";

type Props = {
  readonly text: () => string | undefined;
};

export function Multiline(props: Props) {
  return (
    <>
      <Show when={!_.isNil(props.text())}>
        <For each={props.text()!.split("\n")}>
          {(line) => (
            <Show when={!_.isEmpty(line)} fallback={<br />}>
              <p>{line}</p>
            </Show>
          )}
        </For>
      </Show>
    </>
  );
}
