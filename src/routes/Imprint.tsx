import { Page } from "@peoplesmarkets/frontend-lib/components";

import styles from "./Imprint.module.scss";

export default function Imprint() {
  return (
    <>
      <Page wide>
        <h1>peoplesmarkets.com - Imprint</h1>

        <h2 class={styles.SubHeading}>Currently repsonsible:</h2>

        <address class={styles.Address}>
          Maximilian Temeschinko
          <br />
          Thalkirchner Str. 182
          <br />
          81371 Munich
          <br />
          Germany
        </address>
      </Page>
    </>
  );
}
