import { JSX, onCleanup, onMount } from "solid-js";
import styles from "./Dialog.module.scss";
import CloseIcon from "../assets/CloseIcon";

type Props = {
  title: string;
  onClose: () => void;
  children: JSX.Element;
};

export default function Dialog(props: Props) {
  onMount(() => {
    document.body.classList.add("no-scroll");
  });
  onCleanup(() => {
    document.body.classList.remove("no-scroll");
  });

  return (
    <>
      <div class={styles.Background}></div>
      <div class={styles.Container}>
        <div class={styles.Dialog}>
          <div class={styles.Header}>
            <span class={styles.Title}>{props.title}</span>
            <div class={styles.CloseContainer}>
              <button class={styles.CloseButton} onClick={props.onClose}>
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
