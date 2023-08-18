import { Accessor, Setter, Show, createSignal } from "solid-js";

import { Theme } from "@peoplesmarkets/frontend-lib/theme";
import { ThemeIcon, ActionButton } from "@peoplesmarkets/frontend-lib/components";
import { clickOutside } from "@peoplesmarkets/frontend-lib/directives";
import { getInitials } from "@peoplesmarkets/frontend-lib/lib";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import styles from "./Profile.module.scss";

false && clickOutside;

type Props = {
  theme: Accessor<Theme>;
  setTheme: Setter<Theme>;
};

export default function Profile(props: Props) {
  const { currentSession, endSession } = useAccessTokensContext();

  const [showDialog, setShowDialog] = createSignal(false);

  function toggleShowDialog() {
    setShowDialog(!showDialog());
  }

  function initials() {
    return getInitials(2, currentSession().displayName);
  }

  return (
    <div use:clickOutside={() => setShowDialog(false)}>
      <div class={styles.Profile} onClick={toggleShowDialog}>
        <span class={styles.Initials}>{initials()}</span>
      </div>

      <Show when={showDialog()}>
        <div class={styles.Dialog}>
          <div class={styles.DialogHeader}>
            <span class={styles.DialogHeaderInitials}>{initials()}</span>
            <ThemeIcon
              class={styles.DialogHeaderThemeIcon}
              theme={props.theme}
              setTheme={props.setTheme}
            />

            <div class={styles.DialogHeaderEmail}>
              <span>{currentSession()?.displayName}</span>
              <span style={{ "font-size": "small" }}>
                {currentSession()?.userName}
              </span>
            </div>
          </div>

          <div class={styles.DialogFooter}>
            <ActionButton actionType="danger" onClick={endSession}>
              Sing Out
            </ActionButton>
          </div>
        </div>
      </Show>
    </div>
  );
}
