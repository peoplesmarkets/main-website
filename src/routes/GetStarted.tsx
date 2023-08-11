import styles from "./GetStarted.module.scss";

export default function GetStarted() {
  return (
    <div class={styles.GetStarted}>
      <div class={styles.Hero}>
        <div class={styles.VPandCTA}>
          <h1 class={styles.VPTitle}>Establish Your Online Appearance</h1>

          <ul class={styles.VPSubTitle}>
            <li class={styles.VPSubTitleItem}>
              Create your online Market Booth and build your brand
            </li>
            <li class={styles.VPSubTitleItem}>
              Offer your items to the people
            </li>
            <li class={styles.VPSubTitleItem}>No costs until you sell</li>
            <li class={styles.VPSubTitleItem}>No strings attached</li>
          </ul>

          {/* TODO: replace with <ActionButton>GET STARTED</ActionButton> */}
          <span class={styles.ComingSoon}>coming soon!</span>
        </div>

        <div class={styles.HeroImage}></div>
      </div>
    </div>
  );
}
