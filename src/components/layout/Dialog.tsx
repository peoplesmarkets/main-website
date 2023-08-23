import { JSX, onCleanup, onMount } from "solid-js";

import { CloseIcon } from "@peoplesmarkets/frontend-lib";

import styles from "./Dialog.module.scss";

type Props = {
  title: string;
  onClose: (_event?: any) => void;
  children: JSX.Element;
};

export function Dialog(props: Props) {
  onMount(() => {
    document.body.classList.add("no-scroll");
  });
  onCleanup(() => {
    document.body.classList.remove("no-scroll");
  });

  return (
    <>
      <div class={styles.Background} />
      <div class={styles.Container}>
        <div class={styles.Dialog}>
          <div class={styles.Header}>
            <span class={styles.Title}>{props.title}</span>
            <div class={styles.CloseContainer}>
              <button
                class={styles.CloseButton}
                onClick={(e) => props.onClose(e)}
              >
                <CloseIcon extraClass={styles.Close} />
              </button>
            </div>
          </div>

          {props.children}
        </div>
      </div>
    </>
  );
}
