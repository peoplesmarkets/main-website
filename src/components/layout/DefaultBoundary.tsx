import {
  ErrorBoundary,
  JSX,
  Show,
  Suspense,
  createSignal,
  onMount,
} from "solid-js";

import { ContentError, ContentLoading } from "../content";
import { Redirect } from "../navigation/Redirect";

type Props = {
  readonly loaded: () => boolean | undefined;
  readonly signIn?: boolean | undefined;
  readonly redirect?: boolean | undefined;
  readonly children?: JSX.Element | undefined;
};

function Loading(props: Props) {
  return (
    <Show
      when={props.signIn || props.redirect}
      fallback={<ContentLoading page />}
    >
      <Redirect singIn={props.signIn} />
    </Show>
  );
}

function LoadThenError(props: Props) {
  const [loading, setLoading] = createSignal(true);

  onMount(() => {
    setTimeout(() => setLoading(false), 10000);
  });

  return (
    <Show when={loading()} fallback={<ContentError />}>
      <Loading {...props} />
    </Show>
  );
}

export function DefaultBoundary(props: Props) {
  return (
    <>
      <ErrorBoundary fallback={<LoadThenError {...props} />}>
        <Suspense fallback={<Loading {...props} />}>
          <Show when={props.loaded()} fallback={<Loading {...props} />}>
            {props.children}
          </Show>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
