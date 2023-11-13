import {
  ErrorBoundary,
  JSX,
  Show,
  Suspense,
  createSignal,
  onMount,
} from "solid-js";

import { ContentError, ContentLoading } from "../content";

type Props = {
  loaded: () => boolean | undefined;
  children: JSX.Element;
};

function LoadThenError() {
  const [loading, setLoading] = createSignal(true);

  onMount(() => {
    setTimeout(() => setLoading(false), 10000);
  });

  return (
    <Show when={loading()} fallback={<ContentError />}>
      <ContentLoading page />
    </Show>
  );
}

export function DefaultBoundary(props: Props) {
  return (
    <>
      <ErrorBoundary fallback={<LoadThenError />}>
        <Suspense fallback={<ContentLoading page />}>
          <Show when={props.loaded()} fallback={<ContentLoading page />}>
            {props.children}
          </Show>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
