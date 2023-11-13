import { JSX } from "solid-js";

import styles from "./IconFileField.module.scss";

type Props = {
  readonly onValue: (_value: FileList | null) => void;
  readonly multiple?: boolean | undefined;
  readonly children?: JSX.Element;
  readonly image?: boolean | undefined;
};

export function IconFileField(props: Props) {
  return (
    <>
      <label class={styles.Label} for="icon-file-field">
        {props.children}
      </label>
      <input
        class={styles.Input}
        id="icon-file-field"
        type="file"
        multiple={Boolean(props.multiple)}
        accept={props.image ? "image/*" : "*"}
        onInput={(event) => props.onValue(event.currentTarget.files)}
      />
    </>
  );
}
