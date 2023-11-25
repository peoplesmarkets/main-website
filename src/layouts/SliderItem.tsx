import { A } from "@solidjs/router";
import _ from "lodash";
import { JSX, Show } from "solid-js";

import { MdIcon } from "../components/assets";
import { Font } from "../components/content";
import styles from "./SliderItem.module.scss";

type Props = {
  readonly type: "body" | "label";
  readonly icon?: string | undefined;
  readonly iconLeft?: boolean | undefined;
  readonly key?: string | undefined;
  readonly label?: string | undefined;
  readonly href?: string | undefined;
  readonly onClick?: () => void;
  readonly active?: boolean | undefined;
  readonly danger?: boolean | undefined;
  readonly children?: JSX.Element | undefined;
};

export function SliderItem(props: Props) {
  return (
    <>
      <Show
        when={!_.isNil(props.href)}
        fallback={
          <button
            class={styles.Button}
            classList={{
              [styles.Active]: Boolean(props.active),
              [styles.Danger]: Boolean(props.danger),
            }}
            onClick={props.onClick}
          >
            <SliderItemInner {...props} />
          </button>
        }
      >
        <A
          class={styles.Link}
          classList={{
            [styles.Active]: Boolean(props.active),
            [styles.Danger]: Boolean(props.danger),
          }}
          href={props.href!}
        >
          <SliderItemInner {...props} />
        </A>
      </Show>
    </>
  );
}

function SliderItemInner(props: Props) {
  return (
    <>
      <Show
        when={!props.iconLeft}
        fallback={
          <div class={styles.InnerIconLeft}>
            <Show when={!_.isNil(props.icon)} fallback={props.children}>
              <MdIcon
                class={styles.Icon}
                classList={{
                  [styles.Active]: Boolean(props.active),
                  [styles.Danger]: Boolean(props.danger),
                }}
                icon={props.icon!}
              />
            </Show>
            <Font
              class={styles.Label}
              classList={{
                [styles.Active]: Boolean(props.active),
                [styles.Danger]: Boolean(props.danger),
              }}
              type={props.type}
              key={props.key}
            >
              {props.label}
            </Font>
          </div>
        }
      >
        <div class={styles.InnerIconRight}>
          <Font
            class={styles.Label}
            classList={{
              [styles.Active]: Boolean(props.active),
              [styles.Danger]: Boolean(props.danger),
            }}
            type={props.type}
            key={props.key}
          >
            {props.label}
          </Font>
          <Show when={!_.isNil(props.icon)} fallback={props.children}>
            <MdIcon
              class={styles.Icon}
              classList={{
                [styles.Active]: Boolean(props.active),
                [styles.Danger]: Boolean(props.danger),
              }}
              icon={props.icon!}
            />
          </Show>
        </div>
      </Show>
    </>
  );
}
