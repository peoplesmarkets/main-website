import _ from "lodash";
import { For, Show } from "solid-js";

type Props = {
  readonly text: string | undefined;
  readonly maxRows?: number;
};

export function removeEmptyLinesEnd(lines: string[] | undefined): string[] {
  if (_.isNil(lines)) {
    return [];
  }

  const result: string[] = _.cloneDeep(lines);

  for (const line of lines.reverse()) {
    if (_.isEmpty(line)) {
      result.pop();
    } else {
      return result;
    }
  }

  return result;
}

export function trimLines(
  lines: string[] | undefined,
  max: number | undefined
): string[] {
  if (_.isNil(lines) || _.isEmpty(lines)) {
    return [];
  }
  if (_.isNil(max)) {
    return lines;
  }

  if (lines.length > max) {
    const start = removeEmptyLinesEnd(lines.slice(0, max));
    const end = removeEmptyLinesEnd(lines.slice(max));

    if (_.isEmpty(end)) {
      return start;
    }

    if (start.length < max) {
      start.push("...");
    } else {
      start.splice(start.length - 1, 1, "...");
    }
    return start;
  }

  return lines;
}

export function Multiline(props: Props) {
  function content() {
    if (_.isNil(props.text) || _.isEmpty(props.text)) {
      return [];
    }

    let lines = props.text?.split("\n");
    return trimLines(lines, props.maxRows);
  }

  return (
    <>
      <For each={content()}>
        {(line) => (
          <Show when={!_.isEmpty(line)} fallback={<br />}>
            <p>{line}</p>
          </Show>
        )}
      </For>
    </>
  );
}
