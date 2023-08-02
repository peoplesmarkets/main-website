import styles from "./get-started.module.scss";

export default function GetStarted() {
  return (
    <div class={styles.GetStarted}>
      <div class={styles.Hero}>
        <div class={styles.VPandCTA}>
          <h1 class={styles.VPTitle}>Elevate Your Online Appearance</h1>

          <ul class={styles.VPSubTitle}>
            <li class={styles.VPSubTitleItem}>
              Build up your brand and offer your items
            </li>
            <li class={styles.VPSubTitleItem}>No costs until you sell</li>
            <li class={styles.VPSubTitleItem}>No strings attached</li>
          </ul>

          {/* TODO: replace with <ActionButton>GET STARTED</ActionButton> */}
          <span class={styles.ComingSoon}>coming soon!</span>
        </div>

        <div class={styles.HeroImage}>

        </div>
      </div>
    </div>
  );
}
