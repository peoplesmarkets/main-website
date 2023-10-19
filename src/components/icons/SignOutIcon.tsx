import defaultStyles from "./IconDefault.module.scss";

type Props = {
  class?: string;
};

export function SignOutIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      class={props.class || defaultStyles.IconDefault}
    >
      <path d="M198.565-118.668q-32.513 0-56.205-23.692t-23.692-56.205v-562.87q0-32.513 23.692-56.205t56.205-23.692h281.409v67.588H198.565q-4.616 0-8.462 3.847-3.847 3.846-3.847 8.462v562.87q0 4.616 3.847 8.462 3.846 3.847 8.462 3.847h281.409v67.588H198.565Zm458.051-176.206-49.511-49.281 102.717-102.718H359.846v-67.588h349.156L606.284-617.178l49.255-48.204 185.793 185.92-184.716 184.588Z" />
    </svg>
  );
}
