import styles from "./LoadingBar.module.scss";

export function LoadingBar() {
  return <progress class={styles.LoadingBar} />;
}
