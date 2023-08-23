import _ from "lodash";
import { createEffect } from "solid-js";

import { getMarkdownItInstance } from "@peoplesmarkets/frontend-lib";

import styles from "./Markdown.module.scss";

type Props = {
  readonly src: () => string;
  readonly class?: string;
};

export function Markdown(props: Props) {
  let container: HTMLDivElement | undefined;

  const md = getMarkdownItInstance();

  createEffect(() => {
    if (!_.isNil(container) && !_.isNil(md)) {
      container.innerHTML = md.render(props.src());
    }
  });

  return <div ref={container} class={props.class || styles.Markdown} />;
}
