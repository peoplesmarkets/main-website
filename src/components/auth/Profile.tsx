import { Show, createSignal } from "solid-js";

import styles from "./Profile.module.scss";
import ActionButton from "../form/ActionButton";
import ThemeIcon from "../assets/ThemeIcon";
import { useAccessTokensContext } from "../../AccessTokensContext";
import { getInitials } from "../../lib/codecs";
import clickOutside from "~/directives/click-outside";
false && clickOutside;

export default function Profile() {
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
            <ThemeIcon class={styles.DialogHeaderThemeIcon} />

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
