import { splitProps } from "solid-js";
import { MdLoading } from "../navigation";
import styles from "./ContentLoading.module.scss";

type Props = {
  readonly size?: string | undefined;
  readonly page?: boolean | undefined;
};

export function ContentLoading(props: Props) {
  const [local, others] = splitProps(props, ["page"]);

  return (
    <div
      classList={{
        [styles.Page]: Boolean(local.page),
      }}
    >
      <MdLoading {...others} />
    </div>
  );
}
