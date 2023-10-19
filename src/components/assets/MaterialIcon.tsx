import _ from "lodash";

type Props = {
  icon: string;
  class?: string;
  classList?: Record<string, boolean | undefined>;
  onClick?: () => void;
};

export function MaterialIcon(props: Props) {
  return (
    <span
      class="material-symbols-outlined"
      classList={{
        ...props.classList,
        [props.class!]: !_.isEmpty(props.class),
      }}
      onClick={() => props.onClick?.()}
    >
      {props.icon}
    </span>
  );
}
